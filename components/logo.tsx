import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <Image
        src="/logo.png"
        alt="Solar Universe"
        width={800}
        height={200}
        priority
        className="h-32 w-auto md:h-48 object-contain"
      />
    </Link>
  )
}

export default Logo