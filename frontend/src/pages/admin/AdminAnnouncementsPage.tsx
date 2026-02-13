import { useAnnouncements } from "@/hooks/use-announcements";

export default function AdminAnnouncementsPage() {
  const { isLoading } = useAnnouncements();

  if (isLoading) {
    return <p className="text-muted-foreground">Loading announcements...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Announcements</h1>
      </div>

      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        <p>Create, broadcast, and manage announcements to agents and users.</p>
        <p className="mt-1 text-sm">Full announcements UI coming soon.</p>
      </div>
    </div>
  );
}
