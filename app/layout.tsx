import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "López Labrin - Análisis Jurídico, Político y Económico",
  description: "Blog de análisis crítico sobre derecho, política y economía con perspectiva independiente",
  keywords: ["derecho", "política", "economía", "análisis", "blog", "López Labrin"],
  authors: [{ name: "López Labrin Lautaro" }],
  openGraph: {
    title: "López Labrin - Análisis Jurídico, Político y Económico",
    description: "Blog de análisis crítico sobre derecho, política y economía con perspectiva independiente",
    type: "website",
    locale: "es_AR",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
