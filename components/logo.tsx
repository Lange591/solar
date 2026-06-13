export function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <span className="flex items-baseline gap-1 font-heading text-xl font-extrabold leading-none tracking-tight">
        <span className="text-primary">
          Sol
          <span className="relative inline-flex items-center justify-center">
            <span
              aria-hidden
              className="mx-[1px] inline-block size-[0.7em] rounded-full bg-accent ring-2 ring-primary/70"
            />
          </span>
          r
        </span>
      </span>
      <span className="block font-heading text-sm font-semibold tracking-[0.2em] text-muted-foreground -mt-0.5">
        UNIVERSE
      </span>
    </div>
  )
}
