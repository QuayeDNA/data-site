import { useOrders } from "@/hooks/use-orders";

export default function OrdersPage() {
  const { data, isLoading } = useOrders();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Orders</h1>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-muted-foreground">
            {data?.total ?? 0} orders found. Full order management UI coming soon.
          </p>
        </div>
      )}
    </div>
  );
}
