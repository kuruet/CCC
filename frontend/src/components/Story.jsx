
import storyImage from '../assets/images/story-22.jpg';

export default function Story() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#FFF5DF]">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={storyImage}
          alt=""
          className="
            absolute top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            w-full h-full
            object-contain
          "
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-800/45 to-neutral-900/60 pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-10 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8">
          {/* <h3 className="text-xs sm:text-sm tracking-[0.3em] uppercase text-neutral-100/80 font-light">
            the experience
          </h3> */}

          <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/90 font-light max-w-2xl mx-auto px-2">
It starts with a conversation, turns into laughter, and ends with something people keep forever.          </p>

          {/* <a
            href="#more"
            className="inline-block text-sm sm:text-base text-white/85 underline underline-offset-4 decoration-white/50 hover:opacity-70 transition-opacity duration-300"
          >
            View more info
          </a> */}
        </div>
      </div>
    </section>
  );
}

