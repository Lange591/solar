"use client"

import { useEffect, useState } from "react"

export function EnergyGrid() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{ 
    left: string; 
    top: string; 
    delay: string; 
    duration: string; 
    opacity: number;
    size: number;
  }>>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    
    const newParticles = [...Array(45)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${3 + Math.random() * 6}s`,
      opacity: 0.3 + Math.random() * 0.7,
      size: 1 + Math.random() * 3,
    }))
    setParticles(newParticles)
    
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
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

      <div
        className="absolute h-[500px] w-[500px] rounded-full transition-all duration-300 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(234,179,8,0.12) 0%, rgba(234,179,8,0) 70%)",
          transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`,
        }}
      />

      <div
        className="absolute h-40 w-40 rounded-full transition-all duration-200 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(234,179,8,0.25) 0%, rgba(234,179,8,0) 80%)",
          transform: `translate(${mousePosition.x - 80}px, ${mousePosition.y - 80}px)`,
        }}
      />

      <div className="absolute inset-0">
        {particles.map((particle, i) => {
          const particleX = (parseFloat(particle.left) / 100) * (typeof window !== 'undefined' ? window.innerWidth : 1920)
          const particleY = (parseFloat(particle.top) / 100) * (typeof window !== 'undefined' ? window.innerHeight : 1080)
          const distanceToMouse = Math.sqrt(
            Math.pow(particleX - mousePosition.x, 2) +
            Math.pow(particleY - mousePosition.y, 2)
          )
          const scale = Math.max(0.5, Math.min(2.5, 1 + (250 - Math.min(250, distanceToMouse)) / 200))
          
          return (
            <div
              key={i}
              className="absolute rounded-full bg-yellow-400"
              style={{
                left: particle.left,
                top: particle.top,
                width: `${particle.size * (mousePosition.x ? scale : 1)}px`,
                height: `${particle.size * (mousePosition.x ? scale : 1)}px`,
                animation: `float ${particle.duration} ease-in-out infinite`,
                animationDelay: particle.delay,
                opacity: particle.opacity * (mousePosition.x ? (0.8 + scale * 0.3) : 1),
                boxShadow: `0 0 ${6 * (mousePosition.x ? scale : 1)}px rgba(234,179,8,0.5)`,
                transition: "all 0.1s ease-out",
              }}
            />
          )
        })}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  )
}