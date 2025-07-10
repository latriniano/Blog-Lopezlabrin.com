interface ArticleContentDisplayProps {
  title: string
  author: string
  publishDate: string
  category?: string
  readingTime?: string
  content: string
}

/**
 * Article Content Display Component
 * Renders the full content of an article with metadata
 */
export default function ArticleContentDisplay({
  title,
  author,
  publishDate,
  category,
  readingTime,
  content,
}: ArticleContentDisplayProps) {
  return (
    <article className="mb-12">
      {/* Article Header */}
      <header className="mb-8 border-b-4 border-black pb-8">
        {/* Category Badge */}
        {category && (
          <div className="mb-4">
            <span className="inline-block px-4 py-2 text-sm font-black text-white bg-brand-orange border-2 border-black shadow-brand-sm uppercase">
              {category}
            </span>
          </div>
        )}

        {/* Article Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-6 leading-tight">{title}</h1>

        {/* Article Metadata */}
        <div className="flex flex-wrap items-center text-brand-gray-700 gap-x-6 gap-y-2">
          <div className="flex items-center">
            <span className="font-bold">Por:</span>
            <span className="ml-2">{author}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold">Publicado:</span>
            <time dateTime={publishDate} className="ml-2">
              {new Date(publishDate).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          {readingTime && (
            <div className="flex items-center">
              <span className="font-bold">Tiempo de lectura:</span>
              <span className="ml-2">{readingTime}</span>
            </div>
          )}
        </div>
      </header>

      {/* Article Content */}
      <div className="article-content prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  )
}
