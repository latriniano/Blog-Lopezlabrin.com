"use client"

import { ArticleEditor } from "@/components/article-editor"
import { useRouter } from "next/navigation"

export default function NewArticlePage() {
  const router = useRouter()

  const handleSave = (article: any) => {
    // Handle saving new article
    console.log("Saving new article:", article)
    // Redirect to articles list after saving
    router.push("/admin/articles")
  }

  const handleCancel = () => {
    router.push("/admin/articles")
  }

  return <ArticleEditor onSave={handleSave} onCancel={handleCancel} />
}
