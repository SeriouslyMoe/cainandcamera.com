# Cairn & Camera Studio Site

Welcome to the development repository for **Cairn & Camera**, a fictional boutique photography studio website. This project includes both static and dynamic functionality for promoting studio services, showcasing galleries, and offering interactive image tools.

---

## 🧩 Features

### 📸 Frontend Pages

* **Home / About / Services / Gallery / News / Access / Contact Us**

  * Styled with Tailwind CSS
  * Responsive layout with desktop-specific footer and adaptive header
  * News blog entries organized by date (`/news/YYYYMMDD`)

### 🗞 News System

* Blog posts are saved as `public/news/YYYYMMDD.html`
* Served dynamically via Node.js/Express route:

  ```js
  app.get('/blog/:date', (req, res) => { ... });
  ```
* Uses server-side validation to prevent invalid file access

### 🖼 Image Tools

#### Retouch Tool (`/retouch.html`)

* Upload an image
* Apply preset CSS filters (sepia, grayscale, etc.)
* Save the filtered image using a `<canvas>` export

#### Crop Tool (`/crop.html`)

* Upload and crop an image using manual coordinates (UI optional)
* Save cropped output

### 📷 Dynamic Gallery (`/gallery.html`)

* Loads images dynamically from `/codes/:folder` or `/gallery` via:

  ```js
  app.get('/api/gallery-images/:folder')
  ```
* Uses column layout that auto-adjusts based on screen width
* Opens images in a lightbox with prev/next navigation

### 🧭 Layout & UX Enhancements

* Layout uses `min-h-screen flex flex-col` to ensure footer is placed correctly
* `<main>` uses `flex-grow` so footer naturally pushes below content
* Footer:

  * Only visible on desktop (`md:block`)
  * Includes site navigation and tool links (`/crop.html`, `/retouch.html`)
  * Divided into columns with hover transitions
* Live Chat widget:

  * Fixed in the bottom right (`z-50`) so it stays above the footer/content
  * Coexists correctly with flexible footer positioning

---

## 🛠 Stack

* HTML5, Tailwind CSS
* Node.js + Express (backend API and dynamic routing)
* Static assets in `/public`
* Templating optional (currently using static `.html` for most rendering)

---

## 🔧 Development Tips

* To run:

  ```bash
  npm install
  node app.js
  ```
* News posts go in `public/blog/YYYYMMDD.html`
* Image folders for dynamic galleries go in `public/gallery/` and `public/orders/[folder]`
* Add Tailwind styles via `/css/output.css`

---

## 📁 Structure

```
public/
├── images/
│   ├── media.jpg
│   └── gallery/
│       └── default images...
├── orders/
│   └── AAAAA1ZZZZZ/
│       └── order-photo-a.jpg...
├── news/
│   └── 20240525.html
├── css/
│   └── output.css
├── index.html
```

---

## 📌 COULD IMPROVE

* [ ] Add dynamic blog templates
* [ ] Implement search/filter for galleries
* [ ] Integrate cloud image storage (optional)
* [ ] Add multi-language toggle

---

## 📝 License

n/a
