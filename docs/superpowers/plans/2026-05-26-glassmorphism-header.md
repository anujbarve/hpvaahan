# Glassmorphism Navigation Header Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace default Hydrogen header with glassmorphism header featuring marquee promo bar, Lucide icons, centered desktop nav, side-drawer mobile menu, and scroll-aware promo hiding.

**Architecture:** PromoBar + Header sit inside PageLayout. Header contains Logo, DesktopNav (centered), and UtilityIcons (right). Mobile uses same Header with hamburger triggering existing Aside component. Scroll state tracked via `useEffect` to hide promo bar.

**Tech Stack:** React 18, Tailwind CSS v4, @shopify/hydrogen, lucide-react

---

### Task 1: Install lucide-react

- [ ] **Install package**

```bash
npm install lucide-react
```

- [ ] **Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add lucide-react for header icons"
```

---

### Task 2: Add CSS for glassmorphism, marquee, tooltip, responsive

**File:** Modify `app/styles/app.css`

- [ ] **Add to `:root`**

```css
--header-height: 72px;
--promo-bar-height: 36px;
```

- [ ] **Replace existing `.header` rules with:**

```css
.header {
  align-items: center;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  height: var(--header-height);
  padding: 0 1.5rem;
  position: sticky;
  top: 0;
  z-index: 50;
}

@media (max-width: 63.99em) {
  .header {
    padding: 0 1rem;
    height: 64px;
  }
}
```

- [ ] **Add promo bar styles after `.header` block:**

```css
/*
* --------------------------------------------------
* components/PromoBar
* --------------------------------------------------
*/
.promo-bar {
  background: #dc2626;
  color: white;
  font-size: 0.8125rem;
  overflow: hidden;
  white-space: nowrap;
  height: var(--promo-bar-height);
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
  position: relative;
  z-index: 49;
}

.promo-bar.hidden {
  transform: translateY(-100%);
  opacity: 0;
}

.promo-bar-track {
  display: flex;
  animation: marquee 25s linear infinite;
}

.promo-bar-content {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0 2rem;
  flex-shrink: 0;
}

.promo-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 0.6875rem;
  font-weight: 600;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
```

- [ ] **Replace `.header-menu-desktop` with:**

```css
.header-nav-desktop {
  display: none;
}

@media (min-width: 64em) {
  .header-nav-desktop {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin: 0 auto;
  }
}

.header-nav-link {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #555;
  text-decoration: none;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s ease, color 0.2s ease;
  cursor: pointer;
}

.header-nav-link:hover,
.header-nav-link.active {
  color: #111;
  border-bottom-color: #dc2626;
}
```

- [ ] **Replace `.header-ctas` with:**

```css
.header-utility {
  align-items: center;
  display: flex;
  gap: 1.25rem;
  flex-shrink: 0;
}

.header-utility > * {
  min-width: fit-content;
}

.header-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  cursor: pointer;
  transition: opacity 0.2s ease;
  background: none;
  border: none;
  padding: 0;
}

.header-icon-btn:hover {
  opacity: 0.7;
}

/* Search */
.header-search {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 0 12px;
  height: 38px;
  width: 38px;
  transition: width 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}

.header-search.expanded {
  width: 200px;
}

.header-search input {
  background: transparent;
  border: none;
  outline: none;
  font-size: 0.8125rem;
  width: 100%;
  margin-left: 8px;
  display: none;
}

.header-search.expanded input {
  display: block;
}

/* Support tooltip */
.support-wrapper {
  position: relative;
}

.support-tooltip {
  position: absolute;
  bottom: -52px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  background: #1f2937;
  color: white;
  font-size: 0.75rem;
  padding: 8px 14px;
  border-radius: 8px;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.support-tooltip::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 8px;
  height: 8px;
  background: #1f2937;
}

.support-wrapper:hover .support-tooltip {
  opacity: 1;
}

/* Cart badge */
.cart-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background: #dc2626;
  color: white;
  font-size: 0.625rem;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Mobile hamburger - hidden on desktop */
.header-hamburger {
  display: flex;
}

@media (min-width: 64em) {
  .header-hamburger {
    display: none;
  }
}
```

- [ ] **Remove old `.header-menu-mobile-toggle`, `.header-menu-mobile`, `.header-menu-item` if no longer referenced (keep if HeaderMenu still used by Aside).**

- [ ] **Commit**

```bash
git add app/styles/app.css
git commit -m "feat: add glassmorphism, marquee, tooltip CSS"
```

---

### Task 3: Build PromoBar component

**File:** Modify `app/components/Header.tsx`

- [ ] **Add PromoBar component at top of file (before Header):**

```tsx
import {useState, useEffect} from 'react';
import {Menu, Search, User, Phone, ShoppingCart, X} from 'lucide-react';

function PromoBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setHidden(window.scrollY > 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`promo-bar${hidden ? ' hidden' : ''}`}>
      <div className="promo-bar-track">
        <div className="promo-bar-content">
          <span className="promo-bar-item">
            <Menu size={14} />
            Free Delivery on orders above ₹999
          </span>
          <span>•</span>
          <span className="promo-bar-item">
            <span className="promo-badge">CODE</span>
            HPVAAHN15 for 15% OFF
          </span>
          <span>•</span>
          <span className="promo-bar-item">
            <span className="promo-badge">CODE</span>
            DISCOUNT for 20% OFF on orders above ₹1499
          </span>
        </div>
        <div className="promo-bar-content">
          <span className="promo-bar-item">
            <Menu size={14} />
            Free Delivery on orders above ₹999
          </span>
          <span>•</span>
          <span className="promo-bar-item">
            <span className="promo-badge">CODE</span>
            HPVAAHN15 for 15% OFF
          </span>
          <span>•</span>
          <span className="promo-bar-item">
            <span className="promo-badge">CODE</span>
            DISCOUNT for 20% OFF on orders above ₹1499
          </span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Commit**

```bash
git add app/components/Header.tsx
git commit -m "feat: add PromoBar with marquee and scroll-hide"
```

---

### Task 4: Rewrite Header with Logo, DesktopNav, UtilityIcons, Hamburger

**File:** Modify `app/components/Header.tsx`

- [ ] **Rewrite `Header` component:**

```tsx
export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  return (
    <header className="header">
      {/* Logo */}
      <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
        <img
          src="/logo.webp"
          alt={shop.name}
          width={120}
          height={40}
          style={{display: 'block'}}
        />
      </NavLink>

      {/* Desktop Main Nav */}
      <nav className="header-nav-desktop" role="navigation">
        <NavLink
          end
          prefetch="intent"
          to="/collections/car-care"
          className="header-nav-link"
        >
          Car Care
        </NavLink>
        <NavLink
          prefetch="intent"
          to="/collections/bike-care"
          className="header-nav-link"
        >
          Bike Care
        </NavLink>
        <NavLink
          prefetch="intent"
          to="/collections/accessories"
          className="header-nav-link"
        >
          Accessories
        </NavLink>
        <NavLink
          prefetch="intent"
          to="/pages/services"
          className="header-nav-link"
        >
          Services
        </NavLink>
      </nav>

      {/* Utility Icons */}
      <HeaderUtility isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}
```

- [ ] **Add `HeaderUtility` component:**

```tsx
function HeaderUtility({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="header-utility">
      {/* Search */}
      <div
        ref={searchRef}
        className={`header-search${searchOpen ? ' expanded' : ''}`}
        onClick={() => setSearchOpen(true)}
      >
        <Search size={16} />
        <input type="text" placeholder="Search products..." />
      </div>

      {/* User */}
      <NavLink to="/account" className="header-icon-btn" aria-label="Account">
        <User size={20} />
      </NavLink>

      {/* Support */}
      <div className="support-wrapper header-icon-btn">
        <Phone size={20} />
        <div className="support-tooltip">
          Mon–Sat 10 am – 5 pm | +91 77959 77368
        </div>
      </div>

      {/* Cart */}
      <div className="header-icon-btn" style={{position: 'relative'}}>
        <Suspense fallback={<CartBadge count={0} />}>
          <Await resolve={cart}>
            <CartBanner />
          </Await>
        </Suspense>
      </div>

      {/* Hamburger */}
      <HeaderHamburger />
    </div>
  );
}
```

- [ ] **Add `HeaderHamburger`:**

```tsx
function HeaderHamburger() {
  const {open} = useAside();
  return (
    <button
      className="header-hamburger header-icon-btn reset"
      onClick={() => open('mobile')}
      aria-label="Menu"
    >
      <Menu size={22} />
    </button>
  );
}
```

- [ ] **Keep `CartBadge`, `CartToggle`, `CartBanner` as-is (they're already correct).**

- [ ] **Remove `HeaderMenuMobileToggle` and `SearchToggle`** (no longer needed — hamburger uses `HeaderHamburger` above, search is inline).

- [ ] **Keep `FALLBACK_HEADER_MENU`** — still used by `HeaderMenu` which remains for mobile menu.

- [ ] **Commit**

```bash
git add app/components/Header.tsx
git commit -m "feat: rewrite Header with glassmorphism layout, nav, utility icons"
```

---

### Task 5: Update PageLayout to wire PromoBar + update MobileMenuAside

**File:** Modify `app/components/PageLayout.tsx`

- [ ] **Import PromoBar at top:**

```tsx
import {Header, HeaderMenu, PromoBar} from '~/components/Header';
```

- [ ] **Add PromoBar above Header in PageLayout:**

```tsx
<Aside.Provider>
  <CartAside cart={cart} />
  <SearchAside />
  <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} />
  <PromoBar />
  <Header
    header={header}
    cart={cart}
    isLoggedIn={isLoggedIn}
    publicStoreDomain={publicStoreDomain}
  />
  <main>{children}</main>
  <Footer ... />
</Aside.Provider>
```

- [ ] **Update import in PageLayout.tsx to include `useAside`:**

```tsx
import {Aside, useAside} from '~/components/Aside';
```

- [ ] **Update `MobileMenuAside` to include secondary nav items (Home, About, Blogs, Contact, Track Order) plus the Shopify menu items:**

```tsx
function MobileMenuAside({
  header,
  publicStoreDomain,
}: {
  header: PageLayoutProps['header'];
  publicStoreDomain: PageLayoutProps['publicStoreDomain'];
}) {
  const {close} = useAside();
  return (
    header.menu &&
    header.shop.primaryDomain?.url && (
      <Aside type="mobile" heading="MENU">
        <div className="header-menu-mobile">
          {/* Secondary nav items */}
          <NavLink end to="/" onClick={close}>
            Home
          </NavLink>
          <NavLink to="/pages/about" onClick={close}>
            About
          </NavLink>
          <NavLink to="/blogs" onClick={close}>
            Blogs
          </NavLink>
          <NavLink to="/pages/contact" onClick={close}>
            Contact
          </NavLink>
          <NavLink to="/pages/track-order" onClick={close}>
            Track Order
          </NavLink>
          <hr />
          {/* Shopify menu items */}
          <HeaderMenu
            menu={header.menu}
            viewport="mobile"
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          />
        </div>
      </Aside>
    )
  );
}
```

- [ ] **Commit**

```bash
git add app/components/PageLayout.tsx
git commit -m "feat: wire PromoBar and update mobile menu with secondary nav"
```

---

### Task 6: Run lint + typecheck

- [ ] **Run typecheck**

```bash
npm run typecheck
```

- [ ] **Run lint**

```bash
npm run lint
```

- [ ] **Fix any issues found**

- [ ] **Commit fixes if any**

```bash
git add -A
git commit -m "chore: fix lint and typecheck errors"
```
