"use client"

import { ArticleEditor } from "@/components/article-editor"
import { adminArticlesData } from "@/lib/admin-articles-data"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"

interface EditArticlePageProps {
  params: {
    id: string
  }
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const router = useRouter()
  const article = adminArticlesData.find((a) => a.id === params.id)

  if (!article) {
    notFound()
  }

  const handleSave = (updatedArticle: any) => {
    // Handle saving updated article
    console.log("Saving updated article:", updatedArticle)
    // Redirect to articles list after saving
    router.push("/admin/articles")
  }

  const handleCancel = () => {
    router.push("/admin/articles")
  }

  return <ArticleEditor article={article} onSave={handleSave} onCancel={handleCancel} />
}
