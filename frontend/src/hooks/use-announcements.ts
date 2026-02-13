import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { announcementsService } from "@/services/announcements.service";
import type { CreateAnnouncementPayload } from "@/types";

// ── Queries ─────────────────────────────────

export function useAnnouncements() {
  return useQuery({
    queryKey: queryKeys.announcements.all(),
    queryFn: () => announcementsService.getAll(),
  });
}

export function useAnnouncement(id: string) {
  return useQuery({
    queryKey: queryKeys.announcements.detail(id),
    queryFn: () => announcementsService.getById(id),
    enabled: !!id,
  });
}

export function useAnnouncementTemplates() {
  return useQuery({
    queryKey: queryKeys.announcements.templates(),
    queryFn: () => announcementsService.getTemplates(),
  });
}

export function useAnnouncementStats(id: string) {
  return useQuery({
    queryKey: queryKeys.announcements.stats(id),
    queryFn: () => announcementsService.getStats(id),
    enabled: !!id,
  });
}

export function useMyActiveAnnouncements() {
  return useQuery({
    queryKey: queryKeys.announcements.activeMe(),
    queryFn: () => announcementsService.getActiveForMe(),
  });
}

export function useMyUnreadAnnouncements() {
  return useQuery({
    queryKey: queryKeys.announcements.unreadMe(),
    queryFn: () => announcementsService.getUnreadForMe(),
  });
}

// ── Mutations ───────────────────────────────

export function useCreateAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateAnnouncementPayload) =>
      announcementsService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.announcements.root });
    },
  });
}

export function useUpdateAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateAnnouncementPayload>;
    }) => announcementsService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.announcements.root });
    },
  });
}

export function useDeleteAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => announcementsService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.announcements.root });
    },
  });
}

export function useBroadcastAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => announcementsService.broadcast(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.announcements.root });
    },
  });
}

export function useAcknowledgeAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => announcementsService.acknowledge(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.announcements.root });
    },
  });
}
