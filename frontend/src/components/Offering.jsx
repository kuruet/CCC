// Service.jsx
// Service Component
// Fully responsive services section with 4 service offerings
// Uses Tailwind utilities and CSS variables for theming

import Divider from "./Divider";

const Service = () => {
  // Service data structure for easy updates
  const services = [
    {
      id: 1,
      title: "Live Caricature\nEvents",
      details: "Add unforgettable fun to your event with on-the-spot caricature drawings. Perfect for weddings, corporate events, parties, and festivals",
      iconName: "branding",
      lineClass: "service-info-line"
    },
    {
      id: 2,
      title: "Wedding & Event\nIllustrations",
      details: "Make your celebration even more memorable with live caricature entertainment for your guests.",
      iconName: "illustration",
      lineClass: "service-info-line-02"
    },
    {
      id: 3,
      title: "Digital Caricature",
      details: "Bring creativity online! We offer custom digital caricatures drawn from photos — ideal for gifts, social media profiles, invitations, and virtual events.",
      iconName: "web-design",
      lineClass: "service-info-line"
    },
    {
      id: 4,
      title: "Corporate & Branded\nEvents",
      details: "Turn your brand event into a crowd-magnet with live caricature booths. Great for product launches, exhibitions, and team parties.",
      iconName: "branded-content",
      lineClass: "service-info-line-02"
    }
  ];

  // Icon components as inline SVG
  const icons = {
    branding: (
      <svg role="img" aria-hidden="true" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="var(--tan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    illustration: (
      <svg role="img" aria-hidden="true" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="var(--cream)"/>
      </svg>
    ),
    "web-design": (
      <svg role="img" aria-hidden="true" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="var(--gold)" strokeWidth="2"/>
        <path d="M8 21H16" stroke="var(--tan)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 17V21" stroke="var(--tan)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M2 10H22" stroke="var(--gold)" strokeWidth="2"/>
      </svg>
    ),
    "branded-content": (
      <svg role="img" aria-hidden="true" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="var(--gold)" strokeWidth="2"/>
        <path d="M3 9H21" stroke="var(--tan)" strokeWidth="2"/>
        <path d="M9 21V9" stroke="var(--tan)" strokeWidth="2"/>
      </svg>
    )
  };

  return (
    <>
      {/* CSS Variables and Component-Specific Styles */}
      <style>{`
        @font-face {
          font-family: 'Morion';
          src: url('https://cdn.prod.website-files.com/66f0c2679cb4a50e18355fe6/66f0d0d044c6eca6bfe89ec8_Morion.otf') format('opentype');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        :root {
          --cream: #fff5df;
          --gold: #8a733e;
          --tan: #b7a26e;
          --old-lace: #fff8e7;
          --text: #333;
        }
        .service-root {
          cursor: auto;
          font-family: Arial, sans-serif;
          font-size: 14px;
          line-height: 20px;
        }
        .services-section-heading {
          font-family: 'Morion', 'Times New Roman', serif;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .service-info-line,
        .service-info-line-02 {
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .service-info-line,
          .service-info-line-02,
          .service-root * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* Main Service Section */}
      <section
        className="service-root w-full py-16 md:py-6 md:mb-24"
        style={{ backgroundColor: 'var(--cream)', marginTop: '100px' }}
        role="region"
        aria-labelledby="services-heading"
      >
        <div className="services-container mx-auto max-w-[900px] px-4 sm:px-6">
          
          {/* Section Heading */}
          <h1
            id="services-heading"
            className="services-section-heading text-3xl md:text-4xl lg:text-5xl font-bold text-center uppercase tracking-wider mb-8 md:mb-12"
            style={{ color: 'var(--gold)' }}
          >
            SERVICES
          </h1>

          {/* Header Divider */}
          <div className="mb-12 md:mb-16">
            <Divider />
          </div>

          {/* Service Items */}
          {services.map((service, index) => (
            <div key={service.id}>
              {/* Service Article */}
              <article
                className={`service-${String(index + 1).padStart(2, '0')} relative mb-12 md:mb-16`}
                aria-labelledby={`service-title-${service.id}`}
              >
                {/* Decorative Line */}
                <div
                  className={`${service.lineClass} absolute -left-2 top-0 w-1 h-16 md:h-20`}
                  style={{ backgroundColor: index % 2 === 0 ? 'var(--tan)' : 'var(--gold)', opacity: 0.3 }}
                  aria-hidden="true"
                />

                {/* Icon Header */}
                <div className="icon-header flex items-start gap-4 md:gap-6 mb-4 md:mb-6">
                  {/* Icon Container */}
                  <div
                    className="icon-container flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-md flex items-center justify-center p-2"
                    style={{ backgroundColor: 'var(--old-lace)' }}
                  >
                    {icons[service.iconName]}
                  </div>

                  {/* Service Title */}
                  <h2
                    id={`service-title-${service.id}`}
                    className="text-2xl md:text-3xl font-semibold leading-tight"
                    style={{ color: 'var(--text)' }}
                  >
                    {service.title.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < service.title.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </h2>
                </div>

                {/* Service Details */}
                <div className="sub-header-body-copy">
                  <p
                    className="text-sm md:text-base leading-relaxed"
                    style={{ color: 'var(--text)' }}
                  >
                    {service.details}
                  </p>
                </div>
              </article>

              {/* Divider after each service except the last one */}
              {index < services.length - 1 && (
                <div className="my-12 md:my-16">
                  <Divider />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Service;