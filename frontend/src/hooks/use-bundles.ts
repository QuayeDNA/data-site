import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { bundlesService } from "@/services/bundles.service";
import type { CreateBundlePayload, BundlePricing } from "@/types";

// ── Queries ─────────────────────────────────

export function useBundles(
  params?: Record<string, string | number | boolean | undefined>,
) {
  return useQuery({
    queryKey: queryKeys.bundles.list(params),
    queryFn: () => bundlesService.list(params),
  });
}

export function useBundle(id: string) {
  return useQuery({
    queryKey: queryKeys.bundles.detail(id),
    queryFn: () => bundlesService.getById(id),
    enabled: !!id,
  });
}

export function useBundlesByProvider(providerId: string) {
  return useQuery({
    queryKey: queryKeys.bundles.byProvider(providerId),
    queryFn: () => bundlesService.getByProvider(providerId),
    enabled: !!providerId,
  });
}

export function useBundlesByPackage(packageId: string) {
  return useQuery({
    queryKey: queryKeys.bundles.byPackage(packageId),
    queryFn: () => bundlesService.getByPackage(packageId),
    enabled: !!packageId,
  });
}

export function useBundleAnalytics() {
  return useQuery({
    queryKey: queryKeys.bundles.analytics(),
    queryFn: () => bundlesService.analyticsOverview(),
  });
}

export function useBundlePricing(id: string) {
  return useQuery({
    queryKey: queryKeys.bundles.pricing(id),
    queryFn: () => bundlesService.getPricing(id),
    enabled: !!id,
  });
}

// ── Mutations ───────────────────────────────

export function useCreateBundle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateBundlePayload) =>
      bundlesService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.bundles.root });
    },
  });
}

export function useUpdateBundle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateBundlePayload>;
    }) => bundlesService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.bundles.root });
    },
  });
}

export function useDeleteBundle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bundlesService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.bundles.root });
    },
  });
}

export function useBulkCreateBundles() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (bundles: CreateBundlePayload[]) =>
      bundlesService.bulkCreate(bundles),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.bundles.root });
    },
  });
}

export function useUpdateBundlePricing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: BundlePricing }) =>
      bundlesService.updatePricing(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.bundles.root });
    },
  });
}

export function useBulkUpdatePricing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (pricing: BundlePricing[]) =>
      bundlesService.bulkUpdatePricing(pricing),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.bundles.root });
    },
  });
}
