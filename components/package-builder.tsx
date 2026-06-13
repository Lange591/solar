"use client"

import { useState } from "react"
import { Check, Zap, BatteryCharging, Sun, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { packages } from "@/lib/site"

export function PackageBuilder() {
  const [active, setActive] = useState(packages.findIndex((p) => p.popular) || 1)
  const pkg = packages[active]

  return (
    <section className="bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-wider text-accent">
            Build your system
          </span>
          <h2 className="mt-2 font-heading text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Find the right size for your home
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Select a package to see exactly what it powers, how long it lasts through load-shedding
            and where pricing starts. Every system is still tailored to your site.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {packages.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`relative rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                active === i
                  ? "border-accent bg-accent text-accent-foreground shadow-md"
                  : "border-border bg-card text-foreground hover:border-accent/50"
              }`}
            >
              {p.name}
              <span className={`ml-2 text-xs ${active === i ? "text-accent-foreground/80" : "text-muted-foreground"}`}>
                {p.size}
              </span>
              {p.popular && (
                <span className="absolute -top-2 -right-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
                  Popular
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-lg sm:p-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-4xl font-extrabold text-foreground">{pkg.size}</span>
              <span className="text-sm font-medium text-muted-foreground">{pkg.name} system</span>
            </div>
            <p className="mt-3 leading-relaxed text-muted-foreground">{pkg.bestFor}</p>

            <div className="mt-6 space-y-3">
              <Spec icon={Zap} label="Inverter" value={pkg.inverter} />
              <Spec icon={BatteryCharging} label="Battery" value={pkg.battery} />
              <Spec icon={Sun} label="Panels" value={pkg.panels} />
              <Spec icon={Clock} label="Backup" value={pkg.backup} />
            </div>

            <div className="mt-6 rounded-xl bg-secondary/60 p-4">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Starting from
              </span>
              <div className="font-heading text-3xl font-bold text-accent">
                ${pkg.priceFrom.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-heading text-lg font-bold text-foreground">What it comfortably powers</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {pkg.appliances.map((a) => (
                <li
                  key={a}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground"
                >
                  <Check className="size-5 shrink-0 text-accent" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="flex-1">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Get a quote for {pkg.size}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <a href="#" className="flex-1">
                <Button variant="outline" className="w-full">
                  Not sure? Get advice
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
        <Icon className="size-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold text-foreground">{value}</div>
      </div>
    </div>
  )
}
