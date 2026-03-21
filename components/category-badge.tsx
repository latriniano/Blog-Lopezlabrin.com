import { slugify } from "@/lib/utils"

export type Category = string

interface CategoryBadgeProps {
  category: Category
  size?: "sm" | "md"
}

function getCategoryClasses(category: string) {
  const slug = slugify(category)

  if (slug.includes("derecho") || slug.includes("jurid")) {
    return "text-[var(--color-red)] border-[var(--color-red)]/25 bg-[var(--color-red)]/[0.04]"
  }

  if (slug.includes("politica") || slug.includes("institucion") || slug.includes("democracia")) {
    return "text-[var(--color-blue)] border-[var(--color-blue)]/25 bg-[var(--color-blue)]/[0.04]"
  }

  if (slug.includes("econom") || slug.includes("mercado") || slug.includes("fiscal")) {
    return "text-[var(--color-red)] border-[var(--color-red)]/25 bg-[var(--color-red)]/[0.04]"
  }

  if (slug.includes("geopolit") || slug.includes("internacional") || slug.includes("global")) {
    return "text-[var(--color-blue)] border-[var(--color-blue)]/25 bg-[var(--color-blue)]/[0.04]"
  }

  return "text-muted-foreground border-border bg-muted/40"
}

export function CategoryBadge({ category, size = "sm" }: CategoryBadgeProps) {
  const colorClasses = getCategoryClasses(category)
  const sizeClasses = size === "md" ? "text-[11px] tracking-[0.14em] px-3 py-1" : "text-[10px] tracking-[0.16em] px-2.5 py-[3px]"

  return (
    <span className={`inline-block font-sans uppercase border ${colorClasses} ${sizeClasses}`}>
      {category || "General"}
    </span>
  )
}
