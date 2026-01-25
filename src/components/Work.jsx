import { useState, useEffect, useRef } from 'react';
import project1 from '../assets/project1.jpg';
import project2 from '../assets/project2.jpg';
import project3 from '../assets/project3.jpg';  
import project4 from '../assets/project4.jpg';
import project5 from '../assets/project5.jpg';
import project6 from '../assets/project6.jpg';
import project7 from '../assets/project7.jpg';
import project8 from '../assets/project8.jpg';

/**
 * Work Component - Premium Projects Gallery
 * 
 * SETUP INSTRUCTIONS:
 * 1. Replace the image URLs below with your own project images
 * 2. Update project titles, types, and links in the projects array
 * 
 * CUSTOMIZATION:
 * - Change columns: Modify 'md:grid-cols-2' to 'md:grid-cols-3' for 3 columns
 * - Change animation delay: Adjust 'index * 60' in transitionDelay calculation
 * - Change tile heights: Modify 'h-56' (mobile) and 'md:h-72' (desktop) classes
 */

// Using high-quality placeholder images from Unsplash
// Replace these URLs with your own project images
const proj1 = project1;
const proj2 = project2;
const proj3 = project3;
const proj4 = project4;
const proj5 = project5;
const proj6 = project6;
const proj7 = project7;
const proj8 = project8;

// Project data array - customize with your own projects
const projects = [
  { 
     
    
    image: proj1, 
   
  },
  { 
     
    image: proj2, 
    
  },
  { 
    
    image: proj3, 
    
  },
  { 
    
    image: proj4, 
    
  },
  { 
    
    image: proj5, 
    
  },
  { 
    
    image: proj6, 
    
  },
  { 
 
    image: proj7, 
    
  },
  { 
 
    image: proj8, 
     
  }
];

const Work = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      role="region"
      aria-labelledby="work-heading"
      className="w-full py-16 md:py-24"
      style={{ backgroundColor: '#fff5df' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">

         <style>{`
        @font-face {
          font-family: 'Morion';
          src: url('https://cdn.jsdelivr.net/gh/projectwallace/morion@main/morion.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        :root {
          --gold: #8B7355;
        }

        .morion-heading {
          font-family: 'Morion', 'Times New Roman', serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}</style>

      <h1
        className="morion-heading flex justify-center items-center text-center whitespace-normal mx-auto"
        style={{
          color: 'var(--gold)',
          letterSpacing: '2px',
          width: '900px',
          maxWidth: '900px',
          height: '50px',
          marginTop: '50px',
          marginBottom: '40px',
          fontSize: '60px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '70px',
          textDecoration: 'none'
        }}
      >
        PORTFOLIO
      </h1>

          {/* Animated Underline */}
          {/* <div className="w-24 h-1 rounded-full" style={{backgroundColor: "#8a733e"}}></div> */}
        </div>

        {/* Projects Grid */}
        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-16"
        >
          {projects.map((project, index) => (
            <li
              key={index}
              role="listitem"
              className={`transform transition-all duration-700 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 60}ms`
              }}
            >
              <a
                href={project.link}
                aria-label={`${project.title} — ${project.type}`}
                className="group block relative h-56 md:h-72 lg:h-96 rounded-xl shadow-lg overflow-hidden focus:outline-none focus:ring-4 focus:ring-gray-900 focus:ring-offset-4 transition-shadow"
                rel="noopener noreferrer"
              >
                {/* Background Image with Zoom Effect */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Screen reader only image for accessibility */}
                  <img
                    src={project.image}
                    alt={`${project.title} project thumbnail`}
                    className="sr-only"
                  />
                </div>

                {/* Gradient Overlay - Darkens on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-300"></div>

                {/* Project Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                  <h3 className="font-serif font-bold text-xl md:text-2xl mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-200 uppercase tracking-wide">
                    {project.type}
                  </p>
                  
                  {/* Visually hidden description for screen readers */}
                  <span className="sr-only">
                    {project.title} — {project.type}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
      <div className="flex justify-center">
  <a
    href="/portfolio"
    className="
      inline-block font-semibold text-base md:text-lg px-8 py-4 rounded-2xl shadow-lg
      text-[#8a733e] bg-[#fff5df] border-2 border-[#8a733e]
      hover:bg-[#8a733e] hover:text-[#fff5df] hover:shadow-xl
      transition-all duration-300 transform hover:-translate-y-1
      focus:outline-none focus:ring-4 focus:ring-gray-900 focus:ring-offset-4
      visited:text-[#8a733e]
    "
  >
    More Work
  </a>
</div>

      </div>

      {/* 
        Inline Styles for Utilities
        You can move this to src/index.css if preferred
      */}
      <style jsx>{`
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
    </section>
  );
};

export default Work;