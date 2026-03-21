import { Client } from "@notionhq/client"
import { estimateReadTime, slugify } from "@/lib/utils"

const NOTION_VERSION = "2022-06-28"
const DEFAULT_REVALIDATE_SECONDS = 60
const DEFAULT_AUTHOR = "Lautaro López Labrin"
const DEFAULT_CATEGORY = "General"
const DEFAULT_STATUS = "Draft"
const DEFAULT_TITLE = "Nuevo artículo"
const RICH_TEXT_CHUNK_SIZE = 1800
const BLOCK_APPEND_CHUNK_SIZE = 100

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: NOTION_VERSION,
})

type NotionPage = {
  id: string
  properties: Record<string, any>
  cover?: any
  created_time?: string
  last_edited_time?: string
  url?: string
}

type NotionPropertyMap = Record<string, { type?: string; [key: string]: any }>

export interface BlogPostSummary {
  id: string
  title: string
  slug: string
  summary: string
  status: string
  isPublished: boolean
  publishDate?: string
  updatedAt?: string
  category: string
  tags: string[]
  readTime: string
  author: string
  featured: boolean
  coverImage?: string
  seoTitle?: string
  seoDescription?: string
  notionUrl?: string
}

export interface AdminArticleInput {
  title?: string
  slug?: string
  summary?: string
  status?: string
  publishDate?: string | null
  category?: string
  tags?: string[] | string
  readTime?: string
  author?: string
  featured?: boolean
  coverImage?: string
  seoTitle?: string
  seoDescription?: string
  content?: string
}

export interface AdminArticleDetail extends BlogPostSummary {
  content: string
}

const PROPERTY_ALIASES = {
  title: ["Title", "Título", "Titulo"],
  slug: ["Slug", "URL Slug"],
  summary: ["Summary", "Resumen", "Excerpt", "Descripción Corta", "Descripcion Corta"],
  status: ["Status", "Estado"],
  publishDate: ["Publish Date", "Fecha de publicación", "Fecha de Publicación", "Fecha de Publicacion"],
  category: ["Category", "Categoría", "Categoria"],
  tags: ["Tags", "Etiquetas"],
  readTime: ["Read Time", "Tiempo de lectura", "Tiempo de Lectura"],
  author: ["Author", "Autor"],
  featured: ["Featured", "Destacado"],
  coverImage: ["Cover", "Cover Image", "Portada", "Imagen", "Image"],
  seoTitle: ["SEO Title", "Meta Title", "Título SEO", "Titulo SEO"],
  seoDescription: ["SEO Description", "Meta Description", "Descripción SEO", "Descripcion SEO"],
  updatedAt: ["Updated At", "Last Updated", "Last Update", "Última edición", "Ultima edicion"],
} as const

function normalizeKey(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function normalizeMultilineText(value: unknown) {
  if (typeof value !== "string") return ""
  return value.replace(/\r\n/g, "\n").trim()
}

function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((tag) => normalizeText(tag))
      .filter(Boolean)
      .filter((tag, index, list) => list.findIndex((current) => normalizeKey(current) === normalizeKey(tag)) === index)
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .filter((tag, index, list) => list.findIndex((current) => normalizeKey(current) === normalizeKey(tag)) === index)
  }

  return []
}

function normalizeDateInput(value?: string | null) {
  const raw = normalizeText(value)
  if (!raw) return ""

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return raw
  }

  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return ""
  return date.toISOString().slice(0, 10)
}

function getTodayDate() {
  return new Date().toISOString().slice(0, 10)
}

function normalizeStatus(status: unknown) {
  const normalized = normalizeKey(String(status || ""))

  if (["published", "publicado", "live", "activo"].includes(normalized)) {
    return "Published"
  }

  if (["archived", "archivado", "archive", "inactivo", "inactive"].includes(normalized)) {
    return "Archived"
  }

  return DEFAULT_STATUS
}

function getProperty(properties: Record<string, any>, aliases: readonly string[]) {
  const normalizedProperties = new Map<string, any>()

  for (const [key, value] of Object.entries(properties)) {
    normalizedProperties.set(normalizeKey(key), value)
  }

  for (const alias of aliases) {
    const property = normalizedProperties.get(normalizeKey(alias))
    if (property) return property
  }

  return undefined
}

function resolvePropertyKey(
  schemaProperties: NotionPropertyMap,
  aliases: readonly string[],
  options: {
    acceptedTypes?: string[]
    allowTypeFallback?: boolean
  } = {},
) {
  const { acceptedTypes, allowTypeFallback = false } = options

  const normalizedMap = new Map<string, string>()
  for (const key of Object.keys(schemaProperties)) {
    normalizedMap.set(normalizeKey(key), key)
  }

  for (const alias of aliases) {
    const key = normalizedMap.get(normalizeKey(alias))
    if (!key) continue

    if (!acceptedTypes?.length) return key

    const propertyType = schemaProperties[key]?.type || ""
    if (acceptedTypes.includes(propertyType)) return key
  }

  if (allowTypeFallback && acceptedTypes?.length) {
    for (const [key, schema] of Object.entries(schemaProperties)) {
      if (acceptedTypes.includes(schema?.type || "")) {
        return key
      }
    }
  }

  return undefined
}

function readPlainTextItems(items: Array<{ plain_text?: string }> = []) {
  return items.map((item) => item.plain_text ?? "").join("").trim()
}

function readTitleValue(property: any) {
  if (!property) return ""

  if (property.type === "title") {
    return readPlainTextItems(property.title)
  }

  if (property.type === "rich_text") {
    return readPlainTextItems(property.rich_text)
  }

  return ""
}

function readRichTextValue(property: any) {
  if (!property) return ""

  if (property.type === "rich_text") {
    return readPlainTextItems(property.rich_text)
  }

  if (property.type === "title") {
    return readPlainTextItems(property.title)
  }

  return ""
}

function readDateValue(property: any) {
  if (!property || property.type !== "date") return undefined
  return property.date?.start || undefined
}

function readSelectValue(property: any) {
  if (!property) return ""

  if (property.type === "select") {
    return property.select?.name || ""
  }

  if (property.type === "status") {
    return property.status?.name || ""
  }

  return ""
}

function readMultiSelectValues(property: any) {
  if (!property || property.type !== "multi_select") return [] as string[]
  return property.multi_select?.map((item: { name?: string }) => item.name).filter(Boolean) ?? []
}

function readCheckboxValue(property: any) {
  if (!property || property.type !== "checkbox") return false
  return Boolean(property.checkbox)
}

function readNumberValue(property: any) {
  if (!property || property.type !== "number") return undefined
  return typeof property.number === "number" ? property.number : undefined
}

function readUrlValue(property: any) {
  if (!property || property.type !== "url") return undefined
  return property.url || undefined
}

function readPeopleValue(property: any) {
  if (!property || property.type !== "people") return ""
  const names = property.people?.map((person: { name?: string }) => person.name).filter(Boolean) ?? []
  return names.join(", ")
}

function readFirstFileUrl(property: any) {
  if (!property || property.type !== "files") return undefined

  const file = property.files?.[0]
  if (!file) return undefined

  if (file.type === "external") return file.external?.url
  if (file.type === "file") return file.file?.url

  return undefined
}

function readPageCover(page: NotionPage) {
  if (!page.cover) return undefined

  if (page.cover.type === "external") return page.cover.external?.url
  if (page.cover.type === "file") return page.cover.file?.url

  return undefined
}

function isPublishedStatus(status: string) {
  const normalized = normalizeKey(status)
  return ["published", "publicado", "live", "activo"].includes(normalized)
}

function mapPageToPostSummary(page: NotionPage): BlogPostSummary {
  const properties = page.properties ?? {}

  const title = readTitleValue(getProperty(properties, PROPERTY_ALIASES.title)) || "Sin título"
  const rawSlug = readRichTextValue(getProperty(properties, PROPERTY_ALIASES.slug))
  const summary = readRichTextValue(getProperty(properties, PROPERTY_ALIASES.summary))
  const status = readSelectValue(getProperty(properties, PROPERTY_ALIASES.status)) || DEFAULT_STATUS
  const publishDate = readDateValue(getProperty(properties, PROPERTY_ALIASES.publishDate))
  const updatedAt = readDateValue(getProperty(properties, PROPERTY_ALIASES.updatedAt)) || page.last_edited_time

  const selectCategory = readSelectValue(getProperty(properties, PROPERTY_ALIASES.category))
  const richCategory = readRichTextValue(getProperty(properties, PROPERTY_ALIASES.category))
  const multiCategory = readMultiSelectValues(getProperty(properties, PROPERTY_ALIASES.category))[0]
  const category = selectCategory || richCategory || multiCategory || DEFAULT_CATEGORY

  const tagsProperty = getProperty(properties, PROPERTY_ALIASES.tags)
  const multiTags = readMultiSelectValues(tagsProperty)
  const richTags = readRichTextValue(tagsProperty)
  const tags = multiTags.length
    ? multiTags
    : richTags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)

  const readTimeText = readRichTextValue(getProperty(properties, PROPERTY_ALIASES.readTime))
  const readTimeNumber = readNumberValue(getProperty(properties, PROPERTY_ALIASES.readTime))
  const readTime = readTimeText || (readTimeNumber ? `${readTimeNumber} min` : estimateReadTime(summary || title))

  const author =
    readPeopleValue(getProperty(properties, PROPERTY_ALIASES.author)) ||
    readRichTextValue(getProperty(properties, PROPERTY_ALIASES.author)) ||
    DEFAULT_AUTHOR

  const featured = readCheckboxValue(getProperty(properties, PROPERTY_ALIASES.featured))

  const coverImage =
    readFirstFileUrl(getProperty(properties, PROPERTY_ALIASES.coverImage)) ||
    readUrlValue(getProperty(properties, PROPERTY_ALIASES.coverImage)) ||
    readPageCover(page)

  const seoTitle = readRichTextValue(getProperty(properties, PROPERTY_ALIASES.seoTitle)) || undefined
  const seoDescription = readRichTextValue(getProperty(properties, PROPERTY_ALIASES.seoDescription)) || undefined

  return {
    id: page.id,
    title,
    slug: slugify(rawSlug || title),
    summary: summary || "Haz clic para leer el artículo completo.",
    status,
    isPublished: isPublishedStatus(status),
    publishDate,
    updatedAt,
    category,
    tags,
    readTime,
    author,
    featured,
    coverImage,
    seoTitle,
    seoDescription,
    notionUrl: page.url,
  }
}

async function queryDatabasePages({
  filterPublished,
  revalidate = DEFAULT_REVALIDATE_SECONDS,
}: {
  filterPublished: boolean
  revalidate?: number
}) {
  const databaseId = process.env.NOTION_DATABASE_ID
  const notionApiKey = process.env.NOTION_API_KEY

  if (!databaseId || !notionApiKey) {
    return [] as NotionPage[]
  }

  const pages: NotionPage[] = []
  let cursor: string | undefined
  let fallbackTried = false

  while (true) {
    const body: Record<string, unknown> = {
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    }

    if (!fallbackTried) {
      body.sorts = [{ property: "Publish Date", direction: "descending" }]

      if (filterPublished) {
        body.filter = {
          property: "Status",
          select: {
            equals: "Published",
          },
        }
      }
    }

    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      next: { revalidate },
    })

    if (!response.ok) {
      if (!fallbackTried) {
        fallbackTried = true
        cursor = undefined
        pages.length = 0
        continue
      }

      return []
    }

    const data = await response.json()
    const results: NotionPage[] = data?.results ?? []

    pages.push(...results)

    if (!data?.has_more || !data?.next_cursor) {
      break
    }

    cursor = data.next_cursor
  }

  return pages
}

function sortPostsByDateDesc(posts: BlogPostSummary[]) {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.publishDate || a.updatedAt || 0).getTime()
    const dateB = new Date(b.publishDate || b.updatedAt || 0).getTime()
    return dateB - dateA
  })
}

export async function getAllBlogPosts({ includeDrafts = false }: { includeDrafts?: boolean } = {}) {
  const pages = await queryDatabasePages({ filterPublished: false })
  const posts = pages.map(mapPageToPostSummary)

  const filtered = includeDrafts ? posts : posts.filter((post) => post.isPublished)
  return sortPostsByDateDesc(filtered)
}

export async function getPublishedBlogPosts() {
  const filteredPages = await queryDatabasePages({ filterPublished: true })
  const mapped = filteredPages.map(mapPageToPostSummary)

  const posts = mapped.length
    ? mapped.filter((post) => post.isPublished)
    : await getAllBlogPosts({ includeDrafts: false })

  return sortPostsByDateDesc(posts)
}

export async function getSinglePostBySlug(slug: string, { includeDrafts = false }: { includeDrafts?: boolean } = {}) {
  const databaseId = process.env.NOTION_DATABASE_ID

  if (!databaseId || !slug) {
    return null
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
      page_size: 5,
    })

    const mapped = response.results.map((page) => mapPageToPostSummary(page as NotionPage))
    const exact = mapped.find((post) => post.slug === slug)

    if (!exact) return null
    if (!includeDrafts && !exact.isPublished) return null

    return exact
  } catch {
    const allPosts = await getAllBlogPosts({ includeDrafts: true })
    const fallbackPost = allPosts.find((post) => post.slug === slug)

    if (!fallbackPost) return null
    if (!includeDrafts && !fallbackPost.isPublished) return null

    return fallbackPost
  }
}

async function listBlockChildren(blockId: string) {
  const blocks: any[] = []
  let cursor: string | undefined

  while (true) {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    })

    blocks.push(...response.results)

    if (!response.has_more || !response.next_cursor) {
      break
    }

    cursor = response.next_cursor
  }

  return blocks
}

async function hydrateNestedBlocks(blocks: any[]): Promise<any[]> {
  return Promise.all(
    blocks.map(async (block) => {
      if (block.has_children) {
        const childBlocks = await listBlockChildren(block.id)
        block.children = await hydrateNestedBlocks(childBlocks)
      }

      return block
    }),
  )
}

export async function getPostContent(pageId: string) {
  if (!pageId) return []

  const rootBlocks = await listBlockChildren(pageId)
  return hydrateNestedBlocks(rootBlocks)
}

function getRequiredNotionDatabaseId() {
  const databaseId = process.env.NOTION_DATABASE_ID
  if (!databaseId) {
    throw new Error("NOTION_CONFIG_MISSING")
  }

  return databaseId
}

async function getDatabaseSchema() {
  const databaseId = getRequiredNotionDatabaseId()

  const schema = (await notion.databases.retrieve({ database_id: databaseId })) as {
    properties?: NotionPropertyMap
  }

  return {
    databaseId,
    properties: schema.properties ?? {},
  }
}

function createRichText(content: string) {
  const trimmed = content.trim()
  if (!trimmed) return []

  const chunks: string[] = []
  for (let index = 0; index < trimmed.length; index += RICH_TEXT_CHUNK_SIZE) {
    chunks.push(trimmed.slice(index, index + RICH_TEXT_CHUNK_SIZE))
  }

  return chunks.map((chunk) => ({
    type: "text",
    text: {
      content: chunk,
    },
  }))
}

function parseReadTimeMinutes(readTime: string) {
  const match = readTime.match(/\d+/)
  if (!match) return undefined

  const minutes = Number.parseInt(match[0], 10)
  if (!Number.isFinite(minutes) || minutes <= 0) return undefined

  return minutes
}

function getPropertyOptions(property: { type?: string; [key: string]: any }) {
  if (property.type === "select") {
    return property.select?.options ?? []
  }

  if (property.type === "status") {
    return property.status?.options ?? []
  }

  if (property.type === "multi_select") {
    return property.multi_select?.options ?? []
  }

  return []
}

function resolveOptionName(
  property: { type?: string; [key: string]: any },
  preferredValue: string,
  fallbacks: string[] = [],
) {
  const options = getPropertyOptions(property)
  const candidates = [preferredValue, ...fallbacks].map((value) => normalizeText(value)).filter(Boolean)

  for (const candidate of candidates) {
    const match = options.find((option: { name?: string }) => normalizeKey(option.name || "") === normalizeKey(candidate))
    if (match?.name) return match.name
  }

  return candidates[0] || ""
}

function setTextProperty(
  target: Record<string, any>,
  schemaProperties: NotionPropertyMap,
  key: string | undefined,
  value: string,
) {
  if (!key) return

  const propertyType = schemaProperties[key]?.type
  const richTextValue = createRichText(value)

  if (propertyType === "rich_text") {
    target[key] = { rich_text: richTextValue }
    return
  }

  if (propertyType === "title") {
    target[key] = { title: richTextValue }
    return
  }

  if (propertyType === "url") {
    target[key] = { url: value || null }
  }
}

function setSelectLikeProperty(
  target: Record<string, any>,
  schemaProperties: NotionPropertyMap,
  key: string | undefined,
  value: string,
  fallbackNames: string[] = [],
) {
  if (!key) return

  const schema = schemaProperties[key]
  const propertyType = schema?.type
  const optionName = resolveOptionName(schema, value, fallbackNames)

  if (propertyType === "select") {
    target[key] = { select: optionName ? { name: optionName } : null }
    return
  }

  if (propertyType === "status") {
    target[key] = { status: optionName ? { name: optionName } : null }
    return
  }

  if (propertyType === "multi_select") {
    target[key] = { multi_select: optionName ? [{ name: optionName }] : [] }
    return
  }

  if (propertyType === "rich_text" || propertyType === "title" || propertyType === "url") {
    setTextProperty(target, schemaProperties, key, value)
  }
}

function setTagsProperty(
  target: Record<string, any>,
  schemaProperties: NotionPropertyMap,
  key: string | undefined,
  tags: string[],
) {
  if (!key) return

  const schema = schemaProperties[key]
  const propertyType = schema?.type

  if (propertyType === "multi_select") {
    const options = getPropertyOptions(schema)
    target[key] = {
      multi_select: tags.map((tag) => {
        const match = options.find((option: { name?: string }) => normalizeKey(option.name || "") === normalizeKey(tag))
        return { name: match?.name || tag }
      }),
    }
    return
  }

  if (propertyType === "select" || propertyType === "status") {
    setSelectLikeProperty(target, schemaProperties, key, tags[0] || "")
    return
  }

  setTextProperty(target, schemaProperties, key, tags.join(", "))
}

function setCoverProperty(
  target: Record<string, any>,
  schemaProperties: NotionPropertyMap,
  key: string | undefined,
  coverImage: string,
) {
  if (!key) return

  const schema = schemaProperties[key]
  const propertyType = schema?.type

  if (propertyType === "files") {
    target[key] = {
      files: coverImage
        ? [
            {
              name: "cover",
              type: "external",
              external: { url: coverImage },
            },
          ]
        : [],
    }
    return
  }

  setTextProperty(target, schemaProperties, key, coverImage)
}

function buildArticleProperties(schemaProperties: NotionPropertyMap, input: NormalizedAdminArticleInput) {
  const properties: Record<string, any> = {}

  const titleKey = resolvePropertyKey(schemaProperties, PROPERTY_ALIASES.title, {
    acceptedTypes: ["title", "rich_text"],
    allowTypeFallback: true,
  })

  if (!titleKey) {
    throw new Error("NOTION_TITLE_PROPERTY_NOT_FOUND")
  }

  setTextProperty(properties, schemaProperties, titleKey, input.title)

  const slugKey = resolvePropertyKey(schemaProperties, PROPERTY_ALIASES.slug, {
    acceptedTypes: ["rich_text", "title"],
  })
  if (slugKey && slugKey !== titleKey) {
    setTextProperty(properties, schemaProperties, slugKey, input.slug)
  }

  setTextProperty(
    properties,
    schemaProperties,
    resolvePropertyKey(schemaProperties, PROPERTY_ALIASES.summary, {
      acceptedTypes: ["rich_text", "title", "url"],
    }),
    input.summary,
  )

  setSelectLikeProperty(
    properties,
    schemaProperties,
    resolvePropertyKey(schemaProperties, PROPERTY_ALIASES.status, {
      acceptedTypes: ["select", "status", "multi_select", "rich_text", "title"],
    }),
    input.status,
    input.status === "Published"
      ? ["Publicado", "Live", "Activo"]
      : input.status === "Archived"
        ? ["Archivado", "Archive", "Inactive", "Inactivo"]
        : ["Borrador"],
  )

  const publishDateKey = resolvePropertyKey(schemaProperties, PROPERTY_ALIASES.publishDate, {
    acceptedTypes: ["date"],
  })
  if (publishDateKey) {
    properties[publishDateKey] = {
      date: input.publishDate ? { start: input.publishDate } : null,
    }
  }

  setSelectLikeProperty(
    properties,
    schemaProperties,
    resolvePropertyKey(schemaProperties, PROPERTY_ALIASES.category, {
      acceptedTypes: ["select", "status", "multi_select", "rich_text", "title", "url"],
    }),
    input.category,
  )

  setTagsProperty(
    properties,
    schemaProperties,
    resolvePropertyKey(schemaProperties, PROPERTY_ALIASES.tags, {
      acceptedTypes: ["multi_select", "select", "status", "rich_text", "title", "url"],
    }),
    input.tags,
  )

  const readTimeKey = resolvePropertyKey(schemaProperties, PROPERTY_ALIASES.readTime, {
    acceptedTypes: ["rich_text", "title", "number", "url"],
  })

  if (readTimeKey) {
    const readTimeType = schemaProperties[readTimeKey]?.type

    if (readTimeType === "number") {
      properties[readTimeKey] = {
        number: parseReadTimeMinutes(input.readTime) ?? null,
      }
    } else {
      setTextProperty(properties, schemaProperties, readTimeKey, input.readTime)
    }
  }

  const authorKey = resolvePropertyKey(schemaProperties, PROPERTY_ALIASES.author, {
    acceptedTypes: ["rich_text", "title", "url", "select", "status", "multi_select", "people"],
  })

  if (authorKey) {
    const authorType = schemaProperties[authorKey]?.type

    if (authorType === "people") {
      // No se puede mapear un nombre libre a personas de Notion sin IDs.
    } else if (authorType === "select" || authorType === "status" || authorType === "multi_select") {
      setSelectLikeProperty(properties, schemaProperties, authorKey, input.author)
    } else {
      setTextProperty(properties, schemaProperties, authorKey, input.author)
    }
  }

  const featuredKey = resolvePropertyKey(schemaProperties, PROPERTY_ALIASES.featured, {
    acceptedTypes: ["checkbox"],
  })
  if (featuredKey) {
    properties[featuredKey] = {
      checkbox: Boolean(input.featured),
    }
  }

  setCoverProperty(
    properties,
    schemaProperties,
    resolvePropertyKey(schemaProperties, PROPERTY_ALIASES.coverImage, {
      acceptedTypes: ["files", "url", "rich_text", "title"],
    }),
    input.coverImage,
  )

  setTextProperty(
    properties,
    schemaProperties,
    resolvePropertyKey(schemaProperties, PROPERTY_ALIASES.seoTitle, {
      acceptedTypes: ["rich_text", "title", "url"],
    }),
    input.seoTitle,
  )

  setTextProperty(
    properties,
    schemaProperties,
    resolvePropertyKey(schemaProperties, PROPERTY_ALIASES.seoDescription, {
      acceptedTypes: ["rich_text", "title", "url"],
    }),
    input.seoDescription,
  )

  const updatedAtKey = resolvePropertyKey(schemaProperties, PROPERTY_ALIASES.updatedAt, {
    acceptedTypes: ["date"],
  })
  if (updatedAtKey) {
    properties[updatedAtKey] = {
      date: { start: getTodayDate() },
    }
  }

  return properties
}

const CODE_LANGUAGES = new Set([
  "abap",
  "agda",
  "arduino",
  "assembly",
  "bash",
  "basic",
  "c",
  "clojure",
  "coffeescript",
  "c++",
  "c#",
  "css",
  "dart",
  "diff",
  "docker",
  "elixir",
  "elm",
  "erlang",
  "flow",
  "fortran",
  "f#",
  "gherkin",
  "glsl",
  "go",
  "graphql",
  "groovy",
  "haskell",
  "html",
  "java",
  "javascript",
  "json",
  "julia",
  "kotlin",
  "latex",
  "less",
  "lisp",
  "livescript",
  "lua",
  "makefile",
  "markdown",
  "markup",
  "matlab",
  "mermaid",
  "nix",
  "notion formula",
  "objective-c",
  "ocaml",
  "pascal",
  "perl",
  "php",
  "plain text",
  "powershell",
  "prolog",
  "protobuf",
  "python",
  "r",
  "reason",
  "ruby",
  "rust",
  "sass",
  "scala",
  "scheme",
  "scss",
  "shell",
  "sql",
  "swift",
  "toml",
  "typescript",
  "vb.net",
  "verilog",
  "vhdl",
  "visual basic",
  "webassembly",
  "xml",
  "yaml",
  "java/c/c++/c#",
])

function normalizeCodeLanguage(language: string) {
  const normalized = normalizeKey(language)

  if (normalized === "ts") return "typescript"
  if (normalized === "js") return "javascript"
  if (normalized === "sh" || normalized === "zsh") return "bash"
  if (normalized === "plaintext" || normalized === "text") return "plain text"

  for (const candidate of CODE_LANGUAGES) {
    if (normalizeKey(candidate) === normalized) {
      return candidate
    }
  }

  return "plain text"
}

function createParagraphBlock(text: string) {
  return {
    object: "block",
    type: "paragraph",
    paragraph: {
      rich_text: createRichText(text),
    },
  }
}

function createHeadingBlock(level: 1 | 2 | 3, text: string) {
  const key = `heading_${level}`

  return {
    object: "block",
    type: key,
    [key]: {
      rich_text: createRichText(text),
    },
  }
}

function createQuoteBlock(text: string) {
  return {
    object: "block",
    type: "quote",
    quote: {
      rich_text: createRichText(text),
    },
  }
}

function createListBlock(type: "bulleted_list_item" | "numbered_list_item", text: string) {
  return {
    object: "block",
    type,
    [type]: {
      rich_text: createRichText(text),
    },
  }
}

function createCodeBlock(text: string, language: string) {
  return {
    object: "block",
    type: "code",
    code: {
      rich_text: createRichText(text),
      language: normalizeCodeLanguage(language),
    },
  }
}

function textToNotionBlocks(content: string) {
  const normalized = normalizeMultilineText(content)

  if (!normalized) {
    return [createParagraphBlock(" ")]
  }

  const lines = normalized.split("\n")
  const blocks: any[] = []
  let paragraphBuffer: string[] = []
  let insideCodeFence = false
  let codeFenceLanguage = "plain text"
  let codeBuffer: string[] = []

  const flushParagraph = () => {
    const text = paragraphBuffer.join(" ").trim()
    if (!text) {
      paragraphBuffer = []
      return
    }

    blocks.push(createParagraphBlock(text))
    paragraphBuffer = []
  }

  const flushCode = () => {
    const text = codeBuffer.join("\n").trim()
    if (text) {
      blocks.push(createCodeBlock(text, codeFenceLanguage))
    }
    codeBuffer = []
    codeFenceLanguage = "plain text"
  }

  for (const rawLine of lines) {
    const trimmed = rawLine.trim()

    if (insideCodeFence) {
      if (trimmed.startsWith("```")) {
        flushCode()
        insideCodeFence = false
      } else {
        codeBuffer.push(rawLine)
      }
      continue
    }

    if (trimmed.startsWith("```")) {
      flushParagraph()
      insideCodeFence = true
      codeFenceLanguage = normalizeCodeLanguage(trimmed.slice(3).trim())
      continue
    }

    if (!trimmed) {
      flushParagraph()
      continue
    }

    if (/^(---|\*\*\*)$/.test(trimmed)) {
      flushParagraph()
      blocks.push({ object: "block", type: "divider", divider: {} })
      continue
    }

    if (/^###\s+/.test(trimmed)) {
      flushParagraph()
      blocks.push(createHeadingBlock(3, trimmed.replace(/^###\s+/, "")))
      continue
    }

    if (/^##\s+/.test(trimmed)) {
      flushParagraph()
      blocks.push(createHeadingBlock(2, trimmed.replace(/^##\s+/, "")))
      continue
    }

    if (/^#\s+/.test(trimmed)) {
      flushParagraph()
      blocks.push(createHeadingBlock(1, trimmed.replace(/^#\s+/, "")))
      continue
    }

    if (/^>\s+/.test(trimmed)) {
      flushParagraph()
      blocks.push(createQuoteBlock(trimmed.replace(/^>\s+/, "")))
      continue
    }

    if (/^-\s+/.test(trimmed)) {
      flushParagraph()
      blocks.push(createListBlock("bulleted_list_item", trimmed.replace(/^-\s+/, "")))
      continue
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph()
      blocks.push(createListBlock("numbered_list_item", trimmed.replace(/^\d+\.\s+/, "")))
      continue
    }

    paragraphBuffer.push(trimmed)
  }

  flushParagraph()

  if (insideCodeFence) {
    flushCode()
  }

  if (!blocks.length) {
    return [createParagraphBlock(" ")]
  }

  return blocks
}

function getBlockPlainText(block: any, type: string) {
  return readPlainTextItems(block?.[type]?.rich_text || [])
}

function blockToEditorLines(block: any, depth = 0): string[] {
  const indent = "  ".repeat(depth)
  const lines: string[] = []

  if (!block || typeof block !== "object") {
    return lines
  }

  const pushLine = (value: string) => {
    const line = `${indent}${value}`.trimEnd()
    if (line) {
      lines.push(line)
    }
  }

  switch (block.type) {
    case "paragraph": {
      pushLine(getBlockPlainText(block, "paragraph"))
      break
    }

    case "heading_1": {
      pushLine(`# ${getBlockPlainText(block, "heading_1")}`)
      break
    }

    case "heading_2": {
      pushLine(`## ${getBlockPlainText(block, "heading_2")}`)
      break
    }

    case "heading_3": {
      pushLine(`### ${getBlockPlainText(block, "heading_3")}`)
      break
    }

    case "quote": {
      pushLine(`> ${getBlockPlainText(block, "quote")}`)
      break
    }

    case "bulleted_list_item": {
      pushLine(`- ${getBlockPlainText(block, "bulleted_list_item")}`)
      break
    }

    case "numbered_list_item": {
      pushLine(`1. ${getBlockPlainText(block, "numbered_list_item")}`)
      break
    }

    case "to_do": {
      const checked = Boolean(block?.to_do?.checked)
      const text = getBlockPlainText(block, "to_do")
      pushLine(`- [${checked ? "x" : " "}] ${text}`)
      break
    }

    case "code": {
      const language = block?.code?.language || "plain text"
      const text = getBlockPlainText(block, "code")
      pushLine(`\`\`\`${language}`)
      if (text) {
        for (const codeLine of text.split("\n")) {
          pushLine(codeLine)
        }
      }
      pushLine("\`\`\`")
      break
    }

    case "divider": {
      pushLine("---")
      break
    }

    default: {
      const fallbackText =
        getBlockPlainText(block, block.type || "") ||
        readPlainTextItems(block?.callout?.rich_text || []) ||
        readPlainTextItems(block?.toggle?.rich_text || [])

      if (fallbackText) {
        pushLine(fallbackText)
      }
      break
    }
  }

  if (Array.isArray(block.children) && block.children.length > 0) {
    for (const child of block.children) {
      const childLines = blockToEditorLines(child, depth + 1)
      lines.push(...childLines)
    }
  }

  return lines
}

function notionBlocksToEditorContent(blocks: any[]) {
  const groups: string[] = []

  for (const block of blocks) {
    const lines = blockToEditorLines(block)
    if (!lines.length) continue
    groups.push(lines.join("\n"))
  }

  return groups.join("\n\n").trim()
}

function chunkArray<T>(items: T[], size: number) {
  const chunks: T[][] = []

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }

  return chunks
}

async function replacePageContent(pageId: string, content: string) {
  const existingBlocks = await listBlockChildren(pageId)

  for (const block of existingBlocks) {
    await notion.blocks.delete({ block_id: block.id })
  }

  const blocks = textToNotionBlocks(content)
  const chunks = chunkArray(blocks, BLOCK_APPEND_CHUNK_SIZE)

  for (const chunk of chunks) {
    await notion.blocks.children.append({
      block_id: pageId,
      children: chunk,
    })
  }
}

type NormalizedAdminArticleInput = {
  title: string
  slug: string
  summary: string
  status: string
  publishDate: string
  category: string
  tags: string[]
  readTime: string
  author: string
  featured: boolean
  coverImage: string
  seoTitle: string
  seoDescription: string
  content: string
}

function normalizeAdminArticleInput(input: AdminArticleInput): NormalizedAdminArticleInput {
  const title = normalizeText(input.title) || DEFAULT_TITLE
  const slug = slugify(normalizeText(input.slug) || title)
  const summary = normalizeText(input.summary)
  const status = normalizeStatus(input.status)
  const publishDate = normalizeDateInput(input.publishDate) || getTodayDate()
  const category = normalizeText(input.category) || DEFAULT_CATEGORY
  const tags = normalizeTags(input.tags)
  const content = normalizeMultilineText(input.content)
  const readTime = normalizeText(input.readTime) || estimateReadTime(content || summary || title)
  const author = normalizeText(input.author) || DEFAULT_AUTHOR
  const featured = Boolean(input.featured)
  const coverImage = normalizeText(input.coverImage)
  const seoTitle = normalizeText(input.seoTitle)
  const seoDescription = normalizeText(input.seoDescription)

  return {
    title,
    slug,
    summary,
    status,
    publishDate,
    category,
    tags,
    readTime,
    author,
    featured,
    coverImage,
    seoTitle,
    seoDescription,
    content,
  }
}

async function assertSlugIsUnique(slug: string, excludePageId?: string) {
  const allPosts = await getAllBlogPosts({ includeDrafts: true })
  const normalizedSlug = slugify(slug)

  const duplicated = allPosts.find(
    (post) => slugify(post.slug) === normalizedSlug && (!excludePageId || post.id !== excludePageId),
  )

  if (duplicated) {
    throw new Error("SLUG_ALREADY_EXISTS")
  }
}

export async function getAdminArticleById(pageId: string): Promise<AdminArticleDetail | null> {
  if (!pageId) return null

  try {
    const page = (await notion.pages.retrieve({ page_id: pageId })) as NotionPage
    const summary = mapPageToPostSummary(page)
    const blocks = await getPostContent(pageId)

    return {
      ...summary,
      content: notionBlocksToEditorContent(blocks as any[]),
    }
  } catch {
    return null
  }
}

export async function createAdminArticle(input: AdminArticleInput) {
  const title = normalizeText(input.title)
  if (!title) {
    throw new Error("TITLE_REQUIRED")
  }

  const normalizedInput = normalizeAdminArticleInput(input)
  await assertSlugIsUnique(normalizedInput.slug)

  const { databaseId, properties: schemaProperties } = await getDatabaseSchema()
  const properties = buildArticleProperties(schemaProperties, normalizedInput)

  const created = (await notion.pages.create({
    parent: { database_id: databaseId },
    properties,
  })) as { id: string }

  await replacePageContent(created.id, normalizedInput.content)

  const createdPost = await getAdminArticleById(created.id)
  if (!createdPost) {
    throw new Error("CREATE_FAILED")
  }

  return createdPost
}

export async function updateAdminArticle(pageId: string, input: AdminArticleInput) {
  const currentPost = await getAdminArticleById(pageId)
  if (!currentPost) {
    return null
  }

  const mergedInput: AdminArticleInput = {
    title: input.title ?? currentPost.title,
    slug: input.slug ?? currentPost.slug,
    summary: input.summary ?? currentPost.summary,
    status: input.status ?? currentPost.status,
    publishDate: input.publishDate ?? currentPost.publishDate,
    category: input.category ?? currentPost.category,
    tags: input.tags ?? currentPost.tags,
    readTime: input.readTime ?? currentPost.readTime,
    author: input.author ?? currentPost.author,
    featured: typeof input.featured === "boolean" ? input.featured : currentPost.featured,
    coverImage: input.coverImage ?? currentPost.coverImage,
    seoTitle: input.seoTitle ?? currentPost.seoTitle,
    seoDescription: input.seoDescription ?? currentPost.seoDescription,
    content: input.content ?? currentPost.content,
  }

  const normalizedInput = normalizeAdminArticleInput(mergedInput)

  if (!normalizedInput.title) {
    throw new Error("TITLE_REQUIRED")
  }

  await assertSlugIsUnique(normalizedInput.slug, pageId)

  const { properties: schemaProperties } = await getDatabaseSchema()
  const properties = buildArticleProperties(schemaProperties, normalizedInput)

  await notion.pages.update({
    page_id: pageId,
    properties,
  })

  if (typeof input.content === "string") {
    const currentContent = normalizeMultilineText(currentPost.content)
    const nextContent = normalizeMultilineText(input.content)

    if (currentContent !== nextContent) {
      await replacePageContent(pageId, nextContent)
    }
  }

  const updatedPost = await getAdminArticleById(pageId)
  if (!updatedPost) {
    throw new Error("UPDATE_FAILED")
  }

  return updatedPost
}

export async function archiveAdminArticle(pageId: string) {
  const { properties: schemaProperties } = await getDatabaseSchema()

  const statusKey = resolvePropertyKey(schemaProperties, PROPERTY_ALIASES.status, {
    acceptedTypes: ["select", "status", "multi_select", "rich_text", "title"],
  })

  if (statusKey) {
    const properties: Record<string, any> = {}

    setSelectLikeProperty(
      properties,
      schemaProperties,
      statusKey,
      "Archived",
      ["Archivado", "Archive", "Inactive", "Inactivo"],
    )

    await notion.pages.update({
      page_id: pageId,
      properties,
    })

    return
  }

  await notion.pages.update({
    page_id: pageId,
    archived: true,
  })
}
