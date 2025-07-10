"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Plus } from "lucide-react"
import ArticleManagement from "@/components/article-management"
import { adminArticlesData } from "@/lib/admin-articles-data"

/**
 * Manage Articles Page
 * List and manage all blog articles
 */
export default function ManageArticlesPage() {
  const router = useRouter()
  const [articles, setArticles] = useState(adminArticlesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  // Filter and sort articles
  const filteredArticles = articles
    .filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || article.category === categoryFilter
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && new Date(article.publishDate) <= new Date()) ||
        (statusFilter === "draft" && new Date(article.publishDate) > new Date())

      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title)
      }
      return 0
    })

  const categories = [...new Set(articles.map((article) => article.category))]

  const handleDeleteArticle = (articleId: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este artículo?")) {
      console.log("Deleting article:", articleId)
      setArticles(articles.filter((article) => article.id !== articleId))
    }
  }

  const getStatusBadge = (article: any) => {
    const isPublished = new Date(article.publishDate) <= new Date()
    return isPublished ? (
      <Badge className="bg-green-100 text-green-700">Publicado</Badge>
    ) : (
      <Badge className="bg-yellow-100 text-yellow-700">Borrador</Badge>
    )
  }

  const handleEdit = (id: string) => {
    router.push(`/admin/articles/edit/${id}`)
  }

  const handleView = (id: string) => {
    // Find article and navigate to view
    const article = articles.find((a) => a.id === id)
    if (article) {
      router.push(`/articles/${article.id}`)
    }
  }

  const handleCreate = () => {
    router.push("/admin/articles/new")
  }

  return (
    <AdminLayout title="Gestionar Artículos">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Todos los Artículos</h2>
            <p className="text-gray-600 mt-1">
              {filteredArticles.length} de {articles.length} artículos
            </p>
          </div>
          <Button className="bg-purple-700 hover:bg-purple-800" onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Crear Nuevo Artículo
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="published">Publicados</SelectItem>
                  <SelectItem value="draft">Borradores</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Fecha</SelectItem>
                  <SelectItem value="title">Título</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Articles List */}
        {filteredArticles.length > 0 ? (
          <ArticleManagement
            articles={filteredArticles}
            onEdit={handleEdit}
            onDelete={handleDeleteArticle}
            onView={handleView}
            onCreate={handleCreate}
          />
        ) : (
          <Card className="border-gray-200">
            <CardContent className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron artículos</h3>
                <p className="text-gray-600 mb-6">No hay artículos que coincidan con los filtros seleccionados.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setCategoryFilter("all")
                      setStatusFilter("all")
                    }}
                    variant="outline"
                  >
                    Limpiar filtros
                  </Button>
                  <Button className="bg-purple-700 hover:bg-purple-800" onClick={handleCreate}>
                    Crear primer artículo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pagination (UI only) */}
        {filteredArticles.length > 10 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Mostrando 1-10 de {filteredArticles.length} artículos</p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" className="bg-purple-700 text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
