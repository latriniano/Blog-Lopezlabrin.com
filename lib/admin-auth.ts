import { createHmac, timingSafeEqual } from "crypto"

export const ADMIN_SESSION_COOKIE_NAME = "ll_admin_session"
export const ADMIN_GOOGLE_STATE_COOKIE_NAME = "ll_admin_google_state"

const DEFAULT_SESSION_HOURS = 12
const DEFAULT_ADMIN_EMAIL = "lautarolopezlabrin@gmail.com"

function getAuthSecret() {
  return process.env.ADMIN_AUTH_SECRET || process.env.NEXTAUTH_SECRET || ""
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase()
}

function signPayload(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("hex")
}

function safeCompare(a: string, b: string) {
  const aBuffer = Buffer.from(a)
  const bBuffer = Buffer.from(b)

  if (aBuffer.length !== bBuffer.length) {
    return false
  }

  return timingSafeEqual(aBuffer, bBuffer)
}

export function getAdminSessionMaxAgeSeconds() {
  const configuredHours = Number.parseInt(process.env.ADMIN_SESSION_HOURS || "", 10)
  const sessionHours =
    Number.isFinite(configuredHours) && configuredHours > 0 ? configuredHours : DEFAULT_SESSION_HOURS

  return sessionHours * 60 * 60
}

export function createAdminSessionToken(email: string, now = Date.now()) {
  const secret = getAuthSecret()
  const normalizedEmail = normalizeEmail(email || "")

  if (!secret || !normalizedEmail) return null
  if (!isAdminEmailAllowed(normalizedEmail)) return null

  const expiresAt = now + getAdminSessionMaxAgeSeconds() * 1000
  const payload = `admin:${normalizedEmail}:${expiresAt}`
  const signature = signPayload(payload, secret)
  const emailToken = Buffer.from(normalizedEmail, "utf8").toString("base64url")

  return `${emailToken}.${expiresAt}.${signature}`
}

export function getAdminEmailFromSessionToken(token?: string | null) {
  if (!token) return null

  const [emailToken] = token.split(".")
  if (!emailToken) return null

  try {
    const decodedEmail = Buffer.from(emailToken, "base64url").toString("utf8")
    const normalizedEmail = normalizeEmail(decodedEmail)
    return normalizedEmail || null
  } catch {
    return null
  }
}

export function isAdminSessionTokenValid(token?: string | null) {
  if (!token) return false

  const secret = getAuthSecret()
  if (!secret) return false

  const [emailToken, expiresAtRaw, signature] = token.split(".")
  const expiresAt = Number.parseInt(expiresAtRaw || "", 10)
  const email = getAdminEmailFromSessionToken(token)

  if (!emailToken || !email || !expiresAt || !signature) return false
  if (expiresAt <= Date.now()) return false
  if (!isAdminEmailAllowed(email)) return false

  const expectedSignature = signPayload(`admin:${email}:${expiresAt}`, secret)
  return safeCompare(signature, expectedSignature)
}

export function getAllowedAdminEmails() {
  const configured = process.env.ADMIN_ALLOWED_EMAILS || DEFAULT_ADMIN_EMAIL

  return configured
    .split(",")
    .map((item) => normalizeEmail(item))
    .filter(Boolean)
}

export function isAdminEmailAllowed(email?: string | null) {
  if (!email) return false

  const normalizedEmail = normalizeEmail(email)
  if (!normalizedEmail) return false

  return getAllowedAdminEmails().includes(normalizedEmail)
}

export function getGoogleOAuthClientConfig() {
  const clientId = process.env.GOOGLE_CLIENT_ID || ""
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || ""

  if (!clientId || !clientSecret) {
    return {
      ok: false,
      reason: "GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET deben estar configurados.",
    } as const
  }

  return {
    ok: true,
    clientId,
    clientSecret,
  } as const
}

export function getGoogleOAuthRedirectUri(request: Request) {
  const configured = process.env.GOOGLE_OAUTH_REDIRECT_URI || process.env.GOOGLE_REDIRECT_URI || ""
  if (configured) {
    return configured
  }

  return `${new URL(request.url).origin}/api/admin/oauth/google/callback`
}

export function isAdminAuthSecretConfigured() {
  return Boolean(getAuthSecret())
}
