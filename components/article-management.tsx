"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Eye, Filter } from "lucide-react"

interface Article {
  id: number
  title: string
  category: string
  status: "published" | "draft" | "archived"
  date: string
  views: number
}

export default function ArticleManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const articles: Article[] = [
    {
      id: 1,
      title: "La Reforma Judicial y sus Implicaciones Constitucionales",
      category: "Derecho",
      status: "published",
      date: "2025-01-15",
      views: 1250,
    },
    {
      id: 2,
      title: "Economía Política: El Rol del Estado en la Crisis Actual",
      category: "Economía",
      status: "published",
      date: "2025-01-12",
      views: 890,
    },
    {
      id: 3,
      title: "Análisis de la Nueva Ley de Alquileres",
      category: "Derecho",
      status: "draft",
      date: "2025-01-10",
      views: 0,
    },
  ]

  const categories = ["all", "Derecho", "Política", "Economía"]
  const statuses = ["all", "published", "draft", "archived"]

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || article.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "draft":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "archived":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gestión de Artículos</h1>
            <p className="text-[#d3d3d3]">Administra y organiza tus publicaciones</p>
          </div>
          <button className="px-6 py-3 bg-[#dc143c] text-white font-semibold rounded-lg hover:bg-[#b91c3c] transition-colors flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Nuevo Artículo</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-[#1c1c1c] p-6 rounded-lg border border-white/10 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#d3d3d3] w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff]"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#d3d3d3] w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff] appearance-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "Todas las categorías" : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff] appearance-none"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "all"
                      ? "Todos los estados"
                      : status === "published"
                        ? "Publicado"
                        : status === "draft"
                          ? "Borrador"
                          : "Archivado"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Articles Table */}
        <div className="bg-[#1c1c1c] rounded-lg border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#2a2a2a] border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Título</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Categoría</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Estado</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Fecha</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Vistas</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-[#2a2a2a] transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{article.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#d3d3d3]">{article.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          article.status,
                        )}`}
                      >
                        {article.status === "published"
                          ? "Publicado"
                          : article.status === "draft"
                            ? "Borrador"
                            : "Archivado"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#d3d3d3]">{article.date}</td>
                    <td className="px-6 py-4 text-[#d3d3d3]">{article.views.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-[#1e90ff] hover:bg-[#1e90ff]/20 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-[#d3d3d3] hover:bg-gray-600/20 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-[#dc143c] hover:bg-[#dc143c]/20 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#d3d3d3] text-lg">No se encontraron artículos</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8">
          <p className="text-[#d3d3d3]">
            Mostrando {filteredArticles.length} de {articles.length} artículos
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors disabled:opacity-50">
              Anterior
            </button>
            <button className="px-4 py-2 bg-[#dc143c] text-white rounded-lg hover:bg-[#b91c3c] transition-colors">
              1
            </button>
            <button className="px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors">
              2
            </button>
            <button className="px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
