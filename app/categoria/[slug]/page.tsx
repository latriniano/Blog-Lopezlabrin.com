import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft, Scale, Users, TrendingUp } from "lucide-react"

const categoryData = {
  derecho: {
    name: "Derecho",
    description: "Análisis jurídico, constitucional y de derechos humanos",
    color: "text-[#dc143c]",
    bgColor: "bg-[#dc143c]/10",
    borderColor: "border-[#dc143c]/30",
    icon: Scale,
  },
  politica: {
    name: "Política",
    description: "Análisis político, democracia y participación ciudadana",
    color: "text-[#1e90ff]",
    bgColor: "bg-[#1e90ff]/10",
    borderColor: "border-[#1e90ff]/30",
    icon: Users,
  },
  economia: {
    name: "Economía",
    description: "Economía política, políticas fiscales y análisis económico",
    color: "text-[#6a1b9a]",
    bgColor: "bg-[#6a1b9a]/10",
    borderColor: "border-[#6a1b9a]/30",
    icon: TrendingUp,
  },
}

const articlesByCategory = {
  derecho: [
    {
      id: 1,
      title: "La Reforma Judicial y sus Implicaciones Constitucionales",
      excerpt:
        "Un análisis profundo sobre los cambios propuestos en el sistema judicial argentino y su impacto en la división de poderes.",
      date: "15 de enero, 2025",
      readTime: "12 min de lectura",
    },
    {
      id: 3,
      title: "Análisis de la Nueva Ley de Alquileres",
      excerpt: "Revisión crítica de las modificaciones legislativas y su impacto en el mercado inmobiliario nacional.",
      date: "10 de enero, 2025",
      readTime: "15 min de lectura",
    },
    {
      id: 5,
      title: "El Futuro de los Derechos Laborales en la Era Digital",
      excerpt:
        "Análisis de cómo la transformación digital está redefiniendo las relaciones laborales y los derechos de los trabajadores.",
      date: "5 de enero, 2025",
      readTime: "11 min de lectura",
    },
    {
      id: 7,
      title: "Constitucionalismo Verde: Derechos Ambientales en la Constitución",
      excerpt: "Análisis del reconocimiento constitucional de los derechos ambientales y su implementación práctica.",
      date: "1 de enero, 2025",
      readTime: "13 min de lectura",
    },
  ],
  politica: [
    {
      id: 4,
      title: "Democracia y Participación Ciudadana en el Siglo XXI",
      excerpt:
        "Un examen de los nuevos mecanismos de participación política y su impacto en la legitimidad democrática.",
      date: "8 de enero, 2025",
      readTime: "10 min de lectura",
    },
    {
      id: 9,
      title: "Crisis de Representación: Partidos Políticos y Democracia",
      excerpt: "Examen de la crisis de los partidos políticos tradicionales y el surgimiento de nuevos movimientos.",
      date: "25 de diciembre, 2024",
      readTime: "12 min de lectura",
    },
  ],
  economia: [
    {
      id: 2,
      title: "Economía Política: El Rol del Estado en la Crisis Actual",
      excerpt:
        "Examinamos las políticas económicas implementadas y su efectividad en el contexto de la crisis inflacionaria.",
      date: "12 de enero, 2025",
      readTime: "8 min de lectura",
    },
    {
      id: 6,
      title: "Política Fiscal y Desigualdad: Un Análisis Comparativo",
      excerpt: "Examen de diferentes estrategias fiscales y su efectividad para reducir la desigualdad económica.",
      date: "3 de enero, 2025",
      readTime: "9 min de lectura",
    },
    {
      id: 8,
      title: "Geopolítica Económica: Bloques Comerciales en el Siglo XXI",
      excerpt: "Análisis de la reconfiguración de los bloques comerciales y su impacto en la economía global.",
      date: "28 de diciembre, 2024",
      readTime: "14 min de lectura",
    },
  ],
}

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categoryData[params.slug as keyof typeof categoryData]
  const articles = articlesByCategory[params.slug as keyof typeof articlesByCategory]

  if (!category || !articles) {
    notFound()
  }

  const IconComponent = category.icon

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <Link
              href="/categorias"
              className="flex items-center space-x-2 text-[#d3d3d3] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver a Categorías</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className={`p-3 rounded-lg ${category.bgColor} border ${category.borderColor}`}>
              <IconComponent className={`w-8 h-8 ${category.color}`} />
            </div>
            <div>
              <h1 className={`text-5xl md:text-6xl font-bold ${category.color} post-title-glow`}>{category.name}</h1>
              <p className="text-xl text-[#d3d3d3] mt-2">{category.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-[#d3d3d3]">
            <span>{articles.length} artículos publicados</span>
            <span>•</span>
            <span>Actualizado regularmente</span>
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Link key={article.id} href={`/articulos/${article.id}`} className="group block">
                <article
                  className={`h-full p-8 rounded-2xl border ${category.borderColor} ${category.bgColor} hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
                >
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-white transition-colors leading-tight">
                      {article.title}
                    </h3>

                    <p className="text-lg text-[#d3d3d3] leading-relaxed">{article.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-[#d3d3d3]">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{article.date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime}</span>
                        </span>
                      </div>

                      <span
                        className={`text-lg font-medium ${category.color} group-hover:translate-x-1 transition-transform`}
                      >
                        Leer más →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Otras Categorías</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(categoryData)
              .filter(([slug]) => slug !== params.slug)
              .map(([slug, cat]) => {
                const CatIcon = cat.icon
                return (
                  <Link key={slug} href={`/categoria/${slug}`} className="group block">
                    <div
                      className={`p-6 rounded-lg border ${cat.borderColor} ${cat.bgColor} hover:scale-105 transition-all duration-300`}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <CatIcon className={`w-6 h-6 ${cat.color}`} />
                        <h3 className={`text-xl font-bold ${cat.color}`}>{cat.name}</h3>
                      </div>
                      <p className="text-[#d3d3d3]">{cat.description}</p>
                    </div>
                  </Link>
                )
              })}
          </div>
        </div>
      </section>
    </div>
  )
}
