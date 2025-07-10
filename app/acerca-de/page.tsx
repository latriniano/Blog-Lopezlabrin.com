import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

/**
 * About Page (Acerca de)
 * Includes dedicated CV section as requested
 */
export default function AcercaDePage() {
  return (
    <div className="min-h-screen bg-brand-gray-50">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-black mb-4 uppercase">Acerca de</h1>
            <div className="w-24 h-2 bg-brand-orange mx-auto"></div>
          </div>

          {/* Introduction Section */}
          <Card className="border-4 border-black bg-white shadow-brand">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-black uppercase">López Labrin Lautaro</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              {/* LEYES al pedo. Wordmark Logo */}
              <div className="relative h-12 w-64 md:h-16 md:w-80 mb-8">
                <Image
                  src="/images/leyes-al-pedo-wordmark.png"
                  alt="LEYES al pedo."
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <p className="text-brand-gray-800 leading-relaxed mb-4">
                Bienvenido a <strong>Leyes al Pedo</strong>, un espacio dedicado al análisis profundo y reflexivo de los
                temas más relevantes en el ámbito legal, político y económico de nuestro tiempo.
              </p>
              <p className="text-brand-gray-800 leading-relaxed mb-4">
                Mi objetivo es proporcionar perspectivas bien fundamentadas y análisis críticos que contribuyan al
                debate público y fomenten el pensamiento independiente sobre los desafíos que enfrentan nuestras
                sociedades contemporáneas.
              </p>
              <p className="text-brand-gray-800 leading-relaxed">
                A través de este blog, busco crear un puente entre la academia y el público general, haciendo accesibles
                conceptos complejos y promoviendo una comprensión más profunda de los mecanismos que rigen nuestras
                instituciones democráticas y económicas.
              </p>
            </CardContent>
          </Card>

          {/* CV Section */}
          <Card className="border-4 border-black bg-white shadow-brand">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-black flex items-center uppercase">
                <span className="w-2 h-8 bg-brand-orange mr-3"></span>
                Curriculum Vitae
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-brand-gray-100 rounded-lg p-8 min-h-[600px] border-2 border-black">
                <div className="prose prose-lg max-w-none">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-black mb-2 uppercase">López Labrin Lautaro</h2>
                    <p className="text-lg text-brand-gray-700 font-bold uppercase">Analista Legal y Político</p>
                    <div className="w-16 h-2 bg-brand-orange mx-auto mt-4"></div>
                  </div>

                  {/* CV Content Area - Spacious and ready for detailed content */}
                  <div className="space-y-8 text-brand-gray-800">
                    <section>
                      <h3 className="text-xl font-black text-black mb-4 border-b-2 border-black pb-2 uppercase">
                        Formación Académica
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-md border-2 border-black shadow-brand-sm">
                          <p className="font-bold text-black">
                            [Aquí se puede incluir información detallada sobre formación académica]
                          </p>
                          <p className="text-sm text-brand-gray-700 mt-1">
                            Este espacio está diseñado para mostrar títulos, instituciones, fechas y detalles relevantes
                            de la formación académica.
                          </p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-xl font-black text-black mb-4 border-b-2 border-black pb-2 uppercase">
                        Experiencia Profesional
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-md border-2 border-black shadow-brand-sm">
                          <p className="font-bold text-black">
                            [Aquí se puede incluir información detallada sobre experiencia profesional]
                          </p>
                          <p className="text-sm text-brand-gray-700 mt-1">
                            Este espacio permite mostrar cargos, responsabilidades, logros y períodos de trabajo de
                            manera clara y organizada.
                          </p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-xl font-black text-black mb-4 border-b-2 border-black pb-2 uppercase">
                        Publicaciones y Investigación
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-md border-2 border-black shadow-brand-sm">
                          <p className="font-bold text-black">
                            [Aquí se pueden incluir publicaciones, artículos académicos, investigaciones]
                          </p>
                          <p className="text-sm text-brand-gray-700 mt-1">
                            Espacio dedicado para mostrar contribuciones académicas, publicaciones en revistas, libros,
                            capítulos y otros trabajos de investigación.
                          </p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-xl font-black text-black mb-4 border-b-2 border-black pb-2 uppercase">
                        Áreas de Especialización
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-md border-2 border-black shadow-brand-sm">
                          <p className="font-bold text-black">
                            [Aquí se pueden detallar las áreas de especialización y expertise]
                          </p>
                          <p className="text-sm text-brand-gray-700 mt-1">
                            Sección para destacar competencias específicas, áreas de conocimiento especializado y campos
                            de expertise profesional.
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="mt-8 p-4 bg-brand-orange/10 rounded-lg border-2 border-brand-orange">
                    <p className="text-sm text-brand-orange font-bold">
                      <strong>Nota:</strong> Esta sección está diseñada para ser fácilmente editable. El contenido del
                      CV puede ser reemplazado con información detallada, manteniendo la estructura y el diseño
                      profesional mostrado aquí.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-4 border-black bg-white shadow-brand">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-black uppercase">Contacto</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-brand-gray-800 leading-relaxed mb-4">
                Si deseas ponerte en contacto para colaboraciones, consultas académicas o comentarios sobre los
                artículos publicados, no dudes en escribir.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contacto"
                  className="inline-flex items-center px-4 py-2 bg-brand-orange text-white rounded-none hover:bg-black focus:bg-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 shadow-brand-sm transform hover:scale-105 focus:scale-105 font-black border-2 border-black"
                >
                  Formulario de Contacto
                </Link>
                <a
                  href="mailto:contacto@leyesalpedo.com"
                  className="inline-flex items-center px-4 py-2 bg-white border-2 border-black text-black rounded-none hover:bg-brand-gray-100 focus:bg-brand-gray-100 hover:border-brand-orange focus:border-brand-orange transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 shadow-brand-sm transform hover:scale-105 focus:scale-105 font-bold"
                >
                  Enviar Email
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
