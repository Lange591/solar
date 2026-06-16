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
        src="/logo-solar-universe.png"
        alt="Solar Universe"
        width={1015}
        height={448}
        priority
        className={cn(
          // Crisp, high-resolution wordmark. A whisper-soft drop shadow lifts it
          // off the page; a touch of saturation keeps the amber + navy vivid.
          "w-auto object-contain [filter:saturate(1.08)_drop-shadow(0_1px_1px_rgb(11_42_74/0.15))]",
          sizeClassName,
        )}
      />
    </Link>
  )
}

export default Logo
