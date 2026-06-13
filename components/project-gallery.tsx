"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { gallery } from "@/lib/site"

const categories = ["All", "Rooftop Solar", "Inverters & Batteries", "Solar Water Heating"] as const

export function ProjectGallery() {
  const [active, setActive] = useState<(typeof categories)[number]>("All")

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: gallery.length }
    for (const item of gallery) {
      const c = (item as { category?: string }).category ?? "Other"
      map[c] = (map[c] ?? 0) + 1
    }
    return map
  }, [])

  const filtered = useMemo(
    () =>
      active === "All"
        ? gallery
        : gallery.filter((g) => (g as { category?: string }).category === active),
    [active],
  )

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
              active === cat
                ? "border-accent bg-accent text-accent-foreground shadow-md"
                : "border-border bg-card text-foreground hover:border-accent/50"
            }`}
          >
            {cat}
            {counts[cat] ? (
              <span
                className={`ml-2 text-xs ${
                  active === cat ? "text-accent-foreground/80" : "text-muted-foreground"
                }`}
              >
                {counts[cat]}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <figure
            key={item.src}
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.src || "/placeholder.svg"}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-primary/85 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">
                {(item as { category?: string }).category}
              </span>
            </div>
            <figcaption className="px-5 py-4">
              <span className="font-heading font-semibold text-foreground">{item.label}</span>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.alt}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
