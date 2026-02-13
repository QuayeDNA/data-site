import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { BUSINESS_ROLES } from "@/types";
import { Toaster } from "@/components/ui/sonner";

// ── Guards & Layouts ────────────────────────
import RoleGuard from "@/components/guards/RoleGuard";
import GuestGuard from "@/components/guards/GuestGuard";
import AuthLayout from "@/components/layouts/AuthLayout";
import AdminLayout from "@/components/layouts/AdminLayout";
import AgentLayout from "@/components/layouts/DashboardLayout";

// ── Auth pages ──────────────────────────────
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const ForgotPasswordPage = lazy(
  () => import("@/pages/auth/ForgotPasswordPage"),
);
const ResetPasswordPage = lazy(
  () => import("@/pages/auth/ResetPasswordPage"),
);

// ── Agent pages ─────────────────────────────
const AgentDashboardPage = lazy(() => import("@/pages/DashboardPage"));
const OrdersPage = lazy(() => import("@/pages/orders/OrdersPage"));
const BundlesPage = lazy(() => import("@/pages/bundles/BundlesPage"));
const WalletPage = lazy(() => import("@/pages/wallet/WalletPage"));
const CommissionsPage = lazy(
  () => import("@/pages/commissions/CommissionsPage"),
);
const StorefrontPage = lazy(
  () => import("@/pages/storefront/StorefrontPage"),
);
const AnalyticsPage = lazy(() => import("@/pages/analytics/AnalyticsPage"));

// ── Admin pages ─────────────────────────────
const AdminDashboardPage = lazy(
  () => import("@/pages/admin/AdminDashboardPage"),
);
const AdminOrdersPage = lazy(
  () => import("@/pages/admin/AdminOrdersPage"),
);
const AdminUsersPage = lazy(
  () => import("@/pages/admin/AdminUsersPage"),
);
const AdminProvidersPage = lazy(
  () => import("@/pages/admin/AdminProvidersPage"),
);
const AdminPackagesPage = lazy(
  () => import("@/pages/admin/AdminPackagesPage"),
);
const AdminBundlesPage = lazy(
  () => import("@/pages/admin/AdminBundlesPage"),
);
const AdminWalletPage = lazy(
  () => import("@/pages/admin/AdminWalletPage"),
);
const AdminCommissionsPage = lazy(
  () => import("@/pages/admin/AdminCommissionsPage"),
);
const AdminStorefrontsPage = lazy(
  () => import("@/pages/admin/AdminStorefrontsPage"),
);
const AdminAnalyticsPage = lazy(
  () => import("@/pages/admin/AdminAnalyticsPage"),
);
const AdminAnnouncementsPage = lazy(
  () => import("@/pages/admin/AdminAnnouncementsPage"),
);
const AdminSettingsPage = lazy(
  () => import("@/pages/admin/AdminSettingsPage"),
);

// ── Shared pages ────────────────────────────
const NotificationsPage = lazy(
  () => import("@/pages/notifications/NotificationsPage"),
);
const ProfilePage = lazy(() => import("@/pages/profile/ProfilePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const UnauthorizedPage = lazy(() => import("@/pages/UnauthorizedPage"));

// ── Spinner for Suspense ────────────────────
function PageSpinner() {
  return (
    <div className="flex h-full min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

// ── Role-based root redirect ────────────────
function RootRedirect() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <PageSpinner />;
  if (!user) return <Navigate to="/login" replace />;

  return user.userType === "admin" ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    <Navigate to="/dashboard" replace />
  );
}

// ── App ─────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageSpinner />}>
        <Routes>
          {/* ── Public / Guest routes ──────────── */}
          <Route element={<GuestGuard />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/forgot-password"
                element={<ForgotPasswordPage />}
              />
              <Route
                path="/reset-password"
                element={<ResetPasswordPage />}
              />
            </Route>
          </Route>

          {/* ── Admin routes (admin only) ── */}
          <Route
            element={
              <RoleGuard allowedRoles={["admin"]} />
            }
          >
            <Route element={<AdminLayout />}>
              <Route
                path="/admin/dashboard"
                element={<AdminDashboardPage />}
              />
              <Route
                path="/admin/orders"
                element={<AdminOrdersPage />}
              />
              <Route
                path="/admin/users"
                element={<AdminUsersPage />}
              />
              <Route
                path="/admin/providers"
                element={<AdminProvidersPage />}
              />
              <Route
                path="/admin/packages"
                element={<AdminPackagesPage />}
              />
              <Route
                path="/admin/bundles"
                element={<AdminBundlesPage />}
              />
              <Route
                path="/admin/wallet"
                element={<AdminWalletPage />}
              />
              <Route
                path="/admin/commissions"
                element={<AdminCommissionsPage />}
              />
              <Route
                path="/admin/storefronts"
                element={<AdminStorefrontsPage />}
              />
              <Route
                path="/admin/analytics"
                element={<AdminAnalyticsPage />}
              />
              <Route
                path="/admin/announcements"
                element={<AdminAnnouncementsPage />}
              />
              <Route
                path="/admin/settings"
                element={<AdminSettingsPage />}
              />
              <Route
                path="/admin/notifications"
                element={<NotificationsPage />}
              />
              <Route
                path="/admin/profile"
                element={<ProfilePage />}
              />
            </Route>
          </Route>

          {/* ── Agent / business-user routes ───── */}
          <Route
            element={
              <RoleGuard allowedRoles={[...BUSINESS_ROLES]} />
            }
          >
            <Route element={<AgentLayout />}>
              <Route
                path="/dashboard"
                element={<AgentDashboardPage />}
              />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/bundles" element={<BundlesPage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route
                path="/commissions"
                element={<CommissionsPage />}
              />
              <Route
                path="/storefront"
                element={<StorefrontPage />}
              />
              <Route
                path="/analytics"
                element={<AnalyticsPage />}
              />
              <Route
                path="/notifications"
                element={<NotificationsPage />}
              />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* ── Redirects & fallbacks ──────────── */}
          <Route path="/" element={<RootRedirect />} />
          <Route
            path="/unauthorized"
            element={<UnauthorizedPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster />
    </AuthProvider>
  );
}
