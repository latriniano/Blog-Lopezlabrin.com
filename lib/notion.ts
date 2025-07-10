import { Client } from "@notionhq/client";

// Inicializamos el cliente de Notion. Lo usaremos para las funciones que no necesitan caché.
const notion = new Client({ auth: process.env.NOTION_API_KEY, notionVersion: "2022-06-28" });

/**
 * Función para obtener los posts para la PÁGINA DE INICIO.
 * Usa fetch() directamente para controlar el caché y hacer que la página se actualice cada 60 segundos.
 */
export const getPublishedBlogPosts = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID as string;
  const notionApiKey = process.env.NOTION_API_KEY as string;

  const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${notionApiKey}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filter: {
        property: "Status",
        select: {
          equals: "Published",
        },
      },
      sorts: [{ property: "Publish Date", direction: "descending" }],
    }),
    // Revalida (actualiza) los datos cada 60 segundos
    next: {
      revalidate: 60,
    },
  });

  const data = await response.json();

  return data.results.map((page: any) => {
    return {
      id: page.id,
      title: page.properties.Title.title[0]?.plain_text,
      slug: page.properties.Slug.rich_text[0]?.plain_text,
      summary: page.properties.Summary.rich_text[0]?.plain_text,
      publishDate: page.properties["Publish Date"].date?.start,
    };
  });
};


/**
 * Función para obtener UN SOLO post usando su "slug".
 * Usa el cliente de Notion para simplicidad.
 */
export const getSinglePostBySlug = async (slug: string) => {
  const databaseId = process.env.NOTION_DATABASE_ID as string;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
    page_size: 1,
  });

  if (response.results.length === 0) {
    return null;
  }
  const page = response.results[0] as any;

  return {
    id: page.id,
    title: page.properties.Title.title[0]?.plain_text || "Sin Título",
    publishDate: page.properties["Publish Date"].date?.start || "",
  };
};

/**
 * Función para obtener el CONTENIDO (los bloques) de una página específica.
 */
export const getPostContent = async (pageId: string) => {
  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });

  return response.results;
};