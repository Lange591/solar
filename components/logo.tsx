import Image from "next/image"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className || ""}`}>
      <Image
        src="/logo-horizontal.svg"
        alt="Solar Universe"
        width={180}
        height={48}
        priority
        className="h-10 w-auto"
      />
    </div>
  )
}