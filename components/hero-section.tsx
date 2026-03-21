"use client"

import { useRef, useEffect } from "react"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => {})
  }, [])

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "100svh" }}>

      {/* ── Video Background ─────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{
            objectPosition: "center 30%",
            transform: "scale(1.2)",
            transformOrigin: "center 40%",
          }}
        >
          <source src="/videos/Make_image_loop_202603211525.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay — fades smoothly to black at the bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.28) 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.92) 100%)",
          }}
        />
      </div>

      {/* ── Content — centrado ───────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-12"
        style={{ minHeight: "100svh" }}
      >
        {/* SVG headline — blanco via CSS filter */}
        <div className="w-full max-w-3xl mx-auto mb-10 md:mb-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/1x/Recurso 8.png"
            alt="La Geopolítica Argentina en un solo lugar."
            className="w-full h-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>

        {/* Subtítulo + CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-16">
          <p
            className="font-sans text-base md:text-lg leading-relaxed max-w-sm text-center sm:text-left"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Artículos y ensayos sobre instituciones, debate público y coyuntura por{" "}
            <span className="font-medium text-white">Lautaro López Labrin</span>.
          </p>

          <a
            href="#articulos"
            className="group flex items-center gap-3 font-sans text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 shrink-0"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Explorar artículos
            <ArrowDown
              size={14}
              className="transition-transform duration-300 group-hover:translate-y-1"
              style={{ color: "var(--color-primary)" }}
            />
          </a>
        </div>
      </div>
    </section>
  )
}
