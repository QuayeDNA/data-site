import { apiGet, apiPatch, apiDelete, apiPost, buildParams } from "@/lib/api";
import type {
  ApiResponse,
  PaginatedResponse,
  Notification,
  NotificationCount,
  PaginationParams,
} from "@/types";

const BASE = "/notifications";

export const notificationsService = {
  list: (params?: PaginationParams & { read?: boolean }) =>
    apiGet<PaginatedResponse<Notification>>(BASE, {
      params: params ? buildParams(params as Record<string, string | number | boolean | undefined>) : undefined,
    }),

  getUnread: (params?: PaginationParams) =>
    apiGet<PaginatedResponse<Notification>>(`${BASE}/unread`, {
      params: params ? buildParams(params as Record<string, string | number | boolean | undefined>) : undefined,
    }),

  getCount: () =>
    apiGet<ApiResponse<NotificationCount>>(`${BASE}/count`),

  markRead: (id: string) =>
    apiPatch<ApiResponse>(`${BASE}/${id}/read`),

  markUnread: (id: string) =>
    apiPatch<ApiResponse>(`${BASE}/${id}/unread`),

  markAllRead: () =>
    apiPatch<ApiResponse>(`${BASE}/read-all`),

  clearRead: () =>
    apiDelete<ApiResponse>(`${BASE}/clear-read`),

  clearAll: () =>
    apiDelete<ApiResponse>(`${BASE}/clear-all`),

  deleteMultiple: (notificationIds: string[]) =>
    apiPost<ApiResponse>(`${BASE}/delete-multiple`, { notificationIds }),

  deleteOne: (id: string) =>
    apiDelete<ApiResponse>(`${BASE}/${id}`),
};
