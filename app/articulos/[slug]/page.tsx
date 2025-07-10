// app/articulos/[slug]/page.tsx
import { getPublishedBlogPosts, getSinglePostBySlug, getPostContent } from "@/lib/notion";
import { notFound } from "next/navigation";
import NotionRenderer from "@/components/NotionRenderer";

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function ArticlePage({ params }: { params: { slug:string }}) {
  const post = await getSinglePostBySlug(params.slug);
  if (!post) notFound();

// --- INICIO DEPURACIÓN FINAL ---
console.log("==============================================");
console.log("PÁGINA ENCONTRADA POR SLUG:", params.slug);
console.log("Título de la página:", post.title);
console.log("ID DE LA PÁGINA QUE VAMOS A BUSCAR:", post.id); // <-- ¡La línea más importante!
console.log("==============================================");

 const content = await getPostContent(post.id);

console.log("ESTRUCTURA DE DATOS RECIBIDA PARA ESE ID:", JSON.stringify(content, null, 2));
console.log("==============================================");
// --- FIN DEPURACIÓN FINAL ---

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