import { Outlet } from "react-router-dom";

/**
 * Minimal auth layout — centered card for login / register / forgot-password pages.
 */
export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
