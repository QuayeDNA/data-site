import { useAnalyticsSummary, useAnalyticsCharts } from "@/hooks/use-analytics";
import { useState } from "react";
import type { TimeframeParam } from "@/types";

const TIMEFRAMES: { label: string; value: TimeframeParam["timeframe"] }[] = [
  { label: "7 days", value: "7d" },
  { label: "30 days", value: "30d" },
  { label: "90 days", value: "90d" },
  { label: "1 year", value: "1y" },
];

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] =
    useState<TimeframeParam["timeframe"]>("30d");

  const { data: _summary, isLoading: loadingSummary } = useAnalyticsSummary({
    timeframe,
  });
  const { data: _charts, isLoading: loadingCharts } = useAnalyticsCharts({
    timeframe,
  });

  const isLoading = loadingSummary || loadingCharts;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <div className="flex gap-2">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf.value}
              type="button"
              onClick={() => setTimeframe(tf.value)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                timeframe === tf.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-muted-foreground">
            Analytics data loaded. Full charts and visualizations coming soon.
          </p>
        </div>
      )}
    </div>
  );
}
