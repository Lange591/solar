import Image from "next/image"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/logo.png"
        alt="Solar Universe"
        width={160}
        height={48}
        priority
      />
    </div>
  )
}
