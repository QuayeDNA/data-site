import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Prevents authenticated users from accessing auth pages (login, register, etc.)
 * Redirects to role-appropriate dashboard if already logged in.
 */
export default function GuestGuard() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    const dest =
      user.userType === "admin" ? "/admin/dashboard" : "/dashboard";
    return <Navigate to={dest} replace />;
  }

  return <Outlet />;
}
