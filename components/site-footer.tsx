import Link from "next/link"
import { Phone, MapPin, Mail } from "lucide-react"
import { Logo } from "@/components/logo"
import { navLinks, site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="rounded-lg bg-background/95 px-3 py-2 w-fit">
            <Logo />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/80">
            Solar installation, energy consulting and electrical engineering for homes and
            businesses across Mutare and Manicaland.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-accent">
            Quick Links
          </h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-primary-foreground/80 transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-accent">
            Get In Touch
          </h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-accent" />
              <a href={`tel:${site.phoneIntl}`} className="hover:text-accent">
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-accent" />
              <a href={`mailto:${site.email}`} className="hover:text-accent">
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 shrink-0 text-accent" />
              <span className="text-primary-foreground/80">{site.location}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-primary-foreground/70 sm:px-6">
          {`© ${new Date().getFullYear()} Solar Universe. All rights reserved.`}
        </div>
      </div>
    </footer>
  )
}
