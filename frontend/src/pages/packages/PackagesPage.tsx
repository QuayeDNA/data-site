import { usePackages } from "@/hooks/use-packages";

export default function PackagesPage() {
  const { data, isLoading } = usePackages();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Packages</h1>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-muted-foreground">
            {(data?.data as unknown[])?.length ?? 0} packages loaded. Package management UI coming soon.
          </p>
        </div>
      )}
    </div>
  );
}
