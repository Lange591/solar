"use client"

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type Direction = "up" | "down" | "left" | "right" | "fade"

type RevealProps = {
  children: ReactNode
  /* Direction the element travels in from as it enters the viewport */
  direction?: Direction
  /* Delay in ms before the animation starts (for staggering) */
  delay?: number
  /* Animation duration in ms */
  duration?: number
  className?: string
  /* Render as a different element, e.g. "section" or "li" */
  as?: ElementType
  /* Re-trigger the animation each time it enters (default: only once) */
  once?: boolean
}

const offsets: Record<Direction, string> = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
  fade: "translate-y-0",
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  className,
  as: Tag = "div",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect users who prefer reduced motion: show immediately, no transition.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once])

  return (
    <Tag
      ref={ref as never}
      className={cn(
        "motion-reduce:!opacity-100 motion-reduce:!translate-x-0 motion-reduce:!translate-y-0 will-change-[opacity,transform] ease-[cubic-bezier(0.22,1,0.36,1)]",
        visible ? "opacity-100 translate-x-0 translate-y-0" : cn("opacity-0", offsets[direction]),
        className,
      )}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  )
}

export default Reveal
