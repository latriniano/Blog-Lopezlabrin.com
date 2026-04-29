import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, User } from "lucide-react"
import { notFound } from "next/navigation"
import { CategoryBadge } from "@/components/category-badge"
import NotionRenderer, { getHeadingAnchorId, type NotionBlock } from "@/components/NotionRenderer"
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

type TocItem = {
  id: string
  title: string
  level: 1 | 2 | 3
}

function readPlainText(items: Array<{ plain_text?: string }> = []) {
  return items.map((item) => item.plain_text ?? "").join("").trim()
}

function getHeadingLevel(type: string): TocItem["level"] | null {
  if (type === "heading_1") return 1
  if (type === "heading_2") return 2
  if (type === "heading_3") return 3
  return null
}

function getTableOfContents(blocks: NotionBlock[]) {
  const items: TocItem[] = []

  function collect(currentBlocks: NotionBlock[]) {
    for (const block of currentBlocks) {
      const level = getHeadingLevel(block.type)

      if (level) {
        const title = readPlainText(block[block.type]?.rich_text)

        if (title) {
          items.push({
            id: getHeadingAnchorId(block),
            title,
            level,
          })
        }
      }

      if (block.children?.length) {
        collect(block.children)
      }
    }
  }

  collect(blocks)
  return items
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
  const blocks = content as NotionBlock[]
  const tocItems = getTableOfContents(blocks)
  const publishedAt = formatLongDate(post.publishDate)

  return (
    <div className="article-reader min-h-screen bg-[#f7f6f1] pt-[96px] pb-20 text-[#202020]">
      <div
        className={`mx-auto w-full px-5 md:px-8 ${
          tocItems.length > 0 ? "max-w-[1240px] xl:grid xl:grid-cols-[250px_minmax(0,760px)] xl:gap-16" : "max-w-[860px]"
        }`}
      >
        {tocItems.length > 0 && (
          <aside className="hidden xl:block">
            <nav
              aria-label="Tabla de contenidos"
              className="sticky top-[132px] max-h-[calc(100vh-160px)] overflow-y-auto pr-4"
            >
              <Link
                href="/#articulos"
                className="mb-14 inline-flex items-center gap-2 font-sans text-[12px] uppercase text-[#77746d] transition-colors hover:text-[#202020]"
              >
                <ArrowLeft size={15} />
                Artículos
              </Link>

              <p className="font-serif text-[2rem] font-semibold leading-tight text-[#202020]">Contenido</p>
              <ol className="mt-6 space-y-4">
                {tocItems.map((item, index) => (
                  <li key={item.id} className={item.level === 3 ? "pl-5" : ""}>
                    <a
                      href={`#${item.id}`}
                      className="group grid grid-cols-[2rem_1fr] gap-2 font-serif text-[1.05rem] leading-snug text-[#8a877f] transition-colors hover:text-[#202020]"
                    >
                      <span className="tabular-nums text-[#b0ada4] transition-colors group-hover:text-[#e84133]">{index + 1}.</span>
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        )}

        <article className="w-full min-w-0">
          <header className="pb-10 md:pb-14">
            <Link
              href="/#articulos"
              className="mb-10 inline-flex items-center gap-2 font-sans text-[12px] uppercase text-[#77746d] transition-colors hover:text-[#202020] xl:hidden"
            >
              <ArrowLeft size={15} />
              Volver a artículos
            </Link>

            <div className="mb-7 flex flex-wrap items-center gap-3 font-sans text-[12px] uppercase text-[#77746d]">
              <CategoryBadge category={post.category} size="md" />
              <span>{publishedAt}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} />
                {post.readTime}
              </span>
            </div>

            <h1 className="font-serif text-4xl leading-[1.04] text-[#1d1d1f] text-balance break-words sm:text-5xl md:text-6xl lg:text-[5rem]">
              {post.title}
            </h1>

            {post.summary && (
              <p className="mt-7 max-w-[720px] font-serif text-[1.18rem] italic leading-relaxed text-[#3d3b36] md:text-[1.42rem]">
                {post.summary}
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5 font-sans text-[12px] uppercase text-[#77746d]">
                <User size={14} />
                {post.author}
              </span>

              {post.tags.map((tag) => (
                <span key={tag} className="border border-[#dedbd2] px-2.5 py-[3px] font-sans text-[11px] uppercase text-[#77746d]">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {post.coverImage && (
            <figure className="mb-10 overflow-hidden border-y border-[#dedbd2] bg-white/50">
              <div className="relative aspect-[16/8] w-full">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 760px"
                  priority
                />
              </div>
            </figure>
          )}

          {tocItems.length > 0 && (
            <details className="mb-10 border-y border-[#dedbd2] py-4 xl:hidden">
              <summary className="cursor-pointer font-serif text-[1.35rem] font-semibold text-[#202020]">Contenido</summary>
              <ol className="mt-5 space-y-3">
                {tocItems.map((item, index) => (
                  <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                    <a href={`#${item.id}`} className="grid grid-cols-[1.75rem_1fr] gap-2 font-serif text-base leading-snug text-[#77746d]">
                      <span className="tabular-nums text-[#aaa69d]">{index + 1}.</span>
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          )}

          <section className="reader-body">
            <div className="notion-content max-w-none">
              <NotionRenderer blocks={blocks} />
            </div>
          </section>

          <footer className="mt-16 border-t border-[#dedbd2] pt-8">
            <Link
              href="/#articulos"
              className="inline-flex items-center gap-2 font-sans text-[12px] uppercase text-[#202020] transition-colors hover:text-[var(--color-red)]"
            >
              <ArrowLeft size={14} />
              Ver más publicaciones
            </Link>
          </footer>
        </article>
      </div>
    </div>
  )
}
