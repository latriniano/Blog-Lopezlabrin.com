"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, Settings, LogOut, Menu, X, PlusCircle, List, ChevronDown, ChevronRight } from "lucide-react"
import Image from "next/image"

/**
 * Admin Layout Component - Leyes al Pedo Rebrand
 * Consistent with the main site's design system
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isArticlesDropdownOpen, setIsArticlesDropdownOpen] = useState(true)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Determine if we're on an articles page
  useEffect(() => {
    setIsArticlesDropdownOpen(pathname?.includes("/admin/articles") || false)
  }, [pathname])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleArticlesDropdown = () => {
    setIsArticlesDropdownOpen(!isArticlesDropdownOpen)
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: Home,
    },
    {
      name: "Artículos",
      href: "#",
      icon: FileText,
      dropdown: true,
      isOpen: isArticlesDropdownOpen,
      toggle: toggleArticlesDropdown,
      items: [
        {
          name: "Todos los Artículos",
          href: "/admin/articles",
          icon: List,
        },
        {
          name: "Nuevo Artículo",
          href: "/admin/articles/new",
          icon: PlusCircle,
        },
      ],
    },
    {
      name: "Configuración",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="admin-panel min-h-screen flex flex-col">
      {/* Admin Header */}
      <header className="header bg-brand-orange text-white h-12 flex items-center justify-between px-4 border-b-4 border-black sticky top-0 z-50 shadow-md">
        <div className="flex items-center">
          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden mr-4 text-white hover:text-black focus:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-orange"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Desktop Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="hidden md:block mr-4 text-white hover:text-black focus:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-orange"
            aria-label={isSidebarOpen ? "Colapsar sidebar" : "Expandir sidebar"}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Admin Logo */}
          <div className="flex items-center">
            <div className="relative h-8 w-8 bg-white p-1 rounded-sm">
              <Image src="/images/lap-logo.png" alt="Lap Logo" fill className="object-contain" priority />
            </div>
            <span className="ml-2 font-bold text-sm md:text-base">Panel de Administración</span>
          </div>
        </div>

        {/* Logout Button */}
        <Link
          href="/admin/login"
          className="flex items-center text-white hover:text-black focus:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-orange text-sm"
        >
          <LogOut className="h-4 w-4 mr-1" />
          <span>Salir</span>
        </Link>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside
          className={`sidebar bg-white border-r-4 border-black shadow-md hidden md:block transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-16"
          }`}
        >
          <nav className="py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={item.toggle}
                        className={`w-full flex items-center px-4 py-2 text-left ${
                          pathname?.includes(item.href.replace("#", ""))
                            ? "bg-brand-orange text-white"
                            : "text-black hover:bg-brand-gray-100 hover:text-brand-orange"
                        } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 ${
                          isSidebarOpen ? "" : "justify-center"
                        }`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {isSidebarOpen && (
                          <>
                            <span className="ml-3 font-bold">{item.name}</span>
                            <div className="ml-auto">
                              {item.isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </div>
                          </>
                        )}
                      </button>
                      {item.isOpen && isSidebarOpen && (
                        <ul className="pl-10 mt-1 space-y-1">
                          {item.items?.map((subItem) => (
                            <li key={subItem.name}>
                              <Link
                                href={subItem.href}
                                className={`flex items-center px-4 py-2 ${
                                  pathname === subItem.href
                                    ? "bg-brand-orange text-white"
                                    : "text-black hover:bg-brand-gray-100 hover:text-brand-orange"
                                } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 text-sm`}
                              >
                                <subItem.icon className="h-4 w-4 flex-shrink-0" />
                                <span className="ml-3">{subItem.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-2 ${
                        pathname === item.href
                          ? "bg-brand-orange text-white"
                          : "text-black hover:bg-brand-gray-100 hover:text-brand-orange"
                      } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 ${
                        isSidebarOpen ? "" : "justify-center"
                      }`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {isSidebarOpen && <span className="ml-3 font-bold">{item.name}</span>}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMobileMenu}></div>
            <div className="fixed inset-y-0 left-0 w-64 bg-white border-r-4 border-black shadow-lg">
              <div className="flex items-center justify-between h-12 px-4 bg-brand-orange text-white">
                <div className="flex items-center">
                  <div className="relative h-8 w-8 bg-white p-1 rounded-sm">
                    <Image src="/images/lap-logo.png" alt="Lap Logo" fill className="object-contain" priority />
                  </div>
                  <span className="ml-2 font-bold text-sm">Panel Admin</span>
                </div>
                <button
                  onClick={toggleMobileMenu}
                  className="text-white hover:text-black focus:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-orange"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="py-4">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      {item.dropdown ? (
                        <div>
                          <button
                            onClick={item.toggle}
                            className={`w-full flex items-center px-4 py-2 text-left ${
                              pathname?.includes(item.href.replace("#", ""))
                                ? "bg-brand-orange text-white"
                                : "text-black hover:bg-brand-gray-100 hover:text-brand-orange"
                            } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2`}
                          >
                            <item.icon className="h-5 w-5 flex-shrink-0" />
                            <span className="ml-3 font-bold">{item.name}</span>
                            <div className="ml-auto">
                              {item.isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </div>
                          </button>
                          {item.isOpen && (
                            <ul className="pl-10 mt-1 space-y-1">
                              {item.items?.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    className={`flex items-center px-4 py-2 ${
                                      pathname === subItem.href
                                        ? "bg-brand-orange text-white"
                                        : "text-black hover:bg-brand-gray-100 hover:text-brand-orange"
                                    } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 text-sm`}
                                  >
                                    <subItem.icon className="h-4 w-4 flex-shrink-0" />
                                    <span className="ml-3">{subItem.name}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`flex items-center px-4 py-2 ${
                            pathname === item.href
                              ? "bg-brand-orange text-white"
                              : "text-black hover:bg-brand-gray-100 hover:text-brand-orange"
                          } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2`}
                        >
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          <span className="ml-3 font-bold">{item.name}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="content flex-1 bg-brand-gray-50 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
