import { MapPin } from "lucide-react"
import { coverage } from "@/lib/site"

export function Coverage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-heading text-sm font-semibold uppercase tracking-wider text-accent">
          Where we work
        </span>
        <h2 className="mt-2 font-heading text-balance text-3xl font-bold text-foreground sm:text-4xl">
          Serving Mutare and all of Manicaland
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          From city suburbs to remote farms, our team deploys reliable solar and electrical
          solutions wherever you are.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {coverage.map((c) => (
          <div
            key={c.title}
            className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              <MapPin className="size-6" />
            </div>
            <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
