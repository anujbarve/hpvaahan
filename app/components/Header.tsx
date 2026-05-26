import {Suspense, useState, useEffect, useRef} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {Menu as MenuIcon, Search, User, Phone} from 'lucide-react';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function PromoBar() {
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
          <span className="promo-bar-item" style={{display: 'inline-flex', alignItems: 'center', gap: 6}}>
            <MenuIcon size={14} />
            Free Delivery on orders above ₹999
          </span>
          <span>•</span>
          <span className="promo-bar-item" style={{display: 'inline-flex', alignItems: 'center', gap: 6}}>
            <span className="promo-badge">CODE</span>
            HPVAAHN15 for 15% OFF
          </span>
          <span>•</span>
          <span className="promo-bar-item" style={{display: 'inline-flex', alignItems: 'center', gap: 6}}>
            <span className="promo-badge">CODE</span>
            DISCOUNT for 20% OFF on orders above ₹1499
          </span>
        </div>
        <div className="promo-bar-content">
          <span className="promo-bar-item" style={{display: 'inline-flex', alignItems: 'center', gap: 6}}>
            <MenuIcon size={14} />
            Free Delivery on orders above ₹999
          </span>
          <span>•</span>
          <span className="promo-bar-item" style={{display: 'inline-flex', alignItems: 'center', gap: 6}}>
            <span className="promo-badge">CODE</span>
            HPVAAHN15 for 15% OFF
          </span>
          <span>•</span>
          <span className="promo-bar-item" style={{display: 'inline-flex', alignItems: 'center', gap: 6}}>
            <span className="promo-badge">CODE</span>
            DISCOUNT for 20% OFF on orders above ₹1499
          </span>
        </div>
      </div>
    </div>
  );
}

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop} = header;
  return (
    <header className="header">
      {/* Logo */}
      <NavLink prefetch="intent" to="/" end>
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

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

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
      <div style={{position: 'relative'}}>
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

function HeaderHamburger() {
  const {open} = useAside();
  return (
    <button
      className="header-hamburger header-icon-btn reset"
      onClick={() => open('mobile')}
      aria-label="Menu"
    >
      <MenuIcon size={22} />
    </button>
  );
}

function CartBadge({count}: {count: number}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      Cart <span aria-label={`(items: ${count})`}>{count}</span>
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}
