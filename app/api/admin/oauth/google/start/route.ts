import { randomBytes } from "crypto"
import { NextRequest, NextResponse } from "next/server"
import {
  ADMIN_GOOGLE_STATE_COOKIE_NAME,
  isAdminAuthSecretConfigured,
  getGoogleOAuthClientConfig,
  getGoogleOAuthRedirectUri,
} from "@/lib/admin-auth"

function buildLoginErrorRedirect(request: NextRequest, errorCode: string) {
  const loginUrl = new URL("/admin/login", request.url)
  loginUrl.searchParams.set("error", errorCode)
  return loginUrl
}

export async function GET(request: NextRequest) {
  const oauthConfig = getGoogleOAuthClientConfig()

  if (!oauthConfig.ok || !isAdminAuthSecretConfigured()) {
    return NextResponse.redirect(buildLoginErrorRedirect(request, "missing_config"))
  }

  const state = randomBytes(24).toString("hex")
  const redirectUri = getGoogleOAuthRedirectUri(request)

  const authorizationUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth")
  authorizationUrl.searchParams.set("response_type", "code")
  authorizationUrl.searchParams.set("client_id", oauthConfig.clientId)
  authorizationUrl.searchParams.set("redirect_uri", redirectUri)
  authorizationUrl.searchParams.set("scope", "openid email profile")
  authorizationUrl.searchParams.set("state", state)
  authorizationUrl.searchParams.set("prompt", "select_account")

  const response = NextResponse.redirect(authorizationUrl)

  response.cookies.set({
    name: ADMIN_GOOGLE_STATE_COOKIE_NAME,
    value: state,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  })

  return response
}
