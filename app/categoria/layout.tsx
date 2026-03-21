import type { ReactNode } from "react"

interface CategoriaLayoutProps {
  children: ReactNode
}

export default function CategoriaLayout({ children }: CategoriaLayoutProps) {
  return <div className="min-h-screen bg-background text-foreground">{children}</div>
}
