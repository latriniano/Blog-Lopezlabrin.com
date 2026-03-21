import { notFound } from "next/navigation"
import { AdminArticleForm } from "@/components/admin/admin-article-form"
import { getAdminArticleById } from "@/lib/notion"

export const dynamic = "force-dynamic"

interface AdminEditArticlePageProps {
  params: Promise<{ id: string }>
}

export default async function AdminEditArticlePage({ params }: AdminEditArticlePageProps) {
  const { id } = await params
  const articleId = decodeURIComponent(id || "").trim()

  if (!articleId) {
    notFound()
  }

  const article = await getAdminArticleById(articleId)
  if (!article) {
    notFound()
  }

  return (
    <section className="space-y-8">
      <header className="border-b border-border pb-7">
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
          Gestión editorial
        </p>
        <h1 className="font-serif text-[clamp(1.8rem,3.3vw,3rem)] leading-[1.06] tracking-[-0.02em] text-balance">
          Editar artículo
        </h1>
      </header>

      <AdminArticleForm
        mode="edit"
        articleId={article.id}
        initialData={{
          title: article.title,
          slug: article.slug,
          summary: article.summary,
          status: article.status,
          publishDate: article.publishDate || "",
          category: article.category,
          tags: article.tags,
          readTime: article.readTime,
          author: article.author,
          featured: article.featured,
          coverImage: article.coverImage || "",
          seoTitle: article.seoTitle || "",
          seoDescription: article.seoDescription || "",
          content: article.content,
        }}
      />
    </section>
  )
}
