"use client"

import { useEffect, useState } from "react"

/**
 * Thin progress bar that fills as the user scrolls the page — a subtle,
 * scroll-position-aware indicator inspired by the reference site.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
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
  }, [])

  return (
    <div
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent transition-transform duration-150 ease-out"
      style={{ transform: `scaleX(${progress / 100})` }}
    />
  )
}

export default ScrollProgress
