"use client"

import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, Copy, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

interface ArticleLayoutProps {
  title: string
  content: string
  date: string
  category: string
  readTime: string
  author?: string
}

export function ArticleLayout({
  title,
  content,
  date,
  category,
  readTime,
  author = "López Labrin Lautaro",
}: ArticleLayoutProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(title)

    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <header className="bg-[#1c1c1c] border-b border-white/10 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-[#eaeaea] hover:text-[#1e90ff] focus:text-[#1e90ff] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:ring-offset-2 focus:ring-offset-transparent rounded-md px-2 py-1"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Volver al inicio</span>
            </Link>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4 text-sm text-[#d3d3d3]">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{date}</span>
                </span>
                <span>•</span>
                <span>{category}</span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{readTime}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Article Header */}
          <header className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-sm text-[#d3d3d3] md:hidden">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{date}</span>
                </span>
                <span>•</span>
                <span>{category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{readTime}</span>
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight title-glow">
                {title}
              </h1>

              <div className="flex items-center space-x-4 text-[#d3d3d3]">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{author}</span>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <div className="flex items-center space-x-2">
                <Share2 className="w-5 h-5 text-[#d3d3d3]" />
                <span className="text-sm text-[#d3d3d3] font-medium">Compartir:</span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleShare("facebook")}
                  className="p-2 bg-[#1877f2]/20 hover:bg-[#1877f2]/30 focus:bg-[#1877f2]/30 text-[#1877f2] rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:ring-offset-2 focus:ring-offset-transparent"
                  aria-label="Compartir en Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleShare("twitter")}
                  className="p-2 bg-[#1da1f2]/20 hover:bg-[#1da1f2]/30 focus:bg-[#1da1f2]/30 text-[#1da1f2] rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1da1f2] focus:ring-offset-2 focus:ring-offset-transparent"
                  aria-label="Compartir en Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleShare("linkedin")}
                  className="p-2 bg-[#0077b5]/20 hover:bg-[#0077b5]/30 focus:bg-[#0077b5]/30 text-[#0077b5] rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0077b5] focus:ring-offset-2 focus:ring-offset-transparent"
                  aria-label="Compartir en LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>

                <button
                  onClick={handleCopyLink}
                  className="p-2 bg-white/10 hover:bg-white/20 focus:bg-white/20 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:ring-offset-2 focus:ring-offset-transparent"
                  aria-label="Copiar enlace"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div
            className="prose prose-invert prose-lg max-w-none article-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Article Footer */}
          <footer className="pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-[#d3d3d3]">
                <p>
                  Publicado el {date} por {author}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-sm text-[#d3d3d3]">Compartir:</span>
                <button
                  onClick={() => handleShare("facebook")}
                  className="text-[#d3d3d3] hover:text-[#1877f2] focus:text-[#1877f2] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:ring-offset-2 focus:ring-offset-transparent rounded-md p-1"
                >
                  <Facebook className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="text-[#d3d3d3] hover:text-[#1da1f2] focus:text-[#1da1f2] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1da1f2] focus:ring-offset-2 focus:ring-offset-transparent rounded-md p-1"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="text-[#d3d3d3] hover:text-[#0077b5] focus:text-[#0077b5] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0077b5] focus:ring-offset-2 focus:ring-offset-transparent rounded-md p-1"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
              </div>
            </div>
          </footer>
        </motion.article>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#dc143c] hover:bg-[#b91c3c] focus:bg-[#b91c3c] text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#dc143c] focus:ring-offset-2 focus:ring-offset-transparent"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al inicio</span>
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
