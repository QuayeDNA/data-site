import {
  useNotifications,
  useMarkAllNotificationsRead,
} from "@/hooks/use-notifications";

export default function NotificationsPage() {
  const { data, isLoading } = useNotifications();
  const markAllRead = useMarkAllNotificationsRead();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
        <button
          type="button"
          onClick={() => markAllRead.mutate()}
          disabled={markAllRead.isPending}
          className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-50"
        >
          Mark all as read
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : data?.data && data.data.length > 0 ? (
        <div className="space-y-2">
          {data.data.map((n) => (
            <div
              key={n._id}
              className={`rounded-lg border p-4 ${
                n.isRead
                  ? "border-border bg-card"
                  : "border-primary/30 bg-primary/5"
              }`}
            >
              <p className="font-medium text-foreground">{n.title}</p>
              <p className="text-sm text-muted-foreground">{n.message}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-6 text-center">
          <p className="text-muted-foreground">No notifications.</p>
        </div>
      )}
    </div>
  );
}
