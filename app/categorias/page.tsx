import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Scale, Landmark, TrendingUp, Globe, Users, BookOpen, Gavel, Building } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

/**
 * Categories Page (/categorias)
 * Comprehensive list of all available categories
 */
export default function CategoriasPage() {
  const categories = [
    {
      name: "Derecho",
      slug: "derecho",
      description: "Análisis jurídico, interpretación legal y desarrollo del derecho contemporáneo",
      icon: Scale,
      count: 24,
      color: "orange",
    },
    {
      name: "Política",
      slug: "politica",
      description: "Análisis político,  instituciones democráticas y procesos electorales",
      icon: Landmark,
      count: 18,
      color: "green",
    },
    {
      name: "Economía",
      slug: "economia",
      description: "Análisis económico, políticas fiscales y tendencias de mercado",
      icon: TrendingUp,
      count: 15,
      color: "blue",
    },
    {
      name: "Relaciones Internacionales",
      slug: "relaciones-internacionales",
      description: "Geopolítica, diplomacia y relaciones entre estados",
      icon: Globe,
      count: 12,
      color: "purple",
    },
    {
      name: "Sociología",
      slug: "sociologia",
      description: "Análisis de fenómenos sociales y comportamiento colectivo",
      icon: Users,
      count: 9,
      color: "red",
    },
    {
      name: "Filosofía del Derecho",
      slug: "filosofia-del-derecho",
      description: "Fundamentos filosóficos del derecho y la justicia",
      icon: BookOpen,
      count: 7,
      color: "teal",
    },
    {
      name: "Derecho Constitucional",
      slug: "derecho-constitucional",
      description: "Análisis de constituciones, derechos fundamentales y estructura del Estado",
      icon: Gavel,
      count: 11,
      color: "indigo",
    },
    {
      name: "Administración Pública",
      slug: "administracion-publica",
      description: "Gestión gubernamental, políticas públicas y servicios estatales",
      icon: Building,
      count: 6,
      color: "amber",
    },
  ]

  return (
    <div className="min-h-screen bg-brand-gray-50">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-black mb-4 uppercase">Categorías</h1>
            <div className="w-24 h-2 bg-brand-orange mx-auto"></div>
            <p className="text-lg text-brand-gray-800 mt-4 max-w-2xl mx-auto">
              Explora nuestros artículos organizados por áreas temáticas. Cada categoría ofrece análisis especializados
              sobre diferentes aspectos del derecho, la política y la economía.
            </p>
          </div>

          {/* LEYES al pedo. Wordmark Logo */}
          <div className="flex justify-center mb-12">
            <div className="relative h-12 w-64 md:h-16 md:w-80">
              <Image
                src="/images/leyes-al-pedo-wordmark.png"
                alt="LEYES al pedo."
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categoria/${category.slug}`}
                className="transform transition-all duration-200 hover:scale-[1.02] focus:scale-[1.02] focus:outline-none"
              >
                <Card className="h-full border-4 border-black bg-white shadow-brand-sm hover:shadow-brand group">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="bg-brand-orange text-white p-3 border-2 border-black shadow-brand-sm">
                        <category.icon className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h2 className="text-xl font-black text-black group-hover:text-brand-orange transition-colors duration-200">
                          {category.name}
                        </h2>
                        <div className="inline-block px-2 py-1 text-xs font-bold bg-brand-gray-200 text-brand-gray-800 mt-1">
                          {category.count} artículos
                        </div>
                      </div>
                    </div>
                    <p className="text-brand-gray-700 flex-grow">{category.description}</p>
                    <div className="mt-4 pt-4 border-t border-brand-gray-200 flex justify-between items-center">
                      <span className="text-sm font-bold text-brand-orange uppercase">Ver artículos</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-brand-orange transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
