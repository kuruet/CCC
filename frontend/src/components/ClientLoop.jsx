import { useState, useEffect, useRef } from 'react';

// Import your images
import client1 from '../assets/client1.jpg';
import client2 from '../assets/client2.jpg';
import client3 from '../assets/client3.jpg';
import client4 from '../assets/client4.jpg';
import client5 from '../assets/client5.jpg';
import client6 from '../assets/client6.jpg';
import client7 from '../assets/client7.jpg';
import client8 from '../assets/client8.jpg';
import client9 from '../assets/client9.jpg';
import client10 from '../assets/client10.jpg';
import client11 from '../assets/client11.jpg';
import client12 from '../assets/client12.jpg';

/**
 * Work Component - Fixed Seamless Infinite Marquee
 * Fully Responsive for All Devices
 */

const Work = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [desktopWidth, setDesktopWidth] = useState(0);
  const [mobileWidth, setMobileWidth] = useState(0);
  const desktopSetRef = useRef(null);
  const mobileSetRef = useRef(null);

  // Work items data
  const workItems = [
    { id: 1, title: ' ', slug: ' ', image: client1, category: '' },
    { id: 2, title: ' ', slug: ' ', image: client2, category: '' },
    { id: 3, title: ' ', slug: ' ', image: client3, category: '' },
    { id: 4, title: '   ', slug: ' ', image: client4, category: '' },
    { id: 5, title: '   ', slug: '  ', image: client5, category: '' },
    { id: 6, title: '  ', slug: ' ', image: client6, category: ' ' },
    { id: 7, title: ' ', slug: ' ', image: client7, category: '' },
    { id: 8, title: ' ', slug: ' ', image: client8, category: '' },
    { id: 9, title: ' ', slug: ' ', image: client9, category: '' },
    { id: 10, title: ' ', slug: ' ', image: client10, category: '' },
    { id: 11, title: ' ', slug: ' ', image: client11, category: '' },
    { id: 12, title: ' ', slug: ' ', image: client12, category: '' },
  ];

  // Calculate animation speeds
  const desktopSpeed = 120; // px per second
  const mobileSpeed = 80; // px per second
  const desktopDuration = desktopWidth > 0 ? desktopWidth / desktopSpeed : 40;
  const mobileDuration = mobileWidth > 0 ? mobileWidth / mobileSpeed : 25;

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Measure content width dynamically
    const measureWidths = () => {
      // Desktop width
      if (desktopSetRef.current) {
        const width = desktopSetRef.current.scrollWidth;
        setDesktopWidth(width);
      }

      // Mobile width
      if (mobileSetRef.current) {
        const width = mobileSetRef.current.scrollWidth;
        setMobileWidth(width);
      }
    };

    // Measure on mount
    measureWidths();

    // Measure after images load
    const timer = setTimeout(measureWidths, 100);

    // Measure on window resize
    window.addEventListener('resize', measureWidths);

    return () => {
      window.removeEventListener('resize', measureWidths);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Dynamic CSS with measured widths */}
      <style>{`
        @font-face {
          font-family: 'Morion';
          src: url('https://cdn.jsdelivr.net/gh/projectwallace/morion@main/morion.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        :root {
          --cream: #fff5df;
          --gold: #8a733e;
          --tan: #b7a26e;
          --old-lace: #fff8e7;
        }

        .my-work-section {
          color: #333;
          font-family: Morion, sans-serif;
          font-size: 40px;
          line-height: 44px;
          box-sizing: border-box;
          background-color: var(--cream);
        }

        .morion-heading {
          font-family: 'Morion', 'Times New Roman', serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Dynamic Marquee Animations */
        @keyframes marquee-desktop {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-${desktopWidth}px, 0, 0);
          }
        }

        @keyframes marquee-mobile {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-${mobileWidth}px, 0, 0);
          }
        }

        /* Panning Work Container - Full Width with Overflow Hidden */
        .panning-work,
        .panning-work-mobile {
          overflow: hidden;
          position: relative;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
        }

        /* Marquee Content Wrapper */
        .marquee-content {
          display: flex;
          gap: 2rem;
          flex-wrap: nowrap;
          will-change: transform;
          animation: marquee-desktop ${desktopDuration}s linear infinite;
        }

        .marquee-content-mobile {
          display: flex;
          gap: 1.5rem;
          flex-wrap: nowrap;
          will-change: transform;
          animation: marquee-mobile ${mobileDuration}s linear infinite;
        }

        /* Marquee Set - Individual item container */
        .marquee-set,
        .marquee-set-mobile {
          display: flex;
          gap: inherit;
          flex-shrink: 0;
        }

        /* Reduced Motion - Show Scrollable Container */
        @media (prefers-reduced-motion: reduce) {
          .marquee-content,
          .marquee-content-mobile {
            animation: none !important;
          }

          .panning-work,
          .panning-work-mobile {
            overflow-x: auto;
            scroll-behavior: smooth;
          }

          .panning-work::-webkit-scrollbar,
          .panning-work-mobile::-webkit-scrollbar {
            height: 8px;
          }

          .panning-work::-webkit-scrollbar-track,
          .panning-work-mobile::-webkit-scrollbar-track {
            background: var(--old-lace);
            border-radius: 4px;
          }

          .panning-work::-webkit-scrollbar-thumb,
          .panning-work-mobile::-webkit-scrollbar-thumb {
            background: var(--tan);
            border-radius: 4px;
          }
        }

        /* Collection Items */
        .collection-item {
          flex-shrink: 0;
          position: relative;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
        }

        .collection-item:hover {
          transform: scale(1.05);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
        }

        .work-item-image {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          width: 100%;
          height: 100%;
          transition: transform 0.4s ease;
        }

        .collection-item:hover .work-item-image {
          transform: scale(1.1);
        }

        .work-item-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .collection-item:hover .work-item-overlay {
          opacity: 1;
        }

        .learn-more {
          position: relative;
          display: inline-block;
        }

        .learn-more::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .collection-item:hover .learn-more::after {
          transform: scaleX(1);
        }

        .carousel-line-mobile {
          width: 40px;
          height: 2px;
          background-color: var(--gold);
          margin: 8px auto;
          opacity: 0.5;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        /* Responsive Heading Styles */
        @media (max-width: 640px) {
          .morion-heading {
            font-size: 28px !important;
            line-height: 34px !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 1rem;
            height: auto !important;
            margin-top: 20px !important;
            margin-bottom: 20px !important;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .morion-heading {
            font-size: 36px !important;
            line-height: 42px !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 1.5rem;
            height: auto !important;
            margin-top: 25px !important;
            margin-bottom: 25px !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .morion-heading {
            font-size: 48px !important;
            line-height: 56px !important;
            width: 100% !important;
            max-width: 800px !important;
            height: auto !important;
            margin-top: 30px !important;
            margin-bottom: 30px !important;
          }
        }

        @media (min-width: 1025px) {
          .morion-heading {
            font-size: 60px !important;
            line-height: 70px !important;
            width: 900px !important;
            max-width: 900px !important;
            height: 50px !important;
            margin-top: 40px !important;
            margin-bottom: 40px !important;
          }
        }
      `}</style>

      {/* Main Section */}
      <section className="my-work-section w-full py-8 sm:py-12 md:py-16 lg:py-24" aria-label="Work showcase">
        <div className="container-5 w-container max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          
          {/* Section Heading */}
          <div className="flex flex-col items-center mb-8 sm:mb-10 md:mb-12">
            <h1
              className="morion-heading flex justify-center items-center text-center whitespace-normal mx-auto"
              style={{
                color: 'var(--gold)',
                letterSpacing: '2px',
                fontStyle: 'normal',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              OUR HAPPY CLIENTS
            </h1>
          </div>

          {/* Desktop/Tablet: Seamless Marquee - Full Width */}
          <div 
            className="hidden sm:block panning-work mb-8 sm:mb-10 md:mb-12"
            role="region"
            aria-labelledby="work-heading"
            aria-live={prefersReducedMotion ? "polite" : "off"}
          >
            <div className="marquee-content">
              {/* First Set of Items */}
              <div className="marquee-set" ref={desktopSetRef}>
                {workItems.map((item) => (
                  <a
                    key={`first-${item.id}`}
                     
                    className="collection-item"
                    style={{ 
                      width: 'clamp(280px, 30vw, 400px)',
                      minWidth: 'clamp(280px, 30vw, 400px)',
                      height: 'clamp(350px, 40vw, 500px)'
                    }}
                    aria-label={`View ${item.title} project`}
                    tabIndex="0"
                  >
                    <div
                      className="work-item-image"
                      style={{ backgroundImage: `url(${item.image})` }}
                    >
                      <img src={item.image} alt="" className="sr-only" />
                    </div>

                    <div className="work-item-overlay">
                      <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 text-center px-4">
                        {item.title}
                      </h3>
                      <span className="learn-more text-white text-xs sm:text-sm uppercase tracking-widest font-medium">
                        {/* Learn More */}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Duplicated Set for Seamless Loop */}
              <div className="marquee-set" aria-hidden="true">
                {workItems.map((item) => (
                  <a
                    key={`duplicate-${item.id}`}
                   
                    className="collection-item"
                    style={{ 
                      width: 'clamp(280px, 30vw, 400px)',
                      minWidth: 'clamp(280px, 30vw, 400px)',
                      height: 'clamp(350px, 40vw, 500px)'
                    }}
                    tabIndex="-1"
                  >
                    <div
                      className="work-item-image"
                      style={{ backgroundImage: `url(${item.image})` }}
                    >
                      <img src={item.image} alt="" className="sr-only" />
                    </div>

                    <div className="work-item-overlay">
                      <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 text-center px-4">
                        {item.title}
                      </h3>
                      <span className="learn-more text-white text-xs sm:text-sm uppercase tracking-widest font-medium">
                        Learn More
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: Full Width Marquee */}
          <div 
            className="sm:hidden panning-work-mobile mb-8"
            role="region"
            aria-labelledby="work-heading"
            aria-live={prefersReducedMotion ? "polite" : "off"}
          >
            <div className="marquee-content-mobile">
              {/* First Set */}
              <div className="marquee-set-mobile" ref={mobileSetRef}>
                {workItems.map((item) => (
                  <div 
                    key={`mobile-first-${item.id}`} 
                    className="flex-shrink-0" 
                    style={{ minWidth: '240px', width: '240px' }}
                  >
                    <a
                      
                      className="block"
                      aria-label={`View ${item.title} project`}
                      tabIndex="0"
                    >
                      <div className="relative rounded-xl overflow-hidden shadow-lg mb-3" style={{ height: '320px' }}>
                        <div
                          className="work-item-image"
                          style={{ backgroundImage: `url(${item.image})` }}
                        >
                          <img src={item.image} alt="" className="sr-only" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>

                      <div className="mobile-work-title-home text-center">
                        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--gold)' }}>
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2">{item.category}</p>
                        <div className="carousel-line-mobile"></div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>

              {/* Duplicated Set */}
              <div className="marquee-set-mobile" aria-hidden="true">
                {workItems.map((item) => (
                  <div 
                    key={`mobile-duplicate-${item.id}`} 
                    className="flex-shrink-0" 
                    style={{ minWidth: '240px', width: '240px' }}
                  >
                    <a
                       
                      className="block"
                      tabIndex="-1"
                    >
                      <div className="relative rounded-xl overflow-hidden shadow-lg mb-3" style={{ height: '320px' }}>
                        <div
                          className="work-item-image"
                          style={{ backgroundImage: `url(${item.image})` }}
                        >
                          <img src={item.image} alt="" className="sr-only" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>

                      <div className="mobile-work-title-home text-center">
                        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--gold)' }}>
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2">{item.category}</p>
                        <div className="carousel-line-mobile"></div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Work;