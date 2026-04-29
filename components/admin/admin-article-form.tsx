"use client"

import { type ChangeEvent, type FormEvent, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ExternalLink, Eye, Loader2, Save, Trash2 } from "lucide-react"
import { slugify } from "@/lib/utils"

type AdminArticleFormMode = "create" | "edit"

interface AdminArticleFormData {
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

interface AdminArticleApiItem {
  id?: string
  title?: string
  slug?: string
  summary?: string
  status?: string
  publishDate?: string | null
  category?: string
  tags?: string[]
  readTime?: string
  author?: string
  featured?: boolean
  coverImage?: string | null
  seoTitle?: string
  seoDescription?: string
  content?: string
}

interface AdminArticleFormProps {
  mode: AdminArticleFormMode
  articleId?: string
  initialData?: Partial<AdminArticleFormData>
}

function getTodayDate() {
  return new Date().toISOString().slice(0, 10)
}

function mapItemToForm(item?: AdminArticleApiItem): AdminArticleFormData {
  return {
    title: item?.title || "",
    slug: item?.slug || "",
    summary: item?.summary || "",
    status: item?.status || "Draft",
    publishDate: item?.publishDate?.slice(0, 10) || getTodayDate(),
    category: item?.category || "General",
    tags: Array.isArray(item?.tags) ? item.tags.filter(Boolean) : [],
    readTime: item?.readTime || "",
    author: item?.author || "",
    featured: Boolean(item?.featured),
    coverImage: item?.coverImage || "",
    seoTitle: item?.seoTitle || "",
    seoDescription: item?.seoDescription || "",
    content: item?.content || "",
  }
}

function splitTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .filter((tag, index, list) => list.findIndex((item) => item.toLowerCase() === tag.toLowerCase()) === index)
}

export function AdminArticleForm({ mode, articleId, initialData }: AdminArticleFormProps) {
  const router = useRouter()

  const initialForm = useMemo(() => mapItemToForm(initialData), [initialData])
  const [form, setForm] = useState<AdminArticleFormData>(initialForm)
  const [tagsInput, setTagsInput] = useState(initialForm.tags.join(", "))
  const [slugTouched, setSlugTouched] = useState(Boolean(initialForm.slug))

  const [isSaving, setIsSaving] = useState(false)
  const [isArchiving, setIsArchiving] = useState(false)
  const [isUploadingCover, setIsUploadingCover] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [coverUploadError, setCoverUploadError] = useState("")

  const endpoint = mode === "create" ? "/api/admin/articles" : `/api/admin/articles/${articleId}`

  const updateField = <K extends keyof AdminArticleFormData>(field: K, value: AdminArticleFormData[K]) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleTitleChange = (value: string) => {
    setForm((current) => {
      if (slugTouched) {
        return {
          ...current,
          title: value,
        }
      }

      return {
        ...current,
        title: value,
        slug: slugify(value),
      }
    })
  }

  const handleSlugChange = (value: string) => {
    setSlugTouched(true)
    updateField("slug", slugify(value))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    setSuccess("")

    if (!form.title.trim()) {
      setError("El título es obligatorio.")
      return
    }

    if (!form.slug.trim()) {
      setError("El slug es obligatorio.")
      return
    }

    setIsSaving(true)

    try {
      const payload = {
        ...form,
        slug: slugify(form.slug),
        tags: splitTags(tagsInput),
      }

      const response = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.status === 401) {
        router.replace("/admin/login")
        router.refresh()
        return
      }

      const data = (await response.json().catch(() => null)) as { error?: string; item?: AdminArticleApiItem } | null

      if (!response.ok || !data) {
        setError(data?.error || "No se pudo guardar el artículo.")
        return
      }

      const updatedForm = mapItemToForm(data.item)
      setForm(updatedForm)
      setTagsInput(updatedForm.tags.join(", "))
      setSlugTouched(true)

      if (mode === "create" && data.item?.id) {
        router.replace(`/admin/articles/${data.item.id}`)
        router.refresh()
        return
      }

      setSuccess("Cambios guardados correctamente.")
      router.refresh()
    } catch {
      setError("Error de conexión al guardar.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleArchive = async () => {
    if (!articleId) return

    const confirmed = window.confirm("¿Seguro que querés archivar este artículo?")
    if (!confirmed) return

    setError("")
    setSuccess("")
    setIsArchiving(true)

    try {
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: "DELETE",
      })

      if (response.status === 401) {
        router.replace("/admin/login")
        router.refresh()
        return
      }

      const data = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        setError(data?.error || "No se pudo archivar el artículo.")
        return
      }

      router.replace("/admin/articles")
      router.refresh()
    } catch {
      setError("Error de conexión al archivar.")
    } finally {
      setIsArchiving(false)
    }
  }

  const handleCoverFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setCoverUploadError("")
    setError("")
    setSuccess("")
    setIsUploadingCover(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/admin/uploads/cover", {
        method: "POST",
        body: formData,
      })

      if (response.status === 401) {
        router.replace("/admin/login")
        router.refresh()
        return
      }

      const payload = (await response.json().catch(() => null)) as
        | {
            error?: string
            path?: string
            url?: string
          }
        | null

      if (!response.ok || !payload) {
        setCoverUploadError(payload?.error || "No se pudo subir la imagen.")
        return
      }

      const uploadPath = typeof payload.path === "string" ? payload.path : ""
      const uploadUrl = typeof payload.url === "string" ? payload.url : ""

      if (!uploadPath && !uploadUrl) {
        setCoverUploadError("No se recibió una URL válida de la imagen.")
        return
      }

      const normalizedUrl = uploadUrl || new URL(uploadPath, window.location.origin).toString()
      updateField("coverImage", normalizedUrl)
      setSuccess("Imagen de portada subida correctamente.")
    } catch {
      setCoverUploadError("Error de conexión al subir la imagen.")
    } finally {
      setIsUploadingCover(false)
      event.target.value = ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/articles"
          className="inline-flex items-center gap-2 border border-border px-3 py-2 font-sans text-[11px] tracking-[0.16em] uppercase hover:border-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a artículos
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {mode === "edit" && articleId && (
            <Link
              href={`/admin/articles/${articleId}/preview`}
              className="inline-flex items-center gap-2 border border-border px-3 py-2 font-sans text-[11px] tracking-[0.16em] uppercase hover:border-foreground transition-colors"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Link>
          )}

          {form.slug && (
            <Link
              href={`/articulos/${form.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 border border-border px-3 py-2 font-sans text-[11px] tracking-[0.16em] uppercase hover:border-foreground transition-colors"
            >
              Ver público
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {error && (
        <p className="border border-[var(--color-red)]/35 bg-[var(--color-red)]/[0.06] px-4 py-3 text-sm text-[var(--color-red)]">
          {error}
        </p>
      )}

      {coverUploadError && (
        <p className="border border-[var(--color-red)]/35 bg-[var(--color-red)]/[0.06] px-4 py-3 text-sm text-[var(--color-red)]">
          {coverUploadError}
        </p>
      )}

      {success && (
        <p className="border border-emerald-700/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,1fr)] gap-6">
        <section className="border border-border bg-card p-5 md:p-6 space-y-5">
          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
              Título
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(event) => handleTitleChange(event.target.value)}
              className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/35"
              placeholder="Título del artículo"
              required
            />
          </div>

          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
              Slug
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(event) => handleSlugChange(event.target.value)}
              className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/35"
              placeholder="mi-articulo"
              required
            />
          </div>

          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
              Resumen
            </label>
            <textarea
              value={form.summary}
              onChange={(event) => updateField("summary", event.target.value)}
              rows={4}
              className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/35"
              placeholder="Resumen breve para cards y SEO"
            />
          </div>

          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
              Contenido
            </label>
            <textarea
              value={form.content}
              onChange={(event) => updateField("content", event.target.value)}
              rows={18}
              className="w-full border border-border bg-background px-3 py-3 text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/35"
              placeholder="Escribí el contenido principal (admite texto plano con encabezados #, listas - y código ```)."
            />
            <p className="text-xs text-muted-foreground mt-2">
              Soporta formato básico:
              {" "}
              <code>#</code>, <code>##</code>, <code>###</code>, <code>&gt;</code>, <code>-</code>, <code>1.</code>
              {" "}
              y bloques de código con <code>{`\`\`\``}</code>.
            </p>
            <div className="mt-3 border border-border bg-muted/30 p-4 text-xs text-muted-foreground">
              <p className="mb-2 font-sans text-[10px] uppercase text-foreground">Citas clickeables</p>
              <p className="leading-relaxed">
                En el texto usá <code>[^1]</code>. Al final del contenido, separado por una línea en blanco, agregá la nota:
              </p>
              <pre className="mt-3 overflow-x-auto border border-border bg-background p-3 font-mono text-[12px] leading-relaxed text-foreground">
{`Esto afirma algo importante[^1].

[^1]: Autor, obra o link de la fuente.`}
              </pre>
              <p className="mt-2 leading-relaxed">
                El reader transforma el número en enlace, muestra una preview al pasar el mouse y manda a la sección Notas.
              </p>
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <section className="border border-border bg-card p-5 md:p-6 space-y-4">
            <h3 className="font-serif text-2xl leading-[1.1] tracking-[-0.01em]">Metadatos</h3>

            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Estado
              </label>
              <select
                value={form.status}
                onChange={(event) => updateField("status", event.target.value)}
                className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/35"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Fecha de publicación
              </label>
              <input
                type="date"
                value={form.publishDate}
                onChange={(event) => updateField("publishDate", event.target.value)}
                className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/35"
              />
            </div>

            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Categoría
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(event) => updateField("category", event.target.value)}
                className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/35"
                placeholder="Derecho"
              />
            </div>

            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Tags (separadas por coma)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(event) => setTagsInput(event.target.value)}
                className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/35"
                placeholder="constitucional, democracia"
              />
            </div>

            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Autor
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(event) => updateField("author", event.target.value)}
                className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/35"
              />
            </div>

            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Tiempo de lectura
              </label>
              <input
                type="text"
                value={form.readTime}
                onChange={(event) => updateField("readTime", event.target.value)}
                className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/35"
                placeholder="10 min"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) => updateField("featured", event.target.checked)}
                className="size-4 border border-border bg-background"
              />
              <span className="font-sans text-sm text-foreground">Destacado (Featured)</span>
            </label>
          </section>

          <section className="border border-border bg-card p-5 md:p-6 space-y-4">
            <h3 className="font-serif text-2xl leading-[1.1] tracking-[-0.01em]">SEO e imagen</h3>

            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                URL de portada
              </label>
              <input
                type="url"
                value={form.coverImage}
                onChange={(event) => updateField("coverImage", event.target.value)}
                className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/35"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Subir portada desde archivo
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                onChange={handleCoverFileChange}
                disabled={isUploadingCover}
                className="w-full border border-border bg-background px-3 py-2 text-sm file:mr-3 file:border-0 file:bg-foreground file:text-background file:px-3 file:py-1.5 file:font-sans file:text-[10px] file:tracking-[0.16em] file:uppercase file:cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Formatos: JPG, PNG, WEBP, AVIF o GIF. Tamaño máximo: 8 MB.
              </p>
              {isUploadingCover && (
                <p className="text-xs text-muted-foreground mt-2 inline-flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Subiendo imagen...
                </p>
              )}
            </div>

            {form.coverImage && (
              <div>
                <p className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  Preview portada
                </p>
                <img
                  src={form.coverImage}
                  alt="Preview portada"
                  className="w-full max-h-52 object-cover border border-border bg-foreground/5"
                  loading="lazy"
                />
              </div>
            )}

            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                SEO Title
              </label>
              <input
                type="text"
                value={form.seoTitle}
                onChange={(event) => updateField("seoTitle", event.target.value)}
                className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/35"
              />
            </div>

            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                SEO Description
              </label>
              <textarea
                value={form.seoDescription}
                onChange={(event) => updateField("seoDescription", event.target.value)}
                rows={4}
                className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/35"
              />
            </div>
          </section>

          <section className="border border-border bg-card p-5 md:p-6 space-y-3">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background px-4 py-3 font-sans text-[11px] tracking-[0.18em] uppercase hover:bg-[var(--color-blue)] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Guardando
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {mode === "create" ? "Crear artículo" : "Guardar cambios"}
                </>
              )}
            </button>

            {mode === "edit" && (
              <button
                type="button"
                onClick={handleArchive}
                disabled={isArchiving || isSaving}
                className="w-full inline-flex items-center justify-center gap-2 border border-[var(--color-red)]/35 px-4 py-3 font-sans text-[11px] tracking-[0.18em] uppercase text-[var(--color-red)] hover:bg-[var(--color-red)]/[0.08] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                {isArchiving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Archivando
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Archivar artículo
                  </>
                )}
              </button>
            )}
          </section>
        </aside>
      </form>
    </div>
  )
}
