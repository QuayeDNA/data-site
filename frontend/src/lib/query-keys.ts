/**
 * Centralised TanStack Query key factory.
 * Every query throughout the app references keys from here so
 * cache invalidation is consistent and type-safe.
 *
 * Pattern:  domain → list (filtered) | detail (by id) | sub-resource
 */

import type {
  OrderFilters,
  UserFilters,
  TransactionFilters,
  PaginationParams,
  TimeframeParam,
} from "@/types";

export const queryKeys = {
  // ── Auth ──────────────────────────────────
  auth: {
    root: ["auth"] as const,
    user: () => [...queryKeys.auth.root, "user"] as const,
    verify: () => [...queryKeys.auth.root, "verify"] as const,
    agentDashboard: () => [...queryKeys.auth.root, "agent-dashboard"] as const,
  },

  // ── Users ─────────────────────────────────
  users: {
    root: ["users"] as const,
    list: (filters?: UserFilters) =>
      [...queryKeys.users.root, "list", filters ?? {}] as const,
    detail: (id: string) =>
      [...queryKeys.users.root, "detail", id] as const,
    profile: () => [...queryKeys.users.root, "profile"] as const,
    withWallet: () => [...queryKeys.users.root, "with-wallet"] as const,
    stats: () => [...queryKeys.users.root, "stats"] as const,
    dashboardStats: () =>
      [...queryKeys.users.root, "dashboard-stats"] as const,
    chartData: () => [...queryKeys.users.root, "chart-data"] as const,
  },

  // ── Orders ────────────────────────────────
  orders: {
    root: ["orders"] as const,
    list: (filters?: OrderFilters) =>
      [...queryKeys.orders.root, "list", filters ?? {}] as const,
    detail: (id: string) =>
      [...queryKeys.orders.root, "detail", id] as const,
    reported: (filters?: PaginationParams) =>
      [...queryKeys.orders.root, "reported", filters ?? {}] as const,
    analyticsSummary: (filters?: Record<string, unknown>) =>
      [...queryKeys.orders.root, "analytics-summary", filters ?? {}] as const,
    analyticsAgent: () =>
      [...queryKeys.orders.root, "analytics-agent"] as const,
    monthlyRevenue: () =>
      [...queryKeys.orders.root, "monthly-revenue"] as const,
    dailySpending: () =>
      [...queryKeys.orders.root, "daily-spending"] as const,
  },

  // ── Providers ─────────────────────────────
  providers: {
    root: ["providers"] as const,
    list: () => [...queryKeys.providers.root, "list"] as const,
    public: () => [...queryKeys.providers.root, "public"] as const,
    detail: (id: string) =>
      [...queryKeys.providers.root, "detail", id] as const,
    analytics: () => [...queryKeys.providers.root, "analytics"] as const,
  },

  // ── Packages ──────────────────────────────
  packages: {
    root: ["packages"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.packages.root, "list", params ?? {}] as const,
    detail: (id: string) =>
      [...queryKeys.packages.root, "detail", id] as const,
    byProvider: (provider: string) =>
      [...queryKeys.packages.root, "provider", provider] as const,
    byCategory: (category: string) =>
      [...queryKeys.packages.root, "category", category] as const,
    stats: () => [...queryKeys.packages.root, "stats"] as const,
    public: () => [...queryKeys.packages.root, "public"] as const,
  },

  // ── Bundles ───────────────────────────────
  bundles: {
    root: ["bundles"] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.bundles.root, "list", params ?? {}] as const,
    detail: (id: string) =>
      [...queryKeys.bundles.root, "detail", id] as const,
    byProvider: (providerId: string) =>
      [...queryKeys.bundles.root, "provider", providerId] as const,
    byPackage: (packageId: string) =>
      [...queryKeys.bundles.root, "package", packageId] as const,
    analytics: () => [...queryKeys.bundles.root, "analytics"] as const,
    pricing: (id: string) =>
      [...queryKeys.bundles.root, "pricing", id] as const,
  },

  // ── Wallet ────────────────────────────────
  wallet: {
    root: ["wallet"] as const,
    info: () => [...queryKeys.wallet.root, "info"] as const,
    transactions: (filters?: TransactionFilters) =>
      [...queryKeys.wallet.root, "transactions", filters ?? {}] as const,
    pendingRequests: () =>
      [...queryKeys.wallet.root, "pending-requests"] as const,
    checkPending: () =>
      [...queryKeys.wallet.root, "check-pending"] as const,
    analytics: () => [...queryKeys.wallet.root, "analytics"] as const,
    adminTransactions: () =>
      [...queryKeys.wallet.root, "admin-transactions"] as const,
  },

  // ── Notifications ─────────────────────────
  notifications: {
    root: ["notifications"] as const,
    list: (params?: PaginationParams & { read?: boolean }) =>
      [...queryKeys.notifications.root, "list", params ?? {}] as const,
    unread: (params?: PaginationParams) =>
      [...queryKeys.notifications.root, "unread", params ?? {}] as const,
    count: () => [...queryKeys.notifications.root, "count"] as const,
  },

  // ── Announcements ─────────────────────────
  announcements: {
    root: ["announcements"] as const,
    all: () => [...queryKeys.announcements.root, "all"] as const,
    detail: (id: string) =>
      [...queryKeys.announcements.root, "detail", id] as const,
    templates: () =>
      [...queryKeys.announcements.root, "templates"] as const,
    stats: (id: string) =>
      [...queryKeys.announcements.root, "stats", id] as const,
    activeMe: () =>
      [...queryKeys.announcements.root, "active-me"] as const,
    unreadMe: () =>
      [...queryKeys.announcements.root, "unread-me"] as const,
  },

  // ── Analytics ─────────────────────────────
  analytics: {
    root: ["analytics"] as const,
    admin: (params?: TimeframeParam) =>
      [...queryKeys.analytics.root, "admin", params ?? {}] as const,
    agent: (params?: TimeframeParam) =>
      [...queryKeys.analytics.root, "agent", params ?? {}] as const,
    summary: (params?: TimeframeParam) =>
      [...queryKeys.analytics.root, "summary", params ?? {}] as const,
    charts: (params?: TimeframeParam) =>
      [...queryKeys.analytics.root, "charts", params ?? {}] as const,
    realtime: () =>
      [...queryKeys.analytics.root, "realtime"] as const,
  },

  // ── Commissions ───────────────────────────
  commissions: {
    root: ["commissions"] as const,
    list: (params?: PaginationParams) =>
      [...queryKeys.commissions.root, "list", params ?? {}] as const,
    settings: () =>
      [...queryKeys.commissions.root, "settings"] as const,
    agent: () =>
      [...queryKeys.commissions.root, "agent"] as const,
    monthlySummariesAgent: () =>
      [...queryKeys.commissions.root, "monthly-summaries-agent"] as const,
    monthlySummaries: () =>
      [...queryKeys.commissions.root, "monthly-summaries"] as const,
    currentMonthStats: () =>
      [...queryKeys.commissions.root, "current-month-stats"] as const,
    statistics: () =>
      [...queryKeys.commissions.root, "statistics"] as const,
  },

  // ── Settings ──────────────────────────────
  settings: {
    root: ["settings"] as const,
    site: () => [...queryKeys.settings.root, "site"] as const,
    siteStatus: () =>
      [...queryKeys.settings.root, "site-status"] as const,
    wallet: () => [...queryKeys.settings.root, "wallet"] as const,
    signupApproval: () =>
      [...queryKeys.settings.root, "signup-approval"] as const,
    storefrontAutoApprove: () =>
      [...queryKeys.settings.root, "storefront-auto-approve"] as const,
    commission: () =>
      [...queryKeys.settings.root, "commission"] as const,
    api: () => [...queryKeys.settings.root, "api"] as const,
    system: () => [...queryKeys.settings.root, "system"] as const,
  },

  // ── Storefront ────────────────────────────
  storefront: {
    root: ["storefront"] as const,
    public: (businessName: string) =>
      [...queryKeys.storefront.root, "public", businessName] as const,
    mine: () => [...queryKeys.storefront.root, "mine"] as const,
    bundles: () =>
      [...queryKeys.storefront.root, "bundles"] as const,
    pricing: () =>
      [...queryKeys.storefront.root, "pricing"] as const,
    orders: (params?: PaginationParams & { status?: string }) =>
      [...queryKeys.storefront.root, "orders", params ?? {}] as const,
    analytics: (params?: { startDate?: string; endDate?: string }) =>
      [...queryKeys.storefront.root, "analytics", params ?? {}] as const,
    adminList: (params?: PaginationParams & { status?: string; search?: string }) =>
      [...queryKeys.storefront.root, "admin-list", params ?? {}] as const,
    adminStats: () =>
      [...queryKeys.storefront.root, "admin-stats"] as const,
  },

  // ── Push ──────────────────────────────────
  push: {
    root: ["push"] as const,
    vapidKey: () => [...queryKeys.push.root, "vapid-key"] as const,
    preferences: () => [...queryKeys.push.root, "preferences"] as const,
  },
} as const;
