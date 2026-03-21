import { AdminArticlesList } from "@/components/admin/admin-articles-list"

export const dynamic = "force-dynamic"

export default function AdminArticlesPage() {
  return (
    <section className="space-y-8">
      <header className="border-b border-border pb-7">
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
          Gestión editorial
        </p>
        <h1 className="font-serif text-[clamp(1.8rem,3.3vw,3rem)] leading-[1.06] tracking-[-0.02em] text-balance">
          Artículos
        </h1>
      </header>

      <AdminArticlesList />
    </section>
  )
}

