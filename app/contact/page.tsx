import { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { ContactForm } from "@/components/contact-form"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact Solar Universe | Get a Solar Quote in Mutare",
  description:
    "Contact Solar Universe for professional solar installation, inverters and battery systems in Mutare, Zimbabwe.",
}

export default function ContactPage() {
  return (
    <>
      
      <PageHero
        title="Contact Solar Universe"
        description="Get in touch with us for solar installations, inverter systems and battery storage solutions."
      />

     
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          
          {/* LEFT: CONTACT DETAILS */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold">
              Get in Touch
            </h2>

            <p className="mb-6 text-muted-foreground">
              Fill in the form and we’ll respond quickly with a quotation or advice
              tailored to your needs.
            </p>

            <ul className="space-y-4 text-sm">
              <li>
                <strong>Phone / WhatsApp:</strong>{" "}
                <a
                  href={`https://wa.me/${site.phoneIntl.replace("+", "")}`}
                  className="text-primary underline"
                >
                  {site.phone}
                </a>
              </li>

              <li>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-primary underline"
                >
                  {site.email}
                </a>
              </li>

              <li>
                <strong>Location:</strong> Mutare, Zimbabwe
              </li>
            </ul>

          
            <div className="mt-10 overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Solar Universe Mutare"
                src="https://www.google.com/maps?q=Mutare,Zimbabwe&output=embed"
                className="h-[300px] w-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          
          <div>
            <ContactForm />
          </div>

        </div>
      </section>
    </>
  )
}
