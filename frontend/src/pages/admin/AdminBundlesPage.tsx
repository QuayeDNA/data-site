import { useBundles } from "@/hooks/use-bundles";

export default function AdminBundlesPage() {
  const { isLoading } = useBundles();

  if (isLoading) {
    return <p className="text-muted-foreground">Loading bundles...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Bundles</h1>
      </div>

      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        <p>Create, price, and manage data bundles and pricing tiers.</p>
        <p className="mt-1 text-sm">Full bundle management UI coming soon.</p>
      </div>
    </div>
  );
}
