import type React from "react"
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from "lucide-react"
import Link from "next/link"

interface ArticleLayoutProps {
  title: string
  content: string
  date: string
  category: string
  readTime: string
  author: string
  children?: React.ReactNode
}

export function ArticleLayout({ title, content, date, category, readTime, author, children }: ArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <header className="bg-[#1c1c1c] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-[#d3d3d3] hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Volver al blog</span>
            </Link>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-[#d3d3d3] hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-[#d3d3d3] hover:text-white transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-[#dc143c]/20 text-[#dc143c] rounded-full text-sm font-medium border border-[#dc143c]/30">
              {category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight post-title-glow">{title}</h1>

          <div className="flex items-center space-x-6 text-[#d3d3d3]">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <article className="prose prose-lg prose-invert max-w-none">
          <div className="text-[#eaeaea] leading-relaxed space-y-6">
            {children || <div dangerouslySetInnerHTML={{ __html: content }} />}
          </div>
        </article>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-[#d3d3d3]">Compartir:</span>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 bg-[#1e90ff] text-white rounded-lg hover:bg-[#1c7ed6] transition-colors text-sm">
                  Twitter
                </button>
                <button className="px-4 py-2 bg-[#dc143c] text-white rounded-lg hover:bg-[#b91c3c] transition-colors text-sm">
                  Facebook
                </button>
                <button className="px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors text-sm">
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Related Articles */}
      <section className="bg-[#0a0a0a] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8">Artículos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Placeholder for related articles */}
            <div className="bg-[#1c1c1c] p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-3">Otro Análisis Jurídico Relevante</h3>
              <p className="text-[#d3d3d3] mb-4">
                Breve descripción del artículo relacionado que podría interesar al lector.
              </p>
              <Link href="#" className="text-[#1e90ff] hover:text-[#87ceeb] transition-colors">
                Leer más →
              </Link>
            </div>
            <div className="bg-[#1c1c1c] p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-3">Perspectiva Política Complementaria</h3>
              <p className="text-[#d3d3d3] mb-4">
                Otro análisis que complementa la perspectiva presentada en este artículo.
              </p>
              <Link href="#" className="text-[#1e90ff] hover:text-[#87ceeb] transition-colors">
                Leer más →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ArticleLayout
