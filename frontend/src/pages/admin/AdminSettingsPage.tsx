import { useSiteSettings, useSystemInfo } from "@/hooks/use-settings";

export default function AdminSettingsPage() {
  const { data: siteData, isLoading: loadingSite } = useSiteSettings();
  const { data: sysData, isLoading: loadingSys } = useSystemInfo();

  if (loadingSite || loadingSys) {
    return <p className="text-muted-foreground">Loading settings...</p>;
  }

  const site = (siteData as { data?: { siteName?: string; isActive?: boolean } })?.data;
  const sys = (sysData as { data?: { version?: string; nodeVersion?: string } })?.data;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Platform Settings</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-sm font-medium text-muted-foreground">Site Name</p>
          <p className="mt-1 text-lg font-bold text-foreground">{site?.siteName ?? "—"}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-sm font-medium text-muted-foreground">Site Status</p>
          <p className="mt-1 text-lg font-bold text-foreground">
            {site?.isActive ? "Active" : "Inactive"}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-sm font-medium text-muted-foreground">Version</p>
          <p className="mt-1 text-lg font-bold text-foreground">{sys?.version ?? "—"}</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        <p>Manage site configuration, API settings, commission rates, and wallet policies.</p>
        <p className="mt-1 text-sm">Full settings UI coming soon.</p>
      </div>
    </div>
  );
}
