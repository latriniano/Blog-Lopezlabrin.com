import Image from "next/image"
import Link from "next/link"
import { Award, BookOpen, Briefcase, Mail, MapPin, Users } from "lucide-react"

type OngoingProject = {
  name: string
  stage: string
  timeline: string
  summary: string
  focusAreas: string[]
}

// Data de ejemplo: reemplazá o editá estos objetos para actualizar la sección.
const ongoingProjects: OngoingProject[] = [
  {
    name: "Observatorio de Reformas Institucionales",
    stage: "En investigación",
    timeline: "Publicación inicial: Q2 2026",
    summary:
      "Plataforma de análisis comparado sobre reformas institucionales en América Latina, con foco en impacto constitucional y calidad democrática.",
    focusAreas: ["Derecho público", "Diseño institucional", "Análisis comparado"],
  },
  {
    name: "Serie audiovisual: Poder y Constitución",
    stage: "En producción",
    timeline: "Lanzamiento piloto: Junio 2026",
    summary:
      "Formato breve para explicar conflictos constitucionales actuales, decisiones judiciales clave y debates de gobernanza con lenguaje claro.",
    focusAreas: ["Divulgación", "Análisis político", "Educación cívica"],
  },
  {
    name: "Laboratorio de indicadores de calidad regulatoria",
    stage: "En desarrollo",
    timeline: "Beta privada: Agosto 2026",
    summary:
      "Proyecto aplicado para medir claridad normativa, estabilidad regulatoria y costos institucionales en políticas públicas estratégicas.",
    focusAreas: ["Regulación", "Datos públicos", "Políticas públicas"],
  },
]

export default function AcercaDePage() {
  return (
    <div className="min-h-screen bg-background pt-[112px] pb-20">
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pb-16 border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden bg-foreground">
              <Image
                src="/images/lopez-labrin-profile.png"
                alt="Lautaro López Labrin"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 1024px) 100vw, 340px"
                priority
              />
            </div>
            <div className="absolute top-3 left-3 w-full h-full border border-[var(--color-beige)]/40 -z-10" aria-hidden="true" />
          </div>

          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-2 h-2 bg-[var(--color-red)]" />
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Perfil profesional</p>
            </div>

            <h1 className="font-serif text-[clamp(2.3rem,5vw,4.6rem)] leading-[1.05] tracking-[-0.02em] text-foreground text-balance mb-7">
              Lautaro López Labrin
            </h1>

            <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
              Estudiante de derecho y analista con interés en derecho público, instituciones democráticas y coyuntura política. Tengo un canal de Youtube en el que explico los temas que en este blog trabajo.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                Villa Carlos Paz, Córdoba, Argentina
              </div>
              <a href="mailto:contacto@lopezlabrin.com" className="flex items-center gap-2 hover:text-[var(--color-blue)] transition-colors">
                <Mail size={16} />
                contacto@lopezlabrin.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          <article className="border border-border bg-card p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-[var(--color-blue)]" />
              <h2 className="font-serif text-3xl text-foreground">Formación Académica</h2>
            </div>
            <div className="space-y-6">
              <div className="border-l-2 border-[var(--color-blue)] pl-5">
                <h3 className="font-serif text-xl text-foreground">Abogado</h3>
                <p className="font-sans text-sm text-[var(--color-blue)]">Universidad de Buenos Aires - Facultad de Derecho</p>
                <p className="font-sans text-sm text-muted-foreground mt-1">2018 - 2023</p>
                <p className="font-sans text-sm text-muted-foreground mt-3 leading-relaxed">
                  Especialización en derecho constitucional y derechos humanos, con foco en análisis institucional.
                </p>
              </div>

              <div className="border-l-2 border-[var(--color-blue)] pl-5">
                <h3 className="font-serif text-xl text-foreground">Especialización en Derecho Público</h3>
                <p className="font-sans text-sm text-[var(--color-blue)]">Universidad Austral</p>
                <p className="font-sans text-sm text-muted-foreground mt-1">2024 - Actualidad</p>
                <p className="font-sans text-sm text-muted-foreground mt-3 leading-relaxed">
                  Profundización en derecho administrativo, diseño regulatorio y políticas públicas.
                </p>
              </div>
            </div>
          </article>

          <article className="border border-border bg-card p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="text-[var(--color-red)]" />
              <h2 className="font-serif text-3xl text-foreground">Experiencia</h2>
            </div>
            <div className="space-y-6">
              <div className="border-l-2 border-[var(--color-red)] pl-5">
                <h3 className="font-serif text-xl text-foreground">Analista Jurídico</h3>
                <p className="font-sans text-sm text-[var(--color-red)]">Práctica privada y consultoría</p>
                <p className="font-sans text-sm text-muted-foreground mt-1">2023 - Actualidad</p>
                <p className="font-sans text-sm text-muted-foreground mt-3 leading-relaxed">
                  Análisis normativo, elaboración de informes y asesoramiento en conflictos de derecho público.
                </p>
              </div>

              <div className="border-l-2 border-[var(--color-red)] pl-5">
                <h3 className="font-serif text-xl text-foreground">Columnista y Analista</h3>
                <p className="font-sans text-sm text-[var(--color-red)]">Medios especializados</p>
                <p className="font-sans text-sm text-muted-foreground mt-1">2022 - Actualidad</p>
                <p className="font-sans text-sm text-muted-foreground mt-3 leading-relaxed">
                  Cobertura de temas jurídicos y políticos con enfoque en institucionalidad democrática.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="border border-border bg-card p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Award className="text-[var(--color-blue)]" />
              <h2 className="font-serif text-2xl md:text-3xl text-foreground">Reconocimientos</h2>
            </div>
            <ul className="space-y-3 font-sans text-sm text-muted-foreground leading-relaxed">
              <li>Premio al mejor ensayo jurídico - UBA (2023)</li>
              <li>Mención en investigaciones de derecho constitucional</li>
              <li>Participación en congresos académicos sobre derecho público</li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <Users className="text-[var(--color-red)]" />
              <h2 className="font-serif text-2xl md:text-3xl text-foreground">Áreas de Especialización</h2>
            </div>
            <ul className="space-y-3 font-sans text-sm text-muted-foreground leading-relaxed">
              <li>Derecho constitucional y derechos humanos</li>
              <li>Análisis político e institucional</li>
              <li>Economía política y regulación pública</li>
              <li>Investigación y divulgación jurídica</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-16 md:pt-20">
        <div className="flex items-center gap-4 mb-8 md:mb-10">
          <div className="w-2 h-2 bg-[var(--color-blue)]" />
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Otros proyectos</p>
        </div>

        <h2 className="font-serif text-[clamp(2rem,3.2vw,3.1rem)] leading-[1.1] tracking-[-0.02em] text-foreground max-w-3xl mb-8 md:mb-10">
          Proyectos en los que estoy trabajando actualmente
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {ongoingProjects.map((project) => (
            <article
              key={project.name}
              className="border border-border bg-card p-7 md:p-8 flex flex-col gap-5 hover:border-[var(--color-blue)]/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-2xl leading-tight text-foreground">{project.name}</h3>
                <span className="shrink-0 font-sans text-[10px] tracking-[0.18em] uppercase text-[var(--color-blue)] border border-[var(--color-blue)]/35 px-3 py-1">
                  {project.stage}
                </span>
              </div>

              <p className="font-sans text-[11px] tracking-[0.16em] uppercase text-muted-foreground">{project.timeline}</p>

              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{project.summary}</p>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                {project.focusAreas.map((focus) => (
                  <span
                    key={`${project.name}-${focus}`}
                    className="font-sans text-[10px] tracking-[0.14em] uppercase text-muted-foreground border border-border px-2.5 py-1"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-16">
        <div className="border border-border bg-card p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">¿Interesado en colaborar?</h2>
            <p className="font-sans text-sm md:text-base text-muted-foreground">
              Disponible para consultas jurídicas, análisis especializados y colaboraciones editoriales.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:contacto@lopezlabrin.com"
              className="inline-flex items-center justify-center bg-foreground text-background px-6 py-3 font-sans text-[11px] tracking-[0.18em] uppercase hover:bg-[var(--color-blue)] transition-colors"
            >
              Contactar por email
            </a>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center border border-border px-6 py-3 font-sans text-[11px] tracking-[0.18em] uppercase hover:border-[var(--color-blue)] hover:text-[var(--color-blue)] transition-colors"
            >
              Ir a contacto
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
