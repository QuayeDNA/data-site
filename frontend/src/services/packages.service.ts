import { apiGet, apiPost, apiPut, apiDelete, buildParams } from "@/lib/api";
import type {
  ApiResponse,
  Package,
  CreatePackagePayload,
} from "@/types";

const BASE = "/packages";

export const packagesService = {
  // ── Public ──────────────────────────────
  listPublic: () =>
    apiGet<ApiResponse<Package[]>>(`${BASE}/public`),

  getPublicById: (id: string) =>
    apiGet<ApiResponse<Package>>(`${BASE}/public/${id}`),

  getPublicByProvider: (provider: string) =>
    apiGet<ApiResponse<Package[]>>(`${BASE}/public/provider/${provider}`),

  getPublicByCategory: (category: string) =>
    apiGet<ApiResponse<Package[]>>(`${BASE}/public/category/${category}`),

  // ── Authenticated ───────────────────────
  list: (params?: Record<string, string | number | boolean | undefined>) =>
    apiGet<ApiResponse<Package[]>>(BASE, {
      params: params ? buildParams(params) : undefined,
    }),

  getById: (id: string) =>
    apiGet<ApiResponse<Package>>(`${BASE}/${id}`),

  getByProvider: (provider: string) =>
    apiGet<ApiResponse<Package[]>>(`${BASE}/provider/${provider}`),

  getByCategory: (category: string) =>
    apiGet<ApiResponse<Package[]>>(`${BASE}/category/${category}`),

  getStats: () =>
    apiGet<ApiResponse>(`${BASE}/stats/summary`),

  // ── Admin ───────────────────────────────
  create: (payload: CreatePackagePayload) =>
    apiPost<ApiResponse<Package>>(BASE, payload),

  update: (id: string, payload: Partial<CreatePackagePayload>) =>
    apiPut<ApiResponse<Package>>(`${BASE}/${id}`, payload),

  delete: (id: string) =>
    apiDelete<ApiResponse>(`${BASE}/${id}`),

  restore: (id: string) =>
    apiPost<ApiResponse>(`${BASE}/${id}/restore`),
};
