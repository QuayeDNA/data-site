import { useUsers } from "@/hooks/use-users";

export default function AdminUsersPage() {
  const { isLoading } = useUsers();

  if (isLoading) {
    return <p className="text-muted-foreground">Loading users...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">User Management</h1>
      </div>

      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        <p>View, approve, suspend, and manage all platform users.</p>
        <p className="mt-1 text-sm">Full user management UI coming soon.</p>
      </div>
    </div>
  );
}
