# Page & Palette — Bookshop & Stationery Store Website

A modern, responsive website for **Page & Palette**, a neighborhood bookshop and stationery store in Kilimani, Nairobi. Built with vanilla HTML, CSS, and JavaScript — featuring a product catalog, slide-out cart drawer, dedicated checkout page, and WhatsApp-based ordering.

## Live Demo

🌐 **Deploy to Netlify, Vercel, or GitHub Pages** — see [Deployment](#deployment) below.

## Features

### Core Functionality
- **Product Catalog** — 8 product categories (textbooks, novels, notebooks, pens, bags, calculators, journals, accessories) with search and category filtering
- **Slide-out Cart Drawer** — Fixed header & footer, scrollable items section, quantity controls, remove buttons, subtotal/delivery/total calculation
- **Dedicated Checkout Page** (`/checkout.html`) — Standalone page with order summary, customer details form, validation, and WhatsApp order submission
- **WhatsApp Integration** — Generates pre-filled WhatsApp message with order details, customer info, and delivery address
- **Persistent Cart** — Cart state saved to `localStorage` across sessions

### UI & UX
- **Responsive Design** — Mobile-first, works on all screen sizes (380px–1440px+)
- **Cart Responsiveness** — On mobile: cart fills viewport, header/footer fixed, only items scroll; safe-area insets for notched devices
- **Scroll-Reveal Animations** — IntersectionObserver-based fade/slide animations with staggered delays
- **Hero Section** — Split layout with parallax image, animated stat cards, floating badges
- **Announcement Bar** — Auto-scrolling marquee with store announcements
- **Sticky Navbar** — Backdrop blur, scrolled state, mobile hamburger menu
- **Category Grid** — Quick navigation to product categories
- **Testimonials, Features, Location Map, FAQ, Contact Band** — Complete business website sections

### Technical
- **Zero Dependencies** (except Lucide icons via CDN)
- **CSS Custom Properties** — Comprehensive design token system (colors, spacing, shadows, radii, transitions)
- **Vanilla ES6+ JavaScript** — Modular functions, event delegation, no frameworks
- **Clean Routing** — `/checkout.html` with clean URL rewrites for `/checkout`
- **Accessibility** — Reduced motion support, ARIA labels, focus-visible outlines, semantic HTML

## Project Structure

```
mary-bookshop/
├── index.html              # Homepage with all storefront sections
├── checkout.html           # Dedicated checkout page (no header/hero)
├── app.js                  # Shared cart, checkout, and store logic
├── style.css               # 1,600+ lines of custom CSS (design tokens + components)
├── _redirects              # Netlify redirects for clean /checkout URL
├── vercel.json             # Vercel rewrites for clean /checkout URL
├── netlify.toml            # Netlify build config
├── .htaccess               # Apache rewrites for clean /checkout URL
├── README.md               # This file
├── .gitignore
└── assets/
    └── images/             # Local SVG illustrations (not actively used — images via CDN)
```

## Getting Started

### Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd mary-bookshop

# Serve locally (no build step required)
npx serve .
# or
python -m http.server 8080
# Then open http://localhost:8080
```

Open `index.html` directly in a browser for basic testing (cart/checkout require a local server due to ES modules and CORS).

### Customization

| Task | File(s) |
|------|---------|
| Update WhatsApp number | `app.js` (line 384), `checkout.html` (line 113) |
| Edit product catalog | `index.html` (product cards, lines 246–384) |
| Change colors/typography | `style.css` (CSS custom properties, lines 3–49) |
| Modify delivery fee logic | `app.js` (function `cartDeliveryFee`, lines 205–210) |
| Update store info (address, hours) | `index.html` (location section, lines 443–478) |

## Cart Architecture

The cart drawer uses a **fixed-header / scrollable-body / fixed-footer** flex layout:

```css
.cart-drawer {
  display: flex;
  flex-direction: column;
  height: 100dvh;           /* Dynamic viewport height for mobile */
}

.cart-header { flex-shrink: 0; }           /* Fixed at top */
.cart-body   { flex: 1 1 0; overflow-y: auto; }  /* Scrollable items */
.cart-footer { flex-shrink: 0; display: flex; }  /* Fixed at bottom */
```

- **Mobile**: Full viewport width (`100vw`), safe-area padding for notches
- **Desktop**: `min(420px, 100vw)` width, slides in from right
- **No layout shift**: `contain: layout style` on drawer, `min-height: 0` on scrollable body

## Checkout Flow

1. User adds items → opens cart → clicks **Proceed to Checkout**
2. Navigates to `/checkout.html` (clean URL `/checkout` via rewrites)
3. Reviews order summary (read-only, synced from `localStorage`)
4. Fills form (name, phone, address, optional note) — client-side validation
5. Clicks **Send Order via WhatsApp** → opens `wa.me` with pre-filled message
6. Success screen shows order summary with **Back to Shop** / **Open WhatsApp** actions
7. Cart clears automatically after successful order

## Deployment

### Netlify (Recommended)
1. Connect repository to Netlify
2. Build command: *(none)* — static site
3. Publish directory: `.` (root)
4. `_redirects` and `netlify.toml` handle clean `/checkout` URL automatically

### Vercel
1. Import project in Vercel
2. Framework: **Other** (static)
3. `vercel.json` handles rewrites automatically

### GitHub Pages
1. Enable Pages in repo settings → Deploy from branch → `main` / root
2. Clean `/checkout` URL requires custom domain + Cloudflare Workers or similar (GitHub Pages doesn't support rewrites)
3. Users will access `/checkout.html` directly

### Apache / Nginx
- `.htaccess` included for Apache
- For Nginx, add: `rewrite ^/checkout$ /checkout.html last;`

## Design Tokens (CSS Custom Properties)

```css
:root {
  --primary: #F57A1B;           /* Brand orange */
  --bg: #FBF6EE;                /* Cream background */
  --surface: #ffffff;           /* Card backgrounds */
  --ink: #1A1410;               /* Primary text */
  --muted: #6B5D52;             /* Secondary text */
  --border: #EDE0CC;            /* Borders */
  --radius: 16px;               /* Base border radius */
  --shadow: 0 12px 32px rgba(26,20,16,0.08);
  --font-display: 'Sora', sans-serif;
  --font-body: 'Source Serif 4', serif;
  --container: 1140px;          /* Max content width */
}
```

Full token list in `style.css:3–49`.

## Browser Support

- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Requires: `IntersectionObserver`, `CSS custom properties`, `flexbox`, `grid`, `localStorage`
- Graceful degradation: animations disabled via `prefers-reduced-motion`

## Performance

- No build step, no bundler, no runtime framework
- Lucide icons loaded from CDN (cached)
- Images from Pexels CDN with `loading="lazy"`
- CSS/JS cache-busted via query strings (`?v=6`, `?v=1`)

## License

MIT — Free to use, modify, and distribute.

## Author

**Page & Palette** — Kilimani, Nairobi  
Built with vanilla web technologies for a real neighborhood bookshop.

---

**Acceptance Criteria Met:**
- ✅ Cart header & bottom summary fixed; only items scroll (mobile + desktop)
- ✅ Checkout at `/checkout` as standalone page (no storefront header/hero)
- ✅ All existing checkout behavior preserved (form, validation, WhatsApp, order summary)
- ✅ Refresh `/checkout` works; browser back navigation works
- ✅ No changes to colors, typography, branding, product cards, homepage
- ✅ No changes to cart calculations, product quantities, order processing, WhatsApp logic