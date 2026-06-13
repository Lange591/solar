"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Calculator, TrendingDown, Sun, BatteryCharging, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const PROPERTY_OFFSET: Record<string, number> = {
  Residential: 0.82,
  Business: 0.7,
  "Farm / Off-grid": 0.95,
}

const SYSTEM_BY_BILL = [
  { max: 60, size: "3kVA", panels: 6 },
  { max: 120, size: "5kVA", panels: 10 },
  { max: 220, size: "7.5kVA", panels: 16 },
  { max: Infinity, size: "10kVA+", panels: 24 },
]

function recommendSystem(bill: number) {
  return SYSTEM_BY_BILL.find((s) => bill <= s.max) ?? SYSTEM_BY_BILL[SYSTEM_BY_BILL.length - 1]
}

export function SavingsCalculator() {
  const [bill, setBill] = useState(120)
  const [property, setProperty] = useState<keyof typeof PROPERTY_OFFSET>("Residential")

  const result = useMemo(() => {
    const offset = PROPERTY_OFFSET[property]
    const monthlySaving = Math.round(bill * offset)
    const yearlySaving = monthlySaving * 12
    const tenYearSaving = yearlySaving * 10
    const co2Tonnes = ((bill * offset * 12) / 1000) * 0.95
    const system = recommendSystem(bill)
    return { monthlySaving, yearlySaving, tenYearSaving, offset, co2Tonnes, system }
  }, [bill, property])

  return (
    <section className="bg-secondary/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-wider text-accent">
            Plan your savings
          </span>
          <h2 className="mt-2 font-heading text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Solar savings calculator
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Move the slider to your monthly electricity spend and see what going solar could save
            you — plus the system size we&apos;d recommend.
          </p>
        </div>

        <div className="mt-12 grid gap-6 overflow-hidden rounded-3xl border border-border bg-card shadow-lg lg:grid-cols-2">
          <div className="p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Calculator className="size-5" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">Your details</h3>
            </div>

            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <label htmlFor="bill" className="text-sm font-medium text-foreground">
                  Monthly electricity bill
                </label>
                <span className="font-heading text-2xl font-bold text-accent">${bill}</span>
              </div>
              <input
                id="bill"
                type="range"
                min={20}
                max={500}
                step={5}
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
                className="mt-4 w-full cursor-pointer accent-accent"
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>$20</span>
                <span>$500</span>
              </div>
            </div>

            <div className="mt-8">
              <span className="text-sm font-medium text-foreground">Property type</span>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {(Object.keys(PROPERTY_OFFSET) as Array<keyof typeof PROPERTY_OFFSET>).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setProperty(p)}
                    className={`rounded-lg border px-3 py-2.5 text-xs font-medium transition-colors ${
                      property === p
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-background text-foreground hover:border-accent/50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 rounded-xl border border-border bg-secondary/60 p-4">
              <Sun className="size-5 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Recommended system:{" "}
                <span className="font-semibold text-foreground">{result.system.size}</span> with
                roughly <span className="font-semibold text-foreground">{result.system.panels} panels</span>.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between bg-primary p-8 text-primary-foreground sm:p-10">
            <div>
              <div className="flex items-center gap-2 text-accent">
                <TrendingDown className="size-5" />
                <span className="font-heading text-sm font-semibold uppercase tracking-wider">
                  Estimated savings
                </span>
              </div>

              <div className="mt-6">
                <div className="text-sm text-primary-foreground/70">Per month</div>
                <div className="font-heading text-5xl font-extrabold text-white">
                  ${result.monthlySaving}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/10 p-4">
                  <div className="text-xs text-primary-foreground/70">Per year</div>
                  <div className="mt-1 font-heading text-2xl font-bold text-white">
                    ${result.yearlySaving.toLocaleString()}
                  </div>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  <div className="text-xs text-primary-foreground/70">Over 10 years</div>
                  <div className="mt-1 font-heading text-2xl font-bold text-white">
                    ${result.tenYearSaving.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/10 p-4">
                <BatteryCharging className="size-5 shrink-0 text-accent" />
                <p className="text-sm text-primary-foreground/80">
                  Around{" "}
                  <span className="font-semibold text-white">
                    {result.co2Tonnes.toFixed(1)} tonnes
                  </span>{" "}
                  of CO₂ avoided every year.
                </p>
              </div>
            </div>

            <Link href="/contact" className="mt-8">
              <Button
                size="lg"
                className="w-full rounded-full bg-accent font-semibold text-accent-foreground hover:bg-accent/90"
              >
                Get my exact quote
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <p className="mt-3 text-center text-xs text-primary-foreground/60">
              Estimates only. Final savings depend on your usage and site assessment.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
