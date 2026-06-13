import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-20 max-w-7xl items-center px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png" 
            alt="Solar Universe"
            width={240}
            height={72}
            className="h-auto w-auto"
            priority
          />
        </Link>
      </div>
    </header>
  )
}
