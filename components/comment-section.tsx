"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Comment Section Component
 * Displays existing comments and allows users to add new comments
 */
interface Comment {
  id: string
  author: string
  content: string
  publishDate: string
}

interface CommentSectionProps {
  comments: Comment[]
  onSubmitComment: (comment: { author: string; email: string; content: string }) => void
}

export default function CommentSection({ comments, onSubmitComment }: CommentSectionProps) {
  const [author, setAuthor] = useState("")
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmitComment({ author, email, content })
      setAuthor("")
      setEmail("")
      setContent("")
    } catch (error) {
      console.error("Error submitting comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-16">
      <Card className="border-4 border-black bg-white shadow-brand">
        <CardHeader>
          <CardTitle className="text-2xl font-black text-black uppercase">Comentarios</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Existing Comments */}
          <div className="space-y-6 mb-8">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="border-b-2 border-brand-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-black">{comment.author}</h3>
                    <time dateTime={comment.publishDate} className="text-sm text-brand-gray-500">
                      {new Date(comment.publishDate).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <p className="text-brand-gray-800">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-brand-gray-500 italic">No hay comentarios aún. Sé el primero en comentar.</p>
            )}
          </div>

          {/* Comment Form */}
          <div className="mt-8 pt-8 border-t-2 border-brand-gray-200">
            <h3 className="text-xl font-black text-black mb-4">Deja un comentario</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="author" className="block text-sm font-bold text-black mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-4 focus:ring-brand-orange focus:border-brand-orange bg-white transition-all duration-200 shadow-brand-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-black mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-4 focus:ring-brand-orange focus:border-brand-orange bg-white transition-all duration-200 shadow-brand-sm font-medium"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-bold text-black mb-1">
                  Comentario
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-4 focus:ring-brand-orange focus:border-brand-orange bg-white transition-all duration-200 shadow-brand-sm font-medium"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-orange text-white py-2 px-6 hover:bg-black focus:bg-black transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-brand-orange focus:ring-offset-2 shadow-brand-sm transform hover:scale-105 focus:scale-105 font-black text-base border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed uppercase"
              >
                {isSubmitting ? "Enviando..." : "Publicar Comentario"}
              </button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
