import { useState } from "react";
import { useAnalyticsSummary, useAnalyticsCharts } from "@/hooks/use-analytics";

export default function AdminAnalyticsPage() {
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d" | "1y">("30d");
  const { isLoading: loadingSummary } = useAnalyticsSummary({ timeframe });
  const { isLoading: loadingCharts } = useAnalyticsCharts({ timeframe });

  const isLoading = loadingSummary || loadingCharts;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Platform Analytics</h1>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value as "7d" | "30d" | "90d" | "1y")}
          className="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading analytics...</p>
      ) : (
        <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
          <p>Platform-wide analytics: revenue, orders, user growth, and performance metrics.</p>
          <p className="mt-1 text-sm">Full analytics dashboard UI coming soon.</p>
        </div>
      )}
    </div>
  );
}
