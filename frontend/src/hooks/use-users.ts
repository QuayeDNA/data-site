import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { usersService } from "@/services/users.service";
import type { User, UserFilters } from "@/types";

// ── Queries ─────────────────────────────────

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.users.profile(),
    queryFn: () => usersService.getProfile(),
  });
}

export function useUsers(filters?: UserFilters) {
  return useQuery({
    queryKey: queryKeys.users.list(filters),
    queryFn: () => usersService.list(filters),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => usersService.getById(id),
    enabled: !!id,
  });
}

export function useUsersWithWallet() {
  return useQuery({
    queryKey: queryKeys.users.withWallet(),
    queryFn: () => usersService.getUsersWithWallet(),
  });
}

export function useUserStats() {
  return useQuery({
    queryKey: queryKeys.users.stats(),
    queryFn: () => usersService.getStats(),
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.users.dashboardStats(),
    queryFn: () => usersService.getDashboardStats(),
  });
}

export function useChartData() {
  return useQuery({
    queryKey: queryKeys.users.chartData(),
    queryFn: () => usersService.getChartData(),
  });
}

export function useAgentDashboard() {
  return useQuery({
    queryKey: queryKeys.auth.agentDashboard(),
    queryFn: () => usersService.getAgentDashboard(),
  });
}

/** admin user list from /api/auth/users */
export function useAllUsers(filters?: UserFilters) {
  return useQuery({
    queryKey: [...queryKeys.users.root, "admin-list", filters ?? {}],
    queryFn: () => usersService.listAll(filters),
  });
}

// ── Mutations ───────────────────────────────

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<User>) =>
      usersService.updateProfile(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.users.profile() });
      qc.invalidateQueries({ queryKey: queryKeys.auth.user() });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => usersService.changePassword(currentPassword, newPassword),
  });
}

export function useUpdateUserStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      usersService.updateStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.users.root });
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersService.deleteUser(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.users.root });
    },
  });
}

export function useImpersonateUser() {
  return useMutation({
    mutationFn: (id: string) => usersService.impersonate(id),
  });
}
