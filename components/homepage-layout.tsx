"use client"

import { useState, useEffect } from "react"
import BlogPostCard from "./blog-post-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Newspaper, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import type { ReactNode } from "react"

/**
 * Homepage Layout Component - Leyes al Pedo Rebrand
 * Bold, graphic design with orange accents and clean typography
 */
interface Article {
  id: string
  title: string
  excerpt: string
  publishDate: string
  slug: string
  category: string
  imageUrl?: string
}

interface HomepageLayoutProps {
  articles: Article[]
  children: ReactNode
}

const gradientClasses = ["gradient-red-blue", "gradient-blue-violet", "gradient-violet-red"]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function HomepageLayout({ articles: initialArticles, children }: HomepageLayoutProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [filteredArticles, setFilteredArticles] = useState(initialArticles)
  const [isAnimating, setIsAnimating] = useState(false)

  const categories = ["all", ...Array.from(new Set(initialArticles.map((article) => article.category)))]

  // Filter articles based on selected category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredArticles(initialArticles)
    } else {
      setIsAnimating(true)
      setTimeout(() => {
        setFilteredArticles(initialArticles.filter((article) => article.category === selectedCategory))
        setIsAnimating(false)
      }, 300) // Match this with the animation duration
    }
  }, [selectedCategory, initialArticles])

  // Refs for scroll animations
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [articlesRef, articlesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [sidebarRef, sidebarInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <header className="py-16 text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-white title-glow mb-4">López Labrin</h1>
        <p className="text-xl text-[#eaeaea] max-w-2xl mx-auto px-4">
          Análisis jurídico, político y económico con perspectiva crítica
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <motion.main
            className="lg:col-span-2 space-y-8"
            ref={articlesRef}
            initial="hidden"
            animate={articlesInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div className="bg-white p-8 border-4 border-black shadow-brand" variants={itemVariants}>
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-black text-black uppercase brand-font">
                    {selectedCategory === "all" ? "ÚLTIMOS ARTÍCULOS" : selectedCategory}
                  </h2>
                  <div className="w-24 h-2 bg-brand-orange"></div>
                </div>
                <div className="flex items-center gap-3">
                  {selectedCategory !== "all" && (
                    <motion.button
                      onClick={() => setSelectedCategory("all")}
                      className="inline-flex items-center px-4 py-2 text-sm bg-black text-white hover:bg-brand-orange focus:bg-brand-orange transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 font-bold border-2 border-black shadow-brand-sm brand-font"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      MOSTRAR TODOS
                    </motion.button>
                  )}
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link
                      href="/archivo"
                      className="text-black hover:text-brand-orange focus:text-brand-orange font-bold text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 px-3 py-2 hover:bg-brand-gray-100 focus:bg-brand-gray-100 border-2 border-transparent hover:border-brand-orange focus:border-brand-orange brand-font"
                    >
                      VER TODOS
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Articles List with Animation */}
              <AnimatePresence mode="wait">
                {filteredArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <BlogPostCard
                      title={article.title}
                      excerpt={article.excerpt}
                      publishDate={article.publishDate}
                      slug={article.slug}
                      category={article.category}
                      imageUrl={article.imageUrl}
                      gradientClass={gradientClasses[index % gradientClasses.length]}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredArticles.length === 0 && (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-brand-gray-100 border-4 border-black shadow-brand p-12 max-w-lg mx-auto">
                    <p className="text-black text-xl mb-6 font-bold brand-font">NO HAY ARTÍCULOS EN ESTA CATEGORÍA.</p>
                    <motion.button
                      onClick={() => setSelectedCategory("all")}
                      className="inline-flex items-center px-6 py-3 bg-brand-orange text-white border-2 border-black hover:bg-black hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-orange focus:ring-offset-2 shadow-brand-sm font-black text-lg brand-font"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      VER TODOS LOS ARTÍCULOS
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.main>

          {/* Sidebar */}
          <motion.aside
            className="lg:col-span-1 space-y-8"
            ref={sidebarRef}
            initial="hidden"
            animate={sidebarInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Featured Article */}
            {filteredArticles.length > 0 && (
              <motion.div variants={itemVariants}>
                <Link href={`/articulos/${filteredArticles[0].slug}`} className="block">
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "12px 12px 0px 0px #000000",
                      transition: { duration: 0.2, ease: "easeInOut" },
                    }}
                  >
                    <Card className="overflow-hidden border-4 border-black shadow-brand bg-brand-orange text-white transition-all duration-300">
                      <div className="p-8">
                        <div className="space-y-6">
                          <h3 className="text-2xl font-black flex items-center uppercase brand-font">
                            <Newspaper className="h-6 w-6 mr-3" />
                            DESTACADO
                          </h3>
                          <h4 className="text-2xl font-black leading-tight brand-font">{filteredArticles[0].title}</h4>
                          <p className="text-white/90 line-clamp-3 leading-relaxed font-medium brand-font">
                            {filteredArticles[0].excerpt}
                          </p>
                          <div className="inline-flex items-center text-white hover:text-black font-black text-lg transition-all duration-300 px-4 py-2 hover:bg-white focus:bg-white border-2 border-white group brand-font">
                            LEER ARTÍCULO
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1 group-focus:translate-x-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            )}

            {/* Categories */}
            <motion.div variants={itemVariants}>
              <Card className="border-4 border-black bg-white shadow-brand">
                <CardHeader className="pb-4 pt-6 px-6">
                  <CardTitle className="text-2xl font-black text-black flex items-center uppercase brand-font">
                    <span className="w-2 h-8 bg-brand-orange mr-3"></span>
                    CATEGORÍAS
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 px-6 pb-6 space-y-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full flex items-center justify-between py-3 px-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 group border-2 brand-font ${
                        selectedCategory === category
                          ? "bg-brand-orange text-white border-brand-orange shadow-brand-sm"
                          : "hover:bg-brand-orange hover:text-white focus:bg-brand-orange focus:text-white text-black border-black hover:border-brand-orange focus:border-brand-orange shadow-brand-sm"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="font-black text-lg uppercase brand-font">
                        {category === "all" ? "Todos" : category}
                      </span>
                      <span
                        className={`text-sm px-3 py-1 font-black border-2 transition-all duration-300 ${
                          selectedCategory === category
                            ? "bg-white text-brand-orange border-white"
                            : "bg-black text-white border-black group-hover:bg-white group-hover:text-brand-orange group-hover:border-white group-focus:bg-white group-focus:text-brand-orange group-focus:border-white"
                        }`}
                      >
                        {category === "all"
                          ? initialArticles.length
                          : initialArticles.filter((article) => article.category === category).length}
                      </span>
                    </motion.button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div variants={itemVariants}>
              <Card className="border-4 border-black bg-white shadow-brand">
                <CardHeader className="pb-4 pt-6 px-6">
                  <CardTitle className="text-2xl font-black text-black uppercase brand-font">MANTENTE AL DÍA</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 px-6 pb-6">
                  <p className="text-brand-gray-800 mb-6 leading-relaxed font-medium brand-font">
                    Suscríbete para recibir los últimos análisis sin filtros.
                  </p>
                  <form className="space-y-4">
                    <div>
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-brand-orange focus:border-brand-orange bg-white transition-all duration-300 shadow-brand-sm font-medium brand-font"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="w-full bg-brand-orange text-white py-3 px-6 hover:bg-black focus:bg-black transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-orange focus:ring-offset-2 shadow-brand-sm font-black text-lg border-2 border-black uppercase brand-font"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      SUSCRIBIRSE
                    </motion.button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-gray-800">
        <p className="text-[#eaeaea] text-sm">© 2025 López Labrin. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
