import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function NewsletterCta() {
  return (
    <section className="px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto py-16 md:py-24">
      <div className="border border-border p-8 md:p-14 lg:p-20 bg-card">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-2 bg-[var(--color-blue)]" />
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Contacto</p>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.14] tracking-[-0.01em] text-foreground mb-4">
            ¿Querés trabajar o debatir en conjunto?
          </h2>
          <p className="font-sans text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-10">
            Podés escribir para consultas jurídicas, colaboraciones editoriales o invitaciones académicas.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
            <Link
              href="/contacto"
              className="group inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 font-sans text-[11px] tracking-[0.18em] uppercase hover:bg-[var(--color-blue)] transition-colors duration-300"
            >
              Ir a contacto
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/acerca-de"
              className="inline-flex items-center justify-center border border-border px-6 py-3 font-sans text-[11px] tracking-[0.18em] uppercase text-foreground hover:border-[var(--color-blue)] hover:text-[var(--color-blue)] transition-colors duration-300"
            >
              Ver perfil
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
