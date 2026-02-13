import { useWalletInfo, useWalletTransactions } from "@/hooks/use-wallet";

export default function WalletPage() {
  const { data: walletInfo, isLoading: infoLoading } = useWalletInfo();
  const { data: txData, isLoading: txLoading } = useWalletTransactions();

  const isLoading = infoLoading || txLoading;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Wallet</h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <>
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Balance</p>
            <p className="text-3xl font-bold text-foreground">
              GHS {walletInfo?.data?.balance?.toFixed(2) ?? "0.00"}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-muted-foreground">
              {txData?.total ?? 0} transactions. Full wallet UI coming soon.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
