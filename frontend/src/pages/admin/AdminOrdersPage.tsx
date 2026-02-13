import { useOrders } from "@/hooks/use-orders";

export default function AdminOrdersPage() {
  const { isLoading } = useOrders();

  if (isLoading) {
    return <p className="text-muted-foreground">Loading orders...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Order Management</h1>
      </div>

      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        <p>Process, approve, and manage all platform orders here.</p>
        <p className="mt-1 text-sm">Full order management UI coming soon.</p>
      </div>
    </div>
  );
}
