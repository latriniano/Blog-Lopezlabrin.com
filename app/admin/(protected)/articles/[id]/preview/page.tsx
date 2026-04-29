import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, ExternalLink, Eye, User } from "lucide-react"
import { CategoryBadge } from "@/components/category-badge"
import NotionRenderer from "@/components/NotionRenderer"
import { getAdminArticleById, getPostContent } from "@/lib/notion"

export const dynamic = "force-dynamic"

interface AdminArticlePreviewPageProps {
  params: Promise<{ id: string }>
}

function formatLongDate(date?: string) {
  if (!date) return "Sin fecha"

  return new Date(date).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

export default async function AdminArticlePreviewPage({ params }: AdminArticlePreviewPageProps) {
  const { id } = await params
  const articleId = decodeURIComponent(id || "").trim()

  if (!articleId) {
    notFound()
  }

  const article = await getAdminArticleById(articleId)
  if (!article) {
    notFound()
  }

  const blocks = await getPostContent(article.id)

  return (
    <section className="space-y-8">
      <header className="border-b border-border pb-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
              Preview privada
            </p>
            <h1 className="font-serif text-[clamp(1.8rem,3.3vw,3rem)] leading-[1.06] tracking-[-0.02em] text-balance">
              Vista previa del artículo
            </h1>
            <p className="font-sans text-sm text-muted-foreground mt-3">
              Esta vista es interna del admin y no depende del estado de publicación.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/admin/articles/${article.id}`}
              className="inline-flex items-center gap-2 border border-border px-3 py-2 font-sans text-[11px] tracking-[0.16em] uppercase hover:border-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a editar
            </Link>

            {article.slug && (
              <Link
                href={`/articulos/${article.slug}`}
                target="_blank"
                className="inline-flex items-center gap-2 border border-border px-3 py-2 font-sans text-[11px] tracking-[0.16em] uppercase hover:border-foreground transition-colors"
              >
                Ver URL pública
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </header>

      <article className="border border-border bg-card">
        <div className="px-6 md:px-10 lg:px-12 py-8 md:py-10 border-b border-border">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 border border-[var(--color-blue)]/30 bg-[var(--color-blue)]/[0.08] px-2.5 py-[3px] font-sans text-[10px] tracking-[0.16em] uppercase text-[var(--color-blue)]">
              <Eye className="w-3.5 h-3.5" />
              Preview
            </span>
            <CategoryBadge category={article.category} size="md" />
            <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
              {formatLongDate(article.publishDate)}
            </span>
            <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-muted-foreground inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
              Estado: {article.status}
            </span>
          </div>

          <h2 className="font-serif text-[clamp(1.8rem,4.4vw,3.6rem)] leading-[1.08] tracking-[-0.02em] text-balance mb-5">
            {article.title}
          </h2>

          {article.summary && (
            <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-6">
              {article.summary}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-muted-foreground inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {article.author}
            </span>

            {article.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-[10px] tracking-[0.16em] uppercase text-muted-foreground border border-border px-2.5 py-[3px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {article.coverImage && (
          <figure className="border-b border-border overflow-hidden bg-foreground/5">
            <div className="relative aspect-[16/8] w-full">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1400px"
              />
            </div>
          </figure>
        )}

        <div className="px-6 md:px-10 lg:px-12 py-8 md:py-12">
          <div className="notion-content max-w-none">
            <NotionRenderer blocks={blocks as any[]} />
          </div>
        </div>
      </article>
    </section>
  )
}
