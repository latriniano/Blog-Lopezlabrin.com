import { ArticleLayout } from "./article-layout"

interface Article {
  id: string
  title: string
  content: string
  excerpt: string
  category: string
  date: string
  readTime: string
  tags: string[]
  published: boolean
}

interface ArticlePreviewProps {
  article: Article
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  return (
    <ArticleLayout title={article.title} date={article.date} category={article.category} readTime={article.readTime}>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </ArticleLayout>
  )
}
