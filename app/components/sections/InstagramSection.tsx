import {ArrowRight} from 'lucide-react';

export function InstagramSection() {
  const posts = [
    'https://www.instagram.com/hpvaahn/reel/DMspd8XN0E1/',
    'https://www.instagram.com/hpvaahn/reel/DSC6RCZjYx5/',
    'https://www.instagram.com/reel/DXGyPYFjcIy/',
    'https://www.instagram.com/hpvaahn/reel/DYFDGrXtIbf/',
  ];

  return (
    <section className="relative w-full bg-white py-24 lg:py-32 overflow-hidden selection:bg-rose-500/20 selection:text-rose-900 border-t border-slate-100">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-rose-50 rounded-full mix-blend-multiply blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-slate-50 rounded-full mix-blend-multiply blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/80 border border-slate-200 backdrop-blur-md mb-8">
            <InstagramIcon className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
              @hpvaahn
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-[80px] font-black tracking-[-0.04em] leading-[0.95] text-zinc-950 mb-6">
            Join The <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">
              Community.
            </span>
          </h2>

          <p className="text-lg sm:text-xl leading-relaxed text-slate-500 font-medium max-w-2xl mx-auto">
            Follow us for the latest detailing tips, product launches, and
            stunning transformations.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {posts.map((url, i) => {
            // Apply different hover rotations for a playful, organic feel
            const rotations = [
              'group-hover:rotate-2',
              'group-hover:-rotate-2',
              'group-hover:rotate-1',
              'group-hover:-rotate-1',
            ];

            return (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noreferrer"
                className={`group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/10 hover:-translate-y-2 ${rotations[i % 4]}`}
              >
                {/* Reel thumbnail */}
                <img
                  src={`/reels/reel${i + 1}.jpg`}
                  alt={`HP Vaahn Instagram Reel ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-zinc-950/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Center Icon */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                  <InstagramIcon className="w-8 h-8 text-rose-500" />
                </div>

                {/* Hover text indicator */}
                <div className="absolute bottom-6 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-10">
                  <span className="text-white font-medium text-sm tracking-wide">
                    Watch Reel
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://www.instagram.com/hpvaahn/"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-zinc-950 hover:bg-slate-50 border border-slate-200 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:border-slate-300"
          >
            <InstagramIcon className="w-5 h-5" useGradient={true} />
            Follow @hpvaahn
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

function InstagramIcon({
  className,
  useGradient = false,
}: {
  className?: string;
  useGradient?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || 'text-current'}
    >
      {useGradient && (
        <defs>
          <linearGradient
            id="instagram-grad"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#4f5bd5" />
            <stop offset="35%" stopColor="#962fbf" />
            <stop offset="65%" stopColor="#d62976" />
            <stop offset="100%" stopColor="#fa7e1e" />
          </linearGradient>
        </defs>
      )}
      <rect
        width="20"
        height="20"
        x="2"
        y="2"
        rx="5"
        ry="5"
        stroke={useGradient ? 'url(#instagram-grad)' : 'currentColor'}
      />
      <path
        d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
        stroke={useGradient ? 'url(#instagram-grad)' : 'currentColor'}
      />
      <line
        x1="17.5"
        x2="17.51"
        y1="6.5"
        y2="6.5"
        stroke={useGradient ? 'url(#instagram-grad)' : 'currentColor'}
      />
    </svg>
  );
}
