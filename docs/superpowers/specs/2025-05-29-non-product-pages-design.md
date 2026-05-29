# Non-Product Pages Design

**Date:** 2025-05-29
**Project:** HP Vaahn (Shopify Hydrogen)

## Overview

Create 6 top-level static pages (About, Contact, Terms & Conditions, Privacy Policy, Refund Policy, Shipping Policy) that fetch content from Shopify CMS via the Storefront API and render it in custom-designed components matching the site's existing aesthetic.

## Design Language

See `app/styles/app.css` and `app/components/Header.tsx`, `Footer.tsx` for reference:

- **Header:** Sticky glassmorphism (white + `backdrop-filter: blur(15px)`), red accent `#dc2626`
- **Footer:** Dark navy `#0A192F`, slate-200 text, red accent icons, red scroll-to-top button
- **Accent color:** `#dc2626` (red)
- **Typography:** Clean sans-serif, compact body (0.9375rem), uppercase section headers in footer
- **Interactive:** Smooth 200ms transitions, red underline on active nav links

## Route Structure

All top-level, under `($locale)` prefix for i18n:

| File | Path | Data Source |
|------|------|-------------|
| `($locale).about.tsx` | `/about` | `page(handle: "about")` |
| `($locale).contact.tsx` | `/contact` | `page(handle: "contact")` |
| `($locale).terms-conditions.tsx` | `/terms-conditions` | `shop.termsOfService` |
| `($locale).privacy-policy.tsx` | `/privacy-policy` | `shop.privacyPolicy` |
| `($locale).refund-policy.tsx` | `/refund-policy` | `shop.refundPolicy` |
| `($locale).shipping-policy.tsx` | `/shipping-policy` | `shop.shippingPolicy` |

## Shared Components

### `components/PageHero.tsx`
- Full-width gradient banner: `#dc2626` to `#b91c1c`
- Breadcrumb nav: small text, semi-transparent white, `Home > Current Page`
- Page title: `text-4xl` white, font-bold
- Inner: `max-w-7xl mx-auto px-6 py-16`
- Responsive: smaller padding on mobile

### `components/LegalContent.tsx`
- Wraps `dangerouslySetInnerHTML` with prose styling
- `h2` red left border (4px), `h3` with bottom underline
- Max-width `prose` on `max-w-4xl`
- Responsive padding

### `components/ContactInfo.tsx`
- Contact card with Lucide icon + label + value
- Red accent icon (matching footer pattern)
- Used on Contact page

### `components/StatsCounter.tsx`
- Centered stat with large number, label below
- Red highlight on number
- Used on About page

### `components/TestimonialCard.tsx`
- Card with quote, star rating, customer name + location
- Subtle border, rounded corners
- Used on About page

## Page Layouts

### About Page (`/about`)
```
[PageHero title="About" breadcrumbs="Home > About"]

<section class="mx-auto max-w-7xl px-6 py-16 space-y-20">

  <!-- Brand Story -->
  <div class="grid md:grid-cols-2 gap-12 items-center">
    <div>
      <h2 class="text-3xl font-bold mb-4">A Powerful Partnership</h2>
      <p class="text-gray-600 leading-relaxed">CMS body content</p>
    </div>
    <img src="/logo.webp" class="rounded-lg" />
  </div>

  <!-- Stats Row -->
  <div class="grid grid-cols-3 gap-8 text-center">
    <StatsCounter value="1+" label="Products Sold" />
    <StatsCounter value="1+" label="Happy Customers" />
    <StatsCounter value="1+" label="Available Products" />
  </div>

  <!-- Why Choose (grid of 12 feature cards) -->
  <div>
    <h2 class="text-3xl font-bold text-center mb-10">Why Choose HP Vaahn</h2>
    <div class="grid md:grid-cols-3 gap-6">
      12 cards with icon + title + description
    </div>
  </div>

  <!-- Visual Pillars -->
  <div>
    <h2 class="text-3xl font-bold text-center mb-10">Excellence in Every Aspect</h2>
    <div class="grid md:grid-cols-3 gap-8">
      Pillar cards: Modern Production, Sustainable Packaging, R&D
    </div>
  </div>

  <!-- Testimonials -->
  <div>
    <h2 class="text-3xl font-bold text-center mb-10">What Our Clients Say</h2>
    <div class="grid md:grid-cols-2 gap-6">
      4 TestimonialCards
    </div>
  </div>

</section>
```

### Contact Page (`/contact`)
```
[PageHero title="Contact" breadcrumbs="Home > Contact"]

<section class="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-12">

  <!-- Left: Contact Info & Hours -->
  <div class="space-y-8">
    <h2 class="text-2xl font-bold">Get in Touch</h2>
    <div class="space-y-4">
      <ContactInfo icon={Phone} label="Customer Support" value="+91 77959 77368" subtitle="Mon–Sat 10am–5pm" />
      <ContactInfo icon={Phone} label="Distributorship Enquiries" value="+91 9900722700" />
      <ContactInfo icon={Mail} label="Email" value="support-in@kemetyl.com" />
      <ContactInfo icon={MapPin} label="Address" value="Kemetyl India Markets Pvt. Ltd., Lewis Workspace, ..." />
    </div>
    <div>
      <h3 class="font-semibold mb-3">Business Hours</h3>
      <table> Mon–Sat 9am–7pm, Sun Closed </table>
    </div>
  </div>

  <!-- Right: Distributor Form -->
  <div class="bg-gray-50 rounded-xl p-8">
    <h2 class="text-2xl font-bold mb-2">Become a Distributor</h2>
    <p class="text-gray-600 mb-6">Partner with HP Vaahn</p>
    <form class="space-y-4">
      Fields: Name, Email, Phone, City, State, GST upload (.PDF only), Submit button (red)
    </form>
  </div>

</section>
```

### Legal Pages (T&C, Privacy, Refund, Shipping)
```
[PageHero title="Terms & Conditions" breadcrumbs="Home > Terms & Conditions"]
<section class="mx-auto max-w-4xl px-6 py-16">
  <LegalContent>
    CMS policy body rendered with prose styling
  </LegalContent>
</section>
```

All 4 legal pages share the identical template — only `title` and CMS query differ.

## CMS Queries

### Page query (for About, Contact)
```graphql
query Page($handle: String!, $language: LanguageCode, $country: CountryCode)
  @inContext(language: $language, country: $country) {
  page(handle: $handle) {
    id
    title
    body
    seo { description title }
  }
}
```

### Policy query (for T&C, Privacy, Refund, Shipping)
```graphql
query Policy($privacyPolicy: Boolean!, $refundPolicy: Boolean!, $shippingPolicy: Boolean!, $termsOfService: Boolean!, $language: LanguageCode)
  @inContext(language: $language) {
  shop {
    termsOfService @include(if: $termsOfService) { title body }
    privacyPolicy @include(if: $privacyPolicy) { title body }
    refundPolicy @include(if: $refundPolicy) { title body }
    shippingPolicy @include(if: $shippingPolicy) { title body }
  }
}
```

## Footer Link Updates

Update `Footer.tsx` disclaimer links to point to top-level paths:
- `/terms-conditions` (not `/policies/terms-of-service`)
- `/privacy-policy` (not `/policies/privacy-policy`)
- `/refund-policy` (not `/policies/refund-policy`)
- `/shipping-policy` (not `/policies/shipping-policy`)

## Non-Goals

- Blog pages — already handled by existing Hydrogen blog routes
- Order tracking — out of scope
- Mobile menu nav links — already point to `/pages/about`, `/pages/contact`; not changing unless needed
