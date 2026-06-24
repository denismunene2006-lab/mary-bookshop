# Mary Bookshop

> A modern, responsive demo website for a neighborhood bookshop and stationery store in Karurumo.

![Mary Bookshop Hero](https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80)

A polished, business-ready front-end built with vanilla HTML, CSS, and JavaScript — featuring a clean product showcase, WhatsApp-based ordering system, scroll-reveal animations, and a fully responsive layout.

## Live Demo

🌐 [**mary-bookshop**](https://denismunene2006-lab.github.io/mary-bookshop/)

## Features

- **Split Hero Layout** — A visually compelling hero section with a copy panel on one side and an image card, stat pills, and a featured note on the other.
- **Product Catalog** — Eight product cards with images, prices, and an *Order This* button that auto-fills the order form.
- **Dynamic View Switching** — Smoothly transitions between the main shop view and the order form without page reloads.
- **Automated Order Pre-filling** — Clicking *Order This* on any product immediately opens the order form with the product name pre-filled.
- **WhatsApp Integration** — Validates the order form and drafts a WhatsApp message ready to send to the shop.
- **Fixed Navigation Bar** — Stays at the top with a mobile-responsive hamburger menu and smooth scrolling to sections.
- **Scroll-Reveal Animations** — Elements fade and slide into view as the user scrolls, powered by the Intersection Observer API.
- **Responsive Design** — Fully adapts from large desktop screens down to mobile devices (768px breakpoint).
- **Accessibility** — Reduced motion support, `aria-expanded` toggle state, focus-visible outlines, and semantic landmarks.
- **Hero Entry Animations** — Staggered fade-in for the hero copy, actions, and stat highlights on load.

## Tech Stack

| Layer    | Technology             |
|----------|------------------------|
| Markup   | HTML5                  |
| Styling  | CSS3 (Flexbox & Grid)  |
| Logic    | JavaScript (Vanilla ES6+) |
| Icons    | Font Awesome 6         |
| Fonts    | Sora & Source Serif 4 (Google Fonts) |
| Hosting  | GitHub Pages           |

## Project Structure

```
mary-bookshop/
├── index.html          # Main HTML page with embedded CSS and JS
├── style.css           # Stylesheet (1,600+ lines of custom CSS)
├── README.md           # Project documentation
└── assets/
    └── images/         # Static image assets (not actively used — images served via CDN)
```

> **Note:** All product images and the hero background are served via external CDN URLs (Wikimedia Commons & Unsplash). No local image files are required to run the demo.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/denismunene2006-lab/mary-bookshop.git
   cd mary-bookshop
   ```

2. **Open the site:**
   Simply open `index.html` in any modern browser. No build tools or server required.

3. **Customize:**
   - Replace product images in `index.html` with local assets.
   - Update the WhatsApp number (`254710236087` in `index.html`).
   - Adjust colors and spacing via CSS custom properties in `style.css`.

## How It Works

### Navigation
The fixed navbar links (`data-nav` attribute) toggle between the **home view** and the **order view** using JavaScript view switching. The URL hash updates to `#order-now` or `#home`, and the browser's back/forward buttons are fully supported via the `popstate` event.

### Order Flow
1. User clicks *Order This* on a product card → the form opens with the item name pre-filled.
2. User fills in their name and optionally edits the order details.
3. Clicking *Send Order via WhatsApp* validates the form, encodes the message, and opens `wa.me` in a new tab.

### Animations
- **Hero:** Elements stagger in on load with a `heroRise` keyframe animation.
- **Scroll:** Elements marked with the `reveal-target` class are observed by an `IntersectionObserver`. When they enter the viewport (threshold ≥ 16%), they receive the `is-visible` class which triggers a CSS transition (fade + translate + blur).
- **Hover:** Product cards and info cards lift on hover with smooth transitions. Buttons have a sweeping shine effect.

## Demo Notes

- This is a **showcase/demo** project intended to demonstrate front-end development skills.
- Product images are from Wikimedia Commons and Unsplash — swap them for real shop photos before production use.
- The WhatsApp number is functional for demo inquiries but can be replaced with the actual shop number.

## Purpose

This project was built to practice and demonstrate:

- Modern CSS layouts using Flexbox and CSS Grid
- Responsive design without a framework
- JavaScript DOM manipulation and event delegation
- Intersection Observer API for performant scroll animations
- Business-oriented UI/UX patterns (product cards, order forms, service highlights)
- Accessibility and progressive enhancement

## Author

**Denis Munene**  
Aspiring Web Developer passionate about building real-world business websites.

- 🌐 [GitHub](https://github.com/denismunene2006-lab)
- 📧 Reach out via the [contact section](https://denismunene2006-lab.github.io/mary-bookshop/#contact) on the website


---

*Serving Karurumo with pride — Mary Bookshop*
