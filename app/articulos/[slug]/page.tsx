import { ArticleLayout } from "@/components/article-layout"
import { articlesData } from "@/lib/articles-data"
import { notFound } from "next/navigation"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default function ArticuloPage({ params }: ArticlePageProps) {
  const article = articlesData.find((a) => a.slug === params.slug)

  if (!article) {
    notFound()
  }

  return (
    <ArticleLayout title={article.title} date={article.date} category={article.category} readTime={article.readTime}>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </ArticleLayout>
  )
}

export function generateStaticParams() {
  return articlesData.map((article) => ({
    slug: article.slug,
  }))
}
