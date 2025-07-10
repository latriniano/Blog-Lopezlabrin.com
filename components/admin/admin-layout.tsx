"use client"
import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, Settings, Users, BarChart3, LogOut } from "lucide-react"

interface AdminLayoutProps {
  children: ReactNode
  title?: string
}

/**
 * Admin Layout Component - Leyes al Pedo Rebrand
 * Consistent with the main site's design system
 */
export function AdminLayout({ children, title = "Panel de Administración" }: AdminLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1c1c1c] border-r border-white/10 min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-8">Admin Panel</h2>
            <nav className="space-y-2">
              <Link
                href="/admin/dashboard"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#d3d3d3] hover:bg-[#2a2a2a] hover:text-white transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/admin/articles"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#d3d3d3] hover:bg-[#2a2a2a] hover:text-white transition-colors"
              >
                <FileText className="w-5 h-5" />
                <span>Artículos</span>
              </Link>
              <Link
                href="/admin/analytics"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#d3d3d3] hover:bg-[#2a2a2a] hover:text-white transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Analytics</span>
              </Link>
              <Link
                href="/admin/users"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#d3d3d3] hover:bg-[#2a2a2a] hover:text-white transition-colors"
              >
                <Users className="w-5 h-5" />
                <span>Usuarios</span>
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#d3d3d3] hover:bg-[#2a2a2a] hover:text-white transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Configuración</span>
              </Link>
            </nav>
          </div>

          <div className="absolute bottom-0 w-64 p-6">
            <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#d3d3d3] hover:bg-[#2a2a2a] hover:text-white transition-colors w-full">
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <header className="bg-[#1c1c1c] border-b border-white/10 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
          </header>
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
