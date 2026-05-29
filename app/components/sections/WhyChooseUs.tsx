import { Link } from 'react-router';
import { ArrowRight, ShieldCheck, Sparkles, Droplet } from 'lucide-react';

export function WhyChooseUs() {
  return (
    <section className="relative w-full bg-zinc-950 py-28 sm:py-36 lg:py-48 overflow-hidden selection:bg-rose-500/30 selection:text-rose-100 border-t border-zinc-900">

      {/* Cinematic Dark Mode Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-rose-600/15 rounded-full mix-blend-screen blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full mix-blend-screen blur-[120px]" style={{ animationDelay: '2s' }} />
        {/* Widened dot matrix grid for a cleaner, less cluttered background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '64px 64px' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Adjusted mobile gap to prevent the layout from feeling disconnected */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left: Content */}
          <div className="max-w-2xl">


            <h2 className="text-5xl sm:text-6xl lg:text-[72px] font-black tracking-tight leading-[1.05] text-white mb-6">
              Engineered for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">
                Obsession.
              </span>
            </h2>

            <p className="text-lg sm:text-xl leading-relaxed text-zinc-400 font-medium mb-10 sm:mb-12">
              We treat your vehicle with the same obsession you do. Formulated with European expertise and backed by Indian trust, our products deliver uncompromising performance.
            </p>

            {/* Feature List: Switched to flex gap for more consistent spacing */}
            <div className="flex flex-col gap-6 sm:gap-8 mt-10 mb-10 sm:mb-12">
              {[
                { icon: ShieldCheck, title: 'Industrial-Grade Protection', desc: 'Advanced polymers form a resilient shield against extreme Indian road conditions.' },
                { icon: Sparkles, title: 'Cinematic Showroom Finish', desc: 'High-gloss formulations that restore deep, mirror-like clarity instantly.' },
                { icon: Droplet, title: 'Hydrophobic Defense', desc: 'Extreme water-beading technology effectively repels dirt, grime, and rain.' }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="group flex items-start gap-4 sm:gap-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 group-hover:border-rose-500/50 group-hover:bg-rose-500/10">
                      <Icon size={24} className="text-rose-500 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2 tracking-tight group-hover:text-rose-400 transition-colors">{item.title}</h4>
                      <p className="text-sm sm:text-base text-zinc-400 font-medium leading-relaxed max-w-sm">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <Link
              to="/about"
              className="group relative inline-flex items-center justify-center sm:justify-start gap-2 px-8 py-4 w-full sm:w-auto bg-white text-zinc-950 text-base font-bold tracking-wide rounded-full border border-transparent transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-500/50"
            >
              Discover Our Story
              <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right: Visual Layout */}
          <div className="relative w-full aspect-square lg:aspect-[3/4] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-zinc-900 ring-1 ring-white/10 group shadow-2xl">

            <img
              src="/bg.jpg"
              alt="High-gloss detailing on a luxury vehicle"
              className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[2s] group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />

            {/* Floating Glass Stats: Refactored for robust responsiveness */}
            <div className="absolute inset-x-4 bottom-4 sm:inset-x-8 sm:bottom-8 z-10 flex flex-col gap-3 sm:gap-4">

              {/* Card 1 */}
              <div className="w-full sm:w-[90%] backdrop-blur-xl bg-white/10 border border-white/20 p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] transform transition-transform duration-700 group-hover:-translate-y-1 sm:group-hover:-translate-y-2">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-rose-400 font-black text-3xl sm:text-4xl tracking-tight">100k+</span>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10 shadow-inner">
                    <ShieldCheck size={20} className="text-white" />
                  </div>
                </div>
                <div className="text-white font-bold text-base sm:text-lg tracking-tight">Enthusiasts Trust Us</div>
                <div className="text-sm sm:text-base text-zinc-300 font-medium mt-1">Across the entire country</div>
              </div>

              {/* Card 2: Uses `self-end` to offset rather than hardcoded `ml-12` */}
              <div className="w-full sm:w-[90%] self-end backdrop-blur-xl bg-white/5 border border-white/10 p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] transform transition-transform duration-700 group-hover:-translate-y-1 sm:group-hover:-translate-y-2 delay-75">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-white font-black text-3xl sm:text-4xl tracking-tight">9H</span>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rose-500/20 flex items-center justify-center backdrop-blur-md border border-rose-500/20 shadow-inner">
                    <Sparkles size={20} className="text-rose-400" />
                  </div>
                </div>
                <div className="text-white font-bold text-base sm:text-lg tracking-tight">Hardness Rating</div>
                <div className="text-sm sm:text-base text-zinc-300 font-medium mt-1">Maximum ceramic defense</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}