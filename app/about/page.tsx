import type { Metadata } from "next"
import Image from "next/image"
import { Target, Eye, Heart, CheckCircle2 } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { CtaSection } from "@/components/cta-section"
import { gallery } from "@/lib/site"

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

      <CtaSection />
    </>
  )
}
