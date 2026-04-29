"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

const storageKey = "lopez-labrin-theme"
const themeChangeEvent = "lopez-labrin-theme-change"

type Theme = "light" | "dark"

type ThemeToggleProps = {
  className?: string
  tone?: "default" | "on-dark"
}

const getCurrentTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light"

export default function ThemeToggle({ className = "", tone = "default" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)
  const toneClassName =
    tone === "on-dark"
      ? "border-white/30 bg-white/20 text-white shadow-[0_8px_24px_rgba(0,0,0,0.22)] hover:border-white/50 hover:bg-white/30"
      : "border-border bg-background/90 text-foreground hover:bg-secondary"

  useEffect(() => {
    const root = document.documentElement
    const savedTheme = localStorage.getItem(storageKey)
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const initialTheme: Theme =
      savedTheme === "dark" || savedTheme === "light" ? savedTheme : prefersDark ? "dark" : "light"

    root.classList.toggle("dark", initialTheme === "dark")
    localStorage.setItem(storageKey, initialTheme)
    setTheme(initialTheme)
    setMounted(true)

    const syncTheme = () => setTheme(getCurrentTheme())
    window.addEventListener(themeChangeEvent, syncTheme)
    window.addEventListener("storage", syncTheme)

    return () => {
      window.removeEventListener(themeChangeEvent, syncTheme)
      window.removeEventListener("storage", syncTheme)
    }
  }, [])

  const handleToggle = () => {
    const nextTheme: Theme = getCurrentTheme() === "dark" ? "light" : "dark"
    document.documentElement.classList.toggle("dark", nextTheme === "dark")
    localStorage.setItem(storageKey, nextTheme)
    setTheme(nextTheme)
    window.dispatchEvent(new Event(themeChangeEvent))
  }

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Cargando selector de tema"
        className={`h-9 w-9 border ${toneClassName} ${className}`}
        disabled
      />
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
      className={`group relative h-9 w-9 border transition-colors ${toneClassName} ${className}`}
    >
      <Sun
        size={15}
        strokeWidth={1.7}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        size={15}
        strokeWidth={1.7}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  )
}
