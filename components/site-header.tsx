"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Search } from "lucide-react"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-[#1c1c1c] border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/images/lap-logo.png" alt="López Labrin Logo" width={40} height={40} className="rounded-lg" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">López Labrin</h1>
              <p className="text-xs text-[#d3d3d3]">Análisis Jurídico</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-[#d3d3d3] hover:text-white transition-colors">
              Inicio
            </Link>
            <Link href="/categorias" className="text-[#d3d3d3] hover:text-white transition-colors">
              Categorías
            </Link>
            <Link href="/acerca-de" className="text-[#d3d3d3] hover:text-white transition-colors">
              Acerca de
            </Link>
            <Link href="/contacto" className="text-[#d3d3d3] hover:text-white transition-colors">
              Contacto
            </Link>
          </nav>

          {/* Search and Menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-[#d3d3d3] hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[#d3d3d3] hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-[#d3d3d3] hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/categorias"
                className="text-[#d3d3d3] hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categorías
              </Link>
              <Link
                href="/acerca-de"
                className="text-[#d3d3d3] hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Acerca de
              </Link>
              <Link
                href="/contacto"
                className="text-[#d3d3d3] hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
