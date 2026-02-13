import { usePackages } from "@/hooks/use-packages";

export default function AdminPackagesPage() {
  const { isLoading } = usePackages();

  if (isLoading) {
    return <p className="text-muted-foreground">Loading packages...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Packages</h1>
      </div>

      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        <p>Create, edit, and manage data packages across providers.</p>
        <p className="mt-1 text-sm">Full package management UI coming soon.</p>
      </div>
    </div>
  );
}
