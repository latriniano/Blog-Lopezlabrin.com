import { getPublishedBlogPosts } from "@/lib/notion";
import HomePageClient from "./home-page-client"; // Importamos el diseño que acabamos de mover

// Esta es la interfaz que tu diseño espera. La mantenemos aquí para que todo encaje.
interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  gradientClass: string;
  imageUrl?: string;
}

// Este es nuestro Componente de Servidor. Es 'async' para poder esperar a Notion.
export default async function Page() {
  // 1. Obtenemos los datos reales de Notion
  const notionArticles = await getPublishedBlogPosts();

  // 2. Transformamos los datos para que coincidan con la `interface Article` de tu diseño
  const articles: Article[] = notionArticles.map((post, index) => ({
    id: post.id,
    title: post.title || "Sin Título",
    slug: post.slug || "",
    excerpt: post.summary || "Haz clic para leer más.",
    content: '', // El contenido completo no es necesario en la lista
    date: new Date(post.publishDate).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' }),
    category: 'Artículo', // Temporal. Podrías añadir esta propiedad en Notion.
    readTime: '5 min', // Temporal
    gradientClass: `gradient-preset-${index % 5}`, // Asigna un gradiente predefinido
    imageUrl: '/placeholder.jpg', // Temporal. Podrías añadir esto en Notion.
  }));

  // 3. Renderizamos el componente de cliente y le pasamos los artículos reales como un "prop"
  return <HomePageClient initialArticles={articles} />;
}