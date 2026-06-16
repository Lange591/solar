"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone } from "lucide-react"
import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ScrollProgress } from "@/components/scroll-progress"
import { navLinks, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Track scroll position so the header can condense and elevate on scroll,
  // mirroring the reference site's sticky-header transition.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 12)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-border bg-background/90 shadow-md shadow-black/5 supports-[backdrop-filter]:bg-background/75"
          : "border-transparent bg-background/60 supports-[backdrop-filter]:bg-background/40",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-4 transition-[height] duration-300 sm:px-6 lg:px-8",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <Logo sizeClassName={cn("w-auto transition-[height] duration-300", scrolled ? "h-10 md:h-11" : "h-12 md:h-14")} />

        {/* Pill-style nav with active-route indication */}
        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/60 px-2 py-1.5 shadow-sm backdrop-blur md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-foreground/75 hover:bg-muted hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${site.phoneIntl}`}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Phone className="h-4 w-4 text-accent" />
            {site.phone}
          </a>
          <Link href="/contact">
            <Button size="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get a Quote
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 transition-colors hover:bg-muted md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Scroll progress indicator sits along the header's bottom edge */}
      <ScrollProgress />

      <div
        className={cn(
          "fixed inset-x-0 z-40 border-b border-border bg-background/95 backdrop-blur transition-all duration-300 md:hidden",
          scrolled ? "top-16" : "top-20",
          mobileMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0",
        )}
      >
        <nav className="flex flex-col space-y-3 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                isActive(link.href) ? "bg-accent text-accent-foreground" : "hover:bg-muted",
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="space-y-3 border-t border-border pt-4">
            <a
              href={`tel:${site.phoneIntl}`}
              className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-base font-medium transition-colors hover:bg-muted"
            >
              <Phone className="h-5 w-5 text-accent" />
              {site.phone}
            </a>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Get a Free Quote
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
