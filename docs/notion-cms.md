# Notion CMS: estructura recomendada

Esta web usa Notion como CMS para artículos.

## Propiedades recomendadas en la base de datos

## Obligatorias
- `Title` (title)
- `Slug` (rich_text)
- `Status` (select): usar `Published` para publicar
- `Publish Date` (date)

## Recomendadas
- `Summary` (rich_text)
- `Category` (select)
- `Tags` (multi_select)
- `Read Time` (rich_text o number)
- `Author` (people o rich_text)
- `Featured` (checkbox)
- `Cover Image` (files o url)

## SEO opcional
- `SEO Title` (rich_text)
- `SEO Description` (rich_text)

## Reglas de publicación
- La home y categorías muestran solo artículos con `Status = Published`.
- La web revalida contenido cada 60 segundos.
- El detalle del artículo se busca por `Slug`.
- Si `Featured` está marcado, ese artículo aparece como destacado.

## Sugerencias operativas
- Mantener `Slug` único por artículo.
- Usar `Category` consistente (sin variantes de escritura).
- Completar `Summary` para mejores tarjetas en home/categorías.
- Cargar `Cover Image` para portada visual.
