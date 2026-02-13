import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { packagesService } from "@/services/packages.service";
import type { CreatePackagePayload } from "@/types";

// ── Queries ─────────────────────────────────

export function usePackages(
  params?: Record<string, string | number | boolean | undefined>,
) {
  return useQuery({
    queryKey: queryKeys.packages.list(params),
    queryFn: () => packagesService.list(params),
  });
}

export function usePublicPackages() {
  return useQuery({
    queryKey: queryKeys.packages.public(),
    queryFn: () => packagesService.listPublic(),
    staleTime: 10 * 60 * 1000,
  });
}

export function usePackage(id: string) {
  return useQuery({
    queryKey: queryKeys.packages.detail(id),
    queryFn: () => packagesService.getById(id),
    enabled: !!id,
  });
}

export function usePackagesByProvider(provider: string) {
  return useQuery({
    queryKey: queryKeys.packages.byProvider(provider),
    queryFn: () => packagesService.getByProvider(provider),
    enabled: !!provider,
  });
}

export function usePackagesByCategory(category: string) {
  return useQuery({
    queryKey: queryKeys.packages.byCategory(category),
    queryFn: () => packagesService.getByCategory(category),
    enabled: !!category,
  });
}

export function usePackageStats() {
  return useQuery({
    queryKey: queryKeys.packages.stats(),
    queryFn: () => packagesService.getStats(),
  });
}

// ── Mutations ───────────────────────────────

export function useCreatePackage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePackagePayload) =>
      packagesService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.packages.root });
    },
  });
}

export function useUpdatePackage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreatePackagePayload>;
    }) => packagesService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.packages.root });
    },
  });
}

export function useDeletePackage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => packagesService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.packages.root });
    },
  });
}

export function useRestorePackage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => packagesService.restore(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.packages.root });
    },
  });
}
