# Auth Admin con Google (Allowlist por Email)

## Objetivo

Permitir acceso al panel `/admin` usando Google OAuth, autorizando solo cuentas incluidas en `ADMIN_ALLOWED_EMAILS` (por defecto: `lautarolopezlabrin@gmail.com`).

---

## 1. Configurar OAuth en Google Cloud

1. Entrar a Google Cloud Console y crear (o usar) un proyecto.
2. Ir a `APIs & Services` -> `OAuth consent screen`.
3. Configurar la pantalla de consentimiento (tipo External).
4. Ir a `APIs & Services` -> `Credentials` -> `Create Credentials` -> `OAuth client ID`.
5. Tipo de aplicación: `Web application`.
6. En `Authorized redirect URIs`, agregar:
   - Desarrollo local:
     - `http://localhost:3000/api/admin/oauth/google/callback`
   - Producción (ejemplo):
     - `https://tudominio.com/api/admin/oauth/google/callback`

Google debe tener exactamente la misma URI que usa el backend.

---

## 2. Variables de entorno requeridas

Agregar en `.env.local` (y en producción):

```bash
# Google OAuth
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret

# Opcional (si querés fijar explícitamente la callback)
GOOGLE_OAUTH_REDIRECT_URI=http://localhost:3000/api/admin/oauth/google/callback

# Sesión admin (obligatorio)
ADMIN_AUTH_SECRET=una_clave_larga_y_segura
# o NEXTAUTH_SECRET=una_clave_larga_y_segura

# Allowlist de emails admin (coma-separado)
ADMIN_ALLOWED_EMAILS=lautarolopezlabrin@gmail.com

# Opcional: duración de sesión admin en horas
ADMIN_SESSION_HOURS=12
```

Notas:

- Si no definís `GOOGLE_OAUTH_REDIRECT_URI`, el sistema la construye automáticamente con el host actual.
- `ADMIN_ALLOWED_EMAILS` acepta múltiples correos separados por coma.

---

## 3. Flujo implementado

1. Usuario entra a `/admin/login`.
2. Clic en `Continuar con Google`.
3. Redirección a Google OAuth.
4. Callback en `/api/admin/oauth/google/callback`.
5. Se valida:
   - `state` anti-CSRF.
   - token de Google.
   - `email_verified`.
   - `aud` y `iss` del token.
   - email dentro de `ADMIN_ALLOWED_EMAILS`.
6. Si pasa validaciones, se crea cookie de sesión admin (`ll_admin_session`).
7. Redirección a `/admin/articles`.

---

## 4. Logout

El botón `Cerrar sesión` limpia la cookie de sesión admin.

---

## 5. Errores comunes

- `missing_config`:
  faltan `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` o `ADMIN_AUTH_SECRET/NEXTAUTH_SECRET`.

- `invalid_state`:
  sesión OAuth expirada o callback abierta fuera del flujo normal.

- `oauth_failed`:
  Google rechazó el intercambio de `code` por token (revisar redirect URI y credenciales).

- `invalid_token`:
  token inválido, `aud` incorrecto o issuer no válido.

- `forbidden`:
  la cuenta Google autenticada no está en `ADMIN_ALLOWED_EMAILS`.

---

## 6. Checklist rápido de producción

1. Configurar Redirect URI de producción en Google Cloud.
2. Cargar variables de entorno en Vercel/hosting.
3. Confirmar que `ADMIN_ALLOWED_EMAILS` contiene el correo correcto.
4. Probar login con cuenta autorizada.
5. Probar login con cuenta no autorizada (debe bloquear).
