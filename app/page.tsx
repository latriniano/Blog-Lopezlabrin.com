"use client"

import { useState, useEffect } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  User,
  Scale,
  TrendingUp,
  Calendar,
  Clock,
  ChevronRight,
  Menu,
  X,
  Loader2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { articlesData } from "@/lib/articles-data"

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  category: string
  readTime: string
  gradientClass: string
  imageUrl?: string
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("inicio")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)

  const articlesPerPage = 3
  const gradientClasses = [
    "gradient-red-blue",
    "gradient-blue-red",
    "gradient-red-red",
    "gradient-blue-violet",
    "gradient-violet-red",
  ]

  // Convert articlesData to the format expected by the homepage
  const allArticles: Article[] = articlesData.map((article, index) => ({
    ...article,
    gradientClass: gradientClasses[index % gradientClasses.length],
  }))

  // Initialize displayed articles
  useEffect(() => {
    const initialArticles = allArticles.slice(0, articlesPerPage)
    setDisplayedArticles(initialArticles)
  }, [])

  // Filter articles by category
  const filteredArticles =
    selectedCategory === "all" ? allArticles : allArticles.filter((article) => article.category === selectedCategory)

  // Load more articles function
  const loadMoreArticles = () => {
    setIsLoading(true)

    // Simulate loading delay
    setTimeout(() => {
      const currentArticles =
        selectedCategory === "all"
          ? allArticles
          : allArticles.filter((article) => article.category === selectedCategory)

      const nextPage = currentPage + 1
      const startIndex = (nextPage - 1) * articlesPerPage
      const endIndex = nextPage * articlesPerPage
      const newArticles = currentArticles.slice(startIndex, endIndex)

      setDisplayedArticles((prev) => [...prev, ...newArticles])
      setCurrentPage(nextPage)
      setIsLoading(false)
    }, 1000)
  }

  // Handle category filtering
  const handleCategoryFilter = (category: string) => {
    setIsLoading(true)
    setSelectedCategory(category)
    setCurrentPage(1)

    setTimeout(() => {
      const articlesToShow =
        category === "all"
          ? allArticles.slice(0, articlesPerPage)
          : allArticles.filter((article) => article.category === category).slice(0, articlesPerPage)

      setDisplayedArticles(articlesToShow)
      setIsLoading(false)

      // Scroll to articles section
      setTimeout(() => {
        const articlesSection = document.getElementById("articulos")
        if (articlesSection) {
          articlesSection.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }, 500)
  }

  const hasMoreArticles = () => {
    const totalArticles =
      selectedCategory === "all"
        ? allArticles.length
        : allArticles.filter((article) => article.category === selectedCategory).length
    return displayedArticles.length < totalArticles
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "articulos", "categorias", "acerca-de", "contacto"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMobileMenuOpen && !target.closest(".mobile-menu") && !target.closest(".mobile-menu-trigger")) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMobileMenuOpen])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false) // Close mobile menu after navigation
  }

  const categories = [
    {
      name: "Derecho",
      key: "Derecho",
      icon: Scale,
      articles: allArticles.filter((article) => article.category === "Derecho").length,
      description: "Análisis jurídico y constitucional",
      color: "red",
      bgColor: "bg-[#ff6b35]/20",
      borderColor: "border-[#ff6b35]/30",
      textColor: "text-[#ff6b35]",
      hoverBg: "group-hover:bg-[#ff6b35]/30",
      hoverText: "group-hover:text-[#ff8c5a]",
    },
    {
      name: "Política",
      key: "Política",
      icon: User,
      articles: allArticles.filter((article) => article.category === "Política").length,
      description: "Política nacional e internacional",
      color: "blue",
      bgColor: "bg-[#dc143c]/20",
      borderColor: "border-[#dc143c]/30",
      textColor: "text-[#dc143c]",
      hoverBg: "group-hover:bg-[#dc143c]/30",
      hoverText: "group-hover:text-[#ff4757]",
    },
    {
      name: "Economía",
      key: "Economía",
      icon: TrendingUp,
      articles: allArticles.filter((article) => article.category === "Economía").length,
      description: "Economía política y social",
      color: "purple",
      bgColor: "bg-[#ff6b35]/20",
      borderColor: "border-[#ff6b35]/30",
      textColor: "text-[#ff6b35]",
      hoverBg: "group-hover:bg-[#ff6b35]/30",
      hoverText: "group-hover:text-[#ff8c5a]",
    },
  ]

  const navigationItems = [
    { id: "inicio", label: "Inicio" },
    { id: "articulos", label: "Artículos" },
    { id: "categorias", label: "Categorías" },
    { id: "acerca-de", label: "Acerca de" },
    { id: "contacto", label: "Contacto" },
  ]

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Lautaro N. López Labrin</h1>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-200 hover:text-[#ff6b35] focus:text-[#ff6b35] focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2 focus:ring-offset-transparent px-3 py-2 rounded-md ${
                    activeSection === item.id ? "text-[#ff6b35]" : "text-[#eaeaea]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden mobile-menu-trigger p-2 text-white hover:text-[#ff6b35] focus:text-[#ff6b35] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2 focus:ring-offset-transparent rounded-md"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden mobile-menu"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-80 max-w-full bg-[#1c1c1c] border-l border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">Navegación</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white hover:text-[#ff6b35] focus:text-[#ff6b35] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2 focus:ring-offset-transparent rounded-md"
                  aria-label="Cerrar menú"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="p-6">
                <ul className="space-y-4">
                  {navigationItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left text-lg font-medium transition-all duration-200 hover:text-[#ff6b35] focus:text-[#ff6b35] focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2 focus:ring-offset-transparent px-4 py-3 rounded-md hover:bg-white/5 focus:bg-white/5 ${
                          activeSection === item.id ? "text-[#ff6b35] bg-white/10" : "text-[#eaeaea]"
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Full Viewport Height */}
      <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#dc143c]/10 via-transparent to-[#1e90ff]/10" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight title-glow">
              Entender la ley es entender lo mucho que odiamos la libertad.
            </h2>
            <p className="text-xl md:text-2xl text-[#eaeaea] leading-relaxed max-w-3xl mx-auto">
              Bienvenido a mi compilación de mis pensamientos, creencias, ideas y análisis de situaciones legales,
              políticas y económicas.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="text-white/60"
          >
            <ChevronRight className="w-6 h-6 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Articles Section */}
      <section id="articulos" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white title-glow mb-4">
              {selectedCategory === "all" ? "Últimos Artículos" : `Artículos de ${selectedCategory}`}
            </h2>
            <p className="text-xl text-[#d3d3d3]">
              {selectedCategory === "all"
                ? "Análisis recientes sobre temas de actualidad jurídica, política y económica"
                : `Análisis especializados en ${selectedCategory.toLowerCase()}`}
            </p>

            {/* Category Filter */}
            {selectedCategory !== "all" && (
              <div className="mt-6">
                <button
                  onClick={() => handleCategoryFilter("all")}
                  className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 focus:bg-white/20 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  <X className="w-4 h-4 mr-2" />
                  Mostrar todos los artículos
                </button>
              </div>
            )}
          </div>

          {/* Loading State */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-8"
              >
                <div className="flex items-center space-x-3 text-[#ff6b35]">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-lg font-medium">Cargando artículos...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Articles List */}
          <motion.div layout className="space-y-8">
            <AnimatePresence>
              {displayedArticles.map((post, index) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`post-card ${post.gradientClass} rounded-2xl border border-white/10 overflow-hidden`}
                >
                  <div className="p-6 md:p-8">
                    <div className="space-y-4 md:space-y-6">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white post-title-glow leading-tight">
                        {post.title}
                      </h3>

                      <p className="text-base md:text-lg text-[#eaeaea] leading-relaxed">{post.excerpt}</p>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-[#d3d3d3]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="whitespace-nowrap">{post.date}</span>
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span className="whitespace-nowrap">{post.category}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="whitespace-nowrap">{post.readTime}</span>
                          </span>
                        </div>

                        <Link
                          href={`/articulos/${post.slug}`}
                          className="read-more-link text-base md:text-lg font-medium flex items-center space-x-2 group self-start sm:self-auto"
                        >
                          <span>Leer más</span>
                          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More Button */}
          {!isLoading && hasMoreArticles() && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-12">
              <button
                onClick={loadMoreArticles}
                className="px-8 py-4 bg-[#ff6b35] text-white font-semibold rounded-lg hover:bg-[#dc143c] focus:bg-[#dc143c] transition-all duration-200 border-2 border-[#ff6b35] hover:border-[#dc143c] focus:border-[#dc143c] focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2 focus:ring-offset-transparent"
              >
                Cargar más artículos
              </button>
            </motion.div>
          )}

          {/* No More Articles Message */}
          {!isLoading && !hasMoreArticles() && displayedArticles.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-12">
              <p className="text-[#d3d3d3] text-lg">
                Has visto todos los artículos disponibles
                {selectedCategory !== "all" && ` en la categoría ${selectedCategory}`}.
              </p>
              {selectedCategory !== "all" && (
                <button
                  onClick={() => handleCategoryFilter("all")}
                  className="mt-4 px-6 py-3 bg-white/10 hover:bg-white/20 focus:bg-white/20 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  Ver todos los artículos
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section id="categorias" className="py-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white title-glow mb-4">Categorías</h2>
            <p className="text-xl text-[#d3d3d3]">Explora nuestros análisis organizados por área temática</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.name}
                  onClick={() => handleCategoryFilter(category.key)}
                  className={`category-card bg-[#1c1c1c] p-8 rounded-lg border border-white/10 text-center group cursor-pointer hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2 focus:ring-offset-transparent ${
                    selectedCategory === category.key ? "ring-2 ring-[#ff6b35] bg-[#2a2a2a]" : ""
                  }`}
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-200 ${category.bgColor} border ${category.borderColor} ${category.hoverBg}`}
                  >
                    <IconComponent
                      className={`w-8 h-8 transition-all duration-200 ${category.textColor} ${category.hoverText}`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#ff6b35] group-focus:text-[#ff6b35] transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-[#d3d3d3] mb-4">{category.description}</p>
                  <p className="text-sm text-[#eaeaea] mb-6">{category.articles} artículos</p>
                  <span className="text-[#ff6b35] font-semibold group-hover:text-white group-focus:text-white transition-colors duration-200">
                    VER ARTÍCULOS →
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="acerca-de" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white title-glow mb-4">Acerca de</h2>
            <p className="text-xl text-[#d3d3d3]">Conoce más sobre nuestra perspectiva y experiencia</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Biography Card */}
            <div className="bg-[#1c1c1c] p-8 rounded-lg border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 uppercase">López Labrin Lautaro</h3>
              <div className="space-y-4 text-[#eaeaea] leading-relaxed">
                <p>
                  Abogado especializado en derecho constitucional y análisis político-económico. Con una formación
                  sólida en ciencias jurídicas y una perspectiva crítica hacia las estructuras de poder contemporáneas.
                </p>
                <p>
                  Mi trabajo se centra en desentrañar las complejidades del sistema legal argentino y su intersección
                  con la realidad política y económica del país. Creo firmemente en la importancia del pensamiento
                  independiente y el análisis riguroso como herramientas para comprender nuestra sociedad.
                </p>
                <p>
                  A través de este blog, busco contribuir al debate público con análisis fundamentados que desafíen las
                  narrativas dominantes y promuevan una comprensión más profunda de los temas que nos afectan como
                  sociedad.
                </p>
              </div>
            </div>

            {/* CV Card */}
            <div className="bg-[#1c1c1c] p-8 rounded-lg border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 uppercase">Curriculum Vitae</h3>
              <div className="space-y-6">
                <p className="text-[#eaeaea] leading-relaxed">
                  Descarga mi curriculum vitae completo para conocer en detalle mi formación académica, experiencia
                  profesional y publicaciones en el ámbito del derecho y la política.
                </p>
                <div className="text-center">
                  <button className="px-8 py-4 bg-[#ff6b35] text-white font-semibold rounded-lg hover:bg-[#dc143c] focus:bg-[#dc143c] transition-all duration-200 border-2 border-[#ff6b35] hover:border-[#dc143c] focus:border-[#dc143c] focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2 focus:ring-offset-transparent">
                    Descargar CV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white title-glow mb-4">Contacto</h2>
            <p className="text-xl text-[#d3d3d3]">Ponte en contacto para consultas, colaboraciones o comentarios</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-[#1c1c1c] p-8 rounded-lg border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 uppercase">Envíanos un Mensaje</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#eaeaea] mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35] transition-all duration-200"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#eaeaea] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35] transition-all duration-200"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#eaeaea] mb-2">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35] transition-all duration-200"
                    placeholder="Asunto del mensaje"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#eaeaea] mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35] resize-none transition-all duration-200"
                    placeholder="Escribe tu mensaje aquí..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#ff6b35] text-white font-semibold rounded-lg hover:bg-[#dc143c] focus:bg-[#dc143c] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-[#1c1c1c] p-8 rounded-lg border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 uppercase">Información de Contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#ff6b35]/20 p-3 rounded-lg border border-[#ff6b35]/30">
                    <Mail className="h-6 w-6 text-[#ff6b35]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <p className="text-[#d3d3d3]">contacto@lopezlabrin.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#dc143c]/20 p-3 rounded-lg border border-[#dc143c]/30">
                    <Phone className="h-6 w-6 text-[#dc143c]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Teléfono</h4>
                    <p className="text-[#d3d3d3]">+54 11 1234-5678</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#ff6b35]/20 p-3 rounded-lg border border-[#ff6b35]/30">
                    <MapPin className="h-6 w-6 text-[#ff6b35]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Ubicación</h4>
                    <p className="text-[#d3d3d3]">Buenos Aires, Argentina</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <h4 className="text-white font-semibold mb-3">Horarios de Atención</h4>
                <div className="space-y-2 text-[#d3d3d3]">
                  <p>Lunes a Viernes: 9:00 - 18:00</p>
                  <p>Sábados: 9:00 - 13:00</p>
                  <p>Domingos: Cerrado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#0f0f0f] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Column 1 - Site Info */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">López Labrin</h3>
              <p className="text-[#d3d3d3] mb-6 leading-relaxed">
                Análisis jurídico, político y económico con perspectiva crítica. Explorando las complejidades del
                derecho y la sociedad contemporánea.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-[#d3d3d3] hover:text-[#ff6b35] focus:text-[#ff6b35] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2 focus:ring-offset-transparent rounded-md p-1"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-[#d3d3d3] hover:text-[#ff6b35] focus:text-[#ff6b35] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2 focus:ring-offset-transparent rounded-md p-1"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-[#d3d3d3] hover:text-[#ff6b35] focus:text-[#ff6b35] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2 focus:ring-offset-transparent rounded-md p-1"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-[#d3d3d3] hover:text-[#ff6b35] focus:text-[#ff6b35] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2 focus:ring-offset-transparent rounded-md p-1"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6 uppercase">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-[#d3d3d3] hover:text-[#ff6b35] focus:text-[#ff6b35] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2 focus:ring-offset-transparent px-2 py-1 rounded-md"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Newsletter */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6 uppercase">Suscríbete</h4>
              <p className="text-[#d3d3d3] mb-6">
                Recibe nuestros últimos análisis y artículos directamente en tu email.
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35] transition-all duration-200"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#ff6b35] text-white font-semibold rounded-lg hover:bg-[#dc143c] focus:bg-[#dc143c] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  SUSCRIBIRSE
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-[#d3d3d3]">© 2025 López Labrin. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
