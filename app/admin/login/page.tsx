import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ADMIN_SESSION_COOKIE_NAME, isAdminSessionTokenValid } from "@/lib/admin-auth"
import { AdminLoginForm } from "@/components/admin/admin-login-form"

export default async function AdminLoginPage() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value

  if (isAdminSessionTokenValid(sessionToken)) {
    redirect("/admin/articles")
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Panel Editorial
          </p>
          <h1 className="font-serif text-3xl md:text-4xl leading-[1.08] tracking-[-0.02em]">
            Acceso administrativo
          </h1>
        </div>

        <AdminLoginForm />

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Volver al sitio
          </Link>
        </div>
      </div>
    </div>
  )
}
