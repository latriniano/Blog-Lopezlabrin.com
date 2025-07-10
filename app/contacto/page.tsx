import { Mail, MapPin, Clock, Send } from "lucide-react"

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 post-title-glow">Contacto</h1>
          <p className="text-xl text-[#d3d3d3] max-w-3xl mx-auto leading-relaxed">
            ¿Tienes alguna consulta jurídica, propuesta de colaboración o simplemente quieres intercambiar ideas? Estoy
            aquí para escucharte.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Información de Contacto</h2>
              <p className="text-[#d3d3d3] leading-relaxed mb-8">
                Estoy disponible para consultas profesionales, colaboraciones académicas y proyectos de análisis
                jurídico. No dudes en contactarme a través de cualquiera de estos medios.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#dc143c]/20 rounded-lg border border-[#dc143c]/30">
                  <Mail className="w-6 h-6 text-[#dc143c]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                  <p className="text-[#d3d3d3]">contacto@lopezlabrin.com</p>
                  <p className="text-sm text-[#d3d3d3] mt-1">Respuesta en 24-48 horas</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#1e90ff]/20 rounded-lg border border-[#1e90ff]/30">
                  <MapPin className="w-6 h-6 text-[#1e90ff]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Ubicación</h3>
                  <p className="text-[#d3d3d3]">Buenos Aires, Argentina</p>
                  <p className="text-sm text-[#d3d3d3] mt-1">Consultas presenciales disponibles</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#6a1b9a]/20 rounded-lg border border-[#6a1b9a]/30">
                  <Clock className="w-6 h-6 text-[#6a1b9a]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Horarios de Atención</h3>
                  <p className="text-[#d3d3d3]">Lunes a Viernes: 9:00 - 18:00</p>
                  <p className="text-sm text-[#d3d3d3] mt-1">Consultas urgentes: Fines de semana</p>
                </div>
              </div>
            </div>

            {/* Areas of Expertise */}
            <div className="bg-[#1c1c1c] p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Áreas de Consulta</h3>
              <ul className="space-y-2 text-[#d3d3d3]">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#dc143c] rounded-full"></span>
                  <span>Derecho Constitucional y Derechos Humanos</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#1e90ff] rounded-full"></span>
                  <span>Análisis Político y Institucional</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#6a1b9a] rounded-full"></span>
                  <span>Economía Política y Políticas Públicas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#dc143c] rounded-full"></span>
                  <span>Colaboraciones Académicas y Editoriales</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#1c1c1c] p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Envía tu Consulta</h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-white mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/20 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#dc143c] transition-colors"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/20 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#dc143c] transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="asunto" className="block text-sm font-medium text-white mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  required
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/20 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#dc143c] transition-colors"
                  placeholder="Breve descripción del tema"
                />
              </div>

              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-white mb-2">
                  Categoría de Consulta
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#dc143c] transition-colors"
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="derecho">Consulta Jurídica</option>
                  <option value="politica">Análisis Político</option>
                  <option value="economia">Economía Política</option>
                  <option value="colaboracion">Colaboración</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-white mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/20 rounded-lg text-white placeholder-[#d3d3d3] focus:outline-none focus:border-[#dc143c] transition-colors resize-vertical"
                  placeholder="Describe tu consulta o propuesta en detalle..."
                ></textarea>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacidad"
                  name="privacidad"
                  required
                  className="mt-1 w-4 h-4 text-[#dc143c] bg-[#2a2a2a] border-white/20 rounded focus:ring-[#dc143c] focus:ring-2"
                />
                <label htmlFor="privacidad" className="text-sm text-[#d3d3d3]">
                  Acepto la{" "}
                  <a href="/privacidad" className="text-[#dc143c] hover:underline">
                    política de privacidad
                  </a>{" "}
                  y el tratamiento de mis datos personales. *
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#dc143c] to-[#8b0000] text-white font-semibold py-4 px-6 rounded-lg hover:from-[#b91c3c] hover:to-[#7f1d1d] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Enviar Consulta</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Preguntas Frecuentes</h2>

          <div className="space-y-6">
            <div className="bg-[#1c1c1c] p-6 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-3">¿Cuánto tiempo toma recibir una respuesta?</h3>
              <p className="text-[#d3d3d3]">
                Generalmente respondo dentro de 24-48 horas. Para consultas urgentes, puedo atender fines de semana.
              </p>
            </div>

            <div className="bg-[#1c1c1c] p-6 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-3">¿Realizas consultas gratuitas?</h3>
              <p className="text-[#d3d3d3]">
                Ofrezco una primera consulta orientativa sin costo. Para análisis detallados o asesoramiento continuo,
                establecemos honorarios según la complejidad del caso.
              </p>
            </div>

            <div className="bg-[#1c1c1c] p-6 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-3">¿Trabajas con medios de comunicación?</h3>
              <p className="text-[#d3d3d3]">
                Sí, colaboro regularmente con medios especializados proporcionando análisis jurídico y político.
                Contacta para propuestas editoriales.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
