"use client"

import { type ReactNode, useMemo, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FileText, Loader2, LogOut } from "lucide-react"

interface AdminShellProps {
  children: ReactNode
}

const navItems = [
  {
    href: "/admin/articles",
    label: "Artículos",
    helper: "Listado y estado editorial",
    icon: FileText,
  },
]

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const activeSection = useMemo(() => {
    const match = navItems.find((item) => pathname.startsWith(item.href))
    return match?.label || "Admin"
  }, [pathname])

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      await fetch("/api/admin/login", { method: "DELETE" })
    } finally {
      router.replace("/admin/login")
      router.refresh()
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] min-h-screen">
        <aside className="border-r border-border bg-card px-6 py-8 lg:py-10">
          <div className="mb-12">
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
              CMS Admin
            </p>
            <h2 className="font-serif text-3xl leading-[1.04] tracking-[-0.01em]">
              López Labrin
            </h2>
          </div>

          <nav className="space-y-2 mb-10">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block border px-4 py-3 transition-colors ${
                    isActive
                      ? "border-foreground bg-background"
                      : "border-border hover:border-foreground/60"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4" />
                    <span className="font-sans text-[11px] tracking-[0.16em] uppercase">
                      {item.label}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground">{item.helper}</p>
                </Link>
              )
            })}
          </nav>

          <div className="pt-7 border-t border-border space-y-3">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full inline-flex items-center justify-center gap-2 border border-border px-4 py-3 font-sans text-[11px] tracking-[0.16em] uppercase hover:border-foreground disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saliendo
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </>
              )}
            </button>
            <Link
              href="/"
              className="block text-center border border-border px-4 py-3 font-sans text-[11px] tracking-[0.16em] uppercase hover:border-foreground transition-colors"
            >
              Ver sitio público
            </Link>
          </div>
        </aside>

        <main className="min-w-0">
          <header className="border-b border-border px-6 md:px-10 py-6">
            <p className="font-sans text-[10px] tracking-[0.24em] uppercase text-muted-foreground mb-2">
              Panel
            </p>
            <h1 className="font-serif text-3xl leading-[1.05] tracking-[-0.01em]">{activeSection}</h1>
          </header>

          <div className="px-6 md:px-10 py-8 md:py-10">{children}</div>
        </main>
      </div>
    </div>
  )
}
