import { useSiteSettings, useSystemInfo } from "@/hooks/use-settings";

export default function SettingsPage() {
  const { data: siteSettings, isLoading: loadingSite } = useSiteSettings();
  const { data: systemInfo, isLoading: loadingSystem } = useSystemInfo();

  const isLoading = loadingSite || loadingSystem;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Site</h2>
            <p className="text-sm text-muted-foreground">
              Site name: {siteSettings?.data?.siteName ?? "N/A"} — Status:{" "}
              {siteSettings?.data?.isActive ? "Active" : "Maintenance"}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">System</h2>
            <p className="text-sm text-muted-foreground">
              Version: {systemInfo?.data?.version ?? "N/A"} — Node:{" "}
              {systemInfo?.data?.nodeVersion ?? "N/A"}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-muted-foreground">
              Full settings management UI coming soon.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
