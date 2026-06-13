import type { Metadata } from "next"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { ContactForm } from "@/components/contact-form"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact | Solar Universe Mutare",
  description:
    "Get in touch with Solar Universe in Mutare for a free solar consultation and quotation.",
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s power your project"
        description="Speak directly with qualified solar and electrical engineers in Mutare. Free consultation, honest advice."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* LEFT */}
          <div>
            <h2 className="font-heading text-2xl font-bold">
              Contact details
            </h2>

            <div className="mt-6 space-y-4">
              <a
                href={`tel:${site.phoneIntl}`}
                className="flex items-center gap-4 rounded-xl border p-4 hover:shadow-md"
              >
                <Phone className="text-accent" />
                <span>{site.phone}</span>
              </a>

              <a
                href={`https://wa.me/${site.phoneIntl.replace("+", "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-xl border p-4 hover:shadow-md"
              >
                <MessageCircle className="text-green-500" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-4 rounded-xl border p-4 hover:shadow-md"
              >
                <Mail className="text-accent" />
                <span>{site.email}</span>
              </a>

              <div className="flex items-center gap-4 rounded-xl border p-4">
                <MapPin className="text-accent" />
                <span>{site.location}</span>
              </div>

              <div className="flex items-center gap-4 rounded-xl border p-4">
                <Clock className="text-accent" />
                <span>Mon – Sat, 8:00 – 17:00</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <ContactForm />
        </div>
      </section>
    </>
  )
}