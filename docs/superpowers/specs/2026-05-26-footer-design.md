# Footer Design Spec

## Overview
Replace the current Shopify dynamic-footer component with a rich branded footer matching the site's modern design language: deep navy background, 4-column grid, contact details, social links, and a back-to-top button.

## Layout Structure (Desktop → Tablet → Mobile)
- **lg (≥1024px):** 4-column CSS grid
- **sm (≥640px):** 2-column grid
- **Default:** single-column stacked

## Column Contents

### Column 1 — Brand
- `public/logo.webp` (max-width 180px, centered on mobile)

### Column 2 — Product Categories
- Heading: "PRODUCT CATEGORIES" (white, tracking-wider, text-sm)
- Links: Car Care, Bike & Scooter Care, Microfiber Cloth, Maintenance Products
- Each link navigates to corresponding collection page (`/collections/<slug>`)

### Column 3 — Disclaimers
- Heading: "DISCLAIMERS"
- Links: Terms & Conditions (`/policies/terms-of-service`), Privacy Policy (`/policies/privacy-policy`), Refund & Return Policy (`/policies/refund-policy`), Shipping Policy (`/policies/shipping-policy`)

### Column 4 — Contact & Location
- **Customer Support:** Phone (`+91 77959 77368`, tel:), Email (`support-in@kemetyl.com`, mailto:), Hours (Mon–Sat 10am – 5pm) — each with lucide-react icon (Phone, Mail, Clock)
- **Distributorship:** Phone (`+91 9900722700`, tel:)
- **Visit Our Location:** MapPin icon + "Kemetyl India Markets Pvt. Ltd., Lewis Workspace, 18, Nandidurga Road, Benson Town, Bangalore-560046"

## Bottom Bar
- Left: "© Kemetyl India Markets Pvt. Ltd. All Rights Reserved."
- Right: Instagram, Facebook, LinkedIn icons (lucide-react or SVG) + Back-to-Top button (ArrowUp icon, red `#EF4444`, smooth scroll, fixed or inline)

## Visual Details
- **Background:** `#0A192F`
- **Link text:** `#94A3B8` with `hover:text-white` and `transition-colors`
- **Headings:** White, uppercase, tracking-wider, small (approx 14px)
- **Contact icons:** `#EF4444` (red accent)
- **Bottom bar:** `border-t border-slate-700`
- **Padding:** `py-16` vertical, `px-6` horizontal
- **Font:** Inherit from site (Inter / Montserrat via Tailwind)
- **Back-to-Top:** Rounded-full, bg-red-500, hover:bg-red-600, onClick scrolls `window.scrollTo({top:0,behavior:'smooth'})`

## Component Architecture
- Rewrite `app/components/Footer.tsx` — remove existing Shopify dynamic menu logic, replace with static branded footer
- Remove `FooterProps` interface props (footer, header, publicStoreDomain) if no longer needed, OR keep the async wrapper but render static content
- Use Tailwind utility classes exclusively; no custom CSS except Back-to-Top button animation
- Icons from `lucide-react` (already in project)

## Responsive Behavior
- Grid collapses from 4 → 2 → 1 columns
- Logo and headings center on mobile
- Contact info and bottom bar remain read-friendly at all sizes
- All phone numbers and email are `tel:` / `mailto:` links

## Accessibility
- Semantic `<footer>`, `<nav>`, `<h4>` for section headings
- `aria-label` on social links and back-to-top button
- Focus-visible styles via Tailwind

## Self-Review
- [x] No placeholders or TODOs
- [x] Requirements are consistent across sections
- [x] Scoped to a single component + CSS
- [x] No ambiguous requirements
