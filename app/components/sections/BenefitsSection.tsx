import { Shield, Package, Truck, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export function BenefitsSection() {
  const benefits = [
    {
      icon: Shield,
      title: 'Premium Auto Care Products',
      description: 'Get top-notch car, bike, and scooter care essentials, ensuring your vehicle stays in pristine condition. Trusted by automobile enthusiasts for quality and reliability.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'group-hover:border-emerald-200',
      shadow: 'group-hover:shadow-emerald-900/5',
    },
    {
      icon: Package,
      title: 'Wide Range of Categories',
      description: 'From car care and air fresheners to microfibre cloths and maintenance products, find everything you need in one place. A complete solution for vehicle hygiene and upkeep.',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'group-hover:border-blue-200',
      shadow: 'group-hover:shadow-blue-900/5',
    },
    {
      icon: Truck,
      title: 'Fast & Hassle-Free Delivery',
      description: 'Enjoy quick and reliable delivery across India, ensuring your favorite products reach you on time. Experience seamless shopping with secure payments and easy returns.',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'group-hover:border-amber-200',
      shadow: 'group-hover:shadow-amber-900/5',
    },
    {
      icon: Star,
      title: 'Advanced Formulations',
      description: 'Crafted with cutting-edge technology for superior cleaning, protection, and maintenance. Designed to enhance your vehicle\'s longevity and keep it fresh and shining.',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'group-hover:border-rose-200',
      shadow: 'group-hover:shadow-rose-900/5',
    },
  ];

  return (
    <section className="relative w-full bg-slate-50 py-24 lg:py-32 overflow-hidden selection:bg-rose-500/20 selection:text-rose-900">

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full mix-blend-multiply blur-[120px] transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-100/50 rounded-full mix-blend-multiply blur-[120px] transform -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Massive Typography Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div className="max-w-3xl">


            <h2 className="text-5xl sm:text-6xl lg:text-[80px] font-black tracking-[-0.04em] leading-[0.95] text-zinc-950 mb-6">
              Why Shop <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">
                With Us.
              </span>
            </h2>

            <p className="text-lg sm:text-xl leading-relaxed text-slate-600 font-medium max-w-xl">
              Experience the difference with India's trusted auto care brand. We deliver uncompromising quality directly to your doorstep.
            </p>
          </div>

          <Link
            to="/about"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-zinc-950 text-base font-bold tracking-wide rounded-full border border-slate-200 transition-all duration-300 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 flex-shrink-0"
          >
            Learn More
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start pb-12 md:pb-24">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            // Add a slight stagger to the layout for visual interest
            const isOffset = index % 2 === 1;

            return (
              <div
                key={benefit.title}
                className={`group relative bg-white rounded-[2rem] p-8 sm:p-10 lg:p-12 border border-slate-100 shadow-xl shadow-slate-200/20 transition-all duration-500 hover:-translate-y-2 ${benefit.border} ${benefit.shadow} ${isOffset ? 'md:mt-16' : ''}`}
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-16 h-16 rounded-2xl ${benefit.bg} flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110`}>
                    <Icon size={32} className={benefit.color} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 mb-4 tracking-tight">
                    {benefit.title}
                  </h3>

                  <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-medium">
                    {benefit.description}
                  </p>
                </div>

                {/* Decorative background element on hover */}
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none">
                  <Icon size={120} className={benefit.color} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
