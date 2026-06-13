import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Target, Eye, Heart, CheckCircle2, Phone } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { CtaSection } from "@/components/cta-section"
import { Button } from "@/components/ui/button"
import { gallery, team, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "About | Solar Universe Mutare",
  description:
    "Solar Universe is a Mutare-based solar and electrical engineering company helping Zimbabwean homes and businesses switch to clean, reliable energy.",
}

const values = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To make clean, dependable solar power accessible and affordable for every home and business in Manicaland.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "A Zimbabwe where reliable energy is no longer a luxury and load-shedding is a thing of the past.",
  },
  {
    icon: Heart,
    title: "Our Values",
    desc: "Honest advice, quality workmanship and genuine aftercare on every single project we take on.",
  },
]

const commitments = [
  "Quality monocrystalline panels and lithium batteries",
  "Installations by certified electrical engineers",
  "Transparent pricing with no hidden costs",
  "Ongoing maintenance and responsive support",
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Your local solar partner in Mutare"
        description="Solar Universe is built on engineering expertise and a simple belief: everyone deserves reliable, clean power."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-2xl border border-border shadow-md">
            <Image
              src={gallery[4].src || "/placeholder.svg"}
              alt={gallery[4].alt}
              width={720}
              height={620}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-heading text-balance text-3xl font-bold text-foreground sm:text-4xl">
              Powering Zimbabwe, one rooftop at a time
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Based in Mutare, Solar Universe specialises in solar installation, battery storage
              and electrical engineering for residential and commercial clients across Manicaland.
              We were founded to solve a problem every Zimbabwean knows too well: unreliable power.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              From a single solar geyser to a full off-grid hybrid system, we design and install
              solutions that are built to last, then stand behind them with dependable support.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {commitments.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <v.icon className="size-6" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-foreground">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-wider text-accent">
            The team
          </span>
          <h2 className="mt-2 font-heading text-balance text-3xl font-bold text-foreground sm:text-4xl">
            The people behind every install
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Real engineers on real rooftops. When you call Solar Universe, you speak to the same
            people who design, fit and commission your system.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <figure
              key={member.name}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={`${member.role} of Solar Universe on site`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <div className="font-heading text-lg font-bold text-white">{member.role}</div>
                  <p className="mt-1 text-sm leading-relaxed text-white/80">{member.bio}</p>
                </figcaption>
              </div>
            </figure>
          ))}

          <div className="flex flex-col justify-center rounded-2xl border border-dashed border-border bg-secondary/40 p-8 text-center">
            <h3 className="font-heading text-lg font-bold text-foreground">Talk to a real engineer</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Have a question about your roof, your bill or your backup needs? We are happy to give
              honest, no-pressure advice.
            </p>
            <a href={`tel:${site.phoneIntl}`} className="mt-6">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Phone className="size-4 mr-2" />
                Call {site.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
