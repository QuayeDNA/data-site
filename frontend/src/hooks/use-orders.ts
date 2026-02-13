import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { ordersService } from "@/services/orders.service";
import type {
  OrderFilters,
  CreateSingleOrderPayload,
  CreateBulkOrderPayload,
  PaginationParams,
} from "@/types";

// ── Queries ─────────────────────────────────

export function useOrders(filters?: OrderFilters) {
  return useQuery({
    queryKey: queryKeys.orders.list(filters),
    queryFn: () => ordersService.list(filters),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => ordersService.getById(id),
    enabled: !!id,
  });
}

export function useReportedOrders(filters?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.orders.reported(filters),
    queryFn: () => ordersService.getReported(filters),
  });
}

export function useOrderAnalyticsSummary(
  filters?: Record<string, string>,
) {
  return useQuery({
    queryKey: queryKeys.orders.analyticsSummary(filters),
    queryFn: () => ordersService.analyticsSummary(filters),
  });
}

export function useOrderAnalyticsAgent() {
  return useQuery({
    queryKey: queryKeys.orders.analyticsAgent(),
    queryFn: () => ordersService.analyticsAgent(),
  });
}

export function useMonthlyRevenue() {
  return useQuery({
    queryKey: queryKeys.orders.monthlyRevenue(),
    queryFn: () => ordersService.monthlyRevenue(),
  });
}

export function useDailySpending() {
  return useQuery({
    queryKey: queryKeys.orders.dailySpending(),
    queryFn: () => ordersService.dailySpending(),
  });
}

// ── Mutations ───────────────────────────────

export function useCreateSingleOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSingleOrderPayload) =>
      ordersService.createSingle(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.orders.root });
      qc.invalidateQueries({ queryKey: queryKeys.wallet.info() });
    },
  });
}

export function useCreateBulkOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateBulkOrderPayload) =>
      ordersService.createBulk(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.orders.root });
      qc.invalidateQueries({ queryKey: queryKeys.wallet.info() });
    },
  });
}

export function useCancelOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      ordersService.cancel(id, reason),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.orders.root });
    },
  });
}

export function useReportOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      ordersService.report(id, reason),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.orders.root });
    },
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      ordersService.updateStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.orders.root });
    },
  });
}

export function useBulkProcessOrders() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (orderIds: string[]) =>
      ordersService.bulkProcess(orderIds),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.orders.root });
    },
  });
}

export function useProcessDrafts() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => ordersService.processDrafts(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.orders.root });
      qc.invalidateQueries({ queryKey: queryKeys.wallet.info() });
    },
  });
}
