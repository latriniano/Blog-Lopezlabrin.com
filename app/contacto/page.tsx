import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"

/**
 * Contact Page (/contacto)
 * Includes contact form and information
 */
export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-brand-gray-50">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-black mb-4 uppercase">Contacto</h1>
            <div className="w-24 h-2 bg-brand-orange mx-auto"></div>
            <p className="text-lg text-brand-gray-800 mt-4 max-w-2xl mx-auto">
              ¿Tienes alguna pregunta, sugerencia o propuesta de colaboración? No dudes en ponerte en contacto.
            </p>
          </div>

          {/* LEYES al pedo. Wordmark Logo */}
          <div className="flex justify-center mb-12">
            <div className="relative h-12 w-64 md:h-16 md:w-80">
              <Image
                src="/images/leyes-al-pedo-wordmark.png"
                alt="LEYES al pedo."
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-4 border-black bg-white shadow-brand">
                <CardHeader>
                  <CardTitle className="text-2xl font-black text-black uppercase">Envíanos un mensaje</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-bold text-black">
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-brand-orange focus:border-brand-orange bg-white transition-all duration-200 shadow-brand-sm font-medium"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-bold text-black">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-brand-orange focus:border-brand-orange bg-white transition-all duration-200 shadow-brand-sm font-medium"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-bold text-black">
                        Asunto
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-brand-orange focus:border-brand-orange bg-white transition-all duration-200 shadow-brand-sm font-medium"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-bold text-black">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-brand-orange focus:border-brand-orange bg-white transition-all duration-200 shadow-brand-sm font-medium"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-brand-orange text-white py-3 px-6 hover:bg-black focus:bg-black transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-brand-orange focus:ring-offset-2 shadow-brand-sm transform hover:scale-105 focus:scale-105 font-black text-lg border-2 border-black uppercase"
                    >
                      Enviar Mensaje
                    </button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <Card className="border-4 border-black bg-white shadow-brand">
                <CardHeader>
                  <CardTitle className="text-2xl font-black text-black uppercase">Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-brand-orange text-white p-3 border-2 border-black shadow-brand-sm">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-bold text-brand-gray-500 uppercase">Email</h3>
                      <a
                        href="mailto:contacto@leyesalpedo.com"
                        className="text-black hover:text-brand-orange focus:text-brand-orange transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 font-bold"
                      >
                        contacto@leyesalpedo.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-brand-orange text-white p-3 border-2 border-black shadow-brand-sm">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-bold text-brand-gray-500 uppercase">Teléfono</h3>
                      <a
                        href="tel:+541112345678"
                        className="text-black hover:text-brand-orange focus:text-brand-orange transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 font-bold"
                      >
                        +54 11 1234-5678
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-brand-orange text-white p-3 border-2 border-black shadow-brand-sm">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-bold text-brand-gray-500 uppercase">Ubicación</h3>
                      <p className="text-black font-bold">Buenos Aires, Argentina</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t-2 border-brand-gray-200">
                    <h3 className="text-lg font-black text-black mb-4 uppercase">Horario de Atención</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="font-bold">Lunes - Viernes:</span>
                        <span>9:00 - 18:00</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-bold">Sábado:</span>
                        <span>10:00 - 14:00</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-bold">Domingo:</span>
                        <span>Cerrado</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
