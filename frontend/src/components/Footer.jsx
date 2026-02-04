import React, { useState, useEffect, useMemo } from 'react';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  // Safe check for SSR/Build time
  const isReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return (
    <>
      <style>{`
        @font-face {
          font-family: 'Morion';
          src: url('/fonts/Morion-Regular.woff2') format('woff2'),
               url('/fonts/Morion-Regular.woff') format('woff');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        :root {
          --cream: #FFF5DF;
          --gold: #D4AF37;
          --tan: #C19A6B;
          --old-lace: #FDF5E6;
          --text: #2C2416;
          --bg: #FFFBF0;
        }

        .morion-text {
          font-family: 'Morion', serif;
        }

        .footer-link-underline {
          position: relative;
          display: inline-block;
        }

        .footer-link-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: #FFF5DF;
          transition: width 0.3s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-link-underline::after {
            transition: none;
          }
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

      <footer role="contentinfo" className="w-full" style={{ backgroundColor: '#8A733E', color: '#FFF5DF' }}>
        <div className="max-w-[900px] mx-auto px-6 py-16">
          
          {/* Brand & Social Section */}
          <div className="flex justify-center items-center gap-8 mb-12">
            <a
              href="https://instagram.com/creativecaricatureclub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram"
              className="transition-all duration-300 hover:scale-110"
              style={{
                filter: isReducedMotion
                  ? 'none' 
                  : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="#FFF5DF"/>
              </svg>
            </a>
            
            <a
              href="https://youtube.com/@creativecaricatureclub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our YouTube channel"
              className="transition-all duration-300 hover:scale-110"
              style={{
                filter: isReducedMotion 
                  ? 'none' 
                  : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFF5DF"/>
              </svg>
            </a>
          </div>

          {/* Navigation Section */}
          <nav aria-label="Footer navigation" className="mb-12">
            <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
              <div className="flex flex-col gap-4">
                <a href="/" className="footer-link-underline morion-text text-lg hover:opacity-80 transition-opacity" style={{ color: '#FFF5DF' }}>
                  Home
                </a>
                <a href="/portfolio" className="footer-link-underline morion-text text-lg hover:opacity-80 transition-opacity" style={{ color: '#FFF5DF' }}>
                  Work
                </a>
                <a href="/workshop" className="footer-link-underline morion-text text-lg hover:opacity-80 transition-opacity" style={{ color: '#FFF5DF' }}>
                  Workshop
                </a>
              </div>
              <div className="flex flex-col gap-4">
                <a href="/about" className="footer-link-underline morion-text text-lg hover:opacity-80 transition-opacity" style={{ color: '#FFF5DF' }}>
                  About
                </a>
                <a href="/service" className="footer-link-underline morion-text text-lg hover:opacity-80 transition-opacity" style={{ color: '#FFF5DF' }}>
                  Services
                </a>
                <a href="/contact" className="footer-link-underline morion-text text-lg hover:opacity-80 transition-opacity" style={{ color: '#FFF5DF' }}>
                  Contact
                </a>
              </div>
            </div>
          </nav>

          {/* Legal & Compliance Section */}
          <div className="border-t border-b py-8 mb-12" style={{ borderColor: 'rgba(255, 245, 223, 0.3)' }}>
            <nav aria-label="Legal information" className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <a href="/privacy-policy" className="footer-link-underline text-sm hover:opacity-80 transition-opacity" style={{ color: '#FFF5DF' }}>
                Privacy Policy
              </a>
              <a href="/terms-and-conditions" className="footer-link-underline text-sm hover:opacity-80 transition-opacity" style={{ color: '#FFF5DF' }}>
                Terms & Conditions
              </a>
              <a href="/refund-policy" className="footer-link-underline text-sm hover:opacity-80 transition-opacity" style={{ color: '#FFF5DF' }}>
                Refund / Cancellation Policy
              </a>
              <a href="/disclaimer" className="footer-link-underline text-sm hover:opacity-80 transition-opacity" style={{ color: '#FFF5DF' }}>
                Disclaimer
              </a>
            </nav>
          </div>

          {/* Contact Information Section */}
          <div className="text-center mb-12 space-y-3">
            <div className="text-sm" style={{ color: '#FFF5DF' }}>
              <a href="mailto:support@creativecaricatureclub.com" className="footer-link-underline hover:opacity-80 transition-opacity">
                creativecaricatureclub@gmail.com
              </a>
            </div>
            <div className="text-sm" style={{ color: '#FFF5DF' }}>
              <a href="tel:+919XXXXXXXXX" className="footer-link-underline hover:opacity-80 transition-opacity">
                +91 83695 94271
              </a>
            </div>
            <div className="text-sm" style={{ color: '#FFF5DF' }}>
              Mumbai, India
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center morion-text text-sm" style={{ color: '#FFF5DF' }}>
            ©2026 CreativeCaricatureClub. All Rights Reserved.
          </div>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: '#FFF5DF',
              color: '#8A733E',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              focusRingColor: '#FFF5DF'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19V5M12 5L5 12M12 5l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="sr-only">Back to top</span>
          </button>
        )}
      </footer>
    </>
  );
};

export default Footer;