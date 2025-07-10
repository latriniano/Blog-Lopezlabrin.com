"use client"

import { ArticleLayout } from "./article-layout"

interface ArticlePreviewProps {
  title: string
  content: string
  date: string
  category: string
  readTime: string
  author: string
  onClose: () => void
}

export function ArticlePreview({ title, content, date, category, readTime, author, onClose }: ArticlePreviewProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen">
        <div className="sticky top-0 bg-[#1c1c1c] border-b border-white/10 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Vista Previa</h2>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>

        <ArticleLayout
          title={title}
          content={content}
          date={date}
          category={category}
          readTime={readTime}
          author={author}
        />
      </div>
    </div>
  )
}
