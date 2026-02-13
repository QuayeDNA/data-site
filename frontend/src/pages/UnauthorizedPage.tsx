import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function UnauthorizedPage() {
  const { user } = useAuth();
  const homePath =
    user?.userType === "admin" ? "/admin/dashboard" : "/dashboard";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-6xl font-bold text-destructive">403</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        You don't have permission to access this page.
      </p>
      <Link
        to={homePath}
        className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
