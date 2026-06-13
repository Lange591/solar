import Link from "next/link"
import Logo from "@/components/logo"
import { Phone, MapPin, Mail } from "lucide-react"
import { navLinks, site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <Logo className="mb-4" />
          <p className="text-sm text-muted-foreground">
            {site.description}
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Navigation</h4>
          <ul className="space-y-2 text-sm">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> {site.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> {site.email}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {site.address}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}