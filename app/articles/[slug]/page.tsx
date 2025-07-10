import { notFound } from "next/navigation"
import ArticleLayout from "@/components/article-layout"
import { articlesData } from "@/lib/articles-data"

/**
 * Individual Article Page
 * Displays a single blog article with full content, comments, and navigation
 */

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articlesData.find((a) => a.slug === params.slug)

  if (!article) {
    notFound()
  }

  return (
    <ArticleLayout title={article.title} date={article.date} category={article.category} readTime={article.readTime}>
      <div className="article-content prose prose-lg prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </ArticleLayout>
  )
}

export function generateStaticParams() {
  return articlesData.map((article) => ({
    slug: article.slug,
  }))
}
