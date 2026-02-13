import { useUsers } from "@/hooks/use-users";

export default function UsersPage() {
  const { data, isLoading } = useUsers();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Users</h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-muted-foreground">
            {data?.total ?? 0} users found. User management UI coming soon.
          </p>
        </div>
      )}
    </div>
  );
}
