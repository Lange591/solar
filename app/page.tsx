import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Phone,
  SunMedium,
  BatteryCharging,
  Droplets,
  Wrench,
  Zap,
  ClipboardCheck,
  ShieldCheck,
  Leaf,
  Wallet,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { CtaSection } from "@/components/cta-section"
import { services, steps, gallery, site } from "@/lib/site"

const iconMap = { SunMedium, BatteryCharging, Droplets, Wrench, Zap, ClipboardCheck }

const stats = [
  { value: "150+", label: "Systems installed" },
  { value: "10+", label: "Years experience" },
  { value: "100%", label: "Clean energy" },
  { value: "24/7", label: "Backup power" },
]

const reasons = [
  {
    icon: ShieldCheck,
    title: "Certified Engineers",
    desc: "Qualified electrical engineers handle every installation to the highest safety standards.",
  },
  {
    icon: Wallet,
    title: "Real Savings",
    desc: "Slash your ZESA bills and protect yourself from rising electricity costs for years.",
  },
  {
    icon: Leaf,
    title: "Clean & Reliable",
    desc: "Quality monocrystalline panels and lithium storage that deliver power day and night.",
  },
  {
    icon: Clock,
    title: "Local & Responsive",
    desc: "Based in Mutare, we offer fast support and aftercare you can actually rely on.",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <Image
            src={gallery[3].src || "/placeholder.svg"}
            alt="Solar panel installation on a home roof in Mutare"
            fill
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent">
              <SunMedium className="size-4" />
              Solar &amp; Electrical Experts in Mutare
            </span>
            <h1 className="mt-6 font-heading text-balance text-4xl font-extrabold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              {site.tagline}
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
              From rooftop solar and battery backup to full electrical installations, Solar
              Universe helps homes and businesses across Manicaland take control of their power.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                render={<Link href="/contact" />}
                nativeButton={false}
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Get a Free Quote
                <ArrowRight className="size-4" />
              </Button>
              <Button
                render={<a href={`tel:${site.phoneIntl}`} />}
                nativeButton={false}
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Phone className="size-4" />
                {`Call ${site.phone}`}
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-primary-foreground/15 shadow-2xl">
              <Image
                src={gallery[0].src || "/placeholder.svg"}
                alt={gallery[0].alt}
                width={720}
                height={540}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative border-t border-primary-foreground/15">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 sm:px-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="px-2 py-8 text-center">
                <div className="font-heading text-3xl font-bold text-accent sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-primary-foreground/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-wider text-accent">
            What we do
          </span>
          <h2 className="mt-2 font-heading text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Complete solar and electrical solutions
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            One trusted team for everything from panels and batteries to wiring and water heating.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap]
            return (
              <div
                key={service.title}
                className="group rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.summary}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Button render={<Link href="/services" />} nativeButton={false} variant="outline" size="lg">
            View all services
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-2xl border border-border shadow-md">
              <Image
                src={gallery[6].src || "/placeholder.svg"}
                alt={gallery[6].alt}
                width={720}
                height={620}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <span className="font-heading text-sm font-semibold uppercase tracking-wider text-accent">
                Why Solar Universe
              </span>
              <h2 className="mt-2 font-heading text-balance text-3xl font-bold text-foreground sm:text-4xl">
                Power you can depend on, expertise you can trust
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                We combine engineering know-how with quality components to deliver systems that
                keep working long after the install is done.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {reasons.map((r) => (
                  <div key={r.title} className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <r.icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{r.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {r.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-wider text-accent">
            How it works
          </span>
          <h2 className="mt-2 font-heading text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Going solar in four simple steps
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="relative rounded-xl border border-border bg-card p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-accent font-heading text-lg font-bold text-accent-foreground">
                {i + 1}
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent work preview */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-heading text-sm font-semibold uppercase tracking-wider text-accent">
                Recent work
              </span>
              <h2 className="mt-2 font-heading text-balance text-3xl font-bold text-foreground sm:text-4xl">
                Installations across Mutare
              </h2>
            </div>
            <Button render={<Link href="/projects" />} nativeButton={false} variant="outline">
              View gallery
              <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.slice(0, 4).map((item) => (
              <div
                key={item.src}
                className="group relative aspect-square overflow-hidden rounded-xl border border-border"
              >
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
