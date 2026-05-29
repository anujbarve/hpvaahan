import { Link } from 'react-router';
import { ArrowRight, Package, Shield, Leaf, Truck, ChevronRight } from 'lucide-react';

export function ProductCategories() {
  const categories = [
    {
      title: 'Car',
      desc: 'Professional-grade formulations for a cinematic showroom shine and industrial-grade protection.',
      icon: Package,
      href: '/collections/car',
      // Bento: Large primary card
      className: 'md:col-span-2 md:row-span-2 bg-zinc-950 text-white shadow-2xl ring-1 ring-white/10',
      iconClass: 'text-zinc-950',
      iconWrapperClass: 'bg-white',
      titleClass: 'text-white',
      descClass: 'text-zinc-400',
      actionClass: 'text-white border-white/20 hover:bg-white/10',
      imageOverlay: 'bg-gradient-to-br from-rose-500/20 via-transparent to-transparent',
    },
    {
      title: 'Bike',
      desc: 'Precision maintenance essentials for a spotless, protected ride.',
      icon: Shield,
      href: '/collections/bike',
      // Bento: Standard square
      className: 'md:col-span-1 md:row-span-1 bg-white border border-slate-200/60 shadow-xl shadow-slate-200/20',
      iconClass: 'text-rose-600',
      iconWrapperClass: 'bg-rose-50',
      titleClass: 'text-zinc-950',
      descClass: 'text-slate-500',
      actionClass: 'text-zinc-950 border-slate-200 hover:bg-slate-50',
      imageOverlay: '',
    },
    {
      title: 'Monsoon Combo',
      desc: 'Maximum visibility and hydrophobic defense for extreme weather.',
      icon: Leaf,
      href: '/collections/frontpage',
      // Bento: Standard square
      className: 'md:col-span-1 md:row-span-1 bg-rose-50 border border-rose-100/60 shadow-xl shadow-rose-100/20',
      iconClass: 'text-rose-600',
      iconWrapperClass: 'bg-white',
      titleClass: 'text-zinc-950',
      descClass: 'text-rose-600/80',
      actionClass: 'text-zinc-950 border-rose-200 hover:bg-rose-100',
      imageOverlay: '',
    },
    {
      title: 'Maintenance Fluids',
      desc: 'Engineered fluids to keep your vehicle running flawlessly.',
      icon: Truck,
      href: '/collections/maintenance-products',
      // Bento: Wide rectangle
      className: 'md:col-span-2 md:row-span-1 bg-white border border-slate-200/60 shadow-xl shadow-slate-200/20',
      iconClass: 'text-blue-600',
      iconWrapperClass: 'bg-blue-50',
      titleClass: 'text-zinc-950',
      descClass: 'text-slate-500',
      actionClass: 'text-zinc-950 border-slate-200 hover:bg-slate-50',
      imageOverlay: '',
    },
  ];

  return (
    <section className="relative w-full bg-slate-50 py-24 lg:py-32 overflow-hidden selection:bg-rose-500/20 selection:text-rose-900">
      
      {/* Cinematic Ambient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rose-200/20 rounded-full mix-blend-multiply blur-[120px] opacity-70 transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-300/30 rounded-full mix-blend-multiply blur-[120px] opacity-50 transform -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl lg:text-[80px] font-black tracking-[-0.04em] leading-[0.95] text-zinc-950 mb-6">
              Precision <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800">
                Performance.
              </span>
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-slate-600 font-medium max-w-lg">
              Explore our category of high-performance formulations engineered for extreme Indian conditions.
            </p>
          </div>
          <Link
            to="/collections/all"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-950 rounded-full overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 flex-shrink-0"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10 text-white text-base font-bold tracking-wide">Shop All</span>
            <ArrowRight size={18} className="relative z-10 text-white transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Proper Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-4 sm:gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.title}
                to={cat.href}
                className={`group relative flex flex-col justify-between p-8 sm:p-10 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-1 ${cat.className}`}
              >
                {/* Optional overlay for the large card */}
                {cat.imageOverlay && (
                  <div className={`absolute inset-0 pointer-events-none z-0 ${cat.imageOverlay}`} />
                )}

                {/* Top Section: Icon */}
                <div className="relative z-10 flex items-start justify-between">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-500 group-hover:scale-110 ${cat.iconWrapperClass}`}>
                    <Icon size={28} className={cat.iconClass} strokeWidth={2} />
                  </div>
                  
                  {/* Action button inside card */}
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:rotate-45 ${cat.actionClass}`}>
                    <ArrowRight size={16} />
                  </div>
                </div>

                {/* Bottom Section: Text */}
                <div className="relative z-10 mt-auto pt-8">
                  <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-3 ${cat.titleClass}`}>
                    {cat.title}
                  </h3>
                  <p className={`text-base sm:text-lg font-medium leading-relaxed max-w-sm ${cat.descClass}`}>
                    {cat.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
