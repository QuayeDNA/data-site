// ──────────────────────────────────────────────
// Auth & User Types
// ──────────────────────────────────────────────
export type UserRole =
  | "admin"
  | "agent"
  | "super_agent"
  | "dealer"
  | "super_dealer";

/** Roles that can manage business operations */
export const BUSINESS_ROLES: UserRole[] = [
  "agent",
  "super_agent",
  "dealer",
  "super_dealer",
];

/** Roles with admin panel access */
export const ADMIN_ROLES: UserRole[] = ["admin"];

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  userType: UserRole;
  isVerified: boolean;
  isActive: boolean;
  walletBalance: number;
  subscriptionStatus: "active" | "inactive" | "suspended";
  agentCode?: string;
  tenantId?: string;
  firstTimeLogin?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterAgentPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  businessName?: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

// ──────────────────────────────────────────────
// Order Types
// ──────────────────────────────────────────────
export type OrderStatus =
  | "draft"
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type ReceptionStatus = "pending" | "received" | "not_received";

export interface OrderItem {
  _id?: string;
  packageDetails: {
    name: string;
    provider: string;
    dataVolume: number;
    dataUnit: string;
    validity: number;
    validityType: string;
    price: number;
  };
  recipientNumber: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status?: OrderStatus;
}

export interface Order {
  _id: string;
  tenantId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  receptionStatus?: ReceptionStatus;
  isReported?: boolean;
  reportReason?: string;
  cancelReason?: string;
  createdBy?: string | User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSingleOrderPayload {
  recipientNumber: string;
  provider: string;
  packageId?: string;
  bundleId?: string;
  quantity?: number;
}

export interface CreateBulkOrderPayload {
  items: CreateSingleOrderPayload[];
}

export interface OrderAnalyticsSummary {
  totalOrders: number;
  totalRevenue: number;
  completedOrders: number;
  pendingOrders: number;
  failedOrders: number;
  cancelledOrders: number;
}

// ──────────────────────────────────────────────
// Provider Types
// ──────────────────────────────────────────────
export type ProviderCode = "MTN" | "TELECEL" | "AT" | "AFA";

export interface Provider {
  _id: string;
  name: string;
  code: ProviderCode;
  description?: string;
  logo?: { url: string; alt: string };
  isActive: boolean;
  isDeleted?: boolean;
  salesCount?: number;
  viewCount?: number;
  createdBy?: string | User;
  updatedBy?: string | User;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProviderPayload {
  name: string;
  code: ProviderCode;
  description?: string;
  logo?: { url: string; alt: string };
  isActive?: boolean;
}

// ──────────────────────────────────────────────
// Package & Bundle Types
// ──────────────────────────────────────────────
export interface Package {
  _id: string;
  name: string;
  description?: string;
  provider: string | Provider;
  category: string;
  isActive: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePackagePayload {
  name: string;
  provider: string;
  category: string;
  description?: string;
}

export interface Bundle {
  _id: string;
  name: string;
  description?: string;
  packageId: string | Package;
  providerId: string | Provider;
  dataVolume: number;
  dataUnit: "MB" | "GB" | "TB";
  validity: number;
  validityUnit: string;
  price: number;
  currency: string;
  features: string[];
  isActive: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBundlePayload {
  name: string;
  packageId: string;
  providerId: string;
  dataVolume: number;
  dataUnit: "MB" | "GB" | "TB";
  validity: number;
  validityUnit: string;
  price: number;
  currency?: string;
  features?: string[];
  description?: string;
}

export interface BundlePricing {
  bundleId: string;
  customPrice?: number;
  isEnabled?: boolean;
}

// ──────────────────────────────────────────────
// Wallet Types
// ──────────────────────────────────────────────
export type TransactionType = "credit" | "debit" | "top_up_request";

export type TransactionStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "completed";

export interface WalletInfo {
  balance: number;
  currency: string;
  userId: string;
}

export interface WalletTransaction {
  _id: string;
  user: string | User;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  description: string;
  reference?: string;
  paymentMethod?: string;
  approvedBy?: { fullName: string; _id: string };
  createdAt: string;
  updatedAt?: string;
}

export interface RequestTopUpPayload {
  amount: number;
  paymentMethod: string;
  reference?: string;
  notes?: string;
}

export interface AdminTopUpPayload {
  userId: string;
  amount: number;
  description?: string;
}

export interface ProcessTopUpPayload {
  action: "approve" | "reject";
  notes?: string;
}

export interface WalletSettings {
  minimumTopUpAmounts: {
    agent: number;
    super_agent: number;
    dealer: number;
    super_dealer: number;
    default: number;
  };
}

// ──────────────────────────────────────────────
// Notification Types
// ──────────────────────────────────────────────
export interface Notification {
  _id: string;
  user: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  data?: Record<string, unknown>;
  createdAt: string;
}

export interface NotificationCount {
  unread: number;
}

// ──────────────────────────────────────────────
// Announcement Types
// ──────────────────────────────────────────────
export interface Announcement {
  _id: string;
  title: string;
  content: string;
  type: string;
  priority: "low" | "medium" | "high" | "urgent";
  targetAudience: UserRole[];
  isActive: boolean;
  isBroadcast: boolean;
  expiresAt?: string;
  createdBy?: string | User;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateAnnouncementPayload {
  title: string;
  content: string;
  type?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  targetAudience?: UserRole[];
  expiresAt?: string;
}

// ──────────────────────────────────────────────
// Commission Types
// ──────────────────────────────────────────────
export type CommissionStatus = "pending" | "paid" | "rejected" | "expired";

export interface CommissionRecord {
  _id: string;
  userId: string | User;
  amount: number;
  status: CommissionStatus;
  period: string;
  orderId?: string;
  paidAt?: string;
  rejectedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CommissionSettings {
  agentCommission: number;
  superAgentCommission: number;
  dealerCommission: number;
  superDealerCommission: number;
  defaultCommissionRate: number;
  customerCommission: number;
}

export interface CommissionMonthlySummary {
  month: string;
  totalEarned: number;
  totalPaid: number;
  totalPending: number;
  recordCount: number;
}

// ──────────────────────────────────────────────
// Analytics Types
// ──────────────────────────────────────────────
export interface AnalyticsSummary {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  activeUsers: number;
  pendingOrders: number;
  completedOrders: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  date?: string;
}

export interface AnalyticsCharts {
  revenue: ChartDataPoint[];
  orders: ChartDataPoint[];
  users: ChartDataPoint[];
}

export interface RealtimeMetrics {
  todayOrders: number;
  todayRevenue: number;
  activeUsers: number;
  pendingOrders: number;
}

// ──────────────────────────────────────────────
// Settings Types
// ──────────────────────────────────────────────
export interface SiteSettings {
  isSiteOpen: boolean;
  customMessage: string;
}

export interface ApiSettings {
  mtnApiKey: string;
  telecelApiKey: string;
  airtelTigoApiKey: string;
  apiEndpoint: string;
}

export interface SystemInfo {
  version: string;
  uptime: number;
  nodeVersion: string;
  memoryUsage: Record<string, number>;
}

// ──────────────────────────────────────────────
// Storefront Types
// ──────────────────────────────────────────────
export interface Storefront {
  _id: string;
  userId: string | User;
  businessName: string;
  displayName: string;
  description?: string;
  contactInfo: {
    email?: string;
    phone?: string;
    whatsapp?: string;
  };
  paymentMethods: string[];
  status: "pending" | "active" | "suspended" | "deactivated";
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateStorefrontPayload {
  businessName: string;
  displayName: string;
  description?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    whatsapp?: string;
  };
  paymentMethods?: string[];
}

export interface StorefrontOrder {
  _id: string;
  storefrontId: string;
  customerInfo: {
    name: string;
    phone: string;
    email?: string;
  };
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export interface StorefrontAnalytics {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
}

// ──────────────────────────────────────────────
// Push Notification Types
// ──────────────────────────────────────────────
export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export interface PushPreferences {
  enabled: boolean;
  orderUpdates: boolean;
  walletUpdates: boolean;
  announcements: boolean;
  promotions: boolean;
}

// ──────────────────────────────────────────────
// API Response Wrappers
// ──────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  code?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
}

// ──────────────────────────────────────────────
// Query / Filter Params
// ──────────────────────────────────────────────
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface OrderFilters extends PaginationParams {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface UserFilters extends PaginationParams {
  userType?: UserRole;
  isActive?: boolean;
  search?: string;
}

export interface TransactionFilters extends PaginationParams {
  type?: TransactionType;
  status?: TransactionStatus;
  startDate?: string;
  endDate?: string;
}

export interface TimeframeParam {
  timeframe?: "7d" | "30d" | "90d" | "1y";
}
