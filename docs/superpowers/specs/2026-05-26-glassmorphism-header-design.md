# Glassmorphism Navigation Header

## Overview

Replace the default Hydrogen header with a polished glassmorphism navigation header featuring a marquee promo bar, Lucide icons, centered main nav, side-drawer mobile menu, and scroll-aware promo bar hiding.

## Architecture

```
PageLayout
└── PromoBar (scroll-hide marquee)
└── Header (sticky, glass)
    ├── Logo (logo.webp)
    ├── DesktopNav (centered: Car Care, Bike Care, Accessories, Services)
    ├── UtilityIcons (search, user, phone, cart)
    └── HamburgerButton (mobile only)
└── MobileMenuAside (reuses existing Aside component)
```

## Components

### PromoBar
- Infinite CSS marquee animation (`@keyframes marquee`, 25s linear infinite, -50% translate)
- Content duplicated for seamless loop
- Hidden on scroll via `useScroll` hook: applies `-translate-y-full` + `opacity-0` when `scrollY > 0`
- Red background (`bg-red-600`), white text
- Three promo messages separated by bullets

### Header
- Sticky top-0, z-50
- Glassmorphism: `backdrop-filter: blur(15px)`, `bg-white/75`, `border-b border-black/10`
- Height: `h-[72px]` desktop, `h-[64px]` mobile
- Padding: `px-6` desktop, `px-4` mobile

### Logo
- `logo.webp` from `/public`
- `w-[120px]` width, auto height
- Links to `/` with `prefetch="intent"`

### DesktopNav
- Hidden on mobile (`hidden lg:flex`)
- Items: "Car Care", "Bike Care", "Accessories", "Services"
- Gap: `gap-8`
- Active item has red bottom border (`border-b-2 border-red-600`)
- Hover: subtle underline animation via CSS transition

### Secondary / Hamburger Menu
- Appears only on mobile/tablet (`lg:hidden`)
- **Side drawer** (Option A) — reuses existing `Aside` component
- Contents: Home, About, Blogs, Contact, Track Order + Account link
- Close on navigation, close on Escape, close on overlay click

### Utility Icons

| Icon | Component | Behavior |
|------|-----------|----------|
| Search | Lucide `Search` | Expandable input on click (animates width from 38px → 200px) |
| User | Lucide `User` | Links to `/account` |
| Phone | Lucide `Phone` | Hover tooltip: "Mon–Sat 10 am – 5 pm \| +91 77959 77368" |
| Cart | Lucide `ShoppingCart` | Badge with `totalQuantity` from cart; opens cart aside on click |

### Support Phone Tooltip
- CSS `::after` pseudo-element on hover
- Dark bg (`bg-gray-800`), white text, rounded-lg, shadow-lg
- Positioned below icon, centered with arrow

## Data Flow

- Header receives `HeaderQuery` from root loader (`HEADER_QUERY` fragment)
- Cart data from deferred root loader, consumed via `useOptimisticCart` for real-time badge updates
- Mobile menu state managed by existing `AsideContext`
- Promo bar visibility managed by local `useState` + `useEffect` scroll listener (passive)

## Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| `≥ 1024px` | Full desktop: centered nav visible, hamburger hidden |
| `< 1024px` | Mobile: centered nav hidden, hamburger + side drawer visible |

## CSS / Styling

- Tailwind CSS v4 utility classes
- Custom glassmorphism styles in `app.css`
- Marquee keyframes in `app.css`
- All transitions: `duration-200 ease-in-out`

## Micro-interactions

- Nav links: `border-bottom` transition from transparent to red-600 on hover/active
- Search bar: width expands smoothly on click
- Cart badge: scale pulse on quantity change (future)
- Promo bar: `translate-y` + `opacity` transition on scroll

## Dependencies

- `lucide-react` package (to be added via `npm install lucide-react`)
- Existing: `@shopify/hydrogen`, `react-router`

## Files to Modify

| File | Action |
|------|--------|
| `app/components/Header.tsx` | Rewrite with new layout, utility icons, desktop nav |
| `app/styles/app.css` | Add glassmorphism styles, marquee keyframes, tooltip styles, responsive rules |
| `app/components/PageLayout.tsx` | Add PromoBar above Header, update MobileMenuAside |
| `package.json` | Add `lucide-react` dependency |

## Implementation Order

1. Install `lucide-react`
2. Add CSS for glassmorphism, marquee, tooltip, scroll-hide
3. Build PromoBar component
4. Rewrite Header with Logo, DesktopNav, UtilityIcons
5. Update PageLayout to wire PromoBar + scroll logic
6. Update MobileMenuAside with secondary nav items
