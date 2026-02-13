import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-foreground">
            Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user?.fullName}{" "}
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {user?.userType}
              </span>
            </span>
            <button
              onClick={logout}
              className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Stat cards - placeholder */}
          {[
            { label: "Wallet Balance", value: `GHS ${user?.walletBalance?.toFixed(2) ?? "0.00"}` },
            { label: "Account Status", value: user?.subscriptionStatus ?? "N/A" },
            { label: "Role", value: user?.userType ?? "N/A" },
            { label: "Verified", value: user?.isVerified ? "Yes" : "No" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-card p-6"
            >
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground">
            Welcome to the Dashboard
          </h2>
          <p className="mt-2 text-muted-foreground">
            This is your central hub. Pages for orders, packages, wallet,
            analytics, and more will be built out here.
          </p>
        </div>
      </main>
    </div>
  );
}
