import { useState, useEffect } from 'react';

/**
 * Footer Component - Premium Footer Section
 * 
 * CUSTOMIZATION:
 * - Social links: Update the socialLinks array below with your URLs
 * - Navigation links: Edit the navigationLinks object
 * - Copyright year: Change "2023" to current year
 * - Colors: Modify CSS variables in the style block below
 * 
 * ICONS:
 * - Currently uses embedded SVG icons
 * - To use custom icons, replace SVG markup in renderIcon function
 * 
 * ACCESSIBILITY:
 * - Full keyboard navigation
 * - ARIA labels for all interactive elements
 * - Respects prefers-reduced-motion
 * - Visible focus indicators
 */

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Social media links - customize these
  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/creativecaricatureclub/', icon: 'instagram' },
    { name: 'youtube', url: 'https://www.youtube.com/@creativecaricatureclub', icon: 'youtube' },
    // { name: 'Dribbble', url: '', icon: 'dribbble' },
    // { name: 'LinkedIn', url: '', icon: 'linkedin' }
  ];

  // Navigation links - customize these
  const navigationLinks = {
    column1: [
      { text: 'Home', url: '/', current: true },
      { text: 'WORK', url: '/portfolio', current: false },
      { text: 'Workshop', url: '/workshop', current: false }
    ],
    column2: [
      { text: 'ABOUT', url: '/about', current: false },
      { text: 'SERVICES', url: '/services', current: false },
      { text: 'CONTACT', url: '/contact', current: false }
    ]
  };

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Show/hide back-to-top button based on scroll position
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 120);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  // Render social media icon SVGs
  const renderIcon = (iconName) => {
    const icons = {
      instagram: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      youtube: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    };
    return icons[iconName] || null;
  };

  return (
    <>
      {/* CSS Variables and Morion Font */}
      <style jsx>{`
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

        :root {
          --cream: #fff5df;
          --gold: #8a733e;
          --tan: #b7a26e;
          --old-lace: #fff8e7;
          --text: #8a733e;
          --bg: var(--cream);
        }
        
        .footer-link-underline {
          position: relative;
          font-family: 'Morion', 'Times New Roman', serif;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        
        .footer-link-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--gold);
          transition: width 0.3s ease;
        }
        
        .footer-link-underline:hover::after {
          width: 100%;
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
      `}</style>

      <footer
        role="contentinfo"
        aria-labelledby="footer-heading"
        className="w-full py-8 md:py-12"
        style={{ backgroundColor: 'var(--cream)', fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '20px' }}
      >
        <div className="max-w-[900px] mx-auto px-6 flex flex-col items-center border-t border-t-2 border-[#8a733e]">
          {/* Hidden heading for accessibility */}
          <h2 id="footer-heading" className="sr-only">Footer</h2>

          {/* Decorative Header Line */}
          <div
            className="w-full h-px mb-6"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
            aria-hidden="true"
          ></div>

          {/* Social Icons Row */}
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-8">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.name} (opens in new tab)`}
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2" 
                style={{ 
                  color: 'var(--gold)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={(e) => {
                  if (!prefersReducedMotion) {
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(11, 12, 12, 0.07)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                }}
              >
                {renderIcon(social.icon)}
                <span className="sr-only">{social.name}</span>
              </a>
            ))}
          </div>

          {/* Navigation Links and Back to Top Button Container */}
          <div className="w-full relative">
            <nav aria-label="Footer navigation" className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
                {/* Column 1 */}
                <ul role="list" className="space-y-2 text-center md:text-left">
                  {navigationLinks.column1.map((link) => (
                    <li key={link.text} role="listitem">
                      <a
                        href={link.url}
                        aria-current={link.current ? 'page' : undefined}
                        className={`footer-link-underline inline-block text-sm uppercase tracking-wide transition-all duration-300 ${
                          link.current ? 'font-semibold' : 'font-medium'
                        } hover:tracking-wider focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50`}
                        style={{ 
                          color: 'var(--text)',
                          focusRingColor: 'var(--gold)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--gold)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text)';
                        }}
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Column 2 */}
                <ul role="list" className="space-y-2 text-center md:text-left">
                  {navigationLinks.column2.map((link) => (
                    <li key={link.text} role="listitem">
                      <a
                        href={link.url}
                        aria-current={link.current ? 'page' : undefined}
                        className={`footer-link-underline inline-block text-sm uppercase tracking-wide transition-all duration-300 ${
                          link.current ? 'font-semibold' : 'font-medium'
                        } hover:tracking-wider focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50`}
                        style={{ 
                          color: 'var(--text)',
                          focusRingColor: 'var(--gold)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--gold)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text)';
                        }}
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className={`${
                showBackToTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              } w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 mx-auto md:absolute md:right-0 md:top-0 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                prefersReducedMotion ? '' : 'hover:scale-110'
              }`}
              style={{
                backgroundColor: 'var(--gold)',
                color: 'white',
                boxShadow: '0 4px 12px rgba(138, 115, 62, 0.3)'
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </button>
          </div>

          {/* Copyright */}
          <p 
            className="morion-text text-sm text-center mt-6"
            style={{ 
              color: 'var(--text)',
              opacity: '0.9'
            }}
          >
            ©2026 creativecaricatureclub. All Rights Reserved
          </p>
          <h3 className="morion-text text-sm text-center mt-4">
            <a 
              className="mt-8 text-sm text-center px-2 py-1 rounded-md hover:underline" 
              style={{
                color: 'var(--text)',
                opacity: '0.9',
                textDecoration: 'none'
              }}
            > 
              {/* Developed by <span className="text-[#8a733e]">KURUET</span> */}
            </a>
          </h3>
        </div>
      </footer>
    </>
  );
};

export default Footer;