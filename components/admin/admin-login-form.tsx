"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { LogIn } from "lucide-react"

function getErrorMessage(errorCode: string) {
  switch (errorCode) {
    case "missing_config":
      return "Falta configurar GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET o ADMIN_AUTH_SECRET/NEXTAUTH_SECRET."
    case "oauth_denied":
      return "Se canceló el acceso con Google."
    case "invalid_state":
      return "La sesión de autenticación expiró o es inválida. Intentá nuevamente."
    case "oauth_failed":
      return "Google no devolvió un token válido. Intentá nuevamente."
    case "invalid_token":
      return "No se pudo validar la identidad de Google."
    case "forbidden":
      return "Tu cuenta de Google no está autorizada para ingresar al admin."
    case "session_error":
      return "No se pudo crear la sesión de admin. Revisá la configuración del servidor."
    default:
      return ""
  }
}

export function AdminLoginForm() {
  const searchParams = useSearchParams()
  const errorCode = searchParams.get("error") || ""

  const errorMessage = useMemo(() => getErrorMessage(errorCode), [errorCode])

  return (
    <section className="border border-border bg-card p-8 md:p-10">
      <div className="mb-6">
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
          Login
        </p>
        <h2 className="font-serif text-3xl leading-[1.1] tracking-[-0.01em]">
          Ingresar con Google
        </h2>
      </div>

      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Solo las cuentas incluidas en <code>ADMIN_ALLOWED_EMAILS</code> pueden entrar al panel.
        </p>

        {errorMessage && (
          <p className="text-sm text-[var(--color-red)] border border-[var(--color-red)]/35 bg-[var(--color-red)]/[0.06] px-3 py-2">
            {errorMessage}
          </p>
        )}

        <Link
          href="/api/admin/oauth/google/start"
          className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 font-sans text-[11px] tracking-[0.18em] uppercase hover:bg-[var(--color-blue)] transition-colors"
        >
          <LogIn className="w-4 h-4" />
          Continuar con Google
        </Link>
      </div>
    </section>
  )
}
