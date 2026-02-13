import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";
import type {
  ApiResponse,
  Provider,
  CreateProviderPayload,
} from "@/types";

const BASE = "/providers";

export const providersService = {
  // ── Public ──────────────────────────────
  getPublic: () =>
    apiGet<ApiResponse<Provider[]>>(`${BASE}/public`),

  // ── Authenticated ───────────────────────
  list: () =>
    apiGet<ApiResponse<Provider[]>>(BASE),

  getById: (id: string) =>
    apiGet<ApiResponse<Provider>>(`${BASE}/${id}`),

  getAnalytics: () =>
    apiGet<ApiResponse>(`${BASE}/analytics`),

  // ── Admin ───────────────────────────────
  create: (payload: CreateProviderPayload) =>
    apiPost<ApiResponse<Provider>>(BASE, payload),

  update: (id: string, payload: Partial<CreateProviderPayload>) =>
    apiPut<ApiResponse<Provider>>(`${BASE}/${id}`, payload),

  delete: (id: string) =>
    apiDelete<ApiResponse>(`${BASE}/${id}`),

  restore: (id: string) =>
    apiPost<ApiResponse>(`${BASE}/${id}/restore`),
};
