import { apiGet, apiPost, apiPut } from "@/lib/api";
import type {
  ApiResponse,
  PushSubscription,
  PushPreferences,
} from "@/types";

const BASE = "/push";

export const pushService = {
  subscribe: (subscription: PushSubscription) =>
    apiPost<ApiResponse>(`${BASE}/subscribe`, { subscription }),

  unsubscribe: () =>
    apiPost<ApiResponse>(`${BASE}/unsubscribe`),

  getVapidKey: () =>
    apiGet<ApiResponse<{ publicKey: string }>>(`${BASE}/vapid-public-key`),

  getPreferences: () =>
    apiGet<ApiResponse<PushPreferences>>(`${BASE}/preferences`),

  updatePreferences: (preferences: Partial<PushPreferences>) =>
    apiPut<ApiResponse>(`${BASE}/preferences`, { preferences }),

  sendTest: (title?: string, body?: string) =>
    apiPost<ApiResponse>(`${BASE}/test`, { title, body }),
};
