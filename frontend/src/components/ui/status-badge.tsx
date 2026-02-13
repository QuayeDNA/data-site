import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: string
  className?: string
}

const statusVariants = {
  // Order statuses
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  failed: "bg-red-100 text-red-800 border-red-200",
  cancelled: "bg-gray-100 text-gray-800 border-gray-200",
  refunded: "bg-purple-100 text-purple-800 border-purple-200",

  // User statuses
  active: "bg-green-100 text-green-800 border-green-200",
  inactive: "bg-gray-100 text-gray-800 border-gray-200",
  suspended: "bg-red-100 text-red-800 border-red-200",

  // Payment statuses
  paid: "bg-green-100 text-green-800 border-green-200",
  unpaid: "bg-red-100 text-red-800 border-red-200",
  partial: "bg-yellow-100 text-yellow-800 border-yellow-200",

  // Default
  default: "bg-gray-100 text-gray-800 border-gray-200",
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = statusVariants[status.toLowerCase() as keyof typeof statusVariants] || statusVariants.default

  return (
    <Badge
      variant="outline"
      className={cn(variant, "capitalize", className)}
    >
      {status}
    </Badge>
  )
}