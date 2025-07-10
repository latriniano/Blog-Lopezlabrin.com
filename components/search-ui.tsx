"use client"

import { useState } from "react"
import { Search, X, Filter, Calendar } from "lucide-react"
import Link from "next/link"

interface SearchResult {
  id: number
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  url: string
}

const mockResults: SearchResult[] = [
  {
    id: 1,
    title: "La Reforma Judicial y sus Implicaciones Constitucionales",
    excerpt: "Un análisis profundo sobre los cambios propuestos en el sistema judicial argentino...",
    category: "Derecho",
    date: "15 de enero, 2025",
    readTime: "12 min",
    url: "/articulos/1",
  },
  {
    id: 2,
    title: "Democracia y Participación Ciudadana en el Siglo XXI",
    excerpt: "Un examen de los nuevos mecanismos de participación política...",
    category: "Política",
    date: "8 de enero, 2025",
    readTime: "10 min",
    url: "/articulos/4",
  },
]

export function SearchUI() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const filteredResults = mockResults.filter(
        (result) =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setResults(filteredResults)
      setIsLoading(false)
    }, 500)
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "derecho":
        return "text-[#dc143c] bg-[#dc143c]/10 border-[#dc143c]/30"
      case "política":
        return "text-[#1e90ff] bg-[#1e90ff]/10 border-[#1e90ff]/30"
      case "economía":
        return "text-[#6a1b9a] bg-[#6a1b9a]/10 border-[#6a1b9a]/30"
      default:
        return "text-[#d3d3d3] bg-[#2a2a2a] border-white/20"
    }
  }

  return (
    <>
      {/* Search Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-[#2a2a2a] text-[#d3d3d3] rounded-lg hover:bg-[#3a3a3a] transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Buscar artículos...</span>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-[#1c1c1c] border border-white/10 rounded-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
            {/* Search Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#d3d3d3]" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value)
                      handleSearch(e.target.value)
                    }}
                    placeholder="Buscar por título, contenido o tema..."
                    className="w-full pl-12 pr-4 py-3 bg-[#2a2a2a] border border-white/20 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#dc143c] transition-colors"
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-[#d3d3d3] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-[#d3d3d3]" />
                  <span className="text-sm text-[#d3d3d3]">Filtros:</span>
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1 bg-[#2a2a2a] border border-white/20 rounded text-white text-sm focus:outline-none focus:border-[#dc143c]"
                >
                  <option value="">Todas las categorías</option>
                  <option value="derecho">Derecho</option>
                  <option value="politica">Política</option>
                  <option value="economia">Economía</option>
                </select>
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin w-8 h-8 border-2 border-[#dc143c] border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-[#d3d3d3]">Buscando...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="p-4 space-y-4">
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      href={result.url}
                      onClick={() => setIsOpen(false)}
                      className="block p-4 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-semibold text-lg leading-tight pr-4">{result.title}</h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium border ${getCategoryColor(result.category)}`}
                        >
                          {result.category}
                        </span>
                      </div>
                      <p className="text-[#d3d3d3] text-sm mb-3 leading-relaxed">{result.excerpt}</p>
                      <div className="flex items-center space-x-4 text-xs text-[#d3d3d3]">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{result.date}</span>
                        </span>
                        <span>{result.readTime} de lectura</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : query ? (
                <div className="p-8 text-center">
                  <p className="text-[#d3d3d3] mb-4">No se encontraron resultados para "{query}"</p>
                  <p className="text-sm text-[#d3d3d3]">Intenta con otros términos o explora nuestras categorías</p>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-[#d3d3d3] mx-auto mb-4" />
                  <p className="text-[#d3d3d3] mb-2">Busca en nuestro archivo de artículos</p>
                  <p className="text-sm text-[#d3d3d3]">Encuentra análisis sobre derecho, política y economía</p>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="p-4 border-t border-white/10 bg-[#0a0a0a]">
              <p className="text-sm text-[#d3d3d3] mb-3">Búsquedas populares:</p>
              <div className="flex flex-wrap gap-2">
                {["reforma judicial", "democracia", "economía política", "derechos humanos"].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term)
                      handleSearch(term)
                    }}
                    className="px-3 py-1 bg-[#2a2a2a] text-[#d3d3d3] rounded-full text-sm hover:bg-[#3a3a3a] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
