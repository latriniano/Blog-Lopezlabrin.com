"use client"

import { BarChart3, FileText, Eye } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total de Artículos",
      value: "24",
      change: "+3 este mes",
      icon: FileText,
      color: "text-blue-400",
    },
    {
      title: "Artículos Publicados",
      value: "18",
      change: "+2 esta semana",
      icon: Eye,
      color: "text-green-400",
    },
    {
      title: "Borradores",
      value: "6",
      change: "+1 hoy",
      icon: FileText,
      color: "text-yellow-400",
    },
    {
      title: "Vistas Totales",
      value: "12.5K",
      change: "+15% este mes",
      icon: BarChart3,
      color: "text-purple-400",
    },
  ]

  const recentArticles = [
    {
      title: "La Evolución del Derecho Constitucional en el Siglo XXI",
      status: "Publicado",
      date: "15 de enero, 2025",
      views: "1.2K",
    },
    {
      title: "Crisis Política y Legitimidad Democrática",
      status: "Publicado",
      date: "12 de enero, 2025",
      views: "890",
    },
    {
      title: "El Impacto Económico de las Políticas Fiscales Post-Pandemia",
      status: "Borrador",
      date: "8 de enero, 2025",
      views: "0",
    },
  ]

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Panel de Control</h1>
          <p className="text-[#d3d3d3]">Bienvenido al panel de administración de López Labrin</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#d3d3d3] text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                  <p className="text-[#d3d3d3] text-xs mt-1">{stat.change}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Articles */}
        <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Artículos Recientes</h2>
          </div>
          <div className="divide-y divide-gray-700">
            {recentArticles.map((article, index) => (
              <div key={index} className="px-6 py-4 hover:bg-[#2a2a2a] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-[#eaeaea] font-medium">{article.title}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-[#d3d3d3]">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          article.status === "Publicado"
                            ? "bg-green-900 text-green-200"
                            : "bg-yellow-900 text-yellow-200"
                        }`}
                      >
                        {article.status}
                      </span>
                      <span>{article.date}</span>
                      <span>{article.views} vistas</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
