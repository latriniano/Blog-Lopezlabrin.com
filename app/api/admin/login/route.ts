import { NextResponse } from "next/server"
import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/admin-auth"

export async function POST() {
  return NextResponse.json(
    { error: "El login de admin ahora usa Google OAuth. Iniciá sesión desde /admin/login." },
    { status: 405 },
  )
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })

  return response
}
