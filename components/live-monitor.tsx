"use client"

import { useEffect, useRef, useState } from "react"
import { Sun, BatteryCharging, Home, Zap, Activity } from "lucide-react"

// @ Lange coding
function solarCurve(hour: number) {
  // Bell-shaped generation curve peaking at solar noon (13:00)
  const peak = 13
  const spread = 3.4
  const v = Math.exp(-((hour - peak) ** 2) / (2 * spread ** 2))
  return hour > 5.5 && hour < 19 ? v : 0
}

type Snapshot = {
  hour: number
  solarKw: number
  loadKw: number
  batteryPct: number
  toGrid: number
  fromBattery: number
}

const MAX_SOLAR = 7.5

function FlowLine({
  active,
  reverse = false,
  className = "",
}: {
  active: boolean
  reverse?: boolean
  className?: string
}) {
  return (
    <div className={`relative h-px flex-1 overflow-hidden rounded-full bg-white/10 ${className}`}>
      <span
        aria-hidden
        className={`absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-0"
        } ${reverse ? "animate-flow-reverse" : "animate-flow"}`}
        style={{ boxShadow: "0 0 8px var(--color-accent)" }}
      />
    </div>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
  unit,
  tone,
}: {
  icon: typeof Sun
  label: string
  value: string
  unit: string
  tone: "accent" | "green" | "white"
}) {
  const toneClass =
    tone === "accent" ? "text-accent" : tone === "green" ? "text-emerald-400" : "text-white"
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Icon className={`size-4 ${toneClass}`} />
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className={`font-heading text-2xl font-bold tabular-nums ${toneClass}`}>{value}</span>
        <span className="text-xs text-gray-400">{unit}</span>
      </div>
    </div>
  )
}

export function LiveMonitor() {
  const [snap, setSnap] = useState<Snapshot>({
    hour: 13,
    solarKw: 6.1,
    loadKw: 2.4,
    batteryPct: 78,
    toGrid: 3.7,
    fromBattery: 0,
  })
  const battery = useRef(78)
  const clock = useRef(13)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const tick = () => {
      // Advance simulated clock: ~1 simulated hour per second
      clock.current = (clock.current + 0.5) % 24
      const hour = clock.current

      const solarKw = +(solarCurve(hour) * MAX_SOLAR + (Math.random() - 0.5) * 0.3).toFixed(1)
      const safeSolar = Math.max(0, solarKw)

      // Household load: higher in the morning and evening
      const base = 1.6 + 1.4 * Math.exp(-((hour - 7.5) ** 2) / 6) + 1.9 * Math.exp(-((hour - 19) ** 2) / 5)
      const loadKw = +(base + Math.random() * 0.3).toFixed(1)

      const net = safeSolar - loadKw
      let toGrid = 0
      let fromBattery = 0

      if (net >= 0) {
        // Surplus charges the battery first, then exports
        const charge = Math.min(net, (100 - battery.current) / 100 * 4)
        battery.current = Math.min(100, battery.current + charge * 0.4)
        toGrid = +Math.max(0, net - charge).toFixed(1)
      } else {
        // Deficit is covered by the battery
        fromBattery = +Math.abs(net).toFixed(1)
        battery.current = Math.max(8, battery.current - Math.abs(net) * 0.5)
      }

      setSnap({
        hour,
        solarKw: safeSolar,
        loadKw,
        batteryPct: Math.round(battery.current),
        toGrid,
        fromBattery,
      })
    }

    tick()
    if (reduced.current) return
    const id = window.setInterval(tick, 1400)
    return () => window.clearInterval(id)
  }, [])

  const charging = snap.solarKw > snap.loadKw
  const timeLabel = `${String(Math.floor(snap.hour)).padStart(2, "0")}:${snap.hour % 1 >= 0.5 ? "30" : "00"}`

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(234,179,8,0.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(234,179,8,0.08), transparent 35%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live system monitor
          </span>
          <h2 className="mt-2 font-heading text-balance text-3xl font-bold text-white sm:text-4xl">
            See your solar working in real time
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-gray-300">
            Every system we install includes smart monitoring. Here&apos;s a simulated view of a
            typical 7.5kVA home — generation, storage and grid flow across the day.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-md sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <Activity className="size-4 text-emerald-400" />
              System online
            </div>
            <div className="font-heading text-sm tabular-nums text-gray-400">
              Simulated time <span className="text-accent">{timeLabel}</span>
            </div>
          </div>

          {/* @ Lange coding */}
          <div className="mt-6 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <Stat
              icon={Sun}
              label="Solar generation"
              value={snap.solarKw.toFixed(1)}
              unit="kW"
              tone="accent"
            />
            <FlowLine active={snap.solarKw > 0.1} className="hidden sm:block" />
            <div className="rounded-2xl border border-accent/30 bg-accent/10 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-accent">
                <Home className="size-4" /> Home load
              </div>
              <div className="mt-2 font-heading text-2xl font-bold tabular-nums text-white">
                {snap.loadKw.toFixed(1)}
                <span className="ml-1 text-xs font-normal text-gray-400">kW</span>
              </div>
            </div>
            <FlowLine
              active={snap.toGrid > 0.1 || snap.fromBattery > 0.1}
              reverse={snap.fromBattery > 0.1}
              className="hidden sm:block"
            />
            <Stat
              icon={Zap}
              label={snap.toGrid > 0.1 ? "Exporting to grid" : "Grid draw"}
              value={snap.toGrid > 0.1 ? snap.toGrid.toFixed(1) : "0.0"}
              unit="kW"
              tone="green"
            />
          </div>

          {/* @ Lange coding */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <BatteryCharging
                  className={`size-5 ${charging ? "text-emerald-400" : "text-accent"}`}
                />
                Battery storage
                <span className={charging ? "text-emerald-400" : "text-accent"}>
                  {charging ? "· charging" : snap.fromBattery > 0.1 ? "· discharging" : "· idle"}
                </span>
              </div>
              <span className="font-heading text-lg font-bold tabular-nums text-white">
                {snap.batteryPct}%
              </span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-emerald-400 transition-[width] duration-700 ease-out"
                style={{ width: `${snap.batteryPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
