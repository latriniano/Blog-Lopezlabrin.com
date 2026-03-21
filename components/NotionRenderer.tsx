import Link from "next/link"
import type { ReactNode } from "react"

type RichTextItem = {
  plain_text?: string
  href?: string | null
  annotations?: {
    bold?: boolean
    italic?: boolean
    strikethrough?: boolean
    underline?: boolean
    code?: boolean
  }
  text?: {
    link?: {
      url: string
    } | null
  }
}

type NotionBlock = {
  id: string
  type: string
  has_children?: boolean
  children?: NotionBlock[]
  [key: string]: any
}

function getRichText(block: NotionBlock, type: string): RichTextItem[] {
  return block?.[type]?.rich_text ?? []
}

function getPlainText(richText: RichTextItem[] = []) {
  return richText.map((item) => item.plain_text ?? "").join("")
}

function isInternalLink(url: string) {
  return url.startsWith("/")
}

function renderRichText(richText: RichTextItem[] = []) {
  return richText.map((item, index) => {
    const annotations = item.annotations || {}
    const className = [
      annotations.bold ? "font-semibold" : "",
      annotations.italic ? "italic" : "",
      annotations.strikethrough ? "line-through" : "",
      annotations.underline ? "underline" : "",
      annotations.code ? "font-mono text-[0.92em] bg-secondary px-1 py-0.5 border border-border" : "",
    ]
      .filter(Boolean)
      .join(" ")

    const content = <span className={className}>{item.plain_text}</span>
    const linkUrl = item.text?.link?.url || item.href

    if (!linkUrl) {
      return <span key={index}>{content}</span>
    }

    if (isInternalLink(linkUrl)) {
      return (
        <Link key={index} href={linkUrl}>
          {content}
        </Link>
      )
    }

    return (
      <a key={index} href={linkUrl} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  })
}

function renderBlockChildren(block: NotionBlock) {
  if (!block.children?.length) return null
  return <div className="mt-3 pl-4 border-l border-border/70">{renderBlocks(block.children)}</div>
}

function renderMedia(block: NotionBlock, type: "image" | "video" | "file" | "pdf") {
  const mediaData = block[type]
  if (!mediaData) return null

  const source = mediaData?.external?.url || mediaData?.file?.url
  const caption = getPlainText(mediaData?.caption ?? [])

  if (!source) return null

  if (type === "image") {
    return (
      <figure className="my-6 border border-border overflow-hidden bg-foreground/5">
        <img src={source} alt={caption || "Imagen del artículo"} className="w-full h-auto object-cover" loading="lazy" />
        {caption && <figcaption className="px-4 py-3 text-sm text-muted-foreground">{caption}</figcaption>}
      </figure>
    )
  }

  return (
    <figure className="my-6 border border-border p-4 bg-card">
      <a href={source} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-blue)] underline">
        Abrir {type}
      </a>
      {caption && <figcaption className="mt-2 text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  )
}

function renderTable(block: NotionBlock) {
  const rows = block.children?.filter((child) => child.type === "table_row") ?? []
  if (!rows.length) return null

  return (
    <div className="my-6 overflow-x-auto border border-border">
      <table className="min-w-full border-collapse">
        <tbody>
          {rows.map((row) => {
            const cells: RichTextItem[][] = row.table_row?.cells ?? []

            return (
              <tr key={row.id} className="border-b border-border/70">
                {cells.map((cell, index) => (
                  <td key={`${row.id}-${index}`} className="px-3 py-2 align-top text-sm">
                    {renderRichText(cell)}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function renderSingleBlock(block: NotionBlock): ReactNode {
  switch (block.type) {
    case "paragraph":
      return <p>{renderRichText(getRichText(block, "paragraph"))}</p>

    case "heading_1":
      return <h1>{renderRichText(getRichText(block, "heading_1"))}</h1>

    case "heading_2":
      return <h2>{renderRichText(getRichText(block, "heading_2"))}</h2>

    case "heading_3":
      return <h3>{renderRichText(getRichText(block, "heading_3"))}</h3>

    case "quote":
      return <blockquote>{renderRichText(getRichText(block, "quote"))}</blockquote>

    case "callout": {
      const icon = block.callout?.icon?.emoji || "•"
      return (
        <div className="my-6 border border-border bg-secondary px-4 py-3">
          <p className="flex items-start gap-3">
            <span>{icon}</span>
            <span>{renderRichText(getRichText(block, "callout"))}</span>
          </p>
          {renderBlockChildren(block)}
        </div>
      )
    }

    case "code": {
      const language = block.code?.language || "plain"
      const codeText = getPlainText(getRichText(block, "code"))

      return (
        <div className="my-6">
          <div className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground mb-2">{language}</div>
          <pre>
            <code>{codeText}</code>
          </pre>
        </div>
      )
    }

    case "divider":
      return <hr className="my-8 border-border" />

    case "toggle": {
      const label = renderRichText(getRichText(block, "toggle"))
      return (
        <details className="my-4 border border-border px-4 py-3">
          <summary className="cursor-pointer font-medium">{label}</summary>
          {renderBlockChildren(block)}
        </details>
      )
    }

    case "bookmark": {
      const url = block.bookmark?.url
      if (!url) return null
      return (
        <div className="my-4 border border-border px-4 py-3 bg-card">
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-[var(--color-blue)] underline">
            {url}
          </a>
        </div>
      )
    }

    case "embed": {
      const url = block.embed?.url
      if (!url) return null
      return (
        <div className="my-4 border border-border px-4 py-3 bg-card">
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-[var(--color-blue)] underline">
            Ver recurso embebido
          </a>
        </div>
      )
    }

    case "equation": {
      const expression = block.equation?.expression
      if (!expression) return null
      return (
        <pre>
          <code>{expression}</code>
        </pre>
      )
    }

    case "image":
      return renderMedia(block, "image")

    case "video":
      return renderMedia(block, "video")

    case "file":
      return renderMedia(block, "file")

    case "pdf":
      return renderMedia(block, "pdf")

    case "table":
      return renderTable(block)

    case "child_page":
      return <h3>{block.child_page?.title || "Página"}</h3>

    default:
      return null
  }
}

function renderListItem(block: NotionBlock) {
  const type = block.type

  if (type === "to_do") {
    const checked = Boolean(block.to_do?.checked)

    return (
      <li key={block.id} className="flex items-start gap-2">
        <span aria-hidden="true" className="mt-[2px]">
          {checked ? "☑" : "☐"}
        </span>
        <span>{renderRichText(getRichText(block, "to_do"))}</span>
        {renderBlockChildren(block)}
      </li>
    )
  }

  const richText = getRichText(block, type)

  return (
    <li key={block.id}>
      {renderRichText(richText)}
      {renderBlockChildren(block)}
    </li>
  )
}

function renderBlocks(blocks: NotionBlock[]): ReactNode[] {
  const rendered: ReactNode[] = []

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index]

    if (!block) continue

    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item" || block.type === "to_do") {
      const listType = block.type
      const items: NotionBlock[] = [block]
      let cursor = index + 1

      while (cursor < blocks.length && blocks[cursor].type === listType) {
        items.push(blocks[cursor])
        cursor += 1
      }

      if (listType === "bulleted_list_item") {
        rendered.push(
          <ul key={`ul-${block.id}`}>
            {items.map(renderListItem)}
          </ul>,
        )
      } else if (listType === "numbered_list_item") {
        rendered.push(
          <ol key={`ol-${block.id}`}>
            {items.map(renderListItem)}
          </ol>,
        )
      } else {
        rendered.push(
          <ul key={`todo-${block.id}`} className="list-none pl-0">
            {items.map(renderListItem)}
          </ul>,
        )
      }

      index = cursor - 1
      continue
    }

    const node = renderSingleBlock(block)

    if (node) {
      rendered.push(<div key={block.id}>{node}</div>)
    }
  }

  return rendered
}

export default function NotionRenderer({ blocks }: { blocks: NotionBlock[] }) {
  return <>{renderBlocks(blocks)}</>
}
