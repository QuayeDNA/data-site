import { cn } from "@/lib/utils"

interface CurrencyDisplayProps {
  amount: number
  className?: string
  showSymbol?: boolean
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

export function CurrencyDisplay({
  amount,
  className,
  showSymbol = true,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
}: CurrencyDisplayProps) {
  const formatted = new Intl.NumberFormat("en-GH", {
    style: showSymbol ? "currency" : "decimal",
    currency: "GHS",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount)

  return (
    <span className={cn("font-medium", className)}>
      {formatted}
    </span>
  )
}