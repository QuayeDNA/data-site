import { useWalletInfo } from "@/hooks/use-wallet";

export default function AdminWalletPage() {
  const { isLoading } = useWalletInfo();

  if (isLoading) {
    return <p className="text-muted-foreground">Loading wallet data...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Wallet Administration</h1>
      </div>

      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        <p>Process top-up requests, manage agent balances, and view transaction history.</p>
        <p className="mt-1 text-sm">Full wallet admin UI coming soon.</p>
      </div>
    </div>
  );
}
