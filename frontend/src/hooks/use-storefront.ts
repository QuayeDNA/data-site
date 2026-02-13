import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { storefrontService } from "@/services/storefront.service";
import type {
  CreateStorefrontPayload,
  BundlePricing,
  PaginationParams,
} from "@/types";

// ── Public Queries ──────────────────────────

export function usePublicStorefront(businessName: string) {
  return useQuery({
    queryKey: queryKeys.storefront.public(businessName),
    queryFn: () => storefrontService.getPublic(businessName),
    enabled: !!businessName,
  });
}

// ── Agent Storefront Queries ────────────────

export function useMyStorefront() {
  return useQuery({
    queryKey: queryKeys.storefront.mine(),
    queryFn: () => storefrontService.getMine(),
  });
}

export function useStorefrontBundles() {
  return useQuery({
    queryKey: queryKeys.storefront.bundles(),
    queryFn: () => storefrontService.getBundles(),
  });
}

export function useStorefrontPricing() {
  return useQuery({
    queryKey: queryKeys.storefront.pricing(),
    queryFn: () => storefrontService.getPricing(),
  });
}

export function useStorefrontOrders(
  params?: PaginationParams & { status?: string },
) {
  return useQuery({
    queryKey: queryKeys.storefront.orders(params),
    queryFn: () => storefrontService.getOrders(params),
  });
}

export function useStorefrontAnalytics(params?: {
  startDate?: string;
  endDate?: string;
}) {
  return useQuery({
    queryKey: queryKeys.storefront.analytics(params),
    queryFn: () => storefrontService.getAnalytics(params),
  });
}

// ── Admin Queries ───────────────────────────

export function useAdminStorefronts(
  params?: PaginationParams & { status?: string; search?: string },
) {
  return useQuery({
    queryKey: queryKeys.storefront.adminList(params),
    queryFn: () => storefrontService.adminList(params),
  });
}

export function useAdminStorefrontStats() {
  return useQuery({
    queryKey: queryKeys.storefront.adminStats(),
    queryFn: () => storefrontService.adminStats(),
  });
}

// ── Agent Mutations ─────────────────────────

export function useCreateStorefront() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateStorefrontPayload) =>
      storefrontService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.storefront.root });
    },
  });
}

export function useUpdateStorefront() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<CreateStorefrontPayload>) =>
      storefrontService.update(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.storefront.mine() });
    },
  });
}

export function useDeactivateStorefront() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => storefrontService.deactivate(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.storefront.mine() });
    },
  });
}

export function useReactivateStorefront() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => storefrontService.reactivate(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.storefront.mine() });
    },
  });
}

export function useSetStorefrontPricing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (pricing: BundlePricing[]) =>
      storefrontService.setPricing(pricing),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.storefront.pricing() });
    },
  });
}

export function useVerifyStorefrontOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      orderId,
      notes,
    }: {
      orderId: string;
      notes?: string;
    }) => storefrontService.verifyOrder(orderId, notes),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.storefront.orders() });
      qc.invalidateQueries({ queryKey: queryKeys.wallet.info() });
    },
  });
}

export function useRejectStorefrontOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      orderId,
      reason,
    }: {
      orderId: string;
      reason: string;
    }) => storefrontService.rejectOrder(orderId, reason),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.storefront.orders() });
    },
  });
}

// ── Admin Mutations ─────────────────────────

export function useApproveStorefront() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (storefrontId: string) =>
      storefrontService.adminApprove(storefrontId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.storefront.root });
    },
  });
}

export function useSuspendStorefront() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      storefrontId,
      reason,
    }: {
      storefrontId: string;
      reason?: string;
    }) => storefrontService.adminSuspend(storefrontId, reason),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.storefront.root });
    },
  });
}

export function useAdminDeleteStorefront() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      storefrontId,
      reason,
    }: {
      storefrontId: string;
      reason?: string;
    }) => storefrontService.adminDelete(storefrontId, reason),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.storefront.root });
    },
  });
}
