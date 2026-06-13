import type { Metadata } from "next"
import Image from "next/image"
import { PageHero } from "@/components/page-hero"
import { CtaSection } from "@/components/cta-section"
import { gallery } from "@/lib/site"

export const metadata: Metadata = {
  title: "Projects | Solar Universe Mutare",
  description:
    "A gallery of solar panel, inverter and battery installations completed by Solar Universe across Mutare and Manicaland, Zimbabwe.",
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Completed installations"
        description="A look at recent rooftop arrays, inverter setups and battery storage systems we have installed for homes and businesses in Mutare."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item) => (
            <figure
              key={item.src}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <figcaption className="px-5 py-4">
                <span className="font-heading font-semibold text-foreground">{item.label}</span>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.alt}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  )
}