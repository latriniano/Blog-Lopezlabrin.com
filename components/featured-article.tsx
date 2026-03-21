import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { CategoryBadge, type Category } from "@/components/category-badge"

interface FeaturedArticleProps {
  article: {
    title: string
    slug: string
    summary: string
    category: Category
    publishDate: string
    coverImage?: string
    readTime: string
    author: string
  }
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const articleHref = article.slug ? `/articulos/${article.slug}` : "/#articulos"

  return (
    <section className="px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto py-16 md:py-24">
      <div className="flex items-center gap-4 mb-10 md:mb-14">
        <div className="w-2 h-2 bg-[var(--color-red)]" />
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Artículo destacado</p>
      </div>

      <Link href={articleHref} className="group block" aria-label={`Leer artículo: ${article.title}`}>
        <article className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] border border-border overflow-hidden">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px] overflow-hidden bg-foreground">
            {article.coverImage ? (
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover grayscale opacity-85 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-95"
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-blue)]/40 via-[#111111] to-[var(--color-red)]/40" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#262626]/30 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-between p-8 md:p-12 lg:p-14 bg-background">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CategoryBadge category={article.category} size="md" />
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{article.publishDate}</span>
              </div>

              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.14] tracking-[-0.01em] text-foreground text-pretty mb-6 transition-colors duration-300 group-hover:text-[var(--color-blue)]">
                {article.title}
              </h2>

              <p className="font-sans text-sm md:text-[15px] text-muted-foreground leading-[1.7] max-w-lg">{article.summary}</p>
            </div>

            <div className="border-t border-border pt-6 mt-10">
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-muted-foreground">{article.author}</span>
                <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-muted-foreground">{article.readTime}</span>
              </div>

              <span className="inline-flex items-center gap-2.5 font-sans text-[11px] tracking-[0.18em] uppercase text-foreground transition-colors duration-300 group-hover:text-[var(--color-blue)]">
                Leer artículo
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </section>
  )
}
