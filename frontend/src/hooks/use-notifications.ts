import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { notificationsService } from "@/services/notifications.service";
import type { PaginationParams } from "@/types";

// ── Queries ─────────────────────────────────

export function useNotifications(
  params?: PaginationParams & { read?: boolean },
) {
  return useQuery({
    queryKey: queryKeys.notifications.list(params),
    queryFn: () => notificationsService.list(params),
  });
}

export function useUnreadNotifications(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.notifications.unread(params),
    queryFn: () => notificationsService.getUnread(params),
  });
}

export function useNotificationCount() {
  return useQuery({
    queryKey: queryKeys.notifications.count(),
    queryFn: () => notificationsService.getCount(),
    refetchInterval: 30_000, // poll every 30s
  });
}

// ── Mutations ───────────────────────────────

export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationsService.markRead(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.notifications.root });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => notificationsService.markAllRead(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.notifications.root });
    },
  });
}

export function useClearReadNotifications() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => notificationsService.clearRead(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.notifications.root });
    },
  });
}

export function useDeleteNotification() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationsService.deleteOne(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.notifications.root });
    },
  });
}

export function useDeleteMultipleNotifications() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) =>
      notificationsService.deleteMultiple(ids),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.notifications.root });
    },
  });
}
