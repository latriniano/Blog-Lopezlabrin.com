import { mkdir, writeFile } from "fs/promises"
import path from "path"
import { randomUUID } from "crypto"
import { NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { ADMIN_SESSION_COOKIE_NAME, isAdminSessionTokenValid } from "@/lib/admin-auth"
import { slugify } from "@/lib/utils"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024

const ALLOWED_MIME_TYPES = new Map<string, string>([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
  ["image/gif", "gif"],
])

function unauthorizedResponse() {
  return NextResponse.json({ error: "No autorizado" }, { status: 401 })
}

function sanitizeFileName(fileName: string) {
  const withoutExtension = fileName.replace(/\.[^/.]+$/, "")
  return slugify(withoutExtension) || "cover"
}

function getExtensionFromName(fileName: string) {
  const rawExtension = fileName.split(".").pop()?.toLowerCase() || ""

  if (["jpg", "jpeg"].includes(rawExtension)) return "jpg"
  if (["png", "webp", "avif", "gif"].includes(rawExtension)) return rawExtension
  return ""
}

function hasBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

function isVercelRuntime() {
  return Boolean(process.env.VERCEL)
}

async function saveToBlob(fileName: string, bytes: Buffer, contentType: string) {
  const blob = await put(`covers/${fileName}`, bytes, {
    access: "public",
    contentType: contentType || undefined,
  })

  return {
    path: blob.pathname,
    url: blob.url,
  }
}

async function saveToLocalUploads(fileName: string, bytes: Buffer, requestUrl: string) {
  const uploadDir = path.join(process.cwd(), "public", "uploads", "covers")
  const filePath = path.join(uploadDir, fileName)

  await mkdir(uploadDir, { recursive: true })
  await writeFile(filePath, bytes)

  const relativePath = `/uploads/covers/${fileName}`

  return {
    path: relativePath,
    url: new URL(relativePath, requestUrl).toString(),
  }
}

export async function POST(request: NextRequest) {
  const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value

  if (!isAdminSessionTokenValid(sessionToken)) {
    return unauthorizedResponse()
  }

  const formData = await request.formData().catch(() => null)
  if (!formData) {
    return NextResponse.json({ error: "No se pudo leer el formulario." }, { status: 400 })
  }

  const file = formData.get("file")
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Archivo inválido." }, { status: 400 })
  }

  if (!file.size || file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      { error: "La imagen debe pesar entre 1 byte y 8 MB." },
      { status: 400 },
    )
  }

  const extensionFromMime = ALLOWED_MIME_TYPES.get(file.type)
  const extension = extensionFromMime || getExtensionFromName(file.name)
  const contentType = extensionFromMime ? file.type : ""

  if (!extension) {
    return NextResponse.json(
      { error: "Formato no soportado. Usá JPG, PNG, WEBP, AVIF o GIF." },
      { status: 400 },
    )
  }

  const safeName = sanitizeFileName(file.name)
  const uniqueSuffix = `${Date.now()}-${randomUUID().slice(0, 8)}`
  const fileName = `${uniqueSuffix}-${safeName}.${extension}`

  const bytes = Buffer.from(await file.arrayBuffer())

  try {
    if (hasBlobStorage()) {
      const savedFile = await saveToBlob(fileName, bytes, contentType)

      return NextResponse.json({
        ok: true,
        path: savedFile.path,
        url: savedFile.url,
      })
    }

    if (isVercelRuntime()) {
      return NextResponse.json(
        { error: "Falta configurar Vercel Blob para subir imágenes." },
        { status: 500 },
      )
    }

    const savedFile = await saveToLocalUploads(fileName, bytes, request.url)

    return NextResponse.json({
      ok: true,
      path: savedFile.path,
      url: savedFile.url,
    })
  } catch (error) {
    console.error("Cover upload failed", error)
    return NextResponse.json({ error: "No se pudo guardar la imagen." }, { status: 500 })
  }
}
