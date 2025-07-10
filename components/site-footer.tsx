import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"
import Image from "next/image"

/**
 * Site Footer Component - Leyes al Pedo Rebrand
 * Bold, graphic design with orange accents and clean typography
 */
export default function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              {/* Logo */}
              <div className="relative h-12 w-12 bg-white p-1">
                <Image src="/images/lap-logo.png" alt="Lap Logo" fill className="object-contain" priority />
              </div>
              {/* Wordmark */}
              <div className="relative h-8 w-40">
                <Image
                  src="/images/leyes-al-pedo-wordmark.png"
                  alt="LEYES al pedo."
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <p className="text-brand-gray-300 leading-relaxed">
              Análisis legal y político con perspectiva crítica. Un espacio para la reflexión sobre derecho, política y
              economía sin filtros ni eufemismos.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-brand-orange focus:text-brand-orange transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-brand-orange focus:text-brand-orange transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-brand-orange focus:text-brand-orange transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:contacto@leyesalpedo.com"
                className="text-white hover:text-brand-orange focus:text-brand-orange transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-black mb-6 uppercase">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {[
                { name: "Inicio", href: "/" },
                { name: "Categorías", href: "/categorias" },
                { name: "Acerca de", href: "/acerca-de" },
                { name: "Contacto", href: "/contacto" },
                { name: "Archivo", href: "/archivo" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-brand-gray-300 hover:text-brand-orange focus:text-brand-orange transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-black font-bold"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-black mb-6 uppercase">Suscríbete</h3>
            <p className="text-brand-gray-300 mb-4">
              Recibe los últimos artículos y análisis directamente en tu bandeja de entrada.
            </p>
            <form className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 bg-brand-gray-900 border-2 border-brand-gray-700 text-white placeholder-brand-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-orange text-white py-3 px-6 hover:bg-white hover:text-black transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-black font-black text-lg border-2 border-brand-orange hover:border-white"
              >
                SUSCRIBIRSE
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-gray-800 text-center text-brand-gray-500">
          <p>© {new Date().getFullYear()} Leyes al Pedo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
