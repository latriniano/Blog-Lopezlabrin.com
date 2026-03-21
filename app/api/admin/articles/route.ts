import { NextRequest, NextResponse } from "next/server"
import { ADMIN_SESSION_COOKIE_NAME, isAdminSessionTokenValid } from "@/lib/admin-auth"
import { createAdminArticle, getAllBlogPosts } from "@/lib/notion"
import { slugify } from "@/lib/utils"

export const dynamic = "force-dynamic"

interface CreateArticleBody {
  title?: unknown
  slug?: unknown
  summary?: unknown
  status?: unknown
  publishDate?: unknown
  category?: unknown
  tags?: unknown
  readTime?: unknown
  author?: unknown
  featured?: unknown
  coverImage?: unknown
  seoTitle?: unknown
  seoDescription?: unknown
  content?: unknown
}

function unauthorizedResponse() {
  return NextResponse.json({ error: "No autorizado" }, { status: 401 })
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function parseBoolean(value: unknown) {
  if (typeof value === "boolean") return value
  if (typeof value !== "string") return false

  const normalized = value.trim().toLowerCase()
  return ["true", "1", "yes", "si", "on"].includes(normalized)
}

function parseTagsInput(value: unknown) {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string")
  }

  if (typeof value === "string") {
    return value
  }

  return undefined
}

async function parseBody(request: NextRequest): Promise<CreateArticleBody | null> {
  const contentType = request.headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    return (await request.json().catch(() => null)) as CreateArticleBody | null
  }

  const formData = await request.formData().catch(() => null)
  if (!formData) return null

  const body: Record<string, unknown> = {}

  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      body[key] = value
    }
  }

  return body as CreateArticleBody
}

function mapCreateError(error: unknown) {
  const message = error instanceof Error ? error.message : ""

  if (message === "TITLE_REQUIRED") {
    return { status: 400, error: "El título es obligatorio." }
  }

  if (message === "SLUG_ALREADY_EXISTS") {
    return { status: 409, error: "El slug ya existe. Usa uno diferente." }
  }

  if (message === "NOTION_CONFIG_MISSING") {
    return { status: 500, error: "Falta configurar NOTION_DATABASE_ID o NOTION_API_KEY." }
  }

  if (message === "NOTION_TITLE_PROPERTY_NOT_FOUND") {
    return {
      status: 500,
      error: "No se encontró una propiedad de título en la base de Notion.",
    }
  }

  return { status: 500, error: "No se pudo crear el artículo en Notion." }
}

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value

  if (!isAdminSessionTokenValid(sessionToken)) {
    return unauthorizedResponse()
  }

  const posts = await getAllBlogPosts({ includeDrafts: true })
  const searchParams = new URL(request.url).searchParams

  const query = (searchParams.get("q") || "").trim().toLowerCase()
  const status = slugify(searchParams.get("status") || "")
  const category = slugify(searchParams.get("category") || "")

  const requestedPage = Number.parseInt(searchParams.get("page") || "1", 10)
  const requestedLimit = Number.parseInt(searchParams.get("limit") || "12", 10)

  const limit =
    Number.isFinite(requestedLimit) && requestedLimit > 0 ? Math.min(100, requestedLimit) : 12

  let filtered = posts

  if (status && status !== "all") {
    filtered = filtered.filter((post) => slugify(post.status) === status)
  }

  if (category && category !== "all") {
    filtered = filtered.filter((post) => slugify(post.category) === category)
  }

  if (query) {
    filtered = filtered.filter((post) => {
      const haystack = [
        post.title,
        post.summary,
        post.slug,
        post.category,
        post.author,
        post.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase()

      return haystack.includes(query)
    })
  }

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const page =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, totalPages)
      : 1

  const start = (page - 1) * limit
  const items = filtered.slice(start, start + limit).map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    summary: post.summary,
    status: post.status,
    category: post.category,
    publishDate: post.publishDate || null,
    updatedAt: post.updatedAt || null,
    readTime: post.readTime,
    author: post.author,
    tags: post.tags,
    featured: post.featured,
    coverImage: post.coverImage || null,
  }))

  const statuses = Array.from(new Set(posts.map((post) => post.status))).filter(Boolean)
  const categories = Array.from(new Set(posts.map((post) => post.category))).filter(Boolean)

  return NextResponse.json({
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
    filters: {
      statuses,
      categories,
    },
  })
}

export async function POST(request: NextRequest) {
  const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value

  if (!isAdminSessionTokenValid(sessionToken)) {
    return unauthorizedResponse()
  }

  const body = await parseBody(request)
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Body inválido." }, { status: 400 })
  }

  const title = normalizeText(body.title)
  if (!title) {
    return NextResponse.json({ error: "El título es obligatorio." }, { status: 400 })
  }

  try {
    const created = await createAdminArticle({
      title,
      slug: normalizeText(body.slug) || undefined,
      summary: normalizeText(body.summary) || undefined,
      status: normalizeText(body.status) || undefined,
      publishDate: normalizeText(body.publishDate) || undefined,
      category: normalizeText(body.category) || undefined,
      tags: parseTagsInput(body.tags),
      readTime: normalizeText(body.readTime) || undefined,
      author: normalizeText(body.author) || undefined,
      featured: parseBoolean(body.featured),
      coverImage: normalizeText(body.coverImage) || undefined,
      seoTitle: normalizeText(body.seoTitle) || undefined,
      seoDescription: normalizeText(body.seoDescription) || undefined,
      content: normalizeText(body.content) || undefined,
    })

    return NextResponse.json(
      {
        item: created,
      },
      { status: 201 },
    )
  } catch (error) {
    const mappedError = mapCreateError(error)
    return NextResponse.json({ error: mappedError.error }, { status: mappedError.status })
  }
}
