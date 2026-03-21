# Plan de Implementación: Admin CMS sobre Notion

## 1. Objetivo

Construir un panel `/admin` para gestionar artículos de punta a punta (crear, editar, previsualizar, publicar, despublicar y archivar) manteniendo Notion como fuente de verdad del contenido.

El objetivo es que el flujo editorial sea cómodo desde el sitio, sin depender de editar manualmente toda la estructura dentro de Notion.

---

## 2. Estado Actual (base ya existente)

- El frontend público ya consume Notion desde [lib/notion.ts](/Volumes/Kingston/PROYECTOS%20WEB/LOPEZ%20LABRIN%20WEB/LOPEZLABRIN.COM/lib/notion.ts).
- Ya existe parser de campos editoriales (status, categoría, tags, featured, SEO, etc.).
- El render de contenido en detalle usa [components/NotionRenderer.tsx](/Volumes/Kingston/PROYECTOS%20WEB/LOPEZ%20LABRIN%20WEB/LOPEZLABRIN.COM/components/NotionRenderer.tsx).
- Existen componentes visuales de admin legacy (`components/article-editor.tsx`, `components/article-management.tsx`) pero no hay rutas `app/admin/*` funcionales conectadas.

---

## 3. Cómo debería funcionar el sistema final

## Flujo editorial esperado

1. Ingreso a `/admin` con autenticación.
2. Ver listado de artículos (filtros por estado, categoría, fecha, búsqueda).
3. Crear nuevo artículo como `Draft`.
4. Editar metadatos:
   - título, slug, resumen, categoría, tags, autor, portada, SEO, destacado, fecha publicación, tiempo lectura.
5. Editar contenido (bloques o editor estructurado) y guardar borrador.
6. Previsualizar en URL protegida antes de publicar.
7. Publicar (cambia `Status` a `Published`) y aparecer en home/categorías.
8. Despublicar o archivar cuando sea necesario.

## Principios de producto

- Draft no se ve públicamente.
- Publicado se refleja sin deploy manual (revalidación automática).
- Slug único y estable.
- Auditoría básica (fecha edición, autor editor).

---

## 4. Arquitectura propuesta

## Frontend (App Router)

- `app/admin/layout.tsx` (shell admin + guard auth).
- `app/admin/login/page.tsx` (si se usa auth propia).
- `app/admin/articles/page.tsx` (tabla/listado).
- `app/admin/articles/new/page.tsx` (crear).
- `app/admin/articles/[id]/page.tsx` (editar).
- `app/admin/articles/[id]/preview/page.tsx` (preview privada).

## Backend (Route Handlers)

- `app/api/admin/articles/route.ts`
  - `GET`: listado paginado.
  - `POST`: crear borrador.
- `app/api/admin/articles/[id]/route.ts`
  - `GET`: detalle.
  - `PATCH`: actualizar metadatos/contenido.
  - `DELETE`: soft delete (archivado).
- `app/api/admin/articles/[id]/publish/route.ts`
  - publicar/despublicar.
- `app/api/admin/categories/route.ts`
  - catálogo de categorías disponibles.

## Capa de integración Notion

- Extender `lib/notion.ts` con funciones de escritura:
  - `createPostInNotion`
  - `updatePostInNotion`
  - `setPostStatus`
  - `listPostsForAdmin`
- Separar claramente lectura pública vs operaciones admin.

---

## 5. Modelo de datos editorial (Notion DB)

## Mínimo obligatorio

- `Title` (title)
- `Slug` (rich_text)
- `Status` (select: Draft | Published | Archived)
- `Publish Date` (date)

## Recomendado para operación completa

- `Summary` (rich_text)
- `Category` (select)
- `Tags` (multi_select)
- `Author` (people o rich_text)
- `Read Time` (number o rich_text)
- `Featured` (checkbox)
- `Cover Image` (files o url)
- `SEO Title` (rich_text)
- `SEO Description` (rich_text)
- `Canonical URL` (url, opcional)
- `OG Image` (files o url, opcional)

## Convenciones

- `Slug` único.
- Categorías normalizadas (evitar variantes ortográficas).
- `Status = Published` es la única condición de visibilidad pública.

---

## 6. Autenticación y seguridad

## Implementación actual

- Google OAuth + allowlist de emails administradores (`ADMIN_ALLOWED_EMAILS`).
- Solo usuarios en allowlist pueden crear sesión de admin.
- Sesión server-side con cookie httpOnly.

## Reglas

- Proteger todas las rutas `/admin/*`.
- Proteger todas las rutas `/api/admin/*`.
- Validar permisos de rol (admin/editor).
- Rate limit en endpoints sensibles.
- Sanitizar toda entrada de texto.
- No exponer `NOTION_API_KEY` en cliente nunca.

---

## 7. Configuración necesaria para que funcione

## En Notion

1. Crear o validar base de datos de artículos con campos definidos.
2. Crear Integration en Notion y copiar token.
3. Compartir la base de datos con la Integration.
4. Verificar permisos de lectura/escritura de la Integration.

## En entorno (`.env.local` y producción)

```bash
# Notion
NOTION_API_KEY=secret_xxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Sitio
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com

# Auth admin (si se usa NextAuth)
NEXTAUTH_URL=https://tu-dominio.com
NEXTAUTH_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx

# Allowlist admin (si aplica)
ADMIN_ALLOWED_EMAILS=tuemail@dominio.com,otro@dominio.com

# Google OAuth
GOOGLE_CLIENT_ID=xxxxxxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxxxxxxxxxxxxx
# opcional
GOOGLE_OAUTH_REDIRECT_URI=https://tu-dominio.com/api/admin/oauth/google/callback
```

## Infraestructura

- Vercel project con variables de entorno configuradas.
- Revalidación habilitada (ya está en la capa de lectura).
- Logs de funciones server para troubleshooting.

---

## 8. Fases de implementación

## Fase 1: Base admin

- Crear rutas `/admin` + guard de autenticación.
- Crear layout y navegación del panel.
- Endpoint `GET /api/admin/articles`.

## Fase 2: CRUD de artículos

- Alta de borrador (`POST`).
- Edición (`PATCH`) de metadatos y contenido.
- Eliminación lógica/archivo.
- Validaciones server-side (slug, campos requeridos).

## Fase 3: Publicación y preview

- Previsualización privada antes de publicar.
- Toggle publish/unpublish.
- Manejo de featured.

## Fase 4: UX editorial avanzada

- Autosave.
- Historial básico de cambios.
- Duplicar artículo.
- Filtros avanzados y búsqueda full text.

## Fase 5: Hardening

- Auditoría de seguridad.
- Métricas/logs.
- Manejo sólido de errores y fallback UI.

---

## 9. Criterios de aceptación

- Un editor puede crear un artículo completo sin tocar Notion manualmente.
- El artículo se publica al cambiar estado y aparece en home/detalle/categorías.
- Slug duplicado bloqueado con error claro.
- Draft no visible públicamente.
- Auth obligatoria en todo `/admin`.
- Operación estable en desarrollo y producción.

---

## 10. Riesgos y decisiones abiertas

- Definir si el editor será:
  - HTML libre (más rápido), o
  - bloques estructurados tipo Notion (más control).
- Definir estrategia final de imágenes:
  - Notion files,
  - URLs externas,
  - o storage propio (S3/Cloudinary).
- Definir si habrá roles (`admin`, `editor`, `viewer`) desde el inicio.

---

## 11. Siguiente paso inmediato

Implementar Fase 1 + Fase 2 (MVP funcional): auth, listado y edición real en Notion desde `/admin/articles`.
