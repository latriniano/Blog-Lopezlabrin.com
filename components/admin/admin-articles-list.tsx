"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ExternalLink, Eye, Loader2, PencilLine, Plus, Search } from "lucide-react"

interface AdminArticleItem {
  id: string
  title: string
  slug: string
  summary: string
  status: string
  category: string
  publishDate: string | null
  updatedAt: string | null
  readTime: string
  author: string
  tags: string[]
  featured: boolean
}

interface PaginationData {
  page: number
  limit: number
  total: number
  totalPages: number
}

interface ArticlesResponse {
  items: AdminArticleItem[]
  pagination: PaginationData
  filters: {
    statuses: string[]
    categories: string[]
  }
}

function formatDate(date?: string | null) {
  if (!date) return "Sin fecha"

  return new Date(date).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}

function getStatusStyles(status: string) {
  const normalized = status.toLowerCase()

  if (normalized === "published" || normalized === "publicado") {
    return "border-emerald-700/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
  }

  if (normalized === "draft" || normalized === "borrador") {
    return "border-amber-700/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
  }

  if (normalized === "archived" || normalized === "archivado") {
    return "border-zinc-600/40 bg-zinc-500/10 text-zinc-700 dark:text-zinc-300"
  }

  return "border-border bg-muted/40 text-muted-foreground"
}

export function AdminArticlesList() {
  const router = useRouter()

  const [searchInput, setSearchInput] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [page, setPage] = useState(1)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [items, setItems] = useState<AdminArticleItem[]>([])
  const [statuses, setStatuses] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
  })

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim())
    }, 300)

    return () => window.clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, statusFilter, categoryFilter])

  useEffect(() => {
    const controller = new AbortController()

    async function loadArticles() {
      setIsLoading(true)
      setError("")

      try {
        const searchParams = new URLSearchParams({
          page: String(page),
          limit: "12",
          q: debouncedSearch,
          status: statusFilter,
          category: categoryFilter,
        })

        const response = await fetch(`/api/admin/articles?${searchParams.toString()}`, {
          method: "GET",
          signal: controller.signal,
          cache: "no-store",
        })

        if (response.status === 401) {
          router.replace("/admin/login")
          router.refresh()
          return
        }

        const payload = (await response.json().catch(() => null)) as ArticlesResponse | null

        if (!response.ok || !payload) {
          throw new Error("No se pudo cargar el listado de artículos.")
        }

        setItems(payload.items || [])
        setStatuses(payload.filters?.statuses || [])
        setCategories(payload.filters?.categories || [])
        setPagination(payload.pagination || { page: 1, limit: 12, total: 0, totalPages: 1 })
      } catch (loadError) {
        if ((loadError as Error).name === "AbortError") return
        setError("No se pudo cargar el listado. Intenta nuevamente.")
      } finally {
        setIsLoading(false)
      }
    }

    loadArticles()

    return () => controller.abort()
  }, [router, page, debouncedSearch, statusFilter, categoryFilter])

  const hasPreviousPage = useMemo(() => pagination.page > 1, [pagination.page])
  const hasNextPage = useMemo(
    () => pagination.page < pagination.totalPages,
    [pagination.page, pagination.totalPages],
  )

  return (
    <div className="space-y-6">
      <section className="border border-border bg-card p-5 md:p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
            Operación editorial
          </p>
          <p className="text-sm text-muted-foreground">
            Gestioná borradores, publicaciones y metadatos desde el panel.
          </p>
        </div>

        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 border border-foreground px-4 py-2.5 font-sans text-[11px] tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo artículo
        </Link>
      </section>

      <section className="border border-border bg-card p-5 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <label className="block">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 inline-block">
              Buscar
            </span>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Título, slug, tag, autor..."
                className="w-full border border-border bg-background pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/35"
              />
            </div>
          </label>

          <label className="block">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 inline-block">
              Estado
            </span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/35"
            >
              <option value="all">Todos</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 inline-block">
              Categoría
            </span>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/35"
            >
              <option value="all">Todas</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-10 flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Cargando artículos...
          </div>
        ) : error ? (
          <div className="p-8 text-sm text-[var(--color-red)]">{error}</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-sm text-muted-foreground">No hay artículos para los filtros seleccionados.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-border bg-card">
                <tr>
                  <th className="text-left px-4 py-3 font-sans text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                    Artículo
                  </th>
                  <th className="text-left px-4 py-3 font-sans text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                    Estado
                  </th>
                  <th className="text-left px-4 py-3 font-sans text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                    Categoría
                  </th>
                  <th className="text-left px-4 py-3 font-sans text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                    Fecha
                  </th>
                  <th className="text-left px-4 py-3 font-sans text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                    Autor
                  </th>
                  <th className="text-left px-4 py-3 font-sans text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-border/70">
                    <td className="px-4 py-4 align-top min-w-[320px]">
                      <div className="flex items-start gap-4">
                        <div>
                          <p className="font-medium text-sm mb-1">{item.title}</p>
                          <p className="text-xs text-muted-foreground mb-2">/{item.slug}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">{item.summary}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 align-top">
                      <span
                        className={`inline-flex border px-2 py-1 text-[10px] tracking-[0.15em] uppercase ${getStatusStyles(
                          item.status,
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-4 py-4 align-top">
                      <p className="text-sm">{item.category}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.readTime}</p>
                    </td>

                    <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                      {formatDate(item.publishDate)}
                    </td>

                    <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                      {item.author || "Sin autor"}
                    </td>

                    <td className="px-4 py-4 align-top">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/admin/articles/${item.id}/preview`}
                          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Preview
                        </Link>

                        <Link
                          href={`/admin/articles/${item.id}`}
                          className="inline-flex items-center gap-1 text-xs text-foreground hover:text-[var(--color-blue)] transition-colors"
                        >
                          <PencilLine className="w-3.5 h-3.5" />
                          Editar
                        </Link>

                        {item.slug && (
                          <Link
                            href={`/articulos/${item.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            Ver
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer className="flex items-center justify-between gap-4">
        <p className="font-sans text-xs text-muted-foreground">
          {pagination.total} artículos en total
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={!hasPreviousPage || isLoading}
            className="border border-border px-3 py-2 text-[11px] tracking-[0.16em] uppercase font-sans disabled:opacity-40 disabled:cursor-not-allowed hover:border-foreground transition-colors"
          >
            Anterior
          </button>
          <span className="font-sans text-xs text-muted-foreground px-2">
            {pagination.page} / {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((current) => Math.min(pagination.totalPages, current + 1))}
            disabled={!hasNextPage || isLoading}
            className="border border-border px-3 py-2 text-[11px] tracking-[0.16em] uppercase font-sans disabled:opacity-40 disabled:cursor-not-allowed hover:border-foreground transition-colors"
          >
            Siguiente
          </button>
        </div>
      </footer>
    </div>
  )
}
