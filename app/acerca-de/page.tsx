import { MapPin, Mail, Award, BookOpen, Users, Briefcase } from "lucide-react"
import Image from "next/image"

export default function AcercaDePage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 post-title-glow">
                López Labrin
                <span className="block text-[#dc143c]">Lautaro</span>
              </h1>
              <p className="text-xl text-[#d3d3d3] mb-8 leading-relaxed">
                Abogado especializado en derecho constitucional, análisis político y económico. Comprometido con el
                análisis crítico y la divulgación jurídica.
              </p>
              <div className="flex items-center space-x-6 text-[#d3d3d3]">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Buenos Aires, Argentina</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>contacto@lopezlabrin.com</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-[#dc143c] to-[#8b0000] p-1">
                  <Image
                    src="/images/lopez-labrin-profile.png"
                    alt="López Labrin Lautaro"
                    width={320}
                    height={320}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CV Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-16 text-center post-title-glow">Curriculum Vitae</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education */}
            <div className="space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <BookOpen className="w-6 h-6 text-[#dc143c]" />
                <h3 className="text-2xl font-bold text-white">Formación Académica</h3>
              </div>

              <div className="space-y-6">
                <div className="bg-[#1c1c1c] p-6 rounded-lg border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-2">Abogado</h4>
                  <p className="text-[#dc143c] mb-2">Universidad de Buenos Aires - Facultad de Derecho</p>
                  <p className="text-[#d3d3d3] text-sm">2018 - 2023</p>
                  <p className="text-[#d3d3d3] mt-3">
                    Especialización en Derecho Constitucional y Derechos Humanos. Tesis sobre "Nuevos Paradigmas del
                    Constitucionalismo Contemporáneo".
                  </p>
                </div>

                <div className="bg-[#1c1c1c] p-6 rounded-lg border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-2">Especialización en Derecho Público</h4>
                  <p className="text-[#dc143c] mb-2">Universidad Austral</p>
                  <p className="text-[#d3d3d3] text-sm">2024 - En curso</p>
                  <p className="text-[#d3d3d3] mt-3">
                    Profundización en derecho administrativo, constitucional y análisis de políticas públicas.
                  </p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <Briefcase className="w-6 h-6 text-[#dc143c]" />
                <h3 className="text-2xl font-bold text-white">Experiencia Profesional</h3>
              </div>

              <div className="space-y-6">
                <div className="bg-[#1c1c1c] p-6 rounded-lg border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-2">Analista Jurídico</h4>
                  <p className="text-[#dc143c] mb-2">Estudio Jurídico Asociado</p>
                  <p className="text-[#d3d3d3] text-sm">2023 - Presente</p>
                  <p className="text-[#d3d3d3] mt-3">
                    Análisis de normativa constitucional, asesoramiento en derecho público y elaboración de informes
                    jurídicos especializados.
                  </p>
                </div>

                <div className="bg-[#1c1c1c] p-6 rounded-lg border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-2">Columnista y Analista</h4>
                  <p className="text-[#dc143c] mb-2">Medios Especializados</p>
                  <p className="text-[#d3d3d3] text-sm">2022 - Presente</p>
                  <p className="text-[#d3d3d3] mt-3">
                    Análisis político-jurídico en medios digitales y tradicionales. Especialización en temas
                    constitucionales y económicos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Achievements */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Award className="w-6 h-6 text-[#dc143c]" />
                <h3 className="text-2xl font-bold text-white">Reconocimientos</h3>
              </div>
              <ul className="space-y-3 text-[#d3d3d3]">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-[#dc143c] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Premio al Mejor Ensayo Jurídico - UBA (2023)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-[#dc143c] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Mención Honorífica en Derecho Constitucional</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-[#dc143c] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Participación en Congresos Internacionales de Derecho</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-6 h-6 text-[#dc143c]" />
                <h3 className="text-2xl font-bold text-white">Áreas de Especialización</h3>
              </div>
              <ul className="space-y-3 text-[#d3d3d3]">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-[#dc143c] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Derecho Constitucional y Derechos Humanos</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-[#dc143c] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Análisis Político y Económico</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-[#dc143c] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Derecho Público y Administrativo</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-[#dc143c] rounded-full mt-2 flex-shrink-0"></span>
                  <span>Políticas Públicas y Gobernanza</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-[#dc143c] to-[#8b0000]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Interesado en colaborar?</h2>
          <p className="text-xl text-white/90 mb-8">
            Estoy disponible para consultas jurídicas, análisis especializados y colaboraciones académicas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contacto@lopezlabrin.com"
              className="px-8 py-3 bg-white text-[#dc143c] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contactar por Email
            </a>
            <a
              href="/contacto"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#dc143c] transition-colors"
            >
              Formulario de Contacto
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
