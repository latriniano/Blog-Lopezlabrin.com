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
  ChevronUp,
  Loader2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Article {
  id: number
  title: string
  excerpt: string
  fullContent: string
  date: string
  category: string
  readTime: string
  gradientClass: string
}

// Extended article dataset
const allArticles: Article[] = [
  {
    id: 1,
    title: "La Reforma Judicial y sus Implicaciones Constitucionales",
    excerpt:
      "Un análisis profundo sobre los cambios propuestos en el sistema judicial argentino y su impacto en la división de poderes.",
    fullContent: `
      <p>El derecho constitucional ha experimentado transformaciones significativas en las últimas dos décadas. Los desafíos del siglo XXI han obligado a repensar conceptos fundamentales sobre derechos, libertades y la estructura del Estado.</p>
      
      <h2>Nuevos Paradigmas Constitucionales</h2>
      <p>La era digital ha introducido complejidades inéditas en el ámbito constitucional. La protección de datos personales, el derecho al olvido y la libertad de expresión en plataformas digitales son solo algunos de los temas que requieren una reinterpretación constitucional.</p>
      
      <blockquote>
        <p>"Las constituciones del siglo XXI deben ser documentos vivos que evolucionen con la sociedad, sin perder su esencia protectora de derechos fundamentales."</p>
      </blockquote>
      
      <h3>Impacto de la Globalización</h3>
      <p>La globalización ha creado tensiones entre la soberanía nacional y la necesidad de cooperación internacional. Los tratados internacionales de derechos humanos han adquirido una relevancia sin precedentes.</p>
      
      <ul>
        <li>Integración de normas internacionales en el derecho interno</li>
        <li>Conflictos entre jurisdicciones nacionales e internacionales</li>
        <li>Armonización de sistemas jurídicos diversos</li>
      </ul>
      
      <h3>Desafíos Futuros</h3>
      <p>El futuro del derecho constitucional dependerá de su capacidad para adaptarse a realidades emergentes como la inteligencia artificial, el cambio climático y las nuevas formas de participación democrática.</p>
    `,
    date: "15 de enero, 2025",
    category: "Derecho",
    readTime: "12 min de lectura",
    gradientClass: "gradient-red-blue",
  },
  {
    id: 2,
    title: "Economía Política: El Rol del Estado en la Crisis Actual",
    excerpt:
      "Examinamos las políticas económicas implementadas y su efectividad en el contexto de la crisis inflacionaria.",
    fullContent: `
      <p>La pandemia de COVID-19 obligó a gobiernos de todo el mundo a implementar políticas fiscales expansivas sin precedentes. Tres años después, es momento de evaluar sus consecuencias económicas y sociales.</p>
      
      <h2>Medidas Implementadas</h2>
      <p>Los paquetes de estímulo incluyeron transferencias directas a ciudadanos, subsidios a empresas, moratorias fiscales y programas de empleo de emergencia. Estas medidas, aunque necesarias, han tenido efectos complejos.</p>
      
      <h3>Efectos Positivos</h3>
      <ul>
        <li>Prevención de una recesión más profunda</li>
        <li>Mantenimiento del empleo en sectores críticos</li>
        <li>Protección de los sectores más vulnerables</li>
        <li>Aceleración de la digitalización económica</li>
      </ul>
      
      <h3>Consecuencias Negativas</h3>
      <p>Sin embargo, estas políticas también han generado efectos adversos:</p>
      
      <blockquote>
        <p>"El dilema actual es cómo mantener el crecimiento económico mientras se controla la inflación y se reduce el déficit fiscal."</p>
      </blockquote>
      
      <p>La inflación ha resurgido como un problema central, afectando especialmente a los sectores de menores ingresos. Además, el aumento de la deuda pública plantea interrogantes sobre la sostenibilidad fiscal a largo plazo.</p>
    `,
    date: "12 de enero, 2025",
    category: "Economía",
    readTime: "8 min de lectura",
    gradientClass: "gradient-blue-red",
  },
  {
    id: 3,
    title: "Análisis de la Nueva Ley de Alquileres",
    excerpt: "Revisión crítica de las modificaciones legislativas y su impacto en el mercado inmobiliario nacional.",
    fullContent: `
      <p>La nueva legislación sobre alquileres ha generado un intenso debate en el ámbito jurídico y económico. Sus implicaciones trascienden el mero aspecto contractual para adentrarse en cuestiones de política habitacional y derechos sociales.</p>
      
      <h2>Principales Modificaciones</h2>
      <p>Las reformas introducidas buscan equilibrar los derechos de inquilinos y propietarios, estableciendo nuevos marcos regulatorios que afectan desde la duración de los contratos hasta los mecanismos de actualización de precios.</p>
      
      <h3>Impacto en el Mercado</h3>
      <p>Los primeros análisis sugieren efectos mixtos:</p>
      
      <ul>
        <li>Mayor seguridad jurídica para los inquilinos</li>
        <li>Posible reducción de la oferta de propiedades en alquiler</li>
        <li>Cambios en los patrones de inversión inmobiliaria</li>
      </ul>
      
      <blockquote>
        <p>"La regulación del mercado de alquileres debe encontrar el equilibrio entre la protección social y la eficiencia económica."</p>
      </blockquote>
      
      <h3>Perspectivas Futuras</h3>
      <p>La implementación efectiva de estas medidas requerirá un seguimiento cuidadoso de sus efectos en el mercado inmobiliario y posibles ajustes normativos basados en evidencia empírica.</p>
    `,
    date: "10 de enero, 2025",
    category: "Derecho",
    readTime: "15 min de lectura",
    gradientClass: "gradient-red-red",
  },
  {
    id: 4,
    title: "Democracia y Participación Ciudadana en el Siglo XXI",
    excerpt: "Un examen de los nuevos mecanismos de participación política y su impacto en la legitimidad democrática.",
    fullContent: `
      <p>La democracia representativa enfrenta desafíos sin precedentes en la era digital. La aparición de nuevas formas de participación ciudadana está redefiniendo la relación entre gobernantes y gobernados.</p>
      
      <h2>Nuevas Formas de Participación</h2>
      <p>Las tecnologías digitales han habilitado mecanismos de participación que trascienden los límites tradicionales de la democracia representativa. Desde consultas ciudadanas en línea hasta presupuestos participativos, las opciones se multiplican.</p>
      
      <h3>Ventajas y Desafíos</h3>
      <ul>
        <li>Mayor accesibilidad para la participación ciudadana</li>
        <li>Riesgo de fragmentación del debate público</li>
        <li>Necesidad de nuevos marcos regulatorios</li>
        <li>Cuestiones de representatividad y legitimidad</li>
      </ul>
      
      <blockquote>
        <p>"La tecnología puede ser una herramienta poderosa para la democratización, pero requiere marcos institucionales sólidos para ser efectiva."</p>
      </blockquote>
    `,
    date: "8 de enero, 2025",
    category: "Política",
    readTime: "10 min de lectura",
    gradientClass: "gradient-blue-violet",
  },
  {
    id: 5,
    title: "El Futuro de los Derechos Laborales en la Era Digital",
    excerpt:
      "Análisis de cómo la transformación digital está redefiniendo las relaciones laborales y los derechos de los trabajadores.",
    fullContent: `
      <p>La revolución digital ha transformado fundamentalmente el mundo del trabajo. Nuevas formas de empleo, como el trabajo por plataformas, desafían las categorías tradicionales del derecho laboral.</p>
      
      <h2>Nuevos Paradigmas Laborales</h2>
      <p>La gig economy, el teletrabajo y la automatización están reconfigurando no solo cómo trabajamos, sino también nuestros derechos y protecciones como trabajadores.</p>
      
      <h3>Desafíos Regulatorios</h3>
      <ul>
        <li>Clasificación de trabajadores de plataformas</li>
        <li>Protección social para nuevas formas de empleo</li>
        <li>Derechos de privacidad en el trabajo remoto</li>
        <li>Impacto de la inteligencia artificial en el empleo</li>
      </ul>
      
      <blockquote>
        <p>"El derecho laboral debe evolucionar para proteger a los trabajadores en un mundo donde las fronteras entre empleado y contratista independiente se difuminan."</p>
      </blockquote>
    `,
    date: "5 de enero, 2025",
    category: "Derecho",
    readTime: "11 min de lectura",
    gradientClass: "gradient-violet-red",
  },
  {
    id: 6,
    title: "Política Fiscal y Desigualdad: Un Análisis Comparativo",
    excerpt: "Examen de diferentes estrategias fiscales y su efectividad para reducir la desigualdad económica.",
    fullContent: `
      <p>La política fiscal se ha convertido en una herramienta fundamental para abordar la creciente desigualdad económica. Este análisis examina diferentes enfoques y su efectividad.</p>
      
      <h2>Instrumentos Fiscales</h2>
      <p>Los gobiernos disponen de diversas herramientas fiscales para redistribuir la riqueza y promover la equidad social.</p>
      
      <h3>Estrategias Redistributivas</h3>
      <ul>
        <li>Impuestos progresivos sobre la renta</li>
        <li>Impuestos a la riqueza y herencias</li>
        <li>Transferencias sociales dirigidas</li>
        <li>Inversión pública en servicios universales</li>
      </ul>
      
      <blockquote>
        <p>"Una política fiscal efectiva debe equilibrar los objetivos de crecimiento económico con la necesidad de reducir la desigualdad."</p>
      </blockquote>
    `,
    date: "3 de enero, 2025",
    category: "Economía",
    readTime: "9 min de lectura",
    gradientClass: "gradient-blue-red",
  },
  {
    id: 7,
    title: "Constitucionalismo Verde: Derechos Ambientales en la Constitución",
    excerpt: "Análisis del reconocimiento constitucional de los derechos ambientales y su implementación práctica.",
    fullContent: `
      <p>El constitucionalismo verde representa una evolución significativa en el derecho constitucional contemporáneo. La incorporación de derechos ambientales en las constituciones nacionales refleja una creciente conciencia sobre la crisis ecológica.</p>
      
      <h2>Marco Constitucional Ambiental</h2>
      <p>La constitucionalización de los derechos ambientales ha creado nuevos marcos para la protección del medio ambiente y la sostenibilidad.</p>
      
      <h3>Desarrollos Jurisprudenciales</h3>
      <ul>
        <li>Reconocimiento de derechos de la naturaleza</li>
        <li>Principio de sostenibilidad intergeneracional</li>
        <li>Obligaciones estatales de protección ambiental</li>
        <li>Participación ciudadana en decisiones ambientales</li>
      </ul>
      
      <blockquote>
        <p>"Los derechos ambientales constitucionales representan un cambio paradigmático hacia un modelo de desarrollo sostenible y equitativo."</p>
      </blockquote>
    `,
    date: "1 de enero, 2025",
    category: "Derecho",
    readTime: "13 min de lectura",
    gradientClass: "gradient-red-blue",
  },
  {
    id: 8,
    title: "Geopolítica Económica: Bloques Comerciales en el Siglo XXI",
    excerpt: "Análisis de la reconfiguración de los bloques comerciales y su impacto en la economía global.",
    fullContent: `
      <p>La economía global está experimentando una reconfiguración fundamental de sus bloques comerciales. Las tensiones geopolíticas están redefiniendo las alianzas económicas tradicionales.</p>
      
      <h2>Nuevas Dinámicas Comerciales</h2>
      <p>El surgimiento de nuevos polos de poder económico está alterando los patrones comerciales establecidos durante la era de la globalización.</p>
      
      <h3>Impactos Regionales</h3>
      <ul>
        <li>Reconfiguración de cadenas de suministro</li>
        <li>Competencia entre modelos económicos</li>
        <li>Implicaciones para países de renta media</li>
        <li>Nuevas formas de cooperación Sur-Sur</li>
      </ul>
      
      <blockquote>
        <p>"La nueva geopolítica económica requiere estrategias flexibles y diversificadas para navegar un mundo multipolar."</p>
      </blockquote>
    `,
    date: "28 de diciembre, 2024",
    category: "Economía",
    readTime: "14 min de lectura",
    gradientClass: "gradient-blue-violet",
  },
  {
    id: 9,
    title: "Crisis de Representación: Partidos Políticos y Democracia",
    excerpt: "Examen de la crisis de los partidos políticos tradicionales y el surgimiento de nuevos movimientos.",
    fullContent: `
      <p>Los partidos políticos tradicionales enfrentan una crisis de legitimidad sin precedentes. El surgimiento de nuevos movimientos políticos refleja un cambio profundo en las preferencias ciudadanas.</p>
      
      <h2>Factores de la Crisis</h2>
      <p>Múltiples factores confluyen para explicar la erosión de la confianza en los partidos políticos establecidos.</p>
      
      <h3>Nuevos Actores Políticos</h3>
      <ul>
        <li>Movimientos ciudadanos independientes</li>
        <li>Partidos anti-sistema</li>
        <li>Liderazgos personalizados</li>
        <li>Plataformas digitales de participación</li>
      </ul>
      
      <blockquote>
        <p>"La renovación democrática requiere partidos políticos que reconecten con las demandas ciudadanas del siglo XXI."</p>
      </blockquote>
    `,
    date: "25 de diciembre, 2024",
    category: "Política",
    readTime: "12 min de lectura",
    gradientClass: "gradient-violet-red",
  },
]

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("inicio")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null)
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

  // Initialize displayed articles
  useEffect(() => {
    const initialArticles = allArticles.slice(0, articlesPerPage).map((article, index) => ({
      ...article,
      gradientClass: gradientClasses[index % gradientClasses.length],
    }))
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
      const newArticles = currentArticles.slice(startIndex, endIndex).map((article, index) => ({
        ...article,
        gradientClass: gradientClasses[(startIndex + index) % gradientClasses.length],
      }))

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
    setExpandedArticle(null) // Close any expanded article

    setTimeout(() => {
      const articlesToShow =
        category === "all"
          ? allArticles.slice(0, articlesPerPage)
          : allArticles.filter((article) => article.category === category).slice(0, articlesPerPage)

      const articlesWithGradients = articlesToShow.map((article, index) => ({
        ...article,
        gradientClass: gradientClasses[index % gradientClasses.length],
      }))

      setDisplayedArticles(articlesWithGradients)
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

  const toggleArticle = (articleId: number) => {
    if (expandedArticle === articleId) {
      setExpandedArticle(null)
    } else {
      setExpandedArticle(articleId)
    }
  }

  const categories = [
    {
      name: "Derecho",
      key: "Derecho",
      icon: Scale,
      articles: allArticles.filter((article) => article.category === "Derecho").length,
      description: "Análisis jurídico y constitucional",
      color: "red",
    },
    {
      name: "Política",
      key: "Política",
      icon: User,
      articles: allArticles.filter((article) => article.category === "Política").length,
      description: "Política nacional e internacional",
      color: "blue",
    },
    {
      name: "Economía",
      key: "Economía",
      icon: TrendingUp,
      articles: allArticles.filter((article) => article.category === "Economía").length,
      description: "Economía política y social",
      color: "red",
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
                  className={`text-sm font-medium transition-all duration-200 hover:text-[#1e90ff] focus:text-[#1e90ff] focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:ring-offset-2 focus:ring-offset-transparent px-3 py-2 rounded-md ${
                    activeSection === item.id ? "text-[#1e90ff]" : "text-[#eaeaea]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden mobile-menu-trigger p-2 text-white hover:text-[#1e90ff] focus:text-[#1e90ff] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:ring-offset-2 focus:ring-offset-transparent rounded-md"
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
                  className="p-2 text-white hover:text-[#1e90ff] focus:text-[#1e90ff] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:ring-offset-2 focus:ring-offset-transparent rounded-md"
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
                        className={`w-full text-left text-lg font-medium transition-all duration-200 hover:text-[#1e90ff] focus:text-[#1e90ff] focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:ring-offset-2 focus:ring-offset-transparent px-4 py-3 rounded-md hover:bg-white/5 focus:bg-white/5 ${
                          activeSection === item.id ? "text-[#1e90ff] bg-white/10" : "text-[#eaeaea]"
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
                  className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 focus:bg-white/20 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:ring-offset-2 focus:ring-offset-transparent"
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
                <div className="flex items-center space-x-3 text-[#1e90ff]">
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
                  {/* Article Preview */}
                  <button
                    onClick={() => toggleArticle(post.id)}
                    className="w-full p-8 text-left hover:bg-white/5 focus:bg-white/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:ring-offset-2 focus:ring-offset-transparent"
                  >
                    <div className="space-y-6">
                      <h3 className="text-3xl md:text-4xl font-bold text-white post-title-glow leading-tight">
                        {post.title}
                      </h3>

                      <p className="text-lg text-[#eaeaea] leading-relaxed max-w-4xl">{post.excerpt}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-[#d3d3d3]">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                          </span>
                          <span>•</span>
                          <span>{post.category}</span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </span>
                        </div>

                        <div className="read-more-link text-lg font-medium flex items-center space-x-2 group">
                          <span>{expandedArticle === post.id ? "Leer menos" : "Leer más"}</span>
                          <motion.div
                            animate={{ rotate: expandedArticle === post.id ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="w-5 h-5" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Article Content */}
                  <AnimatePresence>
                    {expandedArticle === post.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8 border-t border-white/10">
                          <div className="pt-8">
                            {/* Article Header */}
                            <div className="mb-8">
                              <div className="flex items-center justify-between mb-6">
                                <span className="inline-block px-3 py-1 bg-[#dc143c]/20 text-[#dc143c] rounded-full text-sm font-medium border border-[#dc143c]/30">
                                  {post.category}
                                </span>
                                <button
                                  onClick={() => setExpandedArticle(null)}
                                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 focus:bg-white/20 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:ring-offset-2 focus:ring-offset-transparent"
                                >
                                  <ChevronUp className="w-4 h-4" />
                                  <span>Cerrar</span>
                                </button>
                              </div>

                              <div className="flex items-center space-x-6 text-[#d3d3d3] mb-6">
                                <div className="flex items-center space-x-2">
                                  <User className="w-4 h-4" />
                                  <span>López Labrin Lautaro</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Calendar className="w-4 h-4" />
                                  <span>{post.date}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4" />
                                  <span>{post.readTime}</span>
                                </div>
                              </div>
                            </div>

                            {/* Article Content */}
                            <div className="max-w-4xl mx-auto">
                              <div
                                className="article-content prose prose-lg prose-invert max-w-none text-[#eaeaea] leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: post.fullContent }}
                              />
                            </div>

                            {/* Close Button at Bottom */}
                            <div className="mt-12 text-center">
                              <button
                                onClick={() => setExpandedArticle(null)}
                                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#dc143c] hover:bg-[#b91c3c] focus:bg-[#b91c3c] text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#dc143c] focus:ring-offset-2 focus:ring-offset-transparent font-semibold"
                              >
                                <ChevronUp className="w-5 h-5" />
                                <span>Cerrar Artículo</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More Button */}
          {!isLoading && hasMoreArticles() && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-12">
              <button
                onClick={loadMoreArticles}
                className="px-8 py-4 bg-[#dc143c] text-white font-semibold rounded-lg hover:bg-[#b91c3c] focus:bg-[#b91c3c] transition-all duration-200 border-2 border-[#dc143c] hover:border-[#b91c3c] focus:border-[#b91c3c] focus:outline-none focus:ring-2 focus:ring-[#dc143c] focus:ring-offset-2 focus:ring-offset-transparent"
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
                  className="mt-4 px-6 py-3 bg-white/10 hover:bg-white/20 focus:bg-white/20 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:ring-offset-2 focus:ring-offset-transparent"
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
                  className={`category-card bg-[#1c1c1c] p-8 rounded-lg border border-white/10 text-center group cursor-pointer hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:ring-offset-2 focus:ring-offset-transparent ${
                    selectedCategory === category.key ? "ring-2 ring-[#1e90ff] bg-[#2a2a2a]" : ""
                  }`}
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                      category.color === "red"
                        ? "bg-[#dc143c]/20 border border-[#dc143c]/30 group-hover:bg-[#dc143c]/30 group-focus:bg-[#dc143c]/30"
                        : "bg-[#1e90ff]/20 border border-[#1e90ff]/30 group-hover:bg-[#1e90ff]/30 group-focus:bg-[#1e90ff]/30"
                    }`}
                  >
                    <IconComponent
                      className={`w-8 h-8 transition-all duration-200 ${
                        category.color === "red"
                          ? "text-[#dc143c] group-hover:text-[#ff4757] group-focus:text-[#ff4757]"
                          : "text-[#1e90ff] group-hover:text-[#4dabf7] group-focus:text-[#4dabf7]"
                      }`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#1e90ff] group-focus:text-[#1e90ff] transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-[#d3d3d3] mb-4">{category.description}</p>
                  <p className="text-sm text-[#eaeaea] mb-6">{category.articles} artículos</p>
                  <span className="text-[#1e90ff] font-semibold group-hover:text-white group-focus:text-white transition-colors duration-200">
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
                  <button className="px-8 py-4 bg-[#1e90ff] text-white font-semibold rounded-lg hover:bg-[#1c7ed6] focus:bg-[#1c7ed6] transition-all duration-200 border-2 border-[#1e90ff] hover:border-[#1c7ed6] focus:border-[#1c7ed6] focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:ring-offset-2 focus:ring-offset-transparent">
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
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#1e90ff] focus:ring-2 focus:ring-[#1e90ff] transition-all duration-200"
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
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#1e90ff] focus:ring-2 focus:ring-[#1e90ff] transition-all duration-200"
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
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#1e90ff] focus:ring-2 focus:ring-[#1e90ff] transition-all duration-200"
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
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#1e90ff] focus:ring-2 focus:ring-[#1e90ff] resize-none transition-all duration-200"
                    placeholder="Escribe tu mensaje aquí..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#1e90ff] text-white font-semibold rounded-lg hover:bg-[#1c7ed6] focus:bg-[#1c7ed6] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:ring-offset-2 focus:ring-offset-transparent"
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
                  <div className="bg-[#dc143c]/20 p-3 rounded-lg border border-[#dc143c]/30">
                    <Mail className="h-6 w-6 text-[#dc143c]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <p className="text-[#d3d3d3]">contacto@lopezlabrin.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#1e90ff]/20 p-3 rounded-lg border border-[#1e90ff]/30">
                    <Phone className="h-6 w-6 text-[#1e90ff]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Teléfono</h4>
                    <p className="text-[#d3d3d3]">+54 11 1234-5678</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#dc143c]/20 p-3 rounded-lg border border-[#dc143c]/30">
                    <MapPin className="h-6 w-6 text-[#dc143c]" />
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
                  className="text-[#d3d3d3] hover:text-[#1e90ff] focus:text-[#1e90ff] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:ring-offset-2 focus:ring-offset-transparent rounded-md p-1"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-[#d3d3d3] hover:text-[#1e90ff] focus:text-[#1e90ff] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:ring-offset-2 focus:ring-offset-transparent rounded-md p-1"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-[#d3d3d3] hover:text-[#1e90ff] focus:text-[#1e90ff] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:ring-offset-2 focus:ring-offset-transparent rounded-md p-1"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-[#d3d3d3] hover:text-[#1e90ff] focus:text-[#1e90ff] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:ring-offset-2 focus:ring-offset-transparent rounded-md p-1"
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
                      className="text-[#d3d3d3] hover:text-[#1e90ff] focus:text-[#1e90ff] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:ring-offset-2 focus:ring-offset-transparent px-2 py-1 rounded-md"
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
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#1e90ff] focus:ring-2 focus:ring-[#1e90ff] transition-all duration-200"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#dc143c] text-white font-semibold rounded-lg hover:bg-[#b91c3c] focus:bg-[#b91c3c] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#dc143c] focus:ring-offset-2 focus:ring-offset-transparent"
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
