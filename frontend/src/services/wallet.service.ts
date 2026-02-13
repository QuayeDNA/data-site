import { apiGet, apiPost, buildParams } from "@/lib/api";
import type {
  ApiResponse,
  WalletInfo,
  WalletTransaction,
  PaginatedResponse,
  TransactionFilters,
  RequestTopUpPayload,
  AdminTopUpPayload,
  ProcessTopUpPayload,
  WalletSettings,
} from "@/types";

const BASE = "/wallet";

export const walletService = {
  // ── User wallet ─────────────────────────
  getInfo: () =>
    apiGet<ApiResponse<WalletInfo>>(`${BASE}/info`),

  getTransactions: (filters?: TransactionFilters) =>
    apiGet<PaginatedResponse<WalletTransaction>>(`${BASE}/transactions`, {
      params: filters ? buildParams(filters as Record<string, string | number | boolean | undefined>) : undefined,
    }),

  checkPendingTopUp: () =>
    apiGet<ApiResponse>(`${BASE}/check-pending-topup`),

  requestTopUp: (payload: RequestTopUpPayload) =>
    apiPost<ApiResponse<WalletTransaction>>(
      `${BASE}/request-top-up`,
      payload,
    ),

  // ── Admin ───────────────────────────────
  topUp: (payload: AdminTopUpPayload) =>
    apiPost<ApiResponse>(`${BASE}/top-up`, payload),

  debit: (payload: AdminTopUpPayload) =>
    apiPost<ApiResponse>(`${BASE}/debit`, payload),

  getPendingRequests: () =>
    apiGet<ApiResponse<WalletTransaction[]>>(`${BASE}/pending-requests`),

  processRequest: (transactionId: string, payload: ProcessTopUpPayload) =>
    apiPost<ApiResponse>(
      `${BASE}/requests/${transactionId}/process`,
      payload,
    ),

  getAnalytics: () =>
    apiGet<ApiResponse>(`${BASE}/analytics`),

  getAdminTransactions: () =>
    apiGet<ApiResponse<WalletTransaction[]>>(`${BASE}/admin-transactions`),

  // ── Settings ────────────────────────────
  getSettings: () =>
    apiGet<ApiResponse<WalletSettings>>("/settings/wallet"),
};
