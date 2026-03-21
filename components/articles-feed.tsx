"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { CategoryBadge, type Category } from "@/components/category-badge"

interface FeedArticle {
  id: string
  title: string
  slug: string
  summary: string
  publishDate: string
  category: Category
  readTime: string
  tags: string[]
}

interface ArticlesFeedProps {
  articles: FeedArticle[]
}

export function ArticlesFeed({ articles }: ArticlesFeedProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section id="articulos" className="px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto py-16 md:py-24">
      <div className="flex items-end justify-between border-b border-foreground pb-5 mb-0">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-[var(--color-blue)]" />
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Todos los artículos</p>
        </div>
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{articles.length} publicaciones</p>
      </div>

      <ol className="divide-y divide-border">
        {articles.map((article) => {
          const isHovered = hoveredId === article.id
          const isFaded = hoveredId !== null && !isHovered
          const href = article.slug ? `/articulos/${article.slug}` : "/#articulos"

          return (
            <li key={article.id}>
              <Link
                href={href}
                className={`py-8 md:py-10 grid grid-cols-1 md:grid-cols-[120px_1fr_20px] gap-5 md:gap-8 items-start transition-opacity duration-300 block ${
                  isFaded ? "opacity-35" : "opacity-100"
                }`}
                onMouseEnter={() => setHoveredId(article.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="flex md:flex-col items-baseline md:items-start gap-2 md:gap-0.5 pt-1">
                  <time className="font-sans text-[11px] tracking-[0.14em] uppercase text-muted-foreground">{article.publishDate}</time>
                  <span className="font-sans text-[11px] tracking-[0.14em] text-muted-foreground/50">{article.readTime}</span>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <CategoryBadge category={article.category} />
                    {article.tags.length > 0 && (
                      <span className="font-sans text-[10px] tracking-[0.16em] uppercase text-muted-foreground">{article.tags[0]}</span>
                    )}
                  </div>

                  <h3
                    className={`font-serif text-xl md:text-2xl lg:text-[1.65rem] leading-[1.2] tracking-[-0.01em] text-pretty transition-colors duration-300 ${
                      isHovered ? "text-[var(--color-blue)]" : "text-foreground"
                    }`}
                  >
                    {article.title}
                  </h3>

                  <p className="font-sans text-sm text-muted-foreground leading-relaxed mt-3 max-w-2xl">{article.summary}</p>
                </div>

                <div className="hidden md:flex justify-end pt-1">
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    className={`transition-all duration-300 ${
                      isHovered ? "text-[var(--color-blue)] translate-x-0.5 -translate-y-0.5" : "text-muted-foreground/40"
                    }`}
                  />
                </div>
              </Link>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
