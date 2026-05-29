import {Link} from 'react-router';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

export function PageHero({title, breadcrumbs}: PageHeroProps) {
  return (
    <section className="bg-gradient-to-r from-red-600 to-red-700 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <nav className="mb-4 text-sm text-white/70">
          {breadcrumbs.map((crumb, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-2">›</span>}
              {crumb.href ? (
                <Link to={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white/90">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
    </section>
  );
}
