import { apiGet, buildParams } from "@/lib/api";
import type {
  ApiResponse,
  AnalyticsSummary,
  AnalyticsCharts,
  RealtimeMetrics,
  TimeframeParam,
} from "@/types";

const BASE = "/analytics";

export const analyticsService = {
  getAdmin: (params?: TimeframeParam) =>
    apiGet<ApiResponse<AnalyticsSummary>>(`${BASE}/admin`, {
      params: params ? buildParams(params as Record<string, string | number | boolean | undefined>) : undefined,
    }),

  getAgent: (params?: TimeframeParam) =>
    apiGet<ApiResponse>(`${BASE}/agent`, {
      params: params ? buildParams(params as Record<string, string | number | boolean | undefined>) : undefined,
    }),

  getSummary: (params?: TimeframeParam) =>
    apiGet<ApiResponse<AnalyticsSummary>>(`${BASE}/summary`, {
      params: params ? buildParams(params as Record<string, string | number | boolean | undefined>) : undefined,
    }),

  getCharts: (params?: TimeframeParam) =>
    apiGet<ApiResponse<AnalyticsCharts>>(`${BASE}/charts`, {
      params: params ? buildParams(params as Record<string, string | number | boolean | undefined>) : undefined,
    }),

  getRealtime: () =>
    apiGet<ApiResponse<RealtimeMetrics>>(`${BASE}/realtime`),
};
