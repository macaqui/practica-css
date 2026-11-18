# Práctica de CSS — Tarjeta personal

Página web de una **tarjeta personal** hecha con **React 18 (vía CDN) + Babel** y **CSS puro**.

> 🌐 **En vivo:** <https://macaqui.github.io/practica-css/>

## Qué hace

Muestra una tarjeta centrada con una imagen, un nombre y una frase. Es un ejercicio para
practicar **estructura de componentes de React** y **estilos CSS** (flexbox, bordes redondeados
y sombras).

## Cómo verlo

Abre `index.html` en el navegador (no necesita servidor ni instalación):

```bash
xdg-open index.html
```

## Estructura

```
index.html   # página con React (CDN) + Babel + el componente de la tarjeta
style.css    # estilos de la tarjeta
img/1.jpg    # imagen de la tarjeta
vendor/      # copias locales de React y Babel (funciona sin internet)
```

## Créditos de imágenes

Las imágenes provienen de **Wikimedia Commons** y se usan bajo licencia
**CC BY-SA 2.0**:

- *Anime Expo 2010 — One Piece Cosplay*, por **Mark Ou**.

---

Proyecto desarrollado por **Samuel Hincapié**.

---

## Cómo abrirlo sin internet (desde la USB)

La página incluye React y Babel dentro de la carpeta `vendor/`, así que no
necesita conexión: basta con abrir `index.html` con doble clic.

> Antes esas librerías se cargaban desde `unpkg.com` (un CDN). Si no había
> internet, la página quedaba en blanco; con las copias locales ya no pasa.

---

## Backend

Incluye un backend sencillo con Node.js, Express, Prisma y SQLite que sirve la página
y guarda las frases.

Cómo instalarlo y arrancarlo:

```bash
cd server
npm install
npx prisma db push
npm start
```

Queda en <http://localhost:3003/> y la base de datos es el archivo `server/prisma/dev.db`.

Rutas de la API:

- `GET /api/frases` - lista todas las frases.
- `GET /api/frases/:id` - devuelve una frase.
- `POST /api/frases` - crea una frase.
- `PUT /api/frases/:id` - actualiza una frase.
- `DELETE /api/frases/:id` - borra una frase.

La página consume estas rutas con `fetch` para mostrar una frase en la tarjeta y para
agregar y borrar frases.
