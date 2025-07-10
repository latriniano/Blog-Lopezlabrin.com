"use client"

import type React from "react"

import { useState } from "react"
import { Lock, User } from "lucide-react"

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", credentials)
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Panel de Administración</h1>
            <p className="text-[#d3d3d3]">López Labrin Blog</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#eaeaea] mb-2">Usuario</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#d3d3d3] w-4 h-4" />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-gray-700 rounded-lg text-[#eaeaea] placeholder-[#d3d3d3] focus:outline-none focus:border-[#8a2be2] focus:ring-1 focus:ring-[#8a2be2]"
                  placeholder="Ingresa tu usuario"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#eaeaea] mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#d3d3d3] w-4 h-4" />
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-gray-700 rounded-lg text-[#eaeaea] placeholder-[#d3d3d3] focus:outline-none focus:border-[#8a2be2] focus:ring-1 focus:ring-[#8a2be2]"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#8a2be2] text-white rounded-lg hover:bg-[#7a1fa2] transition-colors font-medium"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
