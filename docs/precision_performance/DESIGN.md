---
name: Precision Performance
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#44474d'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#515f76'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#0d1c30'
  on-primary-container: '#76849d'
  inverse-primary: '#b9c7e2'
  secondary: '#b9052c'
  on-secondary: '#ffffff'
  secondary-container: '#de2b41'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#241a00'
  on-tertiary-container: '#9e8028'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#b9c7e2'
  on-primary-fixed: '#0d1c30'
  on-primary-fixed-variant: '#3a475d'
  secondary-fixed: '#ffdad9'
  secondary-fixed-dim: '#ffb3b2'
  on-secondary-fixed: '#410008'
  on-secondary-fixed-variant: '#92001f'
  tertiary-fixed: '#ffe08f'
  tertiary-fixed-dim: '#e6c364'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#584400'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
typography:
  headline-xl:
    fontFamily: DM Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: 0.04em
  headline-lg:
    fontFamily: DM Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: DM Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: 0.02em
  headline-md:
    fontFamily: DM Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-padding: 80px
---

## Brand & Style

The brand personality for this design system is rooted in **Engineering Excellence** and **Technical Authority**. It evokes the feeling of a high-end automotive laboratory—clinical, precise, and uncompromising. The target audience includes automotive enthusiasts and professional detailers who value chemical integrity and performance results over lifestyle fluff.

The design style is **Modern Industrial**. It utilizes a "Utility-Premium" approach, combining the structured, functional layouts of technical manuals with the refined whitespace of luxury car brochures. Visuals are characterized by high-contrast typography, rigorous alignment, and a "form follows function" philosophy that prioritizes legibility and clarity above all else.

## Colors

This design system employs a high-contrast palette to establish immediate authority. **Deep Midnight Blue** serves as the structural foundation, used for all primary text and core UI elements to provide weight. **Performance Red** is used surgically for critical calls to action and performance indicators, ensuring they command attention without overwhelming the technical aesthetic.

**Metallic Gold** is reserved for "Premium Tier" signifiers, such as certification badges or loyalty status, used sparingly to maintain its value. Backgrounds oscillate between **Clean White** for primary content areas and **Steel Grey** for secondary technical specifications or data tables, creating a clear visual hierarchy of information density.

## Typography

The typography system uses **DM Sans** exclusively to maintain a cohesive, technical look. Headlines are the primary driver of the brand's industrial feel; they are rendered in **Bold** weight with **expanded letter spacing (tracking)** and uppercase styling for top-level tiers. This mimics the stamping found on automotive parts and technical machinery.

Body copy is kept clean with standard tracking to ensure high readability for long-form technical guides. Labels and small "Spec" text use a combination of bold weights and slight letter spacing to differentiate metadata from prose.

## Layout & Spacing

This design system is built on a rigorous **8pt grid**. The layout utilizes a **12-column fixed grid** on desktop (max-width 1280px) to maintain a controlled, "engineered" look that prevents content from becoming too dispersed on ultra-wide monitors. 

**Vertical Rhythm:**
- Use `section-padding` (80px) to separate major content blocks, ensuring the "generous whitespace" required for a premium feel.
- Components within a section should follow the 8px incremental scale (8, 16, 24, 32) to maintain technical alignment.
- Mobile layouts transition to a fluid single-column with 20px side margins to ensure touch-targets remain accessible while maintaining a sense of precision.

## Elevation & Depth

To maintain the "Industrial Clean" aesthetic, this design system avoids heavy shadows or organic blurs. Instead, it utilizes **Low-Contrast Outlines** and **Tonal Layering**:

- **Borders:** Surfaces are defined by 1px solid borders in `#E5E7EB`. This creates a blueprint-like structure.
- **Subtle Elevation:** For interactive elements like cards, use a very tight, low-opacity shadow (`0px 2px 4px rgba(11, 26, 46, 0.05)`) only on hover to indicate tactility.
- **Tonal Depth:** Background hierarchy is achieved by nesting white surfaces on top of Steel Grey (`#F4F5F7`) containers. This "tray" metaphor mimics professional tool-chest organization.

## Shapes

The shape language reflects an **Engineered Look**. Corners are primarily set to **8px (0.5rem)**, which strikes a balance between modern software design and the machined edges of automotive components. 

- **Primary Components:** (Buttons, Input Fields, Cards) use the standard 8px radius.
- **Secondary Elements:** Small badges or tags use a 4px radius for a sharper, more precise feel.
- **Strict Square:** Icons and illustrative frames may occasionally use 0px radius when used in a technical diagram context to emphasize the industrial nature.

## Components

### Buttons
- **Primary:** Deep Midnight Blue background, White text, 8px radius. 16px horizontal padding. Uppercase text.
- **Action (CTA):** Performance Red background. Used only for "Buy Now," "Add to Cart," or critical "Book Service" actions.
- **Secondary:** Transparent background with 1px Midnight Blue border.

### Cards
- **Technical Cards:** White background, 1px `#E5E7EB` border, 8px radius. No shadow. Used for product specs and service details.
- **Interactive Cards:** Same as technical, but adds a subtle lift (tight shadow) and a 1px Performance Red bottom-border on hover.

### Input Fields
- **Style:** 1px Steel Grey border that turns Deep Midnight Blue on focus. Labels are always `label-bold` positioned above the field. 
- **Validation:** Errors use Performance Red for text and border.

### Chips & Badges
- **Spec Tags:** Steel Grey background with Midnight Blue text. Used for "PH Balanced," "UV Protection," etc.
- **Premium Badges:** Gold text on a Midnight Blue background, used for "Certified Installer" or "Platinum Grade."

### Lists
- **Data Lists:** Alternating row backgrounds using Clean White and Steel Grey. Borders between rows are 1px `#E5E7EB`. Vertical alignment is strictly enforced to maintain the technical grid feel.