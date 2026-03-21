import { Clock, Mail, MapPin, Send } from "lucide-react"

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-background pt-[112px] pb-20">
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pb-16 border-b border-border">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-2 bg-[var(--color-red)]" />
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Contacto profesional</p>
          </div>

          <h1 className="font-serif text-[clamp(2.3rem,5vw,4.8rem)] leading-[1.05] tracking-[-0.02em] text-foreground text-balance mb-6">
            Conversemos sobre tu consulta.
          </h1>

          <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Consultas jurídicas, propuestas de colaboración o invitaciones académicas. Respondemos en breve para
            coordinar el mejor canal de trabajo.
          </p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14">
          <aside className="space-y-6">
            <div className="border border-border bg-card p-6">
              <h2 className="font-serif text-2xl text-foreground mb-5">Información de Contacto</h2>

              <div className="space-y-5 font-sans text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-0.5 text-[var(--color-blue)]" />
                  <div>
                    <p className="text-foreground font-medium">Email</p>
                    <p>contacto@lopezlabrin.com</p>
                    <p className="text-xs mt-1">Respuesta estimada: 24-48 horas</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 text-[var(--color-red)]" />
                  <div>
                    <p className="text-foreground font-medium">Ubicación</p>
                    <p>Buenos Aires, Argentina</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-0.5 text-[var(--color-blue)]" />
                  <div>
                    <p className="text-foreground font-medium">Horario</p>
                    <p>Lunes a viernes, 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-border bg-card p-6">
              <h3 className="font-serif text-xl text-foreground mb-4">Áreas de Consulta</h3>
              <ul className="space-y-2 font-sans text-sm text-muted-foreground">
                <li>Derecho constitucional y público</li>
                <li>Análisis político e institucional</li>
                <li>Economía política y políticas públicas</li>
                <li>Colaboraciones académicas y editoriales</li>
              </ul>
            </div>
          </aside>

          <article className="border border-border bg-card p-6 md:p-8">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-7">Enviar mensaje</h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombre" className="block font-sans text-xs tracking-wide text-muted-foreground mb-2 uppercase">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    placeholder="Tu nombre"
                    className="w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/30"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-sans text-xs tracking-wide text-muted-foreground mb-2 uppercase">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className="w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/30"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="asunto" className="block font-sans text-xs tracking-wide text-muted-foreground mb-2 uppercase">
                  Asunto
                </label>
                <input
                  id="asunto"
                  name="asunto"
                  type="text"
                  required
                  placeholder="Tema principal de tu consulta"
                  className="w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/30"
                />
              </div>

              <div>
                <label htmlFor="categoria" className="block font-sans text-xs tracking-wide text-muted-foreground mb-2 uppercase">
                  Categoría
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  className="w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/30"
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="derecho">Consulta jurídica</option>
                  <option value="politica">Análisis político</option>
                  <option value="economia">Economía política</option>
                  <option value="colaboracion">Colaboración editorial</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" className="block font-sans text-xs tracking-wide text-muted-foreground mb-2 uppercase">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={6}
                  required
                  placeholder="Escribí tu mensaje"
                  className="w-full border border-border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/30 resize-y"
                />
              </div>

              <label className="flex items-start gap-3 font-sans text-xs text-muted-foreground">
                <input type="checkbox" required className="mt-0.5" />
                <span>Acepto la política de privacidad y el tratamiento de datos para recibir respuesta.</span>
              </label>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background py-3.5 px-6 font-sans text-[11px] tracking-[0.18em] uppercase hover:bg-[var(--color-blue)] transition-colors"
              >
                <Send className="w-4 h-4" />
                Enviar consulta
              </button>
            </form>
          </article>
        </div>
      </section>
    </div>
  )
}
