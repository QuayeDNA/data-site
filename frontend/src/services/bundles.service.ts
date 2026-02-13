import { apiGet, apiPost, apiPut, apiDelete, buildParams } from "@/lib/api";
import type {
  ApiResponse,
  Bundle,
  CreateBundlePayload,
  BundlePricing,
} from "@/types";

const BASE = "/bundles";

export const bundlesService = {
  // ── Public ──────────────────────────────
  list: (params?: Record<string, string | number | boolean | undefined>) =>
    apiGet<ApiResponse<Bundle[]>>(BASE, {
      params: params ? buildParams(params) : undefined,
    }),

  getById: (id: string) =>
    apiGet<ApiResponse<Bundle>>(`${BASE}/${id}`),

  getByProvider: (providerId: string) =>
    apiGet<ApiResponse<Bundle[]>>(`${BASE}/provider/${providerId}`),

  getByPackage: (packageId: string) =>
    apiGet<ApiResponse<Bundle[]>>(`${BASE}/package/${packageId}`),

  // ── Authenticated ───────────────────────
  create: (payload: CreateBundlePayload) =>
    apiPost<ApiResponse<Bundle>>(BASE, payload),

  update: (id: string, payload: Partial<CreateBundlePayload>) =>
    apiPut<ApiResponse<Bundle>>(`${BASE}/${id}`, payload),

  delete: (id: string) =>
    apiDelete<ApiResponse>(`${BASE}/${id}`),

  bulkCreate: (bundles: CreateBundlePayload[]) =>
    apiPost<ApiResponse>(`${BASE}/bulk`, { bundles }),

  bulkUpdate: (bundles: Array<Partial<CreateBundlePayload> & { _id: string }>) =>
    apiPut<ApiResponse>(`${BASE}/bulk/update`, { bundles }),

  bulkDelete: (bundleIds: string[]) =>
    apiDelete<ApiResponse>(`${BASE}/bulk/delete`, {
      data: { bundleIds },
    }),

  // ── Analytics ───────────────────────────
  analyticsOverview: () =>
    apiGet<ApiResponse>(`${BASE}/analytics/overview`),

  analyticsProvider: (providerId: string) =>
    apiGet<ApiResponse>(`${BASE}/analytics/provider/${providerId}`),

  // ── Pricing (admin) ───────────────
  getPricing: (id: string) =>
    apiGet<ApiResponse>(`${BASE}/${id}/pricing`),

  updatePricing: (id: string, data: BundlePricing) =>
    apiPut<ApiResponse>(`${BASE}/${id}/pricing`, data),

  bulkUpdatePricing: (pricing: BundlePricing[]) =>
    apiPost<ApiResponse>(`${BASE}/pricing/bulk-update`, { pricing }),
};
