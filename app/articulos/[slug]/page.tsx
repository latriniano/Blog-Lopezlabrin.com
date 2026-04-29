import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, User } from "lucide-react"
import { notFound } from "next/navigation"
import { CategoryBadge } from "@/components/category-badge"
import NotionRenderer from "@/components/NotionRenderer"
import { getPostContent, getPublishedBlogPosts, getSinglePostBySlug } from "@/lib/notion"

export const revalidate = 60

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

function formatLongDate(date?: string) {
  if (!date) return "Sin fecha"

  return new Date(date).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

export async function generateStaticParams() {
  try {
    const posts = await getPublishedBlogPosts()
    return posts.map((post) => ({ slug: post.slug })).filter((post) => Boolean(post.slug))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getSinglePostBySlug(slug)

  if (!post) {
    return {
      title: "Artículo no encontrado",
      description: "El artículo solicitado no está disponible.",
    }
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.summary,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const post = await getSinglePostBySlug(slug)

  if (!post) {
    notFound()
  }

  const content = await getPostContent(post.id)
  const publishedAt = formatLongDate(post.publishDate)

  return (
    <div className="min-h-screen bg-background pt-[96px] pb-20">
      <article className="max-w-[1000px] mx-auto px-6 md:px-12">
        <header className="mb-10 border-b border-border pb-10">
          <Link
            href="/#articulos"
            className="inline-flex items-center gap-2 text-[11px] font-sans tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Volver a artículos
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <CategoryBadge category={post.category} size="md" />
            <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-muted-foreground">{publishedAt}</span>
            <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-muted-foreground inline-flex items-center gap-1.5">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-serif text-[clamp(2rem,5vw,4rem)] leading-[1.08] tracking-[-0.02em] text-foreground text-balance mb-5">
            {post.title}
          </h1>

          {post.summary && <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-6">{post.summary}</p>}

          <div className="flex flex-wrap items-center gap-4">
            <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-muted-foreground inline-flex items-center gap-1.5">
              <User size={13} />
              {post.author}
            </span>

            {post.tags.map((tag) => (
              <span key={tag} className="font-sans text-[10px] tracking-[0.16em] uppercase text-muted-foreground border border-border px-2.5 py-[3px]">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {post.coverImage && (
          <figure className="mb-10 border border-border overflow-hidden bg-foreground/5">
            <div className="relative aspect-[16/8] w-full">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1000px"
                priority
              />
            </div>
          </figure>
        )}

        <section className="bg-card border border-border px-6 md:px-10 lg:px-14 py-8 md:py-12">
          <div className="notion-content max-w-none">
            <NotionRenderer blocks={content as any[]} />
          </div>
        </section>

        <footer className="mt-14 border-t border-border pt-8">
          <Link
            href="/#articulos"
            className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.18em] uppercase text-foreground hover:text-[var(--color-blue)] transition-colors"
          >
            <ArrowLeft size={14} />
            Ver más publicaciones
          </Link>
        </footer>
      </article>
    </div>
  )
}
