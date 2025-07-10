import Link from "next/link"
import { Scale, Users, TrendingUp, ChevronRight } from "lucide-react"

const categories = [
  {
    name: "Derecho",
    slug: "derecho",
    description: "Análisis jurídico, constitucional y de derechos humanos",
    icon: Scale,
    color: "from-[#dc143c] to-[#8b0000]",
    borderColor: "border-[#dc143c]/30",
    bgColor: "bg-[#dc143c]/10",
    textColor: "text-[#dc143c]",
    count: 12,
  },
  {
    name: "Política",
    slug: "politica",
    description: "Análisis político, democracia y participación ciudadana",
    icon: Users,
    color: "from-[#1e90ff] to-[#0066cc]",
    borderColor: "border-[#1e90ff]/30",
    bgColor: "bg-[#1e90ff]/10",
    textColor: "text-[#1e90ff]",
    count: 8,
  },
  {
    name: "Economía",
    slug: "economia",
    description: "Economía política, políticas fiscales y análisis económico",
    icon: TrendingUp,
    color: "from-[#6a1b9a] to-[#4a148c]",
    borderColor: "border-[#6a1b9a]/30",
    bgColor: "bg-[#6a1b9a]/10",
    textColor: "text-[#6a1b9a]",
    count: 6,
  },
]

export default function CategoriasPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 post-title-glow">Categorías</h1>
          <p className="text-xl text-[#d3d3d3] max-w-3xl mx-auto leading-relaxed">
            Explora nuestros análisis organizados por áreas temáticas. Cada categoría aborda aspectos fundamentales del
            derecho, la política y la economía contemporánea.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link key={category.slug} href={`/categoria/${category.slug}`} className="group block">
                  <div
                    className={`h-full p-8 rounded-2xl border ${category.borderColor} ${category.bgColor} hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color}`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${category.bgColor} ${category.textColor} border ${category.borderColor}`}
                      >
                        {category.count} artículos
                      </span>
                    </div>

                    <h3
                      className={`text-2xl font-bold mb-4 ${category.textColor} group-hover:text-white transition-colors`}
                    >
                      {category.name}
                    </h3>

                    <p className="text-[#d3d3d3] mb-6 leading-relaxed">{category.description}</p>

                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${category.textColor}`}>Ver artículos</span>
                      <ChevronRight
                        className={`w-5 h-5 ${category.textColor} group-hover:translate-x-1 transition-transform`}
                      />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Articles by Category */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Artículos Destacados por Categoría</h2>

          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category.slug} className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color}`}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold ${category.textColor}`}>{category.name}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#1c1c1c] p-6 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      {category.name === "Derecho" && "La Reforma Judicial y sus Implicaciones"}
                      {category.name === "Política" && "Democracia y Participación Ciudadana"}
                      {category.name === "Economía" && "Política Fiscal y Desigualdad"}
                    </h4>
                    <p className="text-[#d3d3d3] text-sm mb-4">
                      {category.name === "Derecho" &&
                        "Análisis constitucional de las reformas propuestas al sistema judicial."}
                      {category.name === "Política" && "Nuevos mecanismos de participación en la era digital."}
                      {category.name === "Economía" && "Estrategias redistributivas y su efectividad."}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#d3d3d3]">15 min de lectura</span>
                      <Link
                        href={`/categoria/${category.slug}`}
                        className={`text-sm ${category.textColor} hover:underline`}
                      >
                        Leer más →
                      </Link>
                    </div>
                  </div>

                  <div className="bg-[#1c1c1c] p-6 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      {category.name === "Derecho" && "Constitucionalismo Verde"}
                      {category.name === "Política" && "Crisis de Representación"}
                      {category.name === "Economía" && "Geopolítica Económica"}
                    </h4>
                    <p className="text-[#d3d3d3] text-sm mb-4">
                      {category.name === "Derecho" && "Derechos ambientales en las constituciones contemporáneas."}
                      {category.name === "Política" && "Partidos políticos y nuevos movimientos ciudadanos."}
                      {category.name === "Economía" && "Bloques comerciales en el siglo XXI."}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#d3d3d3]">12 min de lectura</span>
                      <Link
                        href={`/categoria/${category.slug}`}
                        className={`text-sm ${category.textColor} hover:underline`}
                      >
                        Leer más →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
