import { apiPost } from "@/lib/api";
import type {
  ApiResponse,
  LoginResponse,
  User,
  RegisterAgentPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from "@/types";

const BASE = "/auth";

export const authService = {
  login: (email: string, password: string) =>
    apiPost<LoginResponse>(`${BASE}/login`, { email, password }),

  refresh: (refreshToken: string) =>
    apiPost<{ accessToken: string; refreshToken?: string }>(
      `${BASE}/refresh`,
      { refreshToken },
    ),

  registerAgent: (payload: RegisterAgentPayload) =>
    apiPost<ApiResponse<User>>(`${BASE}/register/agent`, payload),

  registerAdmin: (payload: RegisterAgentPayload) =>
    apiPost<ApiResponse<User>>(`${BASE}/register/admin`, payload),

  verifyAccount: (token: string) =>
    apiPost<ApiResponse>(`${BASE}/verify-account`, { token }),

  resendVerification: (email: string) =>
    apiPost<ApiResponse>(`${BASE}/resend-verification`, { email }),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    apiPost<ApiResponse>(`${BASE}/forgot-password`, payload),

  resetPassword: (payload: ResetPasswordPayload) =>
    apiPost<ApiResponse>(`${BASE}/reset-password`, payload),

  verifyToken: () =>
    apiPost<ApiResponse<User>>(`${BASE}/verify-token`),

  logout: () => apiPost<ApiResponse>(`${BASE}/logout`),

  updateFirstTime: () =>
    apiPost<ApiResponse>(`${BASE}/update-first-time`),

  debugUser: () =>
    apiPost<ApiResponse<User>>(`${BASE}/debug-user`),
};
