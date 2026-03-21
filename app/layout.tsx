import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { SiteChrome } from "@/components/site-chrome"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "López Labrin - Análisis Jurídico, Político y Económico",
  description: "Blog de análisis crítico sobre derecho, política y economía con perspectiva.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-background text-foreground">
          <SiteChrome>{children}</SiteChrome>
        </div>
      </body>
    </html>
  )
}
