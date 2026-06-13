import { Quote } from "lucide-react"
import { testimonials } from "@/lib/site"

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-heading text-sm font-semibold uppercase tracking-wider text-accent">
          What clients say
        </span>
        <h2 className="mt-2 font-heading text-balance text-3xl font-bold text-foreground sm:text-4xl">
          Trusted by homes and businesses across Manicaland
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <Quote className="size-8 text-accent" />
            <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-foreground">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <div className="flex size-11 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground">
                {t.initials}
              </div>
              <div>
                <div className="font-heading font-semibold text-foreground">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.location}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
