"use client"

import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

/**
 * Search UI Component
 * Simple, non-intrusive search functionality
 * Can be toggled open/closed and includes search results
 */
interface SearchResult {
  id: string
  title: string
  excerpt: string
  slug: string
}

interface SearchUIProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export default function SearchUI({ onSearch, placeholder = "Buscar artículos..." }: SearchUIProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    try {
      const searchResults = await onSearch(searchQuery)
      setResults(searchResults)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  return (
    <div className="relative">
      {/* Search Toggle Button */}
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="p-2">
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>

      {/* Search Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <Card className="w-full max-w-2xl mx-4">
            <CardContent className="p-6">
              {/* Search Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Search Articles</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="p-2">
                  <Search className="h-5 w-5" />
                </Button>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSubmit} className="relative max-w-md mx-auto mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#d3d3d3] w-5 h-5" />
                  <Input
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-[#eaeaea] placeholder-[#d3d3d3] focus:outline-none focus:border-[#8a2be2] focus:ring-1 focus:ring-[#8a2be2] transition-colors"
                    autoFocus
                  />
                </div>
              </form>

              {/* Search Results */}
              {results.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Results</h3>
                  {results.map((result) => (
                    <div key={result.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h4 className="font-medium text-gray-900 mb-2">
                        <a
                          href={`/articles/${result.slug}`}
                          className="hover:text-blue-700 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {result.title}
                        </a>
                      </h4>
                      <p className="text-sm text-gray-600">{result.excerpt}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
