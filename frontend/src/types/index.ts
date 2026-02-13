// Auth types matching backend JWT + role-based auth
export type UserRole =
  | "super_admin"
  | "admin"
  | "agent"
  | "super_agent"
  | "dealer"
  | "super_dealer"
  | "customer";

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

// Order types
export interface OrderItem {
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
}

export interface Order {
  _id: string;
  tenantId: string;
  items: OrderItem[];
  total: number;
  status: "draft" | "pending" | "processing" | "completed" | "failed" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: string;
  updatedAt: string;
}

// Provider types
export interface Provider {
  _id: string;
  name: string;
  code: "MTN" | "TELECEL" | "AT" | "AFA";
  country: string;
  description?: string;
  logo?: { url: string; alt: string };
  services: string[];
  isActive: boolean;
}

// Package & Bundle types
export interface Package {
  _id: string;
  name: string;
  description?: string;
  provider: string;
  category: string;
  isActive: boolean;
}

export interface Bundle {
  _id: string;
  name: string;
  description?: string;
  packageId: string;
  providerId: string;
  dataVolume: number;
  dataUnit: "MB" | "GB" | "TB";
  validity: number;
  validityUnit: string;
  price: number;
  currency: string;
  features: string[];
  isActive: boolean;
}

// Wallet types
export interface WalletTransaction {
  _id: string;
  user: string;
  type: "credit" | "debit" | "top_up_request";
  amount: number;
  status: "pending" | "approved" | "rejected" | "completed";
  description: string;
  approvedBy?: { fullName: string };
  createdAt: string;
}

// Notification types
export interface Notification {
  _id: string;
  user: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

// Commission types
export interface CommissionRecord {
  _id: string;
  userId: string;
  amount: number;
  status: "pending" | "paid" | "rejected";
  period: string;
  createdAt: string;
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
}
