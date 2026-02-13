import { apiGet, apiPut, apiPost } from "@/lib/api";
import type {
  ApiResponse,
  SiteSettings,
  ApiSettings,
  SystemInfo,
  WalletSettings,
  CommissionSettings,
} from "@/types";

const BASE = "/settings";

export const settingsService = {
  // ── Public ──────────────────────────────
  getSiteStatus: () =>
    apiGet<ApiResponse<{ isActive: boolean }>>(`${BASE}/site/status`),

  getSignupApproval: () =>
    apiGet<ApiResponse<{ requireApprovalForSignup: boolean }>>(`${BASE}/signup-approval`),

  // ── Authenticated ───────────────────────
  getWalletSettings: () =>
    apiGet<ApiResponse<WalletSettings>>(`${BASE}/wallet`),

  // ── Admin ───────────────────────────────
  getSiteSettings: () =>
    apiGet<ApiResponse<SiteSettings>>(`${BASE}/site`),

  updateSiteSettings: (data: Partial<SiteSettings>) =>
    apiPut<ApiResponse>(`${BASE}/site`, data),

  toggleSite: () =>
    apiPost<ApiResponse>(`${BASE}/site/toggle`),

  updateSignupApproval: (requireApprovalForSignup: boolean) =>
    apiPut<ApiResponse>(`${BASE}/signup-approval`, { requireApprovalForSignup }),

  getStorefrontAutoApprove: () =>
    apiGet<ApiResponse<{ autoApproveStorefronts: boolean }>>(
      `${BASE}/storefront-auto-approve`,
    ),

  updateStorefrontAutoApprove: (autoApproveStorefronts: boolean) =>
    apiPut<ApiResponse>(`${BASE}/storefront-auto-approve`, { autoApproveStorefronts }),

  getCommissionSettings: () =>
    apiGet<ApiResponse<CommissionSettings>>(`${BASE}/commission`),

  updateCommissionSettings: (data: Partial<CommissionSettings>) =>
    apiPut<ApiResponse>(`${BASE}/commission`, data),

  getApiSettings: () =>
    apiGet<ApiResponse<ApiSettings>>(`${BASE}/api`),

  updateApiSettings: (data: Partial<ApiSettings>) =>
    apiPut<ApiResponse>(`${BASE}/api`, data),

  resetUserPassword: (userId: string) =>
    apiPost<ApiResponse>(`${BASE}/users/reset-password`, { userId }),

  changeUserRole: (userId: string, role: string) =>
    apiPost<ApiResponse>(`${BASE}/users/change-role`, { userId, role }),

  getSystemInfo: () =>
    apiGet<ApiResponse<SystemInfo>>(`${BASE}/system`),

  changeAdminPassword: (currentPassword: string, newPassword: string) =>
    apiPost<ApiResponse>(`${BASE}/admin/change-password`, {
      currentPassword,
      newPassword,
    }),

  updateWalletSettings: (data: Partial<WalletSettings>) =>
    apiPut<ApiResponse>(`${BASE}/wallet`, data),
};
