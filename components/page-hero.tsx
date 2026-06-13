export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <section className="border-b border-border bg-gradient-to-b from-primary to-primary/90">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 md:py-20">
        <span className="font-heading text-sm font-semibold uppercase tracking-wider text-accent">
          {eyebrow}
        </span>
        <h1 className="mt-3 font-heading text-balance text-4xl font-extrabold text-primary-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/80">
          {description}
        </p>
      </div>
    </section>
  )
}
