import { Link } from 'react-router';
import { ArrowRight, Shield, Sparkles, Droplets } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-slate-50 overflow-hidden selection:bg-rose-500/20 selection:text-rose-900 font-sans flex flex-col items-center pt-24 pb-12 lg:pt-32">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        /* Cinematic Reveal Animations */
        @keyframes reveal-up {
          0% { opacity: 0; transform: translateY(40px) scale(0.98); filter: blur(5px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        /* DIALED BACK CINEMATIC TEXT - ~60-70% of screen width */
        .cinematic-title {
          font-size: clamp(3rem, 7vw, 110px); 
          line-height: 0.95;
          letter-spacing: -0.03em;
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 6s ease-in-out 3s infinite; }
        .animate-pulse-glow { animation: pulse-glow 6s ease-in-out infinite; }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
        
        /* Chained Animations */
        .animate-title { 
          animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
        .animate-subtitle { 
          animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
          animation-delay: 0.3s; 
          opacity: 0; 
        }
        .animate-actions { 
          animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
          animation-delay: 0.5s; 
          opacity: 0; 
        }

        .perspective-container { perspective: 1400px; }
        .tilt-card {
          transform: rotateX(8deg) scale(0.96) translateY(12px);
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.8s ease;
        }
        .perspective-container:hover .tilt-card {
          transform: rotateX(0deg) scale(1) translateY(0);
          box-shadow: 0 35px 60px -15px rgba(0,0,0,0.3);
        }
      `}</style>

      {/* Decorative Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <svg className="w-full h-full text-slate-900" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Ambient Background Glows */}
      <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-rose-500/15 rounded-full mix-blend-multiply blur-[100px] animate-pulse-glow pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[15%] w-[500px] h-[500px] bg-slate-400/15 rounded-full mix-blend-multiply blur-[120px] animate-pulse-glow pointer-events-none z-0" style={{ animationDelay: '3s' }} />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mb-12 sm:mb-20">

        {/* Text Group - Removed w-screen override, naturally sits inside max-w-6xl */}
        <div className="flex flex-col items-center justify-center w-full mb-10 overflow-visible">
          <h1 className="cinematic-title font-black text-zinc-950 drop-shadow-sm text-center animate-title whitespace-nowrap">
            Engineered Clean.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 animate-gradient-x inline-block mt-2 pb-2">
              Built for India.
            </span>
          </h1>

          <p className="max-w-2xl mt-6 text-lg sm:text-xl leading-relaxed text-slate-600 font-medium text-center animate-subtitle px-4">
            High-performance automotive care formulations designed to withstand extreme conditions, delivering a cinematic shine and industrial-grade protection.
          </p>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto z-20 animate-actions">
          <Link
            to="/collections/all"
            className="group relative flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 bg-zinc-950 rounded-full overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10 text-white text-base font-bold tracking-wide">Shop Car Care</span>
            <ArrowRight size={18} className="relative z-10 text-white transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>

          <Link
            to="/collections/all"
            className="flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-md text-zinc-950 text-base font-bold tracking-wide rounded-full border border-slate-200/80 transition-all duration-300 hover:bg-white hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
          >
            Shop Bike Care
          </Link>
        </div>
      </div>

      {/* Hero Visuals */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 perspective-container flex-grow flex items-end">

        {/* Floating Insight Card 1 */}
        <div className="absolute top-10 right-4 lg:right-16 z-30 flex items-center gap-4 p-4 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl animate-float cursor-default">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 border border-rose-100 shadow-inner">
            <Shield size={20} className="text-rose-600" aria-hidden="true" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div className="text-left">
            <div className="mb-0.5 text-xs font-bold text-slate-400 uppercase tracking-widest">Protection</div>
            <div className="text-sm font-black text-zinc-950">9H Hardness</div>
          </div>
        </div>

        {/* Floating Insight Card 2 */}
        <div className="hidden md:flex absolute top-1/3 left-4 lg:left-12 z-30 items-center gap-4 p-4 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl animate-float-delayed cursor-default">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 border border-blue-100 shadow-inner">
            <Droplets size={20} className="text-blue-600" aria-hidden="true" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div className="text-left">
            <div className="mb-0.5 text-xs font-bold text-slate-400 uppercase tracking-widest">Finish</div>
            <div className="text-sm font-black text-zinc-950">Hydrophobic</div>
          </div>
        </div>

        {/* Main Image Container */}
        <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] bg-zinc-900 rounded-t-[2rem] overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 tilt-card mt-auto">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent z-20" />

          <img
            alt="Cinematic car detailing shot showcasing high-performance automotive care"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1.5s] hover:scale-105"
            src="/bg.jpg"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
          />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/60 pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}