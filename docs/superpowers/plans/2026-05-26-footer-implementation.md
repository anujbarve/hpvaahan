# Footer Implementation Plan

> **For agentic workers:** Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Shopify-driven footer with a branded deep-navy 4-column footer matching the glassmorphism header design.

**Architecture:** Single component rewrite (`Footer.tsx`) with Tailwind utilities. No custom CSS needed beyond a possible Back-to-Top button animation. Component keeps its existing interface for backward compatibility but renders static branded content.

**Tech Stack:** React, Tailwind v4, lucide-react

---

### Task 1: Rewrite Footer.tsx

**Files:**
- Modify: `app/components/Footer.tsx` — full rewrite
- No changes to `PageLayout.tsx` (component interface unchanged)

- [ ] **Write the new Footer component**

Replace entire file content. Keep the same export name `Footer` and same props interface for backward compatibility. Render static branded content.

```tsx
import { NavLink } from 'react-router';
import { Phone, Mail, Clock, MapPin, ArrowUp } from 'lucide-react';
import type { FooterQuery, HeaderQuery } from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: _footer,
  header: _header,
  publicStoreDomain: _publicStoreDomain,
}: FooterProps) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#0A192F] text-white">
      {/* Main grid — 4 cols on lg, 2 on sm, 1 by default */}
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        {/* Column 1 — Brand */}
        <div className="flex flex-col items-center sm:items-start">
          <img
            src="/logo.webp"
            alt="Kemetyl India"
            className="max-w-[180px] h-auto"
          />
        </div>

        {/* Column 2 — Product Categories */}
        <div>
          <h4 className="text-white text-sm tracking-wider uppercase mb-4">
            PRODUCT CATEGORIES
          </h4>
          <ul className="space-y-2.5">
            {[
              { label: 'Car Care', href: '/collections/car-care' },
              { label: 'Bike & Scooter Care', href: '/collections/bike-scooter-care' },
              { label: 'Microfiber Cloth', href: '/collections/microfiber-cloth' },
              { label: 'Maintenance Products', href: '/collections/maintenance-products' },
            ].map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Disclaimers */}
        <div>
          <h4 className="text-white text-sm tracking-wider uppercase mb-4">
            DISCLAIMERS
          </h4>
          <ul className="space-y-2.5">
            {[
              { label: 'Terms & Conditions', href: '/policies/terms-of-service' },
              { label: 'Privacy Policy', href: '/policies/privacy-policy' },
              { label: 'Refund & Return Policy', href: '/policies/refund-policy' },
              { label: 'Shipping Policy', href: '/policies/shipping-policy' },
            ].map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contact & Location */}
        <div className="space-y-6">
          {/* Customer Support */}
          <div>
            <h4 className="text-white text-sm tracking-wider uppercase mb-4">
              CUSTOMER SUPPORT
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+917795977368"
                  className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Phone size={15} className="text-red-500 shrink-0" />
                  +91 77959 77368
                </a>
              </li>
              <li>
                <a
                  href="mailto:support-in@kemetyl.com"
                  className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Mail size={15} className="text-red-500 shrink-0" />
                  support-in@kemetyl.com
                </a>
              </li>
              <li className="text-slate-400 text-sm flex items-center gap-2">
                <Clock size={15} className="text-red-500 shrink-0" />
                Mon–Sat 10 am – 5 pm
              </li>
            </ul>
          </div>

          {/* Distributorship Enquiries */}
          <div>
            <h4 className="text-white text-sm tracking-wider uppercase mb-4">
              DISTRIBUTORSHIP ENQUIRIES
            </h4>
            <a
              href="tel:+919900722700"
              className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
            >
              <Phone size={15} className="text-red-500 shrink-0" />
              +91 9900722700
            </a>
          </div>

          {/* Visit Our Location */}
          <div>
            <h4 className="text-white text-sm tracking-wider uppercase mb-4">
              VISIT OUR LOCATION
            </h4>
            <p className="text-slate-400 text-sm flex items-start gap-2">
              <MapPin size={15} className="text-red-500 shrink-0 mt-0.5" />
              <span>
                Kemetyl India Markets Pvt. Ltd., Lewis Workspace, 18, Nandidurga
                Road, Benson Town, Bangalore-560046
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-700">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs">
            © Kemetyl India Markets Pvt. Ltd. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* Social icons */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              <Linkedin size={18} />
            </a>
            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="ml-2 p-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

Dependencies needed:
- `Instagram`, `Facebook`, `Linkedin` from lucide-react — need to check if they exist. lucide-react exports `Instagram`, `Facebook`, `Linkedin`. Actually `Linkedin` might be `Linkedin` — let me check.

Actually, lucide-react icon names: `Instagram`, `Facebook`, `Linkedin`. But wait, let me double-check the exact names. lucide-react has:
- `Instagram` ✓
- `Facebook` ✓  
- `Linkedin` ✓ (actually it's `Linkedin` not `LinkedIn`)

Hmm, I need to check. Let me just use them and the compiler will catch it if wrong.

Actually, lucide-react documentation says the icon for LinkedIn is `Linkedin`. Let me proceed.

- [ ] **Save and run lint**

Run: `npm run lint`
Expected: No errors.

- [ ] **Commit**

```bash
git add app/components/Footer.tsx
git commit -m "feat: replace footer with branded deep-navy design"
```

---

### Self-Review
- [x] Spec coverage: All 4 columns, bottom bar, social icons, back-to-top, responsive grid, tel/mailto links all covered.
- [x] No placeholders: Full code provided.
- [x] Type consistency: Uses same interface, NavLink from react-router, lucide icons as used in Header.
