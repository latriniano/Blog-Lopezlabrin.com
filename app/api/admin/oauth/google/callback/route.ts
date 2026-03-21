import { NextRequest, NextResponse } from "next/server"
import {
  ADMIN_GOOGLE_STATE_COOKIE_NAME,
  ADMIN_SESSION_COOKIE_NAME,
  createAdminSessionToken,
  getAdminSessionMaxAgeSeconds,
  getGoogleOAuthClientConfig,
  getGoogleOAuthRedirectUri,
  isAdminAuthSecretConfigured,
  isAdminEmailAllowed,
} from "@/lib/admin-auth"

const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token"
const GOOGLE_TOKEN_INFO_ENDPOINT = "https://oauth2.googleapis.com/tokeninfo"
const VALID_ISSUERS = new Set(["accounts.google.com", "https://accounts.google.com"])

function withClearedOAuthState(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_GOOGLE_STATE_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })

  return response
}

function redirectToLoginWithError(request: NextRequest, errorCode: string) {
  const loginUrl = new URL("/admin/login", request.url)
  loginUrl.searchParams.set("error", errorCode)
  return withClearedOAuthState(NextResponse.redirect(loginUrl))
}

export async function GET(request: NextRequest) {
  const oauthConfig = getGoogleOAuthClientConfig()
  if (!oauthConfig.ok || !isAdminAuthSecretConfigured()) {
    return redirectToLoginWithError(request, "missing_config")
  }

  const url = new URL(request.url)
  const oauthError = url.searchParams.get("error")
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const stateCookie = request.cookies.get(ADMIN_GOOGLE_STATE_COOKIE_NAME)?.value

  if (oauthError) {
    return redirectToLoginWithError(request, "oauth_denied")
  }

  if (!code || !state || !stateCookie || state !== stateCookie) {
    return redirectToLoginWithError(request, "invalid_state")
  }

  const redirectUri = getGoogleOAuthRedirectUri(request)

  let idToken = ""

  try {
    const tokenResponse = await fetch(GOOGLE_TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: oauthConfig.clientId,
        client_secret: oauthConfig.clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      cache: "no-store",
    })

    if (!tokenResponse.ok) {
      return redirectToLoginWithError(request, "oauth_failed")
    }

    const tokenPayload = (await tokenResponse.json().catch(() => null)) as
      | { id_token?: string }
      | null

    idToken = typeof tokenPayload?.id_token === "string" ? tokenPayload.id_token : ""
  } catch {
    return redirectToLoginWithError(request, "oauth_failed")
  }

  if (!idToken) {
    return redirectToLoginWithError(request, "invalid_token")
  }

  let email = ""

  try {
    const tokenInfoUrl = new URL(GOOGLE_TOKEN_INFO_ENDPOINT)
    tokenInfoUrl.searchParams.set("id_token", idToken)

    const tokenInfoResponse = await fetch(tokenInfoUrl, {
      method: "GET",
      cache: "no-store",
    })

    if (!tokenInfoResponse.ok) {
      return redirectToLoginWithError(request, "invalid_token")
    }

    const tokenInfoPayload = (await tokenInfoResponse.json().catch(() => null)) as
      | {
          email?: string
          email_verified?: string | boolean
          aud?: string
          iss?: string
        }
      | null

    email = typeof tokenInfoPayload?.email === "string" ? tokenInfoPayload.email.trim().toLowerCase() : ""
    const emailVerified =
      tokenInfoPayload?.email_verified === true || tokenInfoPayload?.email_verified === "true"
    const audience = typeof tokenInfoPayload?.aud === "string" ? tokenInfoPayload.aud : ""
    const issuer = typeof tokenInfoPayload?.iss === "string" ? tokenInfoPayload.iss : ""

    if (!email || !emailVerified || audience !== oauthConfig.clientId || !VALID_ISSUERS.has(issuer)) {
      return redirectToLoginWithError(request, "invalid_token")
    }
  } catch {
    return redirectToLoginWithError(request, "invalid_token")
  }

  if (!isAdminEmailAllowed(email)) {
    return redirectToLoginWithError(request, "forbidden")
  }

  const sessionToken = createAdminSessionToken(email)
  if (!sessionToken) {
    return redirectToLoginWithError(request, "session_error")
  }

  const successUrl = new URL("/admin/articles", request.url)
  const response = withClearedOAuthState(NextResponse.redirect(successUrl))

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: sessionToken,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getAdminSessionMaxAgeSeconds(),
  })

  return response
}
