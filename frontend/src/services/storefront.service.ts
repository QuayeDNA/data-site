import { apiGet, apiPost, apiPut, apiDelete, buildParams } from "@/lib/api";
import type {
  ApiResponse,
  Storefront,
  CreateStorefrontPayload,
  StorefrontOrder,
  StorefrontAnalytics,
  BundlePricing,
  PaginationParams,
  Bundle,
} from "@/types";

const BASE = "/storefront";

export const storefrontService = {
  // ── Public ──────────────────────────────
  getPublic: (businessName: string) =>
    apiGet<ApiResponse<Storefront>>(`${BASE}/${businessName}`),

  createPublicOrder: (
    businessName: string,
    payload: { items: unknown[]; customerInfo: unknown; paymentMethod: string },
  ) =>
    apiPost<ApiResponse>(`${BASE}/${businessName}/order`, payload),

  // ── Agent storefront management ─────────
  create: (payload: CreateStorefrontPayload) =>
    apiPost<ApiResponse<Storefront>>(`${BASE}/agent/storefront`, payload),

  getMine: () =>
    apiGet<ApiResponse<Storefront>>(`${BASE}/agent/storefront`),

  update: (payload: Partial<CreateStorefrontPayload>) =>
    apiPut<ApiResponse<Storefront>>(`${BASE}/agent/storefront`, payload),

  deactivate: () =>
    apiPut<ApiResponse>(`${BASE}/agent/storefront/deactivate`),

  reactivate: () =>
    apiPut<ApiResponse>(`${BASE}/agent/storefront/reactivate`),

  deleteMine: () =>
    apiDelete<ApiResponse>(`${BASE}/agent/storefront`),

  getBundles: () =>
    apiGet<ApiResponse<Bundle[]>>(`${BASE}/agent/storefront/bundles`),

  toggleBundles: (bundles: Array<{ bundleId: string; isEnabled: boolean }>) =>
    apiPut<ApiResponse>(`${BASE}/agent/storefront/bundles/toggle`, {
      bundles,
    }),

  getPricing: () =>
    apiGet<ApiResponse<BundlePricing[]>>(`${BASE}/agent/storefront/pricing`),

  setPricing: (pricing: BundlePricing[]) =>
    apiPost<ApiResponse>(`${BASE}/agent/storefront/pricing`, { pricing }),

  getOrders: (params?: PaginationParams & { status?: string }) =>
    apiGet<ApiResponse<StorefrontOrder[]>>(
      `${BASE}/agent/storefront/orders`,
      {
        params: params ? buildParams(params as Record<string, string | number | boolean | undefined>) : undefined,
      },
    ),

  verifyOrder: (orderId: string, notes?: string) =>
    apiPut<ApiResponse>(
      `${BASE}/agent/storefront/orders/${orderId}/verify`,
      { notes },
    ),

  rejectOrder: (orderId: string, reason: string) =>
    apiPut<ApiResponse>(
      `${BASE}/agent/storefront/orders/${orderId}/reject`,
      { reason },
    ),

  getAnalytics: (params?: { startDate?: string; endDate?: string }) =>
    apiGet<ApiResponse<StorefrontAnalytics>>(
      `${BASE}/agent/storefront/analytics`,
      { params: params ? buildParams(params as Record<string, string | number | boolean | undefined>) : undefined },
    ),

  // ── Admin ───────────────────────────────
  adminList: (
    params?: PaginationParams & { status?: string; search?: string },
  ) =>
    apiGet<ApiResponse<Storefront[]>>(`${BASE}/admin/storefronts`, {
      params: params ? buildParams(params as Record<string, string | number | boolean | undefined>) : undefined,
    }),

  adminStats: () =>
    apiGet<ApiResponse>(`${BASE}/admin/stats`),

  adminApprove: (storefrontId: string) =>
    apiPut<ApiResponse>(
      `${BASE}/admin/storefronts/${storefrontId}/approve`,
    ),

  adminSuspend: (storefrontId: string, reason?: string) =>
    apiPut<ApiResponse>(
      `${BASE}/admin/storefronts/${storefrontId}/suspend`,
      { reason },
    ),

  adminUnsuspend: (storefrontId: string) =>
    apiPut<ApiResponse>(
      `${BASE}/admin/storefronts/${storefrontId}/unsuspend`,
    ),

  adminDelete: (storefrontId: string, reason?: string) =>
    apiDelete<ApiResponse>(
      `${BASE}/admin/storefronts/${storefrontId}`,
      { data: { reason } },
    ),

  adminToggleAutoApprove: (enabled: boolean) =>
    apiPut<ApiResponse>(`${BASE}/admin/settings/auto-approve`, {
      enabled,
    }),
};
