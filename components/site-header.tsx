"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Artículos", href: "/#articulos" },
  { label: "Categorías", href: "/categorias" },
  { label: "Sobre mí", href: "/acerca-de" },
  { label: "Contacto", href: "/contacto" },
]

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const solidHeader = scrolled || menuOpen
  const onHero = !solidHeader

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          solidHeader
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
            : "bg-black/30 backdrop-blur-sm border-b border-white/10 shadow-[0_14px_40px_rgba(0,0,0,0.22)]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="h-[72px] flex items-center justify-between">
            <Link
              href="/"
              className={`font-serif text-[13px] tracking-[0.24em] uppercase transition-colors ${
                onHero ? "text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.55)] hover:text-white/75" : "text-foreground hover:text-muted-foreground"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              López Labrin
            </Link>

            <div className="hidden md:flex items-center gap-4">
              <nav aria-label="Navegación principal">
                <ul className="flex items-center gap-10">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`relative font-sans text-[11px] tracking-[0.17em] uppercase transition-colors duration-300 after:absolute after:left-0 after:bottom-[-4px] after:h-px after:w-0 after:transition-all hover:after:w-full ${
                          onHero
                            ? "text-white/80 hover:text-white after:bg-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]"
                            : "text-muted-foreground hover:text-foreground after:bg-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <ThemeToggle tone={onHero ? "on-dark" : "default"} />
            </div>

            <div className="md:hidden flex items-center gap-1">
              <ThemeToggle tone={onHero ? "on-dark" : "default"} />
              <button
                type="button"
                className={`p-2 -mr-2 transition-colors ${
                  onHero ? "text-white hover:text-white/75 drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]" : "text-foreground hover:text-muted-foreground"
                }`}
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-background transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-start justify-center h-full px-10" aria-label="Menú móvil">
          <ul className="flex flex-col gap-8">
            {navItems.map((item, index) => (
              <li
                key={item.href}
                className={`transition-all duration-500 ${
                  menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: menuOpen ? `${120 + index * 60}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  className="font-serif text-4xl tracking-tight text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={`mt-16 border-t border-border pt-8 transition-all duration-500 ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: menuOpen ? "420ms" : "0ms" }}
          >
            <a href="mailto:contacto@lopezlabrin.com" className="font-sans text-xs tracking-widest text-muted-foreground">
              contacto@lopezlabrin.com
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}
