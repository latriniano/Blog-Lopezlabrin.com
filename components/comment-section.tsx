"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, ThumbsUp, Reply, Flag, User } from "lucide-react"

interface Comment {
  id: number
  author: string
  content: string
  date: string
  likes: number
  replies?: Comment[]
}

const mockComments: Comment[] = [
  {
    id: 1,
    author: "María González",
    content:
      "Excelente análisis. La perspectiva constitucional que presentas es muy esclarecedora, especialmente en el contexto actual.",
    date: "hace 2 días",
    likes: 12,
    replies: [
      {
        id: 2,
        author: "López Labrin",
        content:
          "Gracias María. Es fundamental mantener el debate jurídico actualizado con los desafíos contemporáneos.",
        date: "hace 1 día",
        likes: 5,
      },
    ],
  },
  {
    id: 3,
    author: "Carlos Mendoza",
    content:
      "¿Podrías profundizar más sobre las implicaciones prácticas de esta reforma? Me interesa especialmente el impacto en los tribunales inferiores.",
    date: "hace 3 días",
    likes: 8,
  },
  {
    id: 4,
    author: "Ana Rodríguez",
    content:
      "Como estudiante de derecho, estos análisis me ayudan mucho a comprender la complejidad del sistema judicial. ¡Gracias por compartir!",
    date: "hace 1 semana",
    likes: 15,
  },
]

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now(),
      author: "Usuario Anónimo",
      content: newComment,
      date: "ahora",
      likes: 0,
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleSubmitReply = (parentId: number) => {
    if (!replyContent.trim()) return

    const reply: Comment = {
      id: Date.now(),
      author: "Usuario Anónimo",
      content: replyContent,
      date: "ahora",
      likes: 0,
    }

    setComments(
      comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
          }
        }
        return comment
      }),
    )

    setReplyContent("")
    setReplyingTo(null)
  }

  const handleLike = (commentId: number, isReply = false, parentId?: number) => {
    if (isReply && parentId) {
      setComments(
        comments.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: comment.replies?.map((reply) =>
                reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply,
              ),
            }
          }
          return comment
        }),
      )
    } else {
      setComments(
        comments.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment)),
      )
    }
  }

  return (
    <section className="mt-16 pt-8 border-t border-white/10">
      <div className="flex items-center space-x-3 mb-8">
        <MessageCircle className="w-6 h-6 text-[#dc143c]" />
        <h2 className="text-2xl font-bold text-white">Comentarios ({comments.length})</h2>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-12">
        <div className="bg-[#1c1c1c] p-6 rounded-lg border border-white/10">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Comparte tu opinión sobre este análisis..."
            className="w-full bg-[#2a2a2a] border border-white/20 rounded-lg p-4 text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#dc143c] transition-colors resize-vertical"
            rows={4}
          />
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-[#d3d3d3]">Mantengamos un debate respetuoso y constructivo</p>
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-6 py-2 bg-[#dc143c] text-white rounded-lg hover:bg-[#b91c3c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Comentar
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-[#1c1c1c] p-6 rounded-lg border border-white/10">
            {/* Comment Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#dc143c] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white">{comment.author}</h4>
                <p className="text-sm text-[#d3d3d3]">{comment.date}</p>
              </div>
            </div>

            {/* Comment Content */}
            <p className="text-[#eaeaea] mb-4 leading-relaxed">{comment.content}</p>

            {/* Comment Actions */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => handleLike(comment.id)}
                className="flex items-center space-x-2 text-[#d3d3d3] hover:text-[#dc143c] transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{comment.likes}</span>
              </button>
              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="flex items-center space-x-2 text-[#d3d3d3] hover:text-white transition-colors"
              >
                <Reply className="w-4 h-4" />
                <span className="text-sm">Responder</span>
              </button>
              <button className="flex items-center space-x-2 text-[#d3d3d3] hover:text-red-400 transition-colors">
                <Flag className="w-4 h-4" />
                <span className="text-sm">Reportar</span>
              </button>
            </div>

            {/* Reply Form */}
            {replyingTo === comment.id && (
              <div className="mt-4 pl-4 border-l-2 border-[#dc143c]/30">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  className="w-full bg-[#2a2a2a] border border-white/20 rounded-lg p-3 text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#dc143c] transition-colors"
                  rows={3}
                />
                <div className="flex justify-end space-x-3 mt-3">
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="px-4 py-2 text-[#d3d3d3] hover:text-white transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleSubmitReply(comment.id)}
                    disabled={!replyContent.trim()}
                    className="px-4 py-2 bg-[#dc143c] text-white rounded-lg hover:bg-[#b91c3c] transition-colors disabled:opacity-50"
                  >
                    Responder
                  </button>
                </div>
              </div>
            )}

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-6 pl-4 border-l-2 border-white/10 space-y-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="bg-[#2a2a2a] p-4 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-[#1e90ff] rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h5 className="font-medium text-white">{reply.author}</h5>
                        <p className="text-xs text-[#d3d3d3]">{reply.date}</p>
                      </div>
                    </div>
                    <p className="text-[#eaeaea] mb-3 leading-relaxed">{reply.content}</p>
                    <button
                      onClick={() => handleLike(reply.id, true, comment.id)}
                      className="flex items-center space-x-2 text-[#d3d3d3] hover:text-[#dc143c] transition-colors"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span className="text-xs">{reply.likes}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More Comments */}
      <div className="text-center mt-8">
        <button className="px-6 py-3 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors">
          Cargar más comentarios
        </button>
      </div>
    </section>
  )
}
