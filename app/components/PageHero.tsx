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
    <section className="relative overflow-hidden bg-gradient-to-br from-red-600/5 via-white to-red-600/10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-red-400/5 rounded-full blur-2xl" />
      </div>

      <div className="relative px-6 py-20 md:py-28">
        <div className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-lg shadow-red-900/5 border border-white/30 p-8 md:p-12">
          <nav className="mb-4 text-sm text-gray-500">
            {breadcrumbs.map((crumb, i) => (
              <span key={i}>
                {i > 0 && <span className="mx-2 text-gray-300">›</span>}
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-red-600 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-800 font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
