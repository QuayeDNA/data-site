export default function AdminStorefrontsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Storefront Management</h1>
      </div>

      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        <p>Approve, suspend, and manage agent storefronts across the platform.</p>
        <p className="mt-1 text-sm">Full storefront admin UI coming soon.</p>
      </div>
    </div>
  );
}
