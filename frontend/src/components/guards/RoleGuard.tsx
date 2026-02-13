import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/types";

interface RoleGuardProps {
  /** Roles allowed to access child routes. If empty, any authenticated user is allowed. */
  allowedRoles?: UserRole[];
  /** Redirect path when role is denied (default: /unauthorized) */
  redirectTo?: string;
}

/**
 * Route guard that checks authentication + optional role authorization.
 * Wrap route groups with this in the router config.
 */
export default function RoleGuard({
  allowedRoles,
  redirectTo = "/unauthorized",
}: RoleGuardProps) {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && user) {
    if (!allowedRoles.includes(user.userType)) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  return <Outlet />;
}
