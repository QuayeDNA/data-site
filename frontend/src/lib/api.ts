import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import type { ApiResponse } from "@/types";

// ──────────────────────────────────────────────
// Custom API Error
// ──────────────────────────────────────────────
export class ApiError extends Error {
  status: number;
  code?: string;
  data?: unknown;

  constructor(message: string, status: number, code?: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

// ──────────────────────────────────────────────
// Token helpers
// ──────────────────────────────────────────────
const TOKEN_KEYS = {
  access: "accessToken",
  refresh: "refreshToken",
} as const;

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem(TOKEN_KEYS.access),
  getRefreshToken: () => localStorage.getItem(TOKEN_KEYS.refresh),
  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(TOKEN_KEYS.access, access);
    localStorage.setItem(TOKEN_KEYS.refresh, refresh);
  },
  clearTokens: () => {
    localStorage.removeItem(TOKEN_KEYS.access);
    localStorage.removeItem(TOKEN_KEYS.refresh);
  },
};

// ──────────────────────────────────────────────
// Axios Instance
// ──────────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 30_000,
});

// ──────────────────────────────────────────────
// Request Interceptor — attach JWT
// ──────────────────────────────────────────────
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ──────────────────────────────────────────────
// Refresh-token queue (prevents parallel refresh)
// ──────────────────────────────────────────────
let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  refreshQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token!);
    }
  });
  refreshQueue = [];
}

// ──────────────────────────────────────────────
// Response Interceptor — 401 handling + refresh
// ──────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only attempt refresh on 401 responses with a valid refresh token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      tokenStorage.getRefreshToken()
    ) {
      if (isRefreshing) {
        // Queue this request until the refresh completes
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = tokenStorage.getRefreshToken();
        const { data } = await axios.post<{
          accessToken: string;
          refreshToken?: string;
        }>(`${api.defaults.baseURL}/auth/refresh`, { refreshToken });

        const newAccess = data.accessToken;
        const newRefresh = data.refreshToken ?? refreshToken!;
        tokenStorage.setTokens(newAccess, newRefresh);

        processQueue(null, newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        tokenStorage.clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Normalize into ApiError
    const status = error.response?.status ?? 0;
    const body = error.response?.data;
    const message =
      body?.message ?? error.message ?? "An unexpected error occurred";
    const code = body?.code;

    return Promise.reject(new ApiError(message, status, code, body));
  },
);

// ──────────────────────────────────────────────
// Typed request helpers
// ──────────────────────────────────────────────

/** GET request returning `data` from AxiosResponse */
export async function apiGet<T>(url: string, config?: AxiosRequestConfig) {
  const res = await api.get<T>(url, config);
  return res.data;
}

/** POST request returning `data` */
export async function apiPost<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
) {
  const res = await api.post<T>(url, body, config);
  return res.data;
}

/** PUT request returning `data` */
export async function apiPut<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
) {
  const res = await api.put<T>(url, body, config);
  return res.data;
}

/** PATCH request returning `data` */
export async function apiPatch<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
) {
  const res = await api.patch<T>(url, body, config);
  return res.data;
}

/** DELETE request returning `data` */
export async function apiDelete<T>(url: string, config?: AxiosRequestConfig) {
  const res = await api.delete<T>(url, config);
  return res.data;
}

/** Build query-string params, filtering out undefined values */
export function buildParams(
  params: Record<string, string | number | boolean | undefined>,
): Record<string, string | number | boolean> {
  return Object.fromEntries(
    Object.entries(params).filter(
      (entry): entry is [string, string | number | boolean] =>
        entry[1] !== undefined,
    ),
  );
}

export default api;
