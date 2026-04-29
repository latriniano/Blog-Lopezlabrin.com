import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Globe, Scale, TrendingUp, Users } from "lucide-react"
import { notFound } from "next/navigation"
import { getPublishedBlogPosts } from "@/lib/notion"
import { slugify } from "@/lib/utils"

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

function formatDate(date?: string) {
  if (!date) return "Sin fecha"

  return new Date(date).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts()
  const categorySlugs = Array.from(new Set(posts.map((post) => slugify(post.category || "General"))))

  return categorySlugs.map((slug) => ({ slug }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const posts = await getPublishedBlogPosts()

  const articles = posts.filter((post) => slugify(post.category || "General") === slug)

  if (!articles.length) {
    notFound()
  }

  const categoryName = articles[0].category || "General"
  const meta = getCategoryMeta(categoryName)
  const IconComponent = meta.icon

  return (
    <div className="min-h-screen bg-background pt-[112px] pb-20">
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pb-16 border-b border-border">
        <Link
          href="/categorias"
          className="inline-flex items-center gap-2 text-[11px] font-sans tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Volver a categorías
        </Link>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 border border-border" style={{ color: meta.color }}>
            <IconComponent className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-[clamp(2.3rem,5vw,4.8rem)] leading-[1.05] tracking-[-0.02em] text-foreground">
            {categoryName}
          </h1>
        </div>

        <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-3">{meta.description}</p>
        <p className="font-sans text-[11px] tracking-[0.14em] uppercase text-muted-foreground">{articles.length} artículos publicados</p>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {articles.map((article) => (
            <article key={article.id} className="border border-border bg-card p-7 md:p-8">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">{article.title}</h2>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">{article.summary}</p>

              <div className="flex flex-wrap items-center gap-4 font-sans text-[11px] tracking-[0.14em] uppercase text-muted-foreground mb-6">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={13} />
                  {formatDate(article.publishDate)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={13} />
                  {article.readTime}
                </span>
              </div>

              <Link
                href={`/articulos/${article.slug}`}
                className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.18em] uppercase text-foreground hover:text-[var(--color-blue)] transition-colors"
              >
                Leer artículo
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
