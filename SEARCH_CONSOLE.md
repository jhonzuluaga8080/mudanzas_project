# Verificar mudanzaalfred.com en Google Search Console (DNS)

Como el sitio está en GitHub Pages con dominio personalizado, la verificación por DNS es la opción recomendada.

## Pasos

1. Entra a [Google Search Console](https://search.google.com/search-console).
2. Agrega la propiedad **Dominio**: `mudanzaalfred.com` (no solo la URL).
3. Google te dará un registro TXT, por ejemplo:
   ```
   google-site-verification=XXXXXXXXXXXXXXXX
   ```
4. En el panel de tu proveedor de dominio (donde compraste mudanzaalfred.com), agrega un registro **TXT**:
   - **Host/Nombre:** `@` (o deja vacío según el proveedor)
   - **Valor:** el código completo que te dio Google
   - **TTL:** 3600 (o el valor por defecto)
5. Espera entre 5 minutos y 48 horas a que propague el DNS.
6. En Search Console, pulsa **Verificar**.
7. Cuando esté verificado, ve a **Sitemaps** y envía: `https://mudanzaalfred.com/sitemap.xml`

## GitHub Pages (referencia)

Si tu dominio apunta a GitHub Pages, los registros DNS suelen ser:

| Tipo | Host | Valor |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | tu-usuario.github.io |

El registro TXT de verificación de Google se agrega **además** de estos, sin eliminar los existentes.
