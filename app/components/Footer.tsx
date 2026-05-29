import {NavLink} from 'react-router';
import {Phone, Mail, Clock, MapPin, ArrowUp} from 'lucide-react';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

function InstagramIcon({size}: {size: number}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({size}: {size: number}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon({size}: {size: number}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Footer({
  footer: _footer,
  header: _header,
  publicStoreDomain: _publicStoreDomain,
}: FooterProps) {
  const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'});

  const productLinks = [
    {label: 'Car Care', href: '/collections/car-care'},
    {label: 'Bike & Scooter Care', href: '/collections/bike-scooter-care'},
    {label: 'Microfiber Cloth', href: '/collections/microfiber-cloth'},
    {label: 'Maintenance Products', href: '/collections/maintenance-products'},
  ];

  const disclaimerLinks = [
    {label: 'Terms & Conditions', href: '/terms-conditions'},
    {label: 'Privacy Policy', href: '/privacy-policy'},
    {label: 'Refund & Return Policy', href: '/refund-policy'},
    {label: 'Shipping Policy', href: '/shipping-policy'},
  ];

  return (
    <footer className="bg-[#0A192F] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start">
          <img
            src="/logo.webp"
            alt="Kemetyl India"
            className="max-w-[180px] h-auto"
          />
        </div>

        {/* Product Categories */}
        <div>
          <h4 className="text-white text-sm tracking-wider uppercase mb-4">
            PRODUCT CATEGORIES
          </h4>
          <ul className="space-y-2.5">
            {productLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  end
                  to={link.href}
                  className="text-slate-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimers */}
        <div>
          <h4 className="text-white text-sm tracking-wider uppercase mb-4">
            DISCLAIMERS
          </h4>
          <ul className="space-y-2.5">
            {disclaimerLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  end
                  to={link.href}
                  className="text-slate-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Location */}
        <div className="space-y-6">
          <div>
            <h4 className="text-white text-sm tracking-wider uppercase mb-4">
              CUSTOMER SUPPORT
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+917795977368"
                  className="text-slate-200 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Phone size={15} className="text-red-400 shrink-0" />
                  +91 77959 77368
                </a>
              </li>
              <li>
                <a
                  href="mailto:support-in@kemetyl.com"
                  className="text-slate-200 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Mail size={15} className="text-red-400 shrink-0" />
                  support-in@kemetyl.com
                </a>
              </li>
              <li className="text-slate-200 text-sm flex items-center gap-2">
                <Clock size={15} className="text-red-400 shrink-0" />
                Mon–Sat 10 am – 5 pm
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm tracking-wider uppercase mb-4">
              DISTRIBUTORSHIP ENQUIRIES
            </h4>
            <a
              href="tel:+919900722700"
              className="text-slate-200 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
            >
              <Phone size={15} className="text-red-400 shrink-0" />
              +91 9900722700
            </a>
          </div>

          <div>
            <h4 className="text-white text-sm tracking-wider uppercase mb-4">
              VISIT OUR LOCATION
            </h4>
            <p className="text-slate-200 text-sm flex items-start gap-2">
              <MapPin size={15} className="text-red-400 shrink-0 mt-0.5" />
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
          <p className="text-slate-200 text-xs">
            &copy; Kemetyl India Markets Pvt. Ltd. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-slate-200 hover:text-white transition-colors duration-200"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-slate-200 hover:text-white transition-colors duration-200"
            >
              <FacebookIcon size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-200 hover:text-white transition-colors duration-200"
            >
              <LinkedinIcon size={18} />
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="ml-2 p-[14px] rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
