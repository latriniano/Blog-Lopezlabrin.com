import type { ReactNode } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ADMIN_SESSION_COOKIE_NAME, isAdminSessionTokenValid } from "@/lib/admin-auth"
import { AdminShell } from "@/components/admin/admin-shell"

interface AdminProtectedLayoutProps {
  children: ReactNode
}

export default async function AdminProtectedLayout({ children }: AdminProtectedLayoutProps) {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value

  if (!isAdminSessionTokenValid(sessionToken)) {
    redirect("/admin/login")
  }

  return <AdminShell>{children}</AdminShell>
}

