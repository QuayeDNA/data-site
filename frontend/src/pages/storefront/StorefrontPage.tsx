import { useMyStorefront } from "@/hooks/use-storefront";

export default function StorefrontPage() {
  const { data, isLoading } = useMyStorefront();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Storefront</h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : data?.data ? (
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-lg font-semibold text-foreground">
            {data.data.displayName}
          </p>
          <p className="text-sm text-muted-foreground">
            Status: {data.data.status} — Full storefront management UI coming soon.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-muted-foreground">
            You don't have a storefront yet. Storefront creation UI coming soon.
          </p>
        </div>
      )}
    </div>
  );
}
