"use client"

import { useEffect, useState } from "react"

const OPEN_HOUR = 8
const CLOSE_HOUR = 17
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function getStatus(now: Date) {
  const day = now.getDay()
  const hour = now.getHours()
  const isWorkday = day >= 1 && day <= 6
  const open = isWorkday && hour >= OPEN_HOUR && hour < CLOSE_HOUR

  if (open) {
    const closesIn = CLOSE_HOUR - hour
    return { open: true, message: `Open now · closes at ${CLOSE_HOUR}:00 (${closesIn}h left)` }
  }

  let nextDay = day
  let label = "tomorrow"
  if (isWorkday && hour < OPEN_HOUR) {
    label = "today"
  } else {
    do {
      nextDay = (nextDay + 1) % 7
    } while (nextDay === 0)
    label = nextDay === (day + 1) % 7 ? "tomorrow" : days[nextDay]
  }
  return { open: false, message: `Closed · opens ${label} at ${OPEN_HOUR}:00` }
}

export function LiveStatus() {
  const [status, setStatus] = useState<{ open: boolean; message: string } | null>(null)

  useEffect(() => {
    const tick = () => setStatus(getStatus(new Date()))
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])

  if (!status) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
        <span className="size-2.5 rounded-full bg-muted-foreground/40" />
        Checking hours…
      </div>
    )
  }

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium ${
        status.open
          ? "border-accent/40 bg-accent/10 text-foreground"
          : "border-border bg-card text-muted-foreground"
      }`}
      role="status"
    >
      <span className="relative flex size-2.5">
        {status.open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        )}
        <span
          className={`relative inline-flex size-2.5 rounded-full ${
            status.open ? "bg-accent" : "bg-muted-foreground/50"
          }`}
        />
      </span>
      {status.message}
    </div>
  )
}
