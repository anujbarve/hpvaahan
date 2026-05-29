import { Star, ArrowRight, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Rohit S.',
      location: 'Mumbai',
      quote: 'HP Vaahn\'s car care range is fantastic! The polish gave my car a showroom shine, and the cleaning solutions work like magic. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Amit K.',
      location: 'Bangalore',
      quote: 'As a bike enthusiast, I\'m very particular about maintenance. HP Vaahn\'s bike care products keep my ride spotless and well-protected. A must-have!',
      rating: 5,
    },
    {
      name: 'Mohit M.',
      location: 'Delhi',
      quote: 'HP Vaahn Waterless Wash with Premium Wax is a total game-changer! My car looks freshly detailed every time I use it, and I don\'t even need water.',
      rating: 5,
    },
    {
      name: 'Sameer P.',
      location: 'Pune',
      quote: 'The microfiber cloths and maintenance products are of excellent quality. They make cleaning effortless and ensure my vehicle stays in great condition.',
      rating: 5,
    },
  ];

  return (
    <section className="relative w-full bg-zinc-950 py-24 lg:py-32 overflow-hidden selection:bg-rose-500/30 selection:text-rose-100 border-t border-zinc-900">
      
      {/* Cinematic Dark Mode Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full mix-blend-screen blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full mix-blend-screen blur-[120px]" style={{ animationDelay: '2s' }} />
        {/* Subtle noise/grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Enthusiast Approved</span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl lg:text-[80px] font-black tracking-[-0.04em] leading-[0.95] text-white mb-6">
              Don't Just Take <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">
                Our Word.
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl leading-relaxed text-zinc-400 font-medium max-w-xl">
              Discover why thousands of car and bike enthusiasts across India trust HP Vaahn for their premium detailing needs.
            </p>
          </div>
          
          <a
            href="https://socialpill.in/hpclvaahn/services/"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-zinc-950 text-base font-bold tracking-wide rounded-full transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] flex-shrink-0"
          >
            See All Reviews
            <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Masonry / Staggered Layout for Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start pb-12 md:pb-24">
          {testimonials.map((t, index) => {
            // Create a staggered effect similar to the benefits section
            const isOffset = index % 2 === 1;
            
            return (
              <div
                key={t.name}
                className={`group relative p-8 sm:p-10 lg:p-12 rounded-[2rem] bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-rose-500/30 hover:bg-zinc-900/80 ${isOffset ? 'md:mt-12' : ''}`}
              >
                <div className="absolute top-8 right-8 text-zinc-800 transition-colors duration-500 group-hover:text-rose-500/20">
                  <Quote size={64} className="opacity-50" />
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-1.5 mb-8">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={18} className="fill-rose-500 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                    ))}
                  </div>
                  
                  <p className="text-xl sm:text-2xl text-zinc-300 leading-relaxed font-medium mb-12 tracking-tight group-hover:text-white transition-colors">
                    "{t.quote}"
                  </p>
                  
                  <div className="mt-auto flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold text-lg border border-zinc-700 shadow-inner group-hover:border-rose-500/50 group-hover:text-rose-400 transition-colors">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{t.name}</h4>
                      <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{t.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
