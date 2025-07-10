"use client"

import { useState } from "react"
import { Save, Eye, ArrowLeft, Calendar, Tag, Clock } from "lucide-react"
import { RichTextEditor } from "./rich-text-editor"
import Link from "next/link"

interface ArticleData {
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  publishDate: string
  readTime: string
  status: "draft" | "published"
}

interface ArticleEditorProps {
  initialData?: Partial<ArticleData>
  onSave: (data: ArticleData) => void
  onPreview: (data: ArticleData) => void
}

export function ArticleEditor({ initialData, onSave, onPreview }: ArticleEditorProps) {
  const [articleData, setArticleData] = useState<ArticleData>({
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    category: initialData?.category || "derecho",
    tags: initialData?.tags || [],
    publishDate: initialData?.publishDate || new Date().toISOString().split("T")[0],
    readTime: initialData?.readTime || "5 min de lectura",
    status: initialData?.status || "draft",
  })

  const [newTag, setNewTag] = useState("")

  const handleAddTag = () => {
    if (newTag.trim() && !articleData.tags.includes(newTag.trim())) {
      setArticleData({
        ...articleData,
        tags: [...articleData.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setArticleData({
      ...articleData,
      tags: articleData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleSave = () => {
    onSave(articleData)
  }

  const handlePreview = () => {
    onPreview(articleData)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "derecho":
        return "border-[#dc143c] text-[#dc143c]"
      case "politica":
        return "border-[#1e90ff] text-[#1e90ff]"
      case "economia":
        return "border-[#6a1b9a] text-[#6a1b9a]"
      default:
        return "border-white/20 text-[#d3d3d3]"
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <header className="bg-[#1c1c1c] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/articles"
                className="flex items-center space-x-2 text-[#d3d3d3] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Volver a artículos</span>
              </Link>
              <div className="w-px h-6 bg-white/20"></div>
              <h1 className="text-xl font-bold text-white">
                {initialData?.title ? "Editar Artículo" : "Nuevo Artículo"}
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handlePreview}
                className="flex items-center space-x-2 px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Vista previa</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-[#dc143c] text-white rounded-lg hover:bg-[#b91c3c] transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Guardar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                Título del artículo
              </label>
              <input
                type="text"
                id="title"
                value={articleData.title}
                onChange={(e) => setArticleData({ ...articleData, title: e.target.value })}
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/20 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#dc143c] transition-colors text-xl font-semibold"
                placeholder="Ingresa el título del artículo..."
              />
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-white mb-2">
                Resumen
              </label>
              <textarea
                id="excerpt"
                value={articleData.excerpt}
                onChange={(e) => setArticleData({ ...articleData, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/20 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#dc143c] transition-colors resize-vertical"
                placeholder="Breve descripción del artículo que aparecerá en las tarjetas..."
              />
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Contenido del artículo</label>
              <RichTextEditor
                value={articleData.content}
                onChange={(content) => setArticleData({ ...articleData, content })}
                placeholder="Escribe el contenido completo de tu artículo..."
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-[#1c1c1c] p-6 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Configuración</h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-white mb-2">
                    Estado
                  </label>
                  <select
                    id="status"
                    value={articleData.status}
                    onChange={(e) =>
                      setArticleData({ ...articleData, status: e.target.value as "draft" | "published" })
                    }
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#dc143c] transition-colors"
                  >
                    <option value="draft">Borrador</option>
                    <option value="published">Publicado</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="publishDate" className="block text-sm font-medium text-white mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Fecha de publicación
                  </label>
                  <input
                    type="date"
                    id="publishDate"
                    value={articleData.publishDate}
                    onChange={(e) => setArticleData({ ...articleData, publishDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#dc143c] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="readTime" className="block text-sm font-medium text-white mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Tiempo de lectura
                  </label>
                  <input
                    type="text"
                    id="readTime"
                    value={articleData.readTime}
                    onChange={(e) => setArticleData({ ...articleData, readTime: e.target.value })}
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-white/20 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#dc143c] transition-colors"
                    placeholder="ej: 10 min de lectura"
                  />
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="bg-[#1c1c1c] p-6 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Categoría</h3>

              <div className="space-y-3">
                {["derecho", "politica", "economia"].map((category) => (
                  <label key={category} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={articleData.category === category}
                      onChange={(e) => setArticleData({ ...articleData, category: e.target.value })}
                      className="w-4 h-4 text-[#dc143c] bg-[#2a2a2a] border-white/20 focus:ring-[#dc143c] focus:ring-2"
                    />
                    <span className={`capitalize font-medium ${getCategoryColor(category)}`}>
                      {category === "politica" ? "Política" : category === "economia" ? "Economía" : "Derecho"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-[#1c1c1c] p-6 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">
                <Tag className="w-4 h-4 inline mr-1" />
                Etiquetas
              </h3>

              <div className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    className="flex-1 px-3 py-2 bg-[#2a2a2a] border border-white/20 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#dc143c] transition-colors"
                    placeholder="Nueva etiqueta"
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-3 py-2 bg-[#dc143c] text-white rounded-lg hover:bg-[#b91c3c] transition-colors"
                  >
                    +
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {articleData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 bg-[#2a2a2a] text-[#d3d3d3] rounded-full text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-[#d3d3d3] hover:text-red-400 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
