import Link from "next/link"
import { Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"
import { EnergyGrid } from "@/components/energy-grid"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      <EnergyGrid />

      <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 md:py-20">
        <h2 className="font-heading text-balance text-3xl font-bold text-primary-foreground sm:text-4xl">
          Ready to cut your power bills and beat load-shedding?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
          Get a free, no-obligation consultation. Our Mutare-based team will help you design a
          solar system that fits your home, business and budget.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/contact">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 font-semibold">
              Get a Free Quote
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </Link>
          <a href={`tel:${site.phoneIntl}`}>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-8"
            >
              <Phone className="size-4 mr-2" />
              Call {site.phone}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
