import Image from "next/image"
import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/logo.png"
        alt="Solar Universe Mutare"
        width={160}
        height={48}
        priority
      />
    </div>
  )
}