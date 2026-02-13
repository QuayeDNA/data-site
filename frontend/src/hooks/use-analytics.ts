import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { analyticsService } from "@/services/analytics.service";
import type { TimeframeParam } from "@/types";

export function useAdminAnalytics(params?: TimeframeParam) {
  return useQuery({
    queryKey: queryKeys.analytics.admin(params),
    queryFn: () => analyticsService.getAdmin(params),
  });
}

export function useAgentAnalytics(params?: TimeframeParam) {
  return useQuery({
    queryKey: queryKeys.analytics.agent(params),
    queryFn: () => analyticsService.getAgent(params),
  });
}

export function useAnalyticsSummary(params?: TimeframeParam) {
  return useQuery({
    queryKey: queryKeys.analytics.summary(params),
    queryFn: () => analyticsService.getSummary(params),
  });
}

export function useAnalyticsCharts(params?: TimeframeParam) {
  return useQuery({
    queryKey: queryKeys.analytics.charts(params),
    queryFn: () => analyticsService.getCharts(params),
  });
}

export function useRealtimeMetrics() {
  return useQuery({
    queryKey: queryKeys.analytics.realtime(),
    queryFn: () => analyticsService.getRealtime(),
    refetchInterval: 15_000, // poll every 15s for real-time feel
  });
}
