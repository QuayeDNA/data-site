import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { settingsService } from "@/services/settings.service";
import type {
  SiteSettings,
  ApiSettings,
  WalletSettings,
  CommissionSettings,
} from "@/types";

// ── Queries ─────────────────────────────────

export function useSiteStatus() {
  return useQuery({
    queryKey: queryKeys.settings.siteStatus(),
    queryFn: () => settingsService.getSiteStatus(),
    staleTime: 60_000,
  });
}

export function useSiteSettings() {
  return useQuery({
    queryKey: queryKeys.settings.site(),
    queryFn: () => settingsService.getSiteSettings(),
  });
}

export function useSignupApproval() {
  return useQuery({
    queryKey: queryKeys.settings.signupApproval(),
    queryFn: () => settingsService.getSignupApproval(),
  });
}

export function useStorefrontAutoApprove() {
  return useQuery({
    queryKey: queryKeys.settings.storefrontAutoApprove(),
    queryFn: () => settingsService.getStorefrontAutoApprove(),
  });
}

export function useSettingsCommission() {
  return useQuery({
    queryKey: queryKeys.settings.commission(),
    queryFn: () => settingsService.getCommissionSettings(),
  });
}

export function useApiSettingsQuery() {
  return useQuery({
    queryKey: queryKeys.settings.api(),
    queryFn: () => settingsService.getApiSettings(),
  });
}

export function useSystemInfo() {
  return useQuery({
    queryKey: queryKeys.settings.system(),
    queryFn: () => settingsService.getSystemInfo(),
  });
}

// ── Mutations ───────────────────────────────

export function useUpdateSiteSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<SiteSettings>) =>
      settingsService.updateSiteSettings(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.settings.site() });
      qc.invalidateQueries({ queryKey: queryKeys.settings.siteStatus() });
    },
  });
}

export function useToggleSite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => settingsService.toggleSite(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.settings.site() });
      qc.invalidateQueries({ queryKey: queryKeys.settings.siteStatus() });
    },
  });
}

export function useUpdateApiSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<ApiSettings>) =>
      settingsService.updateApiSettings(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.settings.api() });
    },
  });
}

export function useUpdateWalletSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<WalletSettings>) =>
      settingsService.updateWalletSettings(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.settings.wallet() });
    },
  });
}

export function useUpdateCommissionSettingsViaSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<CommissionSettings>) =>
      settingsService.updateCommissionSettings(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.settings.commission() });
    },
  });
}

export function useChangeUserRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      role,
    }: {
      userId: string;
      role: string;
    }) => settingsService.changeUserRole(userId, role),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.users.root });
    },
  });
}
