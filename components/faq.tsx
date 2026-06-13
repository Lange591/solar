"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { faqs } from "@/lib/site"

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-secondary/50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-wider text-accent">
            Good to know
          </span>
          <h2 className="mt-2 font-heading text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-heading font-semibold text-foreground">{item.q}</span>
                  <Plus
                    className={`size-5 shrink-0 text-accent transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 leading-relaxed text-muted-foreground">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
