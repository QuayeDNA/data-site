import { useAgentCommissions, useCurrentMonthCommissionStats } from "@/hooks/use-commissions";
import { useAuth } from "@/contexts/AuthContext";

export default function CommissionsPage() {
  const { hasRole } = useAuth();
  const isBusiness = hasRole("agent", "super_agent", "dealer", "super_dealer");

  const { data: _commissions, isLoading: loadingCommissions } =
    useAgentCommissions();
  const { data: _monthStats, isLoading: loadingStats } =
    useCurrentMonthCommissionStats();

  const isLoading = loadingCommissions || loadingStats;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Commissions</h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-muted-foreground">
            {isBusiness ? "Your" : "All"} commissions loaded. Full commission management UI coming soon.
          </p>
        </div>
      )}
    </div>
  );
}
