import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";
import type {
  ApiResponse,
  Announcement,
  CreateAnnouncementPayload,
} from "@/types";

const BASE = "/announcements";

export const announcementsService = {
  // ── Admin CRUD ──────────────────────────
  create: (payload: CreateAnnouncementPayload) =>
    apiPost<ApiResponse<Announcement>>(BASE, payload),

  getAll: () =>
    apiGet<ApiResponse<Announcement[]>>(`${BASE}/all`),

  getTemplates: () =>
    apiGet<ApiResponse>(`${BASE}/templates`),

  getById: (id: string) =>
    apiGet<ApiResponse<Announcement>>(`${BASE}/${id}`),

  update: (id: string, payload: Partial<CreateAnnouncementPayload>) =>
    apiPut<ApiResponse<Announcement>>(`${BASE}/${id}`, payload),

  delete: (id: string) =>
    apiDelete<ApiResponse>(`${BASE}/${id}`),

  getStats: (id: string) =>
    apiGet<ApiResponse>(`${BASE}/${id}/stats`),

  broadcast: (id: string) =>
    apiPost<ApiResponse>(`${BASE}/${id}/broadcast`),

  // ── User-facing ─────────────────────────
  getActiveForMe: () =>
    apiGet<ApiResponse<Announcement[]>>(`${BASE}/active/me`),

  getUnreadForMe: () =>
    apiGet<ApiResponse<Announcement[]>>(`${BASE}/unread/me`),

  markViewed: (id: string) =>
    apiPost<ApiResponse>(`${BASE}/${id}/view`),

  acknowledge: (id: string) =>
    apiPost<ApiResponse>(`${BASE}/${id}/acknowledge`),
};
