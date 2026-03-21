import Image from "next/image"

export function AboutSection() {
  return (
    <section id="sobre-mi" className="px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto py-16 md:py-24">
      <div className="flex items-center gap-4 mb-10 md:mb-14">
        <div className="w-2 h-2 bg-[var(--color-beige)]" />
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Sobre el autor</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 lg:gap-20">
        <div className="relative">
          <div className="relative aspect-[3/4] overflow-hidden bg-foreground max-w-[320px]">
            <Image
              src="/images/lopez-labrin-profile.png"
              alt="Retrato de Lautaro López Labrin"
              fill
              className="object-cover grayscale"
              sizes="(max-width: 1024px) 100vw, 320px"
            />
          </div>
          <div className="absolute top-3 left-3 w-full h-full border border-[var(--color-beige)]/40 -z-10 max-w-[320px]" aria-hidden="true" />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.01em] text-foreground mb-8">
            Lautaro Nehuén López Labrin
          </h2>

          <div className="flex flex-col gap-5 max-w-xl">
            <p className="font-sans text-[15px] md:text-base text-muted-foreground leading-[1.75]">
              Estudiante de derecho y analista con interés en derecho público, instituciones democráticas y coyuntura política. Tengo un canal de Youtube en el que explico los temas que en este blog trabajo.
            </p>
            <p className="font-sans text-[15px] md:text-base text-muted-foreground leading-[1.75]">
              Las publicaciones abordan reformas jurídicas, gobernanza, economía política y conflictos de poder desde
              una perspectiva crítica y rigurosa.
            </p>
          </div>

          <div className="flex items-center gap-12 mt-10 pt-8 border-t border-border">
            <div>
              <p className="font-serif text-3xl text-foreground mb-1">+20</p>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Artículos</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-foreground mb-1">3</p>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Áreas clave</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-foreground mb-1">2025</p>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Activo desde</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
