import { apiGet, apiPost, apiPatch, buildParams } from "@/lib/api";
import type {
  ApiResponse,
  PaginatedResponse,
  Order,
  OrderFilters,
  OrderAnalyticsSummary,
  CreateSingleOrderPayload,
  CreateBulkOrderPayload,
  PaginationParams,
} from "@/types";

const BASE = "/orders";

export const ordersService = {
  // ── CRUD / Queries ──────────────────────
  list: (filters?: OrderFilters) =>
    apiGet<PaginatedResponse<Order>>(BASE, {
      params: filters ? buildParams(filters as Record<string, string | number | boolean | undefined>) : undefined,
    }),

  getById: (id: string) =>
    apiGet<ApiResponse<Order>>(`${BASE}/${id}`),

  getReported: (filters?: PaginationParams) =>
    apiGet<PaginatedResponse<Order>>(`${BASE}/reported`, {
      params: filters ? buildParams(filters as Record<string, string | number | boolean | undefined>) : undefined,
    }),

  // ── Create ──────────────────────────────
  createSingle: (payload: CreateSingleOrderPayload) =>
    apiPost<ApiResponse<Order>>(`${BASE}/single`, payload),

  createBulk: (payload: CreateBulkOrderPayload) =>
    apiPost<ApiResponse<Order>>(`${BASE}/bulk`, payload),

  // ── Processing ──────────────────────────
  processItem: (orderId: string, itemId: string, data?: Record<string, unknown>) =>
    apiPost<ApiResponse>(`${BASE}/${orderId}/items/${itemId}/process`, data),

  processBulkOrder: (id: string, data?: Record<string, unknown>) =>
    apiPost<ApiResponse>(`${BASE}/${id}/process-bulk`, data),

  bulkProcess: (orderIds: string[]) =>
    apiPost<ApiResponse>(`${BASE}/bulk-process`, { orderIds }),

  bulkReceptionStatus: (orderIds: string[], receptionStatus: string) =>
    apiPost<ApiResponse>(`${BASE}/bulk-reception-status`, {
      orderIds,
      receptionStatus,
    }),

  // ── Status Updates ──────────────────────
  cancel: (id: string, reason: string) =>
    apiPost<ApiResponse>(`${BASE}/${id}/cancel`, { reason }),

  report: (id: string, reason: string) =>
    apiPost<ApiResponse>(`${BASE}/${id}/report`, { reason }),

  updateStatus: (id: string, status: string) =>
    apiPatch<ApiResponse>(`${BASE}/${id}/status`, { status }),

  updateReceptionStatus: (id: string, receptionStatus: string) =>
    apiPatch<ApiResponse>(`${BASE}/${id}/reception-status`, {
      receptionStatus,
    }),

  // ── Drafts ──────────────────────────────
  processDrafts: () =>
    apiPost<ApiResponse>(`${BASE}/process-drafts`),

  processDraft: (orderId: string) =>
    apiPost<ApiResponse>(`${BASE}/process-draft/${orderId}`),

  // ── Analytics ───────────────────────────
  analyticsSummary: (filters?: Record<string, string>) =>
    apiGet<ApiResponse<OrderAnalyticsSummary>>(
      `${BASE}/analytics/summary`,
      { params: filters },
    ),

  analyticsAgent: () =>
    apiGet<ApiResponse>(`${BASE}/analytics/agent`),

  monthlyRevenue: () =>
    apiGet<ApiResponse>(`${BASE}/analytics/monthly-revenue`),

  dailySpending: () =>
    apiGet<ApiResponse>(`${BASE}/analytics/daily-spending`),
};
