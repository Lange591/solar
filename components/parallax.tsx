"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type ParallaxProps = {
  children: ReactNode
  /* Positive moves slower (drifts up), negative moves faster (drifts down). ~ -0.2 to 0.2 is subtle. */
  speed?: number
  className?: string
}

/**
 * Lightweight, performant parallax wrapper. Translates its child on the Y axis
 * relative to the element's position in the viewport using a rAF-throttled
 * scroll listener. Disabled entirely for reduced-motion users.
 */
export function Parallax({ children, speed = 0.15, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = node.getBoundingClientRect()
      // Distance of the element's center from the viewport center.
      const fromCenter = rect.top + rect.height / 2 - window.innerHeight / 2
      const offset = fromCenter * -speed
      node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [speed])

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  )
}

export default Parallax
