"use client"

import { useEffect, useRef, useState } from "react"

type Particle = {
  left: number
  top: number
  delay: string
  duration: string
  baseOpacity: number
  size: number
}

export function EnergyGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)
  const particleRefs = useRef<Array<HTMLDivElement | null>>([])

  // Target pointer position (relative to the container), updated on pointer move.
  const target = useRef({ x: 0.5, y: 0.45, active: false })
  // Smoothed position used for rendering, lerped toward the target each frame.
  const smooth = useRef({ x: 0.5, y: 0.45 })
  const rafId = useRef<number | null>(null)

  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Fewer particles on small/touch screens for smooth performance.
    const isCompact = window.innerWidth < 768
    const count = prefersReduced ? 0 : isCompact ? 26 : 48

    setParticles(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: `${Math.random() * 8}s`,
        duration: `${3 + Math.random() * 6}s`,
        baseOpacity: 0.3 + Math.random() * 0.6,
        size: 1 + Math.random() * 3,
      })),
    )

    if (prefersReduced) return

    const container = containerRef.current
    if (!container) return

    const setTargetFromEvent = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect()
      target.current.x = (clientX - rect.left) / rect.width
      target.current.y = (clientY - rect.top) / rect.height
      target.current.active = true
    }

    const onPointerMove = (e: PointerEvent) => setTargetFromEvent(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) setTargetFromEvent(e.touches[0].clientX, e.touches[0].clientY)
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })

    let t = 0
    const render = () => {
      t += 0.0045
      // When the user hasn't interacted yet, gently drift the glow in a figure-eight.
      const tx = target.current.active ? target.current.x : 0.5 + Math.sin(t) * 0.22
      const ty = target.current.active ? target.current.y : 0.45 + Math.sin(t * 1.7) * 0.16

      // Critically-damped easing toward the target for a premium, trailing feel.
      smooth.current.x += (tx - smooth.current.x) * 0.08
      smooth.current.y += (ty - smooth.current.y) * 0.08

      const rect = container.getBoundingClientRect()
      const px = smooth.current.x * rect.width
      const py = smooth.current.y * rect.height

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${px - 250}px, ${py - 250}px, 0)`
      }
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${px - 90}px, ${py - 90}px, 0)`
      }

      // Scale + brighten particles near the light source.
      for (let i = 0; i < particleRefs.current.length; i++) {
        const el = particleRefs.current[i]
        if (!el) continue
        const ex = (parseFloat(el.dataset.left || "0") / 100) * rect.width
        const ey = (parseFloat(el.dataset.top || "0") / 100) * rect.height
        const dist = Math.hypot(ex - px, ey - py)
        const proximity = Math.max(0, 1 - Math.min(260, dist) / 260)
        const scale = 1 + proximity * 1.6
        el.style.transform = `scale(${scale})`
        el.style.boxShadow = `0 0 ${6 + proximity * 14}px rgba(234,179,8,${0.4 + proximity * 0.4})`
      }

      rafId.current = requestAnimationFrame(render)
    }
    rafId.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("touchmove", onTouchMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <svg className="absolute inset-0 h-full w-full opacity-15" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="energyLines" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M0 40 L80 40 M40 0 L40 80" stroke="rgba(234,179,8,0.12)" strokeWidth="0.5" fill="none" />
            <circle cx="40" cy="40" r="2" fill="rgba(234,179,8,0.1)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#energyLines)" />
      </svg>

      {/* Soft ambient glow that trails the pointer (or drifts on its own on touch devices) */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(234,179,8,0.12) 0%, rgba(234,179,8,0) 70%)",
        }}
      />
      {/* Bright concentrated core */}
      <div
        ref={coreRef}
        className="absolute left-0 top-0 h-44 w-44 rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(234,179,8,0.28) 0%, rgba(234,179,8,0) 80%)",
        }}
      />

      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <div
            key={i}
            ref={(el) => {
              particleRefs.current[i] = el
            }}
            data-left={p.left}
            data-top={p.top}
            className="absolute rounded-full bg-yellow-400 will-change-transform"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.baseOpacity,
              animation: `float ${p.duration} ease-in-out infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  )
}
