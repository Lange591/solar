import Link from "next/link"
import { Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export function CtaSection() {
  return (
    <section className="bg-primary">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 md:py-20">
        <h2 className="font-heading text-balance text-3xl font-bold text-primary-foreground sm:text-4xl">
          Ready to cut your power bills and beat load-shedding?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/80">
          Get a free, no-obligation consultation. Our Mutare-based team will help you design a
          solar system that fits your home, business and budget.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button render={<Link href="/contact" />} nativeButton={false} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
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
    </section>
  )
}
