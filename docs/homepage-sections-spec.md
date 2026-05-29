# Homepage Sections — Specification Sheet

## Section 1: Hero

**Component:** `HeroSection`

**Purpose:** Above-the-fold introduction; drive users to shop or become a distributor.

**Layout:**
- Full-width gradient background (`from-red-600/5 via-white to-red-600/10`)
- 3 decorative blurred circle blobs (pointer-events-none)
- Content constrained to `max-w-7xl` with `px-6` padding
- Left: heading (H1), subtitle (2 paragraphs), 2 CTA buttons
- Below text: 4-column category card grid (`sm:grid-cols-2 lg:grid-cols-4`)

**Typography:**
- H1: `text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900`
- Subtitle: `text-lg md:text-xl text-gray-500`
- CTA buttons: `font-medium` with icons

**Interactive Elements:**
| Element | Action | State Changes |
|---------|--------|---------------|
| "Shop Now" (solid red) | → /collections/frontpage | `hover:bg-red-700` |
| "Become a Distributor" (outline) | → /contact | `hover:bg-white hover:border-gray-300` |
| Category cards (×4) | → category collection link | `hover:shadow-xl hover:border-red-200`, title turns red, chevron gap widens |

**Data Needs (static → dynamic):**
- Heading text
- Subtitle paragraphs
- Category list: title, description, link URL

**Breakpoints:**
- Mobile: stacked layout, 1-col cards
- Tablet: 2-col cards
- Desktop: 4-col cards, full heading size

---

## Section 2: Product Categories

**Component:** `ProductCategories`

**Purpose:** Showcase product range with visual cards.

**Layout:**
- Full-width white background with 2 decorative blur circles
- Flex header row: title + "Contact Us" button (right-aligned on desktop)
- 2×2 grid of category cards (`md:grid-cols-2`)

**Card Structure:**
- Horizontal layout on desktop (`sm:flex-row`), stacked on mobile
- Left: 144×144px placeholder image area (gradient background + icon)
- Right: title, description, "Explore More" link

**Interactive:**
| Element | Action | State |
|---------|--------|-------|
| Entire card (Link) | → /collections/frontpage | `hover:shadow-md hover:border-red-100`, title turns red |
| "Contact Us" button | → /contact | `hover:bg-red-700` |

**Data Needs:**
- Section heading + subtitle
- Category cards: title, description, image URL, link URL
- Currently 4 hardcoded: Car Care, Bike & Scooter Care, Monsoon Combo, Maintenance Products

---

## Section 3: Why Choose Us

**Component:** `WhyChooseUs`

**Purpose:** Brand story and trust-building.

**Layout:**
- Full-width `bg-gray-50/50` background with 2 decorative blurs
- 2-column grid (`md:grid-cols-2`), 12px gap
- Left: aspect-[4/3] placeholder image area with gradient
- Right: heading, red sub-headline, body text (3 paragraphs), "Contact Us" CTA

**Typography:**
- Heading: `text-3xl md:text-4xl font-bold`
- Sub-headline: `text-xl font-semibold text-red-600`
- Body: `text-gray-500 text-lg leading-relaxed`

**Interactive:**
- "Contact Us" button → /contact

**Data Needs:**
- Image URL (currently placeholder gradient)
- Heading text
- Sub-headline text
- Body paragraphs
- CTA link

---

## Section 4: Features

**Component:** `FeaturesSection`

**Purpose:** Highlight product/company USPs — "Engineered for Excellence".

**Layout:**
- White background, 2 decorative blurs
- Centered heading + subtitle (max-w-2xl)
- 3-column card grid (`md:grid-cols-2 lg:grid-cols-3`)

**Card Structure:**
- Glass card: `backdrop-blur-sm bg-white/60 rounded-2xl border border-gray-100 shadow-sm p-8`
- Top: 48×48px icon in red circle
- Title: `text-lg font-bold text-gray-900`
- Description: `text-gray-500 leading-relaxed`

**Interactive:**
| Element | State |
|---------|-------|
| Card | `hover:shadow-md hover:border-red-100` |

**Data Needs:**
- Section heading + subtitle
- 5 feature cards: icon, title, description
- Current features: European Formulations, High Performance Fluids, Tested for Indian Roads, Eco-Friendly, Affordable Premium

---

## Section 5: Benefits

**Component:** `BenefitsSection`

**Purpose:** Reinforce customer value proposition — "Why Shop with HP Vaahn".

**Layout:**
- `bg-gray-50/50` background, 2 decorative blurs
- Centered heading + subtitle
- 4-column grid (`sm:grid-cols-2 lg:grid-cols-4`)

**Card Structure:**
- Centered alignment: `text-center`
- Icon: 56×56px red circle
- Title: `text-lg font-bold text-gray-900`
- Description: `text-sm text-gray-500`

**Interactive:**
| Element | State |
|---------|-------|
| Card | `hover:shadow-md hover:border-red-100` |

**Data Needs:**
- Section heading + subtitle
- 4 benefit cards: icon, title, description
- Current: Premium Auto Care Products, Wide Range of Categories, Fast & Hassle-Free Delivery, Advanced Formulations

---

## Section 6: Testimonials

**Component:** `TestimonialsSection`

**Purpose:** Social proof — customer reviews.

**Layout:**
- White background, 2 decorative blurs
- Centered label ("Clients Testimonial") + heading
- 2-column card grid (`md:grid-cols-2`)

**Card Structure:**
- Stars row: 5× `fill-amber-400 text-amber-400` Star icons (16px)
- Decorative Quote icon (`text-red-200`, 24px)
- Quote text: `text-gray-600 italic` wrapped in &ldquo;
- Author: avatar circle (first initial) + name + location

**Interactive:**
| Element | Action | State |
|---------|--------|-------|
| Card | — | `hover:shadow-md` |
| "SEE ALL REVIEWS" | → https://socialpill.in/hpclvaahn/services/ | `hover:bg-white hover:border-gray-300` |

**Data Needs:**
- Section label + heading
- Testimonials: name, location, quote, rating (1-5), avatar URL (currently generated as initial)
- Max 4 shown on homepage; "SEE ALL REVIEWS" links to external review aggregator

---

## Section 7: Instagram Feed

**Component:** `InstagramSection`

**Purpose:** Social media engagement, show real customer content.

**Layout:**
- `bg-gray-50/50` background, 2 decorative blurs
- Centered label ("Stay Connected") + heading + follow link
- 4-column grid (`grid-cols-2 md:grid-cols-4`) of Instagram post cards
- Below grid: "Follow @hpvaahn on Instagram" link

**Card Structure:**
- Aspect-square placeholder cards with gradient background
- Instagram icon overlay (centered, `text-red-400`)
- Each card links to an Instagram post URL

**Interactive:**
| Element | Action | State |
|---------|--------|-------|
| Post card | → Instagram post URL (new tab) | `hover:shadow-md hover:border-red-200`, icon turns `text-red-600` |
| Follow link | → https://www.instagram.com/hpvaahn/ | `hover:text-red-600` |

**Data Needs:**
- Instagram profile URL: https://www.instagram.com/hpvaahn/
- Up to 4 post URLs for embedded cards
- Currently hardcoded to 4 recent reels

**Future Enhancement:**
- Replace placeholder cards with actual Instagram embed blocks or thumbnail images fetched via API

---

## Section 8: CTA

**Component:** `CTASection`

**Purpose:** Final conversion action — call or shop.

**Layout:**
- Full-width gradient background (same as Hero)
- Centered glass card (`max-w-3xl mx-auto`)
- Heading, hours, phone number (large red text), 2 CTA buttons

**Typography:**
- Heading: `text-3xl md:text-4xl font-bold text-gray-900`
- Phone: `text-3xl md:text-4xl font-bold text-red-600` with phone SVG icon
- Hours: `text-gray-500`

**Interactive:**
| Element | Action | State |
|---------|--------|-------|
| Phone number (link) | `tel:+917795977368` | `hover:text-red-700` |
| "Shop Now" (solid) | → /collections/frontpage | `hover:bg-red-700` |
| "Contact Us" (outline) | → /contact | `hover:bg-white hover:border-gray-300` |

**Data Needs:**
- Phone number: +91 77959 77368
- Business hours: Mon–Sat 10 am – 5 pm

---

## Global Design Tokens Used

| Token | Value |
|-------|-------|
| Red accent | `#dc2626` (red-600) |
| Glass card | `backdrop-blur-sm bg-white/60 rounded-2xl border border-gray-100 shadow-sm` |
| Glass card (hero) | `backdrop-blur-xl bg-white/70 rounded-2xl shadow-lg shadow-red-900/5 border border-white/30` |
| Decorative blur circles | `bg-red-400/5` / `bg-red-500/5` / `bg-red-600/10` with `blur-3xl` |
| Body text | `text-gray-500` |
| Heading text | `text-gray-900` |
| Section padding | `py-20 md:py-28` |
| Content width | `max-w-7xl px-6` |
| Primary button | `bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-sm shadow-red-200` |
| Secondary button | `border border-gray-200 text-gray-700 rounded-xl hover:bg-white hover:border-gray-300` |
| Grid gaps | `gap-5` or `gap-6` |

## Current Routing

| Link | Target |
|------|--------|
| /collections/frontpage | Shop / product listing |
| /contact | Contact page |
| /account | Account page |
| Instagram | External: instagram.com/hpvaahn |
| Reviews | External: socialpill.in/hpclvaahn/services/ |

## Implementation Status

| Section | Data Source | CMS-Ready |
|---------|-------------|-----------|
| Hero | Static | No — hardcoded strings and links |
| Product Categories | Static | No — hardcoded array |
| Why Choose Us | Static | No — hardcoded text |
| Features | Static | No — hardcoded array |
| Benefits | Static | No — hardcoded array |
| Testimonials | Static | No — hardcoded array |
| Instagram Feed | Static | No — hardcoded URLs |
| CTA | Static | No — hardcoded phone/text |

All sections use the glassmorphism design system (`backdrop-blur`, `bg-white/60`, red accent, decorative blurs) and share consistent spacing/typography tokens.
