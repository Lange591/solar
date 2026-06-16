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
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { CtaSection } from "@/components/cta-section"
import { services, steps, gallery, site } from "@/lib/site"
import { EnergyGrid } from "@/components/energy-grid"
import { CountUp } from "@/components/count-up"
import { SavingsCalculator } from "@/components/savings-calculator"
import { LiveMonitor } from "@/components/live-monitor"
import { Coverage } from "@/components/coverage"
import { Testimonials } from "@/components/testimonials"
import { Faq } from "@/components/faq"
import { Reveal } from "@/components/reveal"
import { Parallax } from "@/components/parallax"

const iconMap = { SunMedium, BatteryCharging, Droplets, Wrench, Zap, ClipboardCheck }

const stats = [
  { value: 150, suffix: "+", label: "Systems installed", icon: ShieldCheck },
  { value: 10, suffix: "+", label: "Years experience", icon: Sparkles },
  { value: 100, suffix: "%", label: "Clean energy", icon: Leaf },
  { value: 24, suffix: "/7", label: "Backup power", icon: BatteryCharging },
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
                      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black">
        <EnergyGrid />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:items-center">
          <div className="animate-rise">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Solar &amp; Electrical Experts in Mutare
            </div>
            <h1 className="mt-6 font-heading text-balance text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Powering Mutare with <span className="text-accent">Clean, Reliable</span> Solar Energy
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-gray-300">
              From rooftop solar and battery backup to full electrical installations, Solar
              Universe helps homes and businesses across Manicaland take control of their power.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-base rounded-full font-semibold shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-[1.03]">
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <a href={`tel:${site.phoneIntl}`}>
                <Button size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 px-8 py-6 text-base rounded-full backdrop-blur-sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call {site.phone}
                </Button>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent" /> Certified engineers
              </span>
              <span className="flex items-center gap-2">
                <BatteryCharging className="h-4 w-4 text-accent" /> Load-shedding ready
              </span>
              <span className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-accent" /> 100% clean energy
              </span>
            </div>
          </div>

          <div className="relative animate-rise [animation-delay:120ms]">
            {/* @ Lange coding */}
            <Parallax speed={0.28} className="pointer-events-none absolute -inset-10">
              <div
                aria-hidden
                className="animate-spin-slow absolute inset-0 rounded-full opacity-60 blur-2xl"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(234,179,8,0.18), transparent 40%, rgba(234,179,8,0.12) 70%, transparent)",
                }}
              />
            </Parallax>
            <div className="relative overflow-hidden rounded-3xl border border-accent/25 shadow-2xl ring-1 ring-white/10">
              <Image
                src={gallery[0].src || "/placeholder.svg"}
                alt={gallery[0].alt}
                width={720}
                height={540}
                className="h-full w-full object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            {/* @ Lange coding */}
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-gray-900/80 px-4 py-3 shadow-xl backdrop-blur-md sm:-bottom-5 sm:-left-5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Sparkles className="size-5" />
              </div>
              <div>
                <div className="font-heading text-lg font-bold leading-none text-white">150+</div>
                <div className="mt-1 text-xs text-gray-400">Systems installed</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <div className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:px-6 md:grid-cols-4">
            {stats.map((s, i) => {
              const Icon = s.icon
              return (
                <div
                  key={s.label}
                  className={`px-2 py-8 text-center ${i !== 0 ? "border-l border-white/10" : ""} ${
                    i === 2 ? "border-l-0 md:border-l" : ""
                  }`}
                >
                  <Icon className="mx-auto h-8 w-8 text-accent" />
                  <CountUp
                    end={s.value}
                    suffix={s.suffix}
                    className="mt-2 block font-heading text-3xl font-bold text-accent sm:text-4xl"
                  />
                  <div className="mt-1 text-sm text-gray-400">{s.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-wider text-accent">
            What we do
          </span>
          <h2 className="mt-2 font-heading text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Complete solar and electrical solutions
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            One trusted team for everything from panels and batteries to wiring and water heating.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap]
            return (
              <Reveal
                key={service.title}
                delay={(i % 3) * 90}
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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
              </Reveal>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/services">
            <Button variant="outline" size="lg">
              View all services
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal direction="right" className="overflow-hidden rounded-2xl border border-border shadow-md">
              <Image
                src={gallery[6].src || "/placeholder.svg"}
                alt={gallery[6].alt}
                width={720}
                height={620}
                className="h-full w-full object-cover"
              />
            </Reveal>
            <Reveal direction="left" delay={120}>
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
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-wider text-accent">
            How it works
          </span>
          <h2 className="mt-2 font-heading text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Going solar in four simple steps
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 90}
              className="relative rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-accent font-heading text-lg font-bold text-accent-foreground">
                {i + 1}
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <SavingsCalculator />

      <LiveMonitor />

      <section className="bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-heading text-sm font-semibold uppercase tracking-wider text-accent">
                Recent work
              </span>
              <h2 className="mt-2 font-heading text-balance text-3xl font-bold text-foreground sm:text-4xl">
                Installations across Mutare
              </h2>
            </div>
            <Link href="/projects">
              <Button variant="outline">
                View gallery
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </Link>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.slice(0, 4).map((item, i) => (
              <Reveal
                key={item.src}
                delay={i * 80}
                className="group relative aspect-square overflow-hidden rounded-xl border border-border"
              >
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <Coverage />

      <Faq />

      <CtaSection />
    </>
  )
}
