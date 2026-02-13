import { apiGet, apiPost, apiPatch, apiDelete, apiPut, buildParams } from "@/lib/api";
import type {
  ApiResponse,
  PaginatedResponse,
  User,
  UserFilters,
} from "@/types";

const BASE = "/users";

export const usersService = {
  // ── Profile ─────────────────────────────
  getProfile: () => apiGet<ApiResponse<User>>(`${BASE}/profile`),

  updateProfile: (data: Partial<User>) =>
    apiPut<ApiResponse<User>>(`${BASE}/profile`, data),

  changePassword: (currentPassword: string, newPassword: string) =>
    apiPost<ApiResponse>(`${BASE}/change-password`, {
      currentPassword,
      newPassword,
    }),

  // ── AFA ─────────────────────────────────
  afaRegister: (data: Record<string, unknown>) =>
    apiPost<ApiResponse>(`${BASE}/afa-registration`, data),

  getAfaRegistration: () =>
    apiGet<ApiResponse>(`${BASE}/afa-registration`),

  getAfaBundles: () =>
    apiGet<ApiResponse>(`${BASE}/afa-bundles`),

  // ── List / Admin ────────────────────────
  list: (filters?: UserFilters) =>
    apiGet<PaginatedResponse<User>>(BASE, {
      params: filters ? buildParams(filters as Record<string, string | number | boolean | undefined>) : undefined,
    }),

  getUsersWithWallet: () =>
    apiGet<ApiResponse<User[]>>(`${BASE}/with-wallet`),

  getStats: () => apiGet<ApiResponse>(`${BASE}/stats`),

  getDashboardStats: () =>
    apiGet<ApiResponse>(`${BASE}/dashboard-stats`),

  getChartData: () =>
    apiGet<ApiResponse>(`${BASE}/chart-data`),

  getById: (id: string) =>
    apiGet<ApiResponse<User>>(`${BASE}/${id}`),

  updateStatus: (id: string, status: string) =>
    apiPut<ApiResponse>(`${BASE}/${id}/status`, { status }),

  deleteUser: (id: string) =>
    apiDelete<ApiResponse>(`${BASE}/${id}`),

  // ── admin user management (via auth routes) ──
  listAll: (filters?: UserFilters) =>
    apiGet<PaginatedResponse<User>>("/auth/users", {
      params: filters ? buildParams(filters as Record<string, string | number | boolean | undefined>) : undefined,
    }),

  getByIdAdmin: (id: string) =>
    apiGet<ApiResponse<User>>(`/auth/users/${id}`),

  updateUserAdmin: (id: string, data: Partial<User>) =>
    apiPatch<ApiResponse<User>>(`/auth/users/${id}`, data),

  updateAgentStatus: (id: string, status: string) =>
    apiPatch<ApiResponse>(`/auth/users/${id}/status`, { status }),

  resetUserPassword: (id: string) =>
    apiPost<ApiResponse>(`/auth/users/${id}/reset-password`),

  deleteUserAdmin: (id: string) =>
    apiDelete<ApiResponse>(`/auth/users/${id}`),

  impersonate: (id: string) =>
    apiPost<ApiResponse<{ accessToken: string; refreshToken: string }>>(
      `/auth/users/${id}/impersonate`,
    ),

  getAgentDashboard: () =>
    apiGet<ApiResponse>("/auth/agent/dashboard"),
};
