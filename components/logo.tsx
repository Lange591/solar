import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  /** Tailwind height class, e.g. "h-12". Width scales automatically. */
  sizeClassName?: string
}

export function Logo({ className, sizeClassName = "h-12 md:h-14" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Solar Universe — home"
      className={cn("inline-flex items-center transition-opacity hover:opacity-90", className)}
    >
      <Image
        src="/logo-clean.png"
        alt="Solar Universe"
        width={456}
        height={324}
        priority
        className={cn("w-auto object-contain", sizeClassName)}
      />
    </Link>
  )
}

export default Logo
