"use client"

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react"
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
  /* Travel distance in px for the entrance slide */
  distance?: number
  /* Add a subtle scale-up for a premium "lift" feel */
  scale?: boolean
  /* Add a subtle blur-in for a soft focus-pull effect */
  blur?: boolean
  className?: string
  /* Render as a different element, e.g. "section" or "li" */
  as?: ElementType
  /* Re-trigger the animation each time it enters (default: only once) */
  once?: boolean
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 800,
  distance = 36,
  scale = false,
  blur = true,
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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once])

  // Build the hidden-state transform from direction + distance.
  const hiddenTransform = (() => {
    const parts: string[] = []
    if (direction === "up") parts.push(`translateY(${distance}px)`)
    if (direction === "down") parts.push(`translateY(${-distance}px)`)
    if (direction === "left") parts.push(`translateX(${distance}px)`)
    if (direction === "right") parts.push(`translateX(${-distance}px)`)
    if (scale) parts.push("scale(0.96)")
    return parts.length ? parts.join(" ") : "translateZ(0)"
  })()

  const style: CSSProperties = {
    transitionProperty: "opacity, transform, filter",
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : hiddenTransform,
    filter: visible || !blur ? "blur(0px)" : "blur(8px)",
  }

  return (
    <Tag
      ref={ref as never}
      className={cn(
        "will-change-[opacity,transform,filter] motion-reduce:!opacity-100 motion-reduce:!blur-0 motion-reduce:!transform-none",
        className,
      )}
      style={style}
    >
      {children}
    </Tag>
  )
}

export default Reveal
