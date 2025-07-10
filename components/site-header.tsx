"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"

/**
 * Site Header Component - Leyes al Pedo Rebrand
 * Bold, graphic design with orange accents and clean typography
 */
export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-brand-orange border-b-4 border-black sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Lap graphic logo only */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-10">
              <Image src="/images/lap-logo.png" alt="Lap Logo" fill className="object-contain" priority />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { name: "Inicio", href: "/" },
              { name: "Categorías", href: "/categorias" },
              { name: "Acerca de", href: "/acerca-de" },
              { name: "Contacto", href: "/contacto" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-white hover:text-black focus:text-black font-bold text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 hover:bg-white hover:bg-opacity-20 focus:bg-white focus:bg-opacity-20 border-2 border-transparent hover:border-white focus:border-white"
              >
                {item.name.toUpperCase()}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-white hover:text-black focus:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-brand-orange border-t-2 border-black">
          <nav className="flex flex-col">
            {[
              { name: "Inicio", href: "/" },
              { name: "Categorías", href: "/categorias" },
              { name: "Acerca de", href: "/acerca-de" },
              { name: "Contacto", href: "/contacto" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-3 text-white hover:text-black focus:text-black font-bold text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 hover:bg-white hover:bg-opacity-20 focus:bg-white focus:bg-opacity-20 border-l-4 border-transparent hover:border-l-white focus:border-l-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
