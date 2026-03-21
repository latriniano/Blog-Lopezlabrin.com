import { NextRequest, NextResponse } from "next/server"
import { ADMIN_SESSION_COOKIE_NAME, isAdminSessionTokenValid } from "@/lib/admin-auth"
import { archiveAdminArticle, getAdminArticleById, updateAdminArticle } from "@/lib/notion"

export const dynamic = "force-dynamic"

type RouteContext = {
  params: Promise<{ id: string }> | { id: string }
}

interface PatchArticleBody {
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

function parseBoolean(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value
  if (typeof value !== "string") return undefined

  const normalized = value.trim().toLowerCase()
  if (["true", "1", "yes", "si", "on"].includes(normalized)) return true
  if (["false", "0", "no", "off"].includes(normalized)) return false
  return undefined
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

async function parseBody(request: NextRequest): Promise<PatchArticleBody | null> {
  const contentType = request.headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    return (await request.json().catch(() => null)) as PatchArticleBody | null
  }

  const formData = await request.formData().catch(() => null)
  if (!formData) return null

  const body: Record<string, unknown> = {}
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      body[key] = value
    }
  }

  return body as PatchArticleBody
}

function mapAdminError(error: unknown) {
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

  return { status: 500, error: "No se pudo completar la operación en Notion." }
}

async function getArticleIdFromContext(context: RouteContext) {
  const params = await Promise.resolve(context.params)
  return decodeURIComponent(params?.id || "").trim()
}

function buildPatchInput(body: PatchArticleBody) {
  const featured = parseBoolean(body.featured)

  return {
    title: normalizeText(body.title) || undefined,
    slug: normalizeText(body.slug) || undefined,
    summary: normalizeText(body.summary) || undefined,
    status: normalizeText(body.status) || undefined,
    publishDate: normalizeText(body.publishDate) || undefined,
    category: normalizeText(body.category) || undefined,
    tags: parseTagsInput(body.tags),
    readTime: normalizeText(body.readTime) || undefined,
    author: normalizeText(body.author) || undefined,
    featured,
    coverImage: normalizeText(body.coverImage) || undefined,
    seoTitle: normalizeText(body.seoTitle) || undefined,
    seoDescription: normalizeText(body.seoDescription) || undefined,
    content: typeof body.content === "string" ? body.content.trim() : undefined,
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value

  if (!isAdminSessionTokenValid(sessionToken)) {
    return unauthorizedResponse()
  }

  const articleId = await getArticleIdFromContext(context)
  if (!articleId) {
    return NextResponse.json({ error: "ID de artículo inválido." }, { status: 400 })
  }

  const article = await getAdminArticleById(articleId)
  if (!article) {
    return NextResponse.json({ error: "Artículo no encontrado." }, { status: 404 })
  }

  return NextResponse.json({ item: article })
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value

  if (!isAdminSessionTokenValid(sessionToken)) {
    return unauthorizedResponse()
  }

  const articleId = await getArticleIdFromContext(context)
  if (!articleId) {
    return NextResponse.json({ error: "ID de artículo inválido." }, { status: 400 })
  }

  const body = await parseBody(request)
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Body inválido." }, { status: 400 })
  }

  try {
    const updated = await updateAdminArticle(articleId, buildPatchInput(body))
    if (!updated) {
      return NextResponse.json({ error: "Artículo no encontrado." }, { status: 404 })
    }

    return NextResponse.json({ item: updated })
  } catch (error) {
    const mappedError = mapAdminError(error)
    return NextResponse.json({ error: mappedError.error }, { status: mappedError.status })
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value

  if (!isAdminSessionTokenValid(sessionToken)) {
    return unauthorizedResponse()
  }

  const articleId = await getArticleIdFromContext(context)
  if (!articleId) {
    return NextResponse.json({ error: "ID de artículo inválido." }, { status: 400 })
  }

  try {
    const existing = await getAdminArticleById(articleId)
    if (!existing) {
      return NextResponse.json({ error: "Artículo no encontrado." }, { status: 404 })
    }

    await archiveAdminArticle(articleId)
    return NextResponse.json({ ok: true })
  } catch (error) {
    const mappedError = mapAdminError(error)
    return NextResponse.json({ error: mappedError.error }, { status: mappedError.status })
  }
}
