import React from 'react';

/**
 * Instagram Follow Card Component
 * 
 * Usage examples:
 * <Follow />
 * <Follow username="@myhandle" href="https://instagram.com/myhandle" />
 * <Follow username="@photographer" href="https://instagram.com/photographer" openInNewTab={false} />
 */

const Follow = ({ 
  username = '@creativecaricatureclub',
  href = 'https://www.instagram.com/creativecaricatureclub/',
  className = '',
  openInNewTab = true,
  ariaLabel
}) => {
  // Base style object with all design tokens (must be included verbatim)
  const baseStyle = {
    WebkitTextSizeAdjust: '100%',
  };

  // Render anchor if href is provided, otherwise plain text
  const renderHandle = () => {
    if (!href) {
      return (
        <span 
          className="morion-text text-sm md:text-base font-semibold tracking-wider uppercase"
          style={{
            color: '#8a733e',
            fontFamily: "var(--navigation_font-family)",
            letterSpacing: 'var(--navigation_letter-spacing)'
          }}
        >
          {username}
        </span>
      );
    }

    const linkProps = {
      className: "morion-text text-sm md:text-base font-semibold tracking-wider uppercase transition-all duration-300 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 inline-block",
      href,
      style: {
        color: '#8a733e',
        fontFamily: "var(--navigation_font-family)",
        letterSpacing: 'var(--navigation_letter-spacing)',
        textTransform: 'var(--navigation_text-transform)'
      },
      ...(openInNewTab && {
        target: '_blank',
        rel: 'noopener noreferrer'
      }),
      ...(ariaLabel && { 'aria-label': ariaLabel })
    };

    return <a {...linkProps}>{username}</a>;
  };

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

      <div 
        className={`max-w-[1200px] mx-auto px-2 border border-solid border-4 py-2 md:px-8 md:py-8 ${className}`}
        style={{borderColor: "#fff5df"}}
      >
        <div 
          className="rounded-lg shadow-md p-6 md:p-8 flex border border-solid border-4 flex-col items-center text-center"
          style={{ borderColor: "#8a733e" }}
        >
          {/* Title */}
          <h4 
            className="morion-text text-lg md:text-xl lg:text-2xl mb-4"
            style={{
              fontFamily: "var(--heading-4_font-family)",
              fontWeight: 'var(--heading-4_font-weight)',
              fontStyle: 'var(--heading-4_font-style)',
              fontSize: 'var(--heading-4_font-size)',
              lineHeight: 'var(--heading-4_line-height)',
              letterSpacing: 'var(--heading-4_letter-spacing)',
              color: '#8a733e'
            }}
          >
            Follow Us on Instagram
          </h4>

          {/* Divider */}
          <div 
            className="w-16 h-[2px] mb-4"
            style={{ backgroundColor: 'var(--primary-headings)' }}
          />

          {/* Handle */}
          {renderHandle()}
        </div>
      </div>
    </>
  );
};

export default Follow;