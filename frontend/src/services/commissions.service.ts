import { apiGet, apiPut, apiPost, buildParams } from "@/lib/api";
import type {
  ApiResponse,
  CommissionRecord,
  CommissionSettings,
  CommissionMonthlySummary,
  PaginationParams,
} from "@/types";

const BASE = "/commissions";

export const commissionsService = {
  // ── Settings ────────────────────────────
  getSettings: () =>
    apiGet<ApiResponse<CommissionSettings>>(`${BASE}/settings`),

  updateSettings: (data: Partial<CommissionSettings>) =>
    apiPut<ApiResponse>(`${BASE}/settings`, data),

  // ── Agent ───────────────────────────────
  getAgentCommissions: () =>
    apiGet<ApiResponse<CommissionRecord[]>>(`${BASE}/agent`),

  getMonthlySummariesAgent: () =>
    apiGet<ApiResponse<CommissionMonthlySummary[]>>(
      `${BASE}/monthly-summaries/agent`,
    ),

  getCurrentMonthStats: () =>
    apiGet<ApiResponse>(`${BASE}/current-month-stats`),

  getStatistics: () =>
    apiGet<ApiResponse>(`${BASE}/statistics`),

  // ── Admin ───────────────────────────────
  list: (params?: PaginationParams) =>
    apiGet<ApiResponse<CommissionRecord[]>>(BASE, {
      params: params ? buildParams(params as Record<string, string | number | boolean | undefined>) : undefined,
    }),

  getMonthlySummaries: () =>
    apiGet<ApiResponse<CommissionMonthlySummary[]>>(
      `${BASE}/monthly-summaries`,
    ),

  calculate: (data: Record<string, unknown>) =>
    apiPost<ApiResponse>(`${BASE}/calculate`, data),

  createRecord: (data: Record<string, unknown>) =>
    apiPost<ApiResponse>(`${BASE}/records`, data),

  pay: (commissionId: string) =>
    apiPut<ApiResponse>(`${BASE}/${commissionId}/pay`),

  payMultiple: (commissionIds: string[]) =>
    apiPut<ApiResponse>(`${BASE}/pay-multiple`, { commissionIds }),

  reject: (commissionId: string) =>
    apiPut<ApiResponse>(`${BASE}/${commissionId}/reject`),

  rejectMultiple: (commissionIds: string[]) =>
    apiPut<ApiResponse>(`${BASE}/reject-multiple`, { commissionIds }),

  generateMonthly: () =>
    apiPost<ApiResponse>(`${BASE}/generate-monthly`),

  generateDaily: () =>
    apiPost<ApiResponse>(`${BASE}/generate-daily`),

  resetMonthly: () =>
    apiPost<ApiResponse>(`${BASE}/reset-monthly`),

  manualReset: () =>
    apiPost<ApiResponse>(`${BASE}/manual-reset`),

  expireOld: () =>
    apiPost<ApiResponse>(`${BASE}/expire-old`),

  archiveMonth: () =>
    apiPost<ApiResponse>(`${BASE}/archive-month`),
};
