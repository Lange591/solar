import type { Metadata } from "next"
import {
  SunMedium,
  BatteryCharging,
  Droplets,
  Wrench,
  Zap,
  ClipboardCheck,
  CheckCircle2,
} from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { CtaSection } from "@/components/cta-section"
import { PackageBuilder } from "@/components/package-builder"
import { services } from "@/lib/site"

export const metadata: Metadata = {
  title: "Services | Solar Universe Mutare",
  description:
    "Solar panel installation, battery storage, solar water heating, electrical engineering, maintenance and energy consulting in Mutare, Zimbabwe.",
}

const iconMap = { SunMedium, BatteryCharging, Droplets, Wrench, Zap, ClipboardCheck }

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Solar & electrical services"
        description="End-to-end solutions for clean, reliable power. Whatever your energy challenge, our Mutare team has you covered."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap]
            return (
              <div
                key={service.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm"
              >
                <div className="flex size-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-7" />
                </div>
                <h2 className="mt-6 font-heading text-2xl font-bold text-foreground">
                  {service.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{service.summary}</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      <CtaSection />
    </>
  )
}
