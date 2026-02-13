import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { walletService } from "@/services/wallet.service";
import type {
  TransactionFilters,
  RequestTopUpPayload,
  AdminTopUpPayload,
  ProcessTopUpPayload,
} from "@/types";

// ── Queries ─────────────────────────────────

export function useWalletInfo() {
  return useQuery({
    queryKey: queryKeys.wallet.info(),
    queryFn: () => walletService.getInfo(),
  });
}

export function useWalletTransactions(filters?: TransactionFilters) {
  return useQuery({
    queryKey: queryKeys.wallet.transactions(filters),
    queryFn: () => walletService.getTransactions(filters),
  });
}

export function useCheckPendingTopUp() {
  return useQuery({
    queryKey: queryKeys.wallet.checkPending(),
    queryFn: () => walletService.checkPendingTopUp(),
  });
}

export function usePendingWalletRequests() {
  return useQuery({
    queryKey: queryKeys.wallet.pendingRequests(),
    queryFn: () => walletService.getPendingRequests(),
  });
}

export function useWalletAnalytics() {
  return useQuery({
    queryKey: queryKeys.wallet.analytics(),
    queryFn: () => walletService.getAnalytics(),
  });
}

export function useAdminTransactions() {
  return useQuery({
    queryKey: queryKeys.wallet.adminTransactions(),
    queryFn: () => walletService.getAdminTransactions(),
  });
}

export function useWalletSettings() {
  return useQuery({
    queryKey: queryKeys.settings.wallet(),
    queryFn: () => walletService.getSettings(),
  });
}

// ── Mutations ───────────────────────────────

export function useRequestTopUp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: RequestTopUpPayload) =>
      walletService.requestTopUp(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.wallet.root });
    },
  });
}

export function useAdminTopUp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: AdminTopUpPayload) =>
      walletService.topUp(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.wallet.root });
      qc.invalidateQueries({ queryKey: queryKeys.users.root });
    },
  });
}

export function useAdminDebit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: AdminTopUpPayload) =>
      walletService.debit(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.wallet.root });
      qc.invalidateQueries({ queryKey: queryKeys.users.root });
    },
  });
}

export function useProcessTopUpRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      transactionId,
      payload,
    }: {
      transactionId: string;
      payload: ProcessTopUpPayload;
    }) => walletService.processRequest(transactionId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.wallet.root });
    },
  });
}
