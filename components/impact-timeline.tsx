import { CountUp } from "@/components/count-up"
import { impact, milestones } from "@/lib/site"

export function ImpactTimeline() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {impact.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <CountUp
                end={s.value}
                suffix={s.suffix}
                className="block font-heading text-4xl font-extrabold text-accent"
              />
              <div className="mt-2 text-sm text-primary-foreground/70">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-center font-heading text-balance text-3xl font-bold sm:text-4xl">
            Our journey so far
          </h2>

          <ol className="relative mt-12 border-l border-white/15 pl-8 sm:mx-auto sm:max-w-2xl">
            {milestones.map((m) => (
              <li key={m.year} className="relative mb-10 last:mb-0">
                <span className="absolute -left-[41px] flex size-5 items-center justify-center rounded-full border-2 border-accent bg-primary">
                  <span className="size-2 rounded-full bg-accent" />
                </span>
                <div className="font-heading text-sm font-bold uppercase tracking-wider text-accent">
                  {m.year}
                </div>
                <h3 className="mt-1 font-heading text-lg font-bold">{m.title}</h3>
                <p className="mt-1 leading-relaxed text-primary-foreground/70">{m.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
