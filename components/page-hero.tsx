import { EnergyGrid } from "@/components/energy-grid"

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      <EnergyGrid />

      <div className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 md:py-32 lg:py-40">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-5 py-2 text-sm font-medium text-accent backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          {eyebrow}
        </div>
        <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80 sm:text-xl">
          {description}
        </p>
      </div>
    </section>
  )
}