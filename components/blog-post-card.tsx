import { Calendar, Clock, ChevronRight } from "lucide-react"

interface BlogPostCardProps {
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  gradientClass: string
  slug?: string
}

export default function BlogPostCard({
  title,
  excerpt,
  date,
  category,
  readTime,
  gradientClass,
  slug,
}: BlogPostCardProps) {
  return (
    <article className={`post-card p-8 ${gradientClass} rounded-2xl border border-white/10`}>
      <div className="space-y-6">
        <h3 className="text-3xl md:text-4xl font-bold text-white post-title-glow leading-tight">{title}</h3>

        <p className="text-lg text-[#eaeaea] leading-relaxed max-w-4xl">{excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-[#d3d3d3]">
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

          <button className="read-more-link text-lg font-medium flex items-center space-x-2 group">
            <span>Leer más</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  )
}
