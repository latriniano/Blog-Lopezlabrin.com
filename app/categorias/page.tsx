import Link from "next/link"
import { ChevronRight, Globe, Scale, TrendingUp, Users } from "lucide-react"
import { getPublishedBlogPosts } from "@/lib/notion"
import { slugify } from "@/lib/utils"

interface CategoryCard {
  name: string
  slug: string
  count: number
  description: string
  color: string
  icon: typeof Scale
}

function getCategoryMeta(categoryName: string) {
  const slug = slugify(categoryName)

  if (slug.includes("derecho") || slug.includes("jurid")) {
    return {
      description: "Análisis jurídico, constitucional y de derechos humanos.",
      color: "var(--color-red)",
      icon: Scale,
    }
  }

  if (slug.includes("politica") || slug.includes("democracia") || slug.includes("institucion")) {
    return {
      description: "Debate institucional, democracia y coyuntura política.",
      color: "var(--color-blue)",
      icon: Users,
    }
  }

  if (slug.includes("econom") || slug.includes("fiscal") || slug.includes("mercado")) {
    return {
      description: "Economía política, regulación y dinámica de mercados.",
      color: "var(--color-red)",
      icon: TrendingUp,
    }
  }

  if (slug.includes("geopolit") || slug.includes("internacional") || slug.includes("global")) {
    return {
      description: "Escenarios globales, relaciones internacionales y poder regional.",
      color: "var(--color-blue)",
      icon: Globe,
    }
  }

  return {
    description: "Análisis y ensayos sobre actualidad institucional.",
    color: "var(--color-blue)",
    icon: Globe,
  }
}

export default async function CategoriasPage() {
  const posts = await getPublishedBlogPosts()

  const categoriesMap = new Map<string, { name: string; count: number }>()

  for (const post of posts) {
    const categoryName = post.category || "General"
    const categorySlug = slugify(categoryName)
    const existing = categoriesMap.get(categorySlug)

    if (existing) {
      existing.count += 1
    } else {
      categoriesMap.set(categorySlug, { name: categoryName, count: 1 })
    }
  }

  const categories: CategoryCard[] = Array.from(categoriesMap.entries())
    .map(([slug, item]) => {
      const name = item.name
      const count = item.count
      const meta = getCategoryMeta(name)

      return {
        name,
        slug,
        count,
        description: meta.description,
        color: meta.color,
        icon: meta.icon,
      }
    })
    .sort((a, b) => b.count - a.count)

  return (
    <div className="min-h-screen bg-background pt-[112px] pb-20">
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pb-16 border-b border-border">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-2 bg-[var(--color-blue)]" />
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Mapa editorial</p>
          </div>

          <h1 className="font-serif text-[clamp(2.3rem,5vw,4.8rem)] leading-[1.05] tracking-[-0.02em] text-foreground text-balance mb-6">
            Categorías de análisis
          </h1>

          <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Explorá las publicaciones por área temática. Cada categoría agrupa ensayos y análisis sobre los debates
            más relevantes del derecho, la política y la economía.
          </p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16">
        {categories.length === 0 ? (
          <div className="border border-border bg-card p-8 md:p-10">
            <p className="font-sans text-sm md:text-base text-muted-foreground">No hay categorías disponibles todavía.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.slug}
                  href={`/categoria/${category.slug}`}
                  className="group border border-border bg-card p-7 md:p-8 hover:border-foreground transition-colors"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 border border-border" style={{ color: category.color }}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                      {category.count} artículos
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl text-foreground mb-3 group-hover:text-[var(--color-blue)] transition-colors">
                    {category.name}
                  </h2>

                  <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">{category.description}</p>

                  <div className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.18em] uppercase text-foreground group-hover:text-[var(--color-blue)] transition-colors">
                    Ver categoría
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
