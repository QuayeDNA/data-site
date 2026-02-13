import { useProviders } from "@/hooks/use-providers";

export default function AdminProvidersPage() {
  const { isLoading } = useProviders();

  if (isLoading) {
    return <p className="text-muted-foreground">Loading providers...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Providers</h1>
      </div>

      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        <p>Create, edit, and manage telecom providers (MTN, AirtelTigo, Telecel).</p>
        <p className="mt-1 text-sm">Full provider management UI coming soon.</p>
      </div>
    </div>
  );
}
