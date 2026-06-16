import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  /* @ Lange coding */
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
        quality={100}
        className={cn(
          // Keep the original artwork, just render it sharper and more defined:
          // a touch more contrast + saturation makes the navy and amber read
          // crisply, and a hairline shadow lifts thin strokes off the page.
          "w-auto object-contain [filter:contrast(1.18)_saturate(1.3)_brightness(1.02)_drop-shadow(0_1px_1.5px_rgb(11_42_74/0.22))]",
          sizeClassName,
        )}
      />
    </Link>
  )
}

export default Logo
