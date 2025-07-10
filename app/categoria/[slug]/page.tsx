import { notFound } from "next/navigation"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import BlogPostCard from "@/components/blog-post-card"
import { articlesData } from "@/lib/articles-data"
import { Scale, Landmark, TrendingUp, Globe, Users, BookOpen, Gavel, Building } from "lucide-react"
import Link from "next/link"

/**
 * Category Page - Shows articles filtered by category
 */
interface CategoryPageProps {
  params: {
    slug: string
  }
}

// Map of category slugs to display names and icons
const categoryMap = {
  derecho: {
    name: "Derecho",
    description:
      "Análisis jurídico, interpretación legal y desarrollo del derecho contemporáneo. Exploramos las implicaciones de las decisiones judiciales, reformas legislativas y tendencias jurídicas emergentes.",
    icon: Scale,
  },
  politica: {
    name: "Política",
    description:
      "Análisis político, instituciones democráticas y procesos electorales. Examinamos las dinámicas de poder, políticas públicas y el funcionamiento de los sistemas políticos contemporáneos.",
    icon: Landmark,
  },
  economia: {
    name: "Economía",
    description:
      "Análisis económico, políticas fiscales y tendencias de mercado. Investigamos los factores que influyen en el desarrollo económico, las políticas monetarias y los desafíos económicos globales.",
    icon: TrendingUp,
  },
  "relaciones-internacionales": {
    name: "Relaciones Internacionales",
    description:
      "Geopolítica, diplomacia y relaciones entre estados. Analizamos los conflictos internacionales, acuerdos multilaterales y el papel de las organizaciones internacionales en el orden mundial.",
    icon: Globe,
  },
  sociologia: {
    name: "Sociología",
    description:
      "Análisis de fenómenos sociales y comportamiento colectivo. Estudiamos las estructuras sociales, movimientos sociales y transformaciones culturales que definen nuestras sociedades.",
    icon: Users,
  },
  "filosofia-del-derecho": {
    name: "Filosofía del Derecho",
    description:
      "Fundamentos filosóficos del derecho y la justicia. Exploramos las teorías de justicia, ética legal y los principios fundamentales que sustentan los sistemas jurídicos.",
    icon: BookOpen,
  },
  "derecho-constitucional": {
    name: "Derecho Constitucional",
    description:
      "Análisis de constituciones, derechos fundamentales y estructura del Estado. Examinamos la interpretación constitucional, reformas y el desarrollo de los derechos fundamentales.",
    icon: Gavel,
  },
  "administracion-publica": {
    name: "Administración Pública",
    description:
      "Gestión gubernamental, políticas públicas y servicios estatales. Analizamos la eficiencia administrativa, reformas institucionales y la implementación de políticas públicas.",
    icon: Building,
  },
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params
  const category = categoryMap[slug as keyof typeof categoryMap]

  if (!category) {
    notFound()
  }

  // Filter articles by category
  const categoryArticles = articlesData.filter(
    (article) => article.category?.toLowerCase() === category.name.toLowerCase(),
  )

  const CategoryIcon = category.icon

  return (
    <div className="min-h-screen bg-brand-gray-50">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Category Header */}
          <div className="bg-white border-4 border-black shadow-brand p-8 mb-12">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="bg-brand-orange text-white p-4 border-2 border-black shadow-brand-sm">
                <CategoryIcon className="h-12 w-12" />
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-black text-black uppercase">{category.name}</h1>
                <div className="w-24 h-2 bg-brand-orange"></div>
                <p className="text-lg text-brand-gray-800 max-w-3xl">{category.description}</p>
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          {categoryArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryArticles.map((article) => (
                <div key={article.id} className="transform transition-all duration-200 hover:scale-[1.02]">
                  <BlogPostCard
                    title={article.title}
                    excerpt={article.excerpt}
                    publishDate={article.publishDate}
                    slug={article.slug}
                    category={article.category}
                    imageUrl={article.imageUrl}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white border-4 border-black shadow-brand p-12 max-w-lg mx-auto">
                <p className="text-black text-xl mb-6 font-bold">NO HAY ARTÍCULOS EN ESTA CATEGORÍA.</p>
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-brand-orange text-white border-2 border-black hover:bg-black hover:text-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-brand-orange focus:ring-offset-2 shadow-brand-sm transform hover:scale-105 focus:scale-105 font-black text-lg"
                >
                  VOLVER AL INICIO
                </Link>
              </div>
            </div>
          )}

          {/* Back to Categories */}
          <div className="mt-12 text-center">
            <Link
              href="/categorias"
              className="inline-flex items-center px-6 py-3 bg-white text-black border-2 border-black hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-brand-orange focus:ring-offset-2 shadow-brand-sm transform hover:scale-105 focus:scale-105 font-black text-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              TODAS LAS CATEGORÍAS
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
