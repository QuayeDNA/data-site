import { useAuth } from "@/contexts/AuthContext";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>

      {/* Platform overview cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value="—" />
        <StatCard label="Orders Today" value="—" />
        <StatCard label="Platform Revenue" value="GHS —" />
        <StatCard label="Pending Top-ups" value="—" />
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">
          Welcome, {user?.fullName}
        </h2>
        <p className="mt-2 text-muted-foreground">
          You have full platform access. Manage users, process orders, configure
          settings, and monitor analytics from the sidebar.
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}
