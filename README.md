# Web personal — Miguel Morard

Web estática (HTML + CSS + un poco de JS), sin Jekyll ni dependencias: se sube tal cual a GitHub Pages.

## Publicarla en GitHub Pages

1. Crea un repositorio llamado `TUUSUARIO.github.io` (la web quedará en `https://TUUSUARIO.github.io/`).
   Si prefieres una ruta tipo `TUUSUARIO.github.io/about/`, llama al repo `about`.
2. Sube todos los archivos de esta carpeta a la rama `main` (incluido el `.nojekyll`).
3. En el repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`. Guarda.
4. En un par de minutos la web está en línea.

## Qué tocar (lo que está en amarillo en la web son huecos por rellenar)

- **Foto**: guarda tu foto como `images/profile.jpg` (cuadrada, ~400×400 px) y cambia `images/profile.svg` por `images/profile.jpg` en el bloque `<aside class="sidebar">` de cada página.
- **Email y GitHub**: busca `you@iata.csic.es` y `YOUR-USERNAME` en todos los `.html` y sustitúyelos.
- **Barra lateral** (nombre, frase, enlaces): es el mismo bloque `<aside class="sidebar">` en las 5 páginas; cámbialo en todas. Hay ejemplos comentados para ResearchGate, Bluesky, X y PubMed.
- **Texto del About**: `index.html`. La tira de fotos es opcional (borra el `<figure>` si no la quieres).
- **CV**: `cv.html` — fechas y puestos anteriores marcados con la clase `todo`. Cuando rellenes un hueco, quita `class="todo"` para que deje de verse amarillo.
- **Charlas**: `talks.html` — copia un `<li>` por charla.
- **Publicaciones**: `publications.html` se rellena solo desde tu ORCID (API pública) al abrir la página. Si falla, muestra la lista manual que hay en el HTML. Si prefieres solo la lista manual, borra el atributo `data-orcid` del `<div id="pub-list">`.
- **Colores y tipografía**: variables al principio de `assets/style.css`.
- **Añadir una página** (News, Teaching, Outreach…): copia `talks.html`, renómbrala y añade el `<li>` correspondiente al menú (`<nav class="site-nav">`) en todas las páginas.

Los iconos vienen de Font Awesome por CDN (necesitan conexión; en local sin internet no se ven, en GitHub Pages sí).

## Nota

La web que sirvió de modelo está hecha con la plantilla Jekyll **Academic Pages** (https://github.com/academicpages/academicpages.github.io, basada en Minimal Mistakes). Si algún día quieres un blog con posts en Markdown, esa plantilla es la alternativa: se hace *fork*, se editan los `.md` y GitHub la construye. Esta versión estática es más simple de mantener si solo quieres unas pocas páginas.
