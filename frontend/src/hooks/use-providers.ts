import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { providersService } from "@/services/providers.service";
import type { CreateProviderPayload } from "@/types";

// ── Queries ─────────────────────────────────

export function useProviders() {
  return useQuery({
    queryKey: queryKeys.providers.list(),
    queryFn: () => providersService.list(),
  });
}

export function usePublicProviders() {
  return useQuery({
    queryKey: queryKeys.providers.public(),
    queryFn: () => providersService.getPublic(),
    staleTime: 10 * 60 * 1000, // providers rarely change
  });
}

export function useProvider(id: string) {
  return useQuery({
    queryKey: queryKeys.providers.detail(id),
    queryFn: () => providersService.getById(id),
    enabled: !!id,
  });
}

export function useProviderAnalytics() {
  return useQuery({
    queryKey: queryKeys.providers.analytics(),
    queryFn: () => providersService.getAnalytics(),
  });
}

// ── Mutations ───────────────────────────────

export function useCreateProvider() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProviderPayload) =>
      providersService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.providers.root });
    },
  });
}

export function useUpdateProvider() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateProviderPayload>;
    }) => providersService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.providers.root });
    },
  });
}

export function useDeleteProvider() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => providersService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.providers.root });
    },
  });
}

export function useRestoreProvider() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => providersService.restore(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.providers.root });
    },
  });
}
