import type React from "react"
import PageTransition from "@/components/page-transition"

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PageTransition>{children}</PageTransition>
}
