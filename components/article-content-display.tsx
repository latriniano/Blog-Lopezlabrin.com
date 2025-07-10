import { Calendar, Clock, User } from "lucide-react"

interface ArticleContentDisplayProps {
  title: string
  content: string
  date: string
  category: string
  readTime: string
  author: string
}

export function ArticleContentDisplay({
  title,
  content,
  date,
  category,
  readTime,
  author,
}: ArticleContentDisplayProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "derecho":
        return "bg-[#dc143c]/20 text-[#dc143c] border-[#dc143c]/30"
      case "política":
        return "bg-[#1e90ff]/20 text-[#1e90ff] border-[#1e90ff]/30"
      case "economía":
        return "bg-[#6a1b9a]/20 text-[#6a1b9a] border-[#6a1b9a]/30"
      default:
        return "bg-[#dc143c]/20 text-[#dc143c] border-[#dc143c]/30"
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Article Header */}
      <header className="mb-12">
        <div className="mb-6">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(category)}`}
          >
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
        <div className="text-[#eaeaea] leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  )
}
