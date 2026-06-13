import Link from "next/link"
import Logo from "@/components/logo"
import { Phone, MapPin, Mail } from "lucide-react"
import { navLinks, site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-10 md:grid-cols-3">
        
        <div>
          <Logo className="mb-4" />
          <p className="text-sm text-muted-foreground">
            {site.description}
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline hover:text-accent transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Get in Touch</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" /> {site.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" /> {site.email}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" /> {site.location}
            </li>
          </ul>
        </div>

      </div>
      <div className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Solar Universe. All rights reserved.
        </div>
      </div>
    </footer>
  )
}