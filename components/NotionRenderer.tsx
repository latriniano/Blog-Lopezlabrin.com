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

type Footnote = {
  label: string
  richText: RichTextItem[]
}

type RenderContext = {
  footnotes: Map<string, Footnote>
}

export type NotionBlock = {
  id: string
  type: string
  has_children?: boolean
  children?: NotionBlock[]
  [key: string]: any
}

export function getHeadingAnchorId(block: Pick<NotionBlock, "id">) {
  return `section-${String(block.id).replace(/[^a-zA-Z0-9_-]/g, "")}`
}

function getRichText(block: NotionBlock, type: string): RichTextItem[] {
  return block?.[type]?.rich_text ?? []
}

function getPlainText(richText: RichTextItem[] = []) {
  return richText.map((item) => item.plain_text ?? "").join("")
}

function getFootnoteAnchorId(label: string) {
  const normalized = label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]/g, "")

  return `footnote-${normalized || "note"}`
}

function isInternalLink(url: string) {
  return url.startsWith("/")
}

function renderFootnoteReference(label: string, key: string, context: RenderContext) {
  const note = context.footnotes.get(label)
  const preview = note ? getPlainText(note.richText).slice(0, 220) : ""

  return (
    <a
      key={key}
      href={`#${getFootnoteAnchorId(label)}`}
      className="article-footnote-ref"
      data-footnote-preview={preview || undefined}
      aria-label={`Ver nota ${label}`}
    >
      <sup>{label}</sup>
    </a>
  )
}

function renderAnnotatedSegment(item: RichTextItem, text: string, key: string, className: string) {
  const content = <span className={className}>{text}</span>
  const linkUrl = item.text?.link?.url || item.href

  if (!linkUrl) {
    return <span key={key}>{content}</span>
  }

  if (isInternalLink(linkUrl)) {
    return (
      <Link key={key} href={linkUrl}>
        {content}
      </Link>
    )
  }

  return (
    <a key={key} href={linkUrl} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  )
}

function renderRichText(richText: RichTextItem[] = [], context: RenderContext) {
  return richText.flatMap((item, index) => {
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

    const text = item.plain_text ?? ""
    const nodes: ReactNode[] = []
    const pattern = /\[\^([^\]]+)\]/g
    let cursor = 0
    let match: RegExpExecArray | null

    while ((match = pattern.exec(text))) {
      if (match.index > cursor) {
        nodes.push(renderAnnotatedSegment(item, text.slice(cursor, match.index), `${index}-${cursor}`, className))
      }

      nodes.push(renderFootnoteReference(match[1], `${index}-footnote-${match.index}`, context))
      cursor = match.index + match[0].length
    }

    if (cursor < text.length) {
      nodes.push(renderAnnotatedSegment(item, text.slice(cursor), `${index}-${cursor}`, className))
    }

    return nodes
  })
}

function renderBlockChildren(block: NotionBlock, context: RenderContext) {
  if (!block.children?.length) return null
  return <div className="mt-3 pl-4 border-l border-border/70">{renderBlocks(block.children, context)}</div>
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

function renderTable(block: NotionBlock, context: RenderContext) {
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
                    {renderRichText(cell, context)}
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

function renderSingleBlock(block: NotionBlock, context: RenderContext): ReactNode {
  switch (block.type) {
    case "paragraph":
      return <p>{renderRichText(getRichText(block, "paragraph"), context)}</p>

    case "heading_1":
      return <h1 id={getHeadingAnchorId(block)}>{renderRichText(getRichText(block, "heading_1"), context)}</h1>

    case "heading_2":
      return <h2 id={getHeadingAnchorId(block)}>{renderRichText(getRichText(block, "heading_2"), context)}</h2>

    case "heading_3":
      return <h3 id={getHeadingAnchorId(block)}>{renderRichText(getRichText(block, "heading_3"), context)}</h3>

    case "quote":
      return <blockquote>{renderRichText(getRichText(block, "quote"), context)}</blockquote>

    case "callout": {
      const icon = block.callout?.icon?.emoji || "•"
      return (
        <div className="my-6 border border-border bg-secondary px-4 py-3">
          <p className="flex items-start gap-3">
            <span>{icon}</span>
            <span>{renderRichText(getRichText(block, "callout"), context)}</span>
          </p>
          {renderBlockChildren(block, context)}
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
      const label = renderRichText(getRichText(block, "toggle"), context)
      return (
        <details className="my-4 border border-border px-4 py-3">
          <summary className="cursor-pointer font-medium">{label}</summary>
          {renderBlockChildren(block, context)}
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
      return renderTable(block, context)

    case "child_page":
      return <h3>{block.child_page?.title || "Página"}</h3>

    default:
      return null
  }
}

function renderListItem(block: NotionBlock, context: RenderContext) {
  const type = block.type

  if (type === "to_do") {
    const checked = Boolean(block.to_do?.checked)

    return (
      <li key={block.id} className="flex items-start gap-2">
        <span aria-hidden="true" className="mt-[2px]">
          {checked ? "☑" : "☐"}
        </span>
        <span>{renderRichText(getRichText(block, "to_do"), context)}</span>
        {renderBlockChildren(block, context)}
      </li>
    )
  }

  const richText = getRichText(block, type)

  return (
    <li key={block.id}>
      {renderRichText(richText, context)}
      {renderBlockChildren(block, context)}
    </li>
  )
}

function renderBlocks(blocks: NotionBlock[], context: RenderContext): ReactNode[] {
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
            {items.map((item) => renderListItem(item, context))}
          </ul>,
        )
      } else if (listType === "numbered_list_item") {
        rendered.push(
          <ol key={`ol-${block.id}`}>
            {items.map((item) => renderListItem(item, context))}
          </ol>,
        )
      } else {
        rendered.push(
          <ul key={`todo-${block.id}`} className="list-none pl-0">
            {items.map((item) => renderListItem(item, context))}
          </ul>,
        )
      }

      index = cursor - 1
      continue
    }

    const node = renderSingleBlock(block, context)

    if (node) {
      rendered.push(<div key={block.id}>{node}</div>)
    }
  }

  return rendered
}

function stripRichTextPrefix(richText: RichTextItem[], prefixLength: number) {
  let remaining = prefixLength

  return richText.flatMap((item) => {
    const text = item.plain_text ?? ""

    if (remaining >= text.length) {
      remaining -= text.length
      return []
    }

    if (remaining > 0) {
      const nextItem = { ...item, plain_text: text.slice(remaining) }
      remaining = 0
      return [nextItem]
    }

    return [item]
  })
}

function extractFootnotes(blocks: NotionBlock[]) {
  const bodyBlocks: NotionBlock[] = []
  const footnotes: Footnote[] = []

  for (const block of blocks) {
    if (block.type === "paragraph") {
      const richText = getRichText(block, "paragraph")
      const text = getPlainText(richText)
      const match = text.match(/^\[\^([^\]]+)\]:\s*/)

      if (match) {
        footnotes.push({
          label: match[1],
          richText: stripRichTextPrefix(richText, match[0].length),
        })
        continue
      }
    }

    bodyBlocks.push(block)
  }

  return { bodyBlocks, footnotes }
}

function renderFootnotes(footnotes: Footnote[], context: RenderContext) {
  if (!footnotes.length) return null

  return (
    <section className="article-footnotes" aria-label="Notas">
      <h2 id="notas">Notas</h2>
      <ol>
        {footnotes.map((footnote) => (
          <li key={footnote.label} id={getFootnoteAnchorId(footnote.label)}>
            <span className="article-footnote-number">{footnote.label}</span>
            <p>{renderRichText(footnote.richText, context)}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default function NotionRenderer({ blocks }: { blocks: NotionBlock[] }) {
  const { bodyBlocks, footnotes } = extractFootnotes(blocks)
  const context = {
    footnotes: new Map(footnotes.map((footnote) => [footnote.label, footnote])),
  }

  return (
    <>
      {renderBlocks(bodyBlocks, context)}
      {renderFootnotes(footnotes, context)}
    </>
  )
}
