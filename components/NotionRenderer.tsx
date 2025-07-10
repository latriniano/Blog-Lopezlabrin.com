// components/NotionRenderer.tsx
import React from 'react';

// Este componente es el encargado de "traducir" cada bloque de Notion a HTML
const NotionBlock = ({ block }: { block: any }) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p>
          {block.paragraph.rich_text?.map((text: any) => text.plain_text).join("")}
        </p>
      );
    case "heading_1":
      return (
        <h1>
          {block.heading_1.rich_text?.map((text: any) => text.plain_text).join("")}
        </h1>
      );
    case "heading_2":
      return (
        <h2>
          {block.heading_2.rich_text?.map((text: any) => text.plain_text).join("")}
        </h2>
      );
    case "heading_3":
      return (
        <h3>
          {block.heading_3.rich_text?.map((text: any) => text.plain_text).join("")}
        </h3>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li>
          {block[block.type].rich_text?.map((text: any) => text.plain_text).join("")}
        </li>
      );
    default:
      return null;
  }
};

// Componente principal que organiza los bloques (especialmente las listas)
export default function NotionRenderer({ blocks }: { blocks: any[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        const isBulletedList = block.type === "bulleted_list_item";
        const prevBlockIsBulletedList = index > 0 && blocks[index - 1].type === "bulleted_list_item";

        if (isBulletedList) {
          // Si este es el primer elemento de una lista, abre la etiqueta <ul>
          if (!prevBlockIsBulletedList) {
            return (
              <ul key={`ul-${block.id}`} className="list-disc list-inside">
                <NotionBlock block={block} />
              </ul>
            );
          }
          // Si ya estamos dentro de una lista, solo añade el elemento
          return <NotionBlock key={block.id} block={block} />;
        }

        // Para todos los demás bloques, renderízalos normalmente
        return <NotionBlock key={block.id} block={block} />;
      })}
    </>
  );
}