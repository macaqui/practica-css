# Práctica de CSS — Tarjeta personal

Página web de una **tarjeta personal** hecha con **React 18 (vía CDN) + Babel** y **CSS puro**.

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
