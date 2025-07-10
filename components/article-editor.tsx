"use client"

import type React from "react"

import { useState } from "react"
import { RichTextEditor } from "./rich-text-editor"
import { Save, Eye, ArrowLeft } from "lucide-react"

interface Article {
  id?: string
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  published: boolean
}

interface ArticleEditorProps {
  article?: Article
  onSave: (article: Article) => void
  onCancel: () => void
}

export function ArticleEditor({ article, onSave, onCancel }: ArticleEditorProps) {
  const [formData, setFormData] = useState<Article>({
    title: article?.title || "",
    content: article?.content || "",
    excerpt: article?.excerpt || "",
    category: article?.category || "",
    tags: article?.tags || [],
    published: article?.published || false,
    ...article,
  })

  const [tagInput, setTagInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button onClick={onCancel} className="p-2 text-[#d3d3d3] hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-white">{article ? "Editar Artículo" : "Nuevo Artículo"}</h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Vista previa</span>
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center space-x-2 px-4 py-2 bg-[#8a2be2] text-white rounded-lg hover:bg-[#7a1fa2] transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Guardar</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#eaeaea] mb-2">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-[#eaeaea] placeholder-[#d3d3d3] focus:outline-none focus:border-[#8a2be2] focus:ring-1 focus:ring-[#8a2be2]"
              placeholder="Título del artículo"
              required
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-[#eaeaea] mb-2">Resumen</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-[#eaeaea] placeholder-[#d3d3d3] focus:outline-none focus:border-[#8a2be2] focus:ring-1 focus:ring-[#8a2be2] resize-none"
              placeholder="Breve descripción del artículo"
              required
            />
          </div>

          {/* Category and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#eaeaea] mb-2">Categoría</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-[#eaeaea] focus:outline-none focus:border-[#8a2be2] focus:ring-1 focus:ring-[#8a2be2]"
                required
              >
                <option value="">Seleccionar categoría</option>
                <option value="derecho">Derecho</option>
                <option value="politica">Política</option>
                <option value="economia">Economía</option>
                <option value="opinion">Opinión</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#eaeaea] mb-2">Etiquetas</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-[#eaeaea] placeholder-[#d3d3d3] focus:outline-none focus:border-[#8a2be2] focus:ring-1 focus:ring-[#8a2be2]"
                  placeholder="Agregar etiqueta"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-3 bg-[#8a2be2] text-white rounded-lg hover:bg-[#7a1fa2] transition-colors"
                >
                  Agregar
                </button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-gray-700 text-[#eaeaea] text-sm rounded-full"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-gray-400 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-[#eaeaea] mb-2">Contenido</label>
            <RichTextEditor
              value={formData.content}
              onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
            />
          </div>

          {/* Published Toggle */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
              className="w-4 h-4 text-[#8a2be2] bg-[#1a1a1a] border-gray-700 rounded focus:ring-[#8a2be2] focus:ring-2"
            />
            <label htmlFor="published" className="text-[#eaeaea]">
              Publicar artículo
            </label>
          </div>
        </form>
      </div>
    </div>
  )
}
