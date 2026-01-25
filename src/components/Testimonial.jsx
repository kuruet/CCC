import { useState, useEffect, useRef } from 'react';

/**
 * Testimonial Component - Premium Client Testimonial Block
 * 
 * CUSTOMIZATION:
 * - Accent color: Change 'text-gray-900' to your brand color (e.g., 'text-blue-600')
 * - Background: Component is transparent, inherits from parent
 * - Pass custom data via props: <Testimonial data={{...}} />
 * 
 * ACCESSIBILITY:
 * - Respects prefers-reduced-motion
 * - Semantic HTML with proper ARIA labels
 * - Keyboard accessible with focus indicators
 * 
 * OPTIONAL CSS (add to src/index.css if needed):
 * @media (prefers-reduced-motion: reduce) {
 *   .testimonial-animate {
 *     animation: none !important;
 *     transform: none !important;
 *     transition: none !important;
 *   }
 * }
 */

// Default testimonial data
const defaultData = {
  eyebrow: "KIND WORDS",
  quote: "“Our guests still talk about how effortlessly fun CreativeCaricatureClub made our wedding reception! The artist arrived early, mingled with everyone, and created caricatures on-the-spot that captured personalities so cleverly. Even my grandma — who is usually camera-shy — jumped right in with a giant grin. We now have these amazing keepsakes for our photo-album, and I couldn’t recommend them more",
// — Laura & James Collins, Bride & Groom, July 2025",
  author: " Bride & Groom, July 2025",
  ctaText: "READ MORE",
  ctaHref: "/testimonials"
};

const Testimonial = ({ data = defaultData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // IntersectionObserver for entrance animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Merge provided data with defaults
  const testimonialData = { ...defaultData, ...data };

  return (
    <>
      {/* Morion Font */}
      <style>{`
        @font-face {
          font-family: 'Morion';
          src: url('https://cdn.jsdelivr.net/gh/projectwallace/morion@main/morion.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        .morion-text {
          font-family: 'Morion', 'Times New Roman', serif;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
      `}</style>

      <section
        ref={sectionRef}
        role="region"
        aria-labelledby="testimonial-heading"
        className="w-full py-16 md:py-24"
        style={{ backgroundColor: '#fff5df' }}
      >
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          {/* Main Content Block */}
          <div
            className={`relative ${
              prefersReducedMotion
                ? ''
                : `transition-all duration-700 ease-out ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`
            } testimonial-animate`}
          >
            {/* Decorative Quote Mark - Large background element */}
            <div
              className="absolute -top-8 -left-4 md:-left-8 text-gray-200 opacity-20 pointer-events-none select-none"
              style={{ color: "#8a733e" }}
              aria-hidden="true"
            >
              <span className="morion-text text-8xl md:text-9xl leading-none" style={{ color: "#8a733e" }}>"</span>
            </div>

            {/* Eyebrow Label */}
            <div
              id="testimonial-heading"
              className={`morion-text text-sm md:text-base font-semibold uppercase tracking-widest mb-6 md:mb-8 text-center md:text-left ${
                prefersReducedMotion ? '' : 'transition-all duration-500 delay-100'
              }`}
              style={{
                color: '#8a733e',
                ...(!prefersReducedMotion && !isVisible ? { opacity: 0, transform: 'translateY(10px)' } : {})
              }}            
            >
              {testimonialData.eyebrow}
            </div>

            {/* Quote Block */}
            <blockquote
              className={`relative z-10 mb-6 md:mb-8 ${
                prefersReducedMotion ? '' : 'transition-all duration-500 delay-200'
              }`}
              style={!prefersReducedMotion && !isVisible ? { opacity: 0, transform: 'translateY(10px)' } : {}}
            >
              <p className="morion-text text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-800 text-center md:text-left" style={{ color: "#8a733e" }}>
                "{testimonialData.quote}"
              </p>
            </blockquote>

            {/* Author Line */}
            <div 
              className={`morion-text text-base md:text-lg font-semibold text-gray-700 mb-6 text-center md:text-left ${
                prefersReducedMotion ? '' : 'transition-all duration-500 delay-300'
              }`}
              style={{
                color: '#8a733e',
                ...(!prefersReducedMotion && !isVisible ? { opacity: 0, transform: 'translateY(10px)' } : {})
              }}
            >
              <cite className="not-italic">— {testimonialData.author}</cite>
            </div>

            {/* Horizontal Rule */}
            <div
              className={`w-full h-px bg-gray-300 mb-4 ${
                prefersReducedMotion ? '' : 'transition-all duration-500 delay-400'
              }`}
              style={!prefersReducedMotion && !isVisible ? { opacity: 0 } : {}}
              aria-hidden="true"
            ></div>

            {/* CTA Link */}
            <div
              className={`flex justify-center md:justify-end ${
                prefersReducedMotion ? '' : 'transition-all duration-500 delay-500'
              }`}
              style={!prefersReducedMotion && !isVisible ? { opacity: 0, transform: 'translateY(10px)' } : {}}
            >
              <a
                href={testimonialData.ctaHref}
                aria-label={`${testimonialData.ctaText} - View all testimonials`}
                className="morion-text text-sm font-medium uppercase tracking-wide text-gray-900 hover:text-gray-700 underline-offset-4 hover:underline transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-4 rounded px-2 py-1"
                style={{ color: "#8a733e" }}
                rel="noopener noreferrer"
              >
                {testimonialData.ctaText}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;