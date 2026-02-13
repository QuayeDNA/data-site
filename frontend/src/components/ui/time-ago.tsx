import { formatDistanceToNow } from "date-fns"

interface TimeAgoProps {
  date: Date | string | number
  className?: string
  addSuffix?: boolean
}

export function TimeAgo({ date, className, addSuffix = true }: TimeAgoProps) {
  const dateObj = new Date(date)

  if (isNaN(dateObj.getTime())) {
    return <span className={className}>Invalid date</span>
  }

  const timeAgo = formatDistanceToNow(dateObj, { addSuffix })

  return <span className={className}>{timeAgo}</span>
}