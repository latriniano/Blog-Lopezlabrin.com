"use client"

import type React from "react"

import { useState } from "react"
import { Save, User, Globe, Bell, Shield } from "lucide-react"

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "López Labrin",
    siteDescription: "Blog de análisis jurídico, político y económico",
    adminEmail: "admin@lopezlabrin.com",
    postsPerPage: 10,
    enableComments: true,
    enableNewsletter: true,
    maintenanceMode: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle settings save
    console.log("Saving settings:", settings)
  }

  const settingSections = [
    {
      title: "Configuración General",
      icon: Globe,
      fields: [
        {
          label: "Nombre del Sitio",
          key: "siteName",
          type: "text",
        },
        {
          label: "Descripción del Sitio",
          key: "siteDescription",
          type: "textarea",
        },
        {
          label: "Artículos por Página",
          key: "postsPerPage",
          type: "number",
        },
      ],
    },
    {
      title: "Configuración de Usuario",
      icon: User,
      fields: [
        {
          label: "Email del Administrador",
          key: "adminEmail",
          type: "email",
        },
      ],
    },
    {
      title: "Funcionalidades",
      icon: Bell,
      fields: [
        {
          label: "Habilitar Comentarios",
          key: "enableComments",
          type: "checkbox",
        },
        {
          label: "Habilitar Newsletter",
          key: "enableNewsletter",
          type: "checkbox",
        },
      ],
    },
    {
      title: "Seguridad",
      icon: Shield,
      fields: [
        {
          label: "Modo Mantenimiento",
          key: "maintenanceMode",
          type: "checkbox",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Configuración</h1>
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-4 py-2 bg-[#8a2be2] text-white rounded-lg hover:bg-[#7a1fa2] transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Cambios</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {settingSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <section.icon className="w-5 h-5 text-[#8a2be2]" />
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              </div>

              <div className="space-y-4">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex}>
                    <label className="block text-sm font-medium text-[#eaeaea] mb-2">{field.label}</label>

                    {field.type === "textarea" ? (
                      <textarea
                        value={settings[field.key as keyof typeof settings] as string}
                        onChange={(e) => setSettings((prev) => ({ ...prev, [field.key]: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-lg text-[#eaeaea] placeholder-[#d3d3d3] focus:outline-none focus:border-[#8a2be2] focus:ring-1 focus:ring-[#8a2be2] resize-none"
                      />
                    ) : field.type === "checkbox" ? (
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings[field.key as keyof typeof settings] as boolean}
                          onChange={(e) => setSettings((prev) => ({ ...prev, [field.key]: e.target.checked }))}
                          className="w-4 h-4 text-[#8a2be2] bg-[#121212] border-gray-700 rounded focus:ring-[#8a2be2] focus:ring-2"
                        />
                        <span className="ml-2 text-[#d3d3d3] text-sm">
                          {field.type === "checkbox" &&
                            field.key === "enableComments" &&
                            "Permitir comentarios en los artículos"}
                          {field.type === "checkbox" &&
                            field.key === "enableNewsletter" &&
                            "Mostrar formulario de suscripción"}
                          {field.type === "checkbox" && field.key === "maintenanceMode" && "Activar modo mantenimiento"}
                        </span>
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        value={settings[field.key as keyof typeof settings] as string | number}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            [field.key]: field.type === "number" ? Number.parseInt(e.target.value) : e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-lg text-[#eaeaea] placeholder-[#d3d3d3] focus:outline-none focus:border-[#8a2be2] focus:ring-1 focus:ring-[#8a2be2]"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </form>
      </div>
    </div>
  )
}
