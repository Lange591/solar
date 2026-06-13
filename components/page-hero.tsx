import { EnergyGrid } from "@/components/energy-grid"

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary">
      <EnergyGrid />

      <div className="relative mx-auto max-w-6xl px-4 py-20 text-center">
        <span className="font-heading text-sm uppercase tracking-wider text-accent">
          {eyebrow}
        </span>
        <h1 className="mt-4 text-4xl font-extrabold text-primary-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
          {description}
        </p>
      </div>
    </section>
  )
}