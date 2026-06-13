import type { Metadata } from "next"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { ContactForm } from "@/components/contact-form"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact | Solar Universe Mutare",
  description:
    "Get in touch with Solar Universe in Mutare for a free solar consultation and quote. Call 0770010502 or send us a message.",
}

const details = [
  {
    icon: Phone,
    label: "Call us",
    value: site.phone,
    href: `tel:${site.phoneIntl}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: site.phone,
    href: `https://wa.me/${site.phoneIntl.replace("+", "")}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: site.location,
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's power your project"
        description="Tell us what you need and we'll get back to you with friendly advice and a free, no-obligation quote."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">Get in touch</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Our Mutare team is ready to help you design the right solar or electrical solution.
              Reach out through whichever channel suits you best.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {details.map((d) => {
                const content = (
                  <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <d.icon className="size-5" />
                    </div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {d.label}
                      </div>
                      <div className="mt-1 font-medium text-foreground">{d.value}</div>
                    </div>
                  </div>
                )
                return d.href ? (
                  <a key={d.label} href={d.href} target={d.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {content}
                  </a>
                ) : (
                  <div key={d.label}>{content}</div>
                )
              })}
            </div>

            <div className="mt-6 flex items-start gap-4 rounded-xl border border-border bg-secondary/50 p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Clock className="size-5" />
              </div>
              <div>
                <div className="font-medium text-foreground">Business hours</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Monday – Saturday: 8:00 AM – 5:00 PM
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  )
}
