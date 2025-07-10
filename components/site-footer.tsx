import Link from "next/link"
import { Mail, MapPin, Twitter, Linkedin, Github } from "lucide-react"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image src="/images/lap-logo.png" alt="López Labrin Logo" width={40} height={40} className="rounded-lg" />
              <div>
                <h3 className="text-xl font-bold text-white">López Labrin</h3>
                <p className="text-sm text-[#d3d3d3]">Análisis Jurídico</p>
              </div>
            </div>
            <p className="text-[#d3d3d3] text-sm leading-relaxed">
              Análisis crítico en derecho, política y economía. Comprometidos con la divulgación jurídica de calidad.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-[#d3d3d3] hover:text-white transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="text-[#d3d3d3] hover:text-white transition-colors text-sm">
                  Categorías
                </Link>
              </li>
              <li>
                <Link href="/acerca-de" className="text-[#d3d3d3] hover:text-white transition-colors text-sm">
                  Acerca de
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-[#d3d3d3] hover:text-white transition-colors text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Categorías</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categoria/derecho"
                  className="text-[#d3d3d3] hover:text-[#dc143c] transition-colors text-sm"
                >
                  Derecho
                </Link>
              </li>
              <li>
                <Link
                  href="/categoria/politica"
                  className="text-[#d3d3d3] hover:text-[#1e90ff] transition-colors text-sm"
                >
                  Política
                </Link>
              </li>
              <li>
                <Link
                  href="/categoria/economia"
                  className="text-[#d3d3d3] hover:text-[#6a1b9a] transition-colors text-sm"
                >
                  Economía
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-[#d3d3d3] text-sm">
                <Mail className="w-4 h-4" />
                <span>contacto@lopezlabrin.com</span>
              </div>
              <div className="flex items-center space-x-2 text-[#d3d3d3] text-sm">
                <MapPin className="w-4 h-4" />
                <span>Buenos Aires, Argentina</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-4">
              <a href="#" className="text-[#d3d3d3] hover:text-[#1e90ff] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#d3d3d3] hover:text-[#0077b5] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#d3d3d3] hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#d3d3d3] text-sm">© 2025 López Labrin. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link href="/privacidad" className="text-[#d3d3d3] hover:text-white transition-colors text-sm">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="text-[#d3d3d3] hover:text-white transition-colors text-sm">
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
