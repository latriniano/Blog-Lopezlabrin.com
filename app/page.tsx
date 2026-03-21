import { HeroSection } from "@/components/hero-section"
import { FeaturedArticle } from "@/components/featured-article"
import { ArticlesFeed } from "@/components/articles-feed"
import { AboutSection } from "@/components/about-section"
import { NewsletterCta } from "@/components/newsletter-cta"
import { getPublishedBlogPosts } from "@/lib/notion"

function formatDate(date?: string) {
  if (!date) return "Sin fecha"

  return new Date(date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default async function HomePage() {
  const posts = await getPublishedBlogPosts()

  const featuredPost = posts.find((post) => post.featured) ?? posts[0]

  const featuredArticle = featuredPost
    ? {
        title: featuredPost.title,
        slug: featuredPost.slug,
        summary: featuredPost.summary,
        category: featuredPost.category,
        publishDate: formatDate(featuredPost.publishDate),
        coverImage: featuredPost.coverImage,
        readTime: featuredPost.readTime,
        author: featuredPost.author,
      }
    : null

  const feedArticles = posts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    summary: post.summary,
    publishDate: formatDate(post.publishDate),
    category: post.category,
    readTime: post.readTime,
    tags: post.tags,
  }))

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      {featuredArticle && <FeaturedArticle article={featuredArticle} />}
      <ArticlesFeed articles={feedArticles} />
      <AboutSection />
      <NewsletterCta />
    </div>
  )
}
