import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Artículos", href: "/#articulos" },
  { label: "Categorías", href: "/categorias" },
  { label: "Sobre mí", href: "/acerca-de" },
]

const socialLinks = [
  { label: "X / Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
]

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer id="contacto" className="mt-20 border-t border-border bg-card">
      <div className="h-[2px]" style={{ backgroundColor: "var(--color-beige)" }} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5 lg:col-span-6">
            <p className="font-serif text-[13px] tracking-[0.24em] uppercase text-foreground mb-4">López Labrin</p>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-sm">
              Análisis independiente sobre derecho, política y economía. Publicaciones enfocadas en instituciones,
              debate público y actualidad jurídica.
            </p>
          </div>

          <div className="md:col-span-3 lg:col-span-3">
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Navegación</p>
            <ul className="flex flex-col gap-3.5">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-sans text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Contacto</p>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a
                  href="mailto:contacto@lopezlabrin.com"
                  className="font-sans text-[13px] text-muted-foreground hover:text-[var(--color-blue)] transition-colors duration-300"
                >
                  contacto@lopezlabrin.com
                </a>
              </li>
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[13px] text-muted-foreground hover:text-[var(--color-blue)] transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/80 mt-14 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="font-sans text-[11px] text-muted-foreground tracking-wide">
            &copy; {year} Lautaro López Labrin. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <p className="font-sans text-[11px] text-muted-foreground/70 tracking-wide">Buenos Aires, Argentina</p>
            <ThemeToggle className="h-8 w-8" />
          </div>
        </div>
      </div>
    </footer>
  )
}
