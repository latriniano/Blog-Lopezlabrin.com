import type { ReactNode } from "react"

interface ArticulosLayoutProps {
  children: ReactNode
}

export default function ArticulosLayout({ children }: ArticulosLayoutProps) {
  return <div className="min-h-screen bg-background text-foreground">{children}</div>
}
