import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* TEXT */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Reliable Solar & Electrical Engineering
            </h1>
            <p className="mt-6 text-muted-foreground">
              We design and install dependable power systems built for Zimbabwe.
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative">
            <Image
              src="/images/hero.jpg"   // NOTE LEADING /
              alt="Solar installation"
              width={800}
              height={600}
              className="rounded-2xl shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
