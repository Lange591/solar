import Link from "next/link"
import Logo from "@/components/logo"
import { navLinks, site } from "@/lib/site"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* ONE Link only */}
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        <nav className="hidden gap-6 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button asChild>
          <Link href={site.cta.href}>{site.cta.label}</Link>
        </Button>
      </div>
    </header>
  )
}