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
        className={cn(
          // Boost saturation/contrast so the navy + amber brand colors read crisp
          // and vivid on light surfaces, with a faint shadow to lift it off the page.
          "w-auto object-contain [filter:saturate(1.35)_contrast(1.12)_brightness(1.02)_drop-shadow(0_1px_2px_rgb(0_0_0/0.18))]",
          sizeClassName,
        )}
      />
    </Link>
  )
}

export default Logo
