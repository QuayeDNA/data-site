import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { commissionsService } from "@/services/commissions.service";
import type { CommissionSettings, PaginationParams } from "@/types";

// ── Queries ─────────────────────────────────

export function useCommissionSettings() {
  return useQuery({
    queryKey: queryKeys.commissions.settings(),
    queryFn: () => commissionsService.getSettings(),
  });
}

export function useAgentCommissions() {
  return useQuery({
    queryKey: queryKeys.commissions.agent(),
    queryFn: () => commissionsService.getAgentCommissions(),
  });
}

export function useCommissions(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.commissions.list(params),
    queryFn: () => commissionsService.list(params),
  });
}

export function useCommissionMonthlySummariesAgent() {
  return useQuery({
    queryKey: queryKeys.commissions.monthlySummariesAgent(),
    queryFn: () => commissionsService.getMonthlySummariesAgent(),
  });
}

export function useCommissionMonthlySummaries() {
  return useQuery({
    queryKey: queryKeys.commissions.monthlySummaries(),
    queryFn: () => commissionsService.getMonthlySummaries(),
  });
}

export function useCurrentMonthCommissionStats() {
  return useQuery({
    queryKey: queryKeys.commissions.currentMonthStats(),
    queryFn: () => commissionsService.getCurrentMonthStats(),
  });
}

export function useCommissionStatistics() {
  return useQuery({
    queryKey: queryKeys.commissions.statistics(),
    queryFn: () => commissionsService.getStatistics(),
  });
}

// ── Mutations ───────────────────────────────

export function useUpdateCommissionSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<CommissionSettings>) =>
      commissionsService.updateSettings(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.commissions.settings() });
    },
  });
}

export function usePayCommission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (commissionId: string) =>
      commissionsService.pay(commissionId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.commissions.root });
    },
  });
}

export function usePayMultipleCommissions() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (commissionIds: string[]) =>
      commissionsService.payMultiple(commissionIds),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.commissions.root });
    },
  });
}

export function useRejectCommission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (commissionId: string) =>
      commissionsService.reject(commissionId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.commissions.root });
    },
  });
}

export function useGenerateMonthlyCommissions() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => commissionsService.generateMonthly(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.commissions.root });
    },
  });
}
