// app/articulos/[slug]/page.tsx

import { getPublishedBlogPosts, getSinglePostBySlug, getPostContent } from "@/lib/notion";
import { notFound } from "next/navigation";
import NotionRenderer from "@/components/NotionRenderer";

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  // Nos aseguramos de que post.slug no sea null o undefined antes de incluirlo
  return posts.filter(post => post.slug).map((post) => ({
    slug: post.slug,
  }));
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await getSinglePostBySlug(params.slug);

  if (!post) {
    notFound();
  }
  
  // ESTA ES LA LÍNEA QUE PROBABLEMENTE FALTABA
  const content = await getPostContent(post.id);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      
      <main className="pt-24">
        <article className="max-w-4xl mx-auto px-4 py-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white title-glow">
              {post.title}
            </h1>
            <p className="text-lg text-gray-400 mt-4">
              Publicado el: {new Date(post.publishDate).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>
          <div className="prose prose-invert prose-lg max-w-none mx-auto">
            <NotionRenderer blocks={content} />
          </div>
        </article>
      </main>
      
    </div>
  );
}