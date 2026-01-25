import { useState, useEffect } from 'react';
import img1 from '../clients/img1.jpg';
import img2 from '../clients/img2.jpg';
import img3 from '../clients/img3.jpg';
import img4 from '../clients/img4.jpg';
import img5 from '../clients/img5.jpg';
import img6 from '../clients/img6.jpg';
import img7 from '../clients/img7.jpg';
import img8 from '../clients/img8.jpg';
import img9 from '../clients/img9.jpg';
import img10 from '../clients/img10.jpg';
import img11 from '../clients/img11.jpg';
import img12 from '../clients/img12.jpg';
import img13 from '../clients/img13.jpg';
import img14 from '../clients/img14.jpg';
import img15 from '../clients/img15.jpg';
import img16 from '../clients/img16.jpg';
import img17 from '../clients/img17.jpg';
import img18 from '../clients/img18.jpg';
import img19 from '../clients/img19.jpg';
import img20 from '../clients/img20.jpg';
import img21 from '../clients/img21.jpg';
import img22 from '../clients/img22.jpg';
import img23 from '../clients/img23.jpg';
import img24 from '../clients/img24.jpg';
import img25 from '../clients/img25.jpg';
import img26 from '../clients/img26.jpg';
import img27 from '../clients/img27.jpg';
import img28 from '../clients/img28.jpg';
import img29 from '../clients/img29.jpg';
import img30 from '../clients/img30.jpg';
import img31 from '../clients/img31.jpg';
import img32 from '../clients/img32.jpg';
import img33 from '../clients/img33.jpg';
import img34 from '../clients/img34.jpg';
import img35 from '../clients/img35.jpg';
import img36 from '../clients/img36.jpg';
import img37 from '../clients/img37.jpg';
import img38 from '../clients/img38.jpg';
import img39 from '../clients/img39.jpg';
import img40 from '../clients/img40.jpg';
import img41 from '../clients/img41.jpg';
import img42 from '../clients/img42.jpg';
import img43 from '../clients/img43.jpg';
import img44 from '../clients/img44.jpg';
import img45 from '../clients/img45.jpg';
import img46 from '../clients/img46.jpg';
import img47 from '../clients/img47.jpg';
import img48 from '../clients/img48.jpg';
import img49 from '../clients/img49.jpg';
import img50 from '../clients/img50.jpg';


/**
 * Portfolio Component - Infinite Scrolling Image Gallery
 * 
 * Features:
 * - 3-column responsive grid (3 cols on lg, 2 on md, 1 on sm)
 * - Infinite vertical scroll animation
 * - Hover effects with caption overlay
 * - Parallax effect with different speeds per column
 * - Seamless looping
 */

const Portfolio = ({ images }) => {
  const [isHovered, setIsHovered] = useState(null);

  // Default images from Unsplash if none provided
  const defaultImages = [
    { src: img1, alt: "", title: "", },
    { src: img2, alt: "", title: "", },
    { src: img3, alt: "", title: "", },
    { src: img4, alt: "", title: "", },
    { src: img5, alt: "", title: "", },
    { src: img6, alt: "", title: "", },
    { src: img7, alt: "", title: "", },
    { src: img8, alt: "", title: "", },
    { src: img9, alt: "", title: "", },
    { src: img10, alt: "", title: "", },
    { src: img11, alt: "", title: "", },
    { src: img12, alt: "", title: "", },
    { src: img13, alt: "", title: "", },
    { src: img14, alt: "", title: "", },
    { src: img15, alt: "", title: "", },
    { src: img16, alt: "", title: "", },
    { src: img17, alt: "", title: "", },
    { src: img18, alt: "", title: "", },
    { src: img19, alt: "", title: "", },
    { src: img20, alt: "", title: "", },
    { src: img21, alt: "", title: "", },
    { src: img22, alt: "", title: "", },
    { src: img23, alt: "", title: "", },
    { src: img24, alt: "", title: "", },
    { src: img25, alt: "", title: "", },
    { src: img26, alt: "", title: "", },
    { src: img27, alt: "", title: "", },
    { src: img28, alt: "", title: "", },  
    { src: img29, alt: "", title: "", },
    { src: img30, alt: "", title: "", },
    { src: img31, alt: "", title: "", },
    { src: img32, alt: "", title: "", },
    { src: img33, alt: "", title: "", },
    { src: img34, alt: "", title: "", },
    { src: img35, alt: "", title: "", },
    { src: img36, alt: "", title: "", },
    { src: img37, alt: "", title: "", },
    { src: img38, alt: "", title: "", },
    { src: img39, alt: "", title: "", },
    { src: img40, alt: "", title: "", },
    { src: img41, alt: "", title: "", },
    { src: img42, alt: "", title: "", },
    { src: img43, alt: "", title: "", },
    { src: img44, alt: "", title: "", },
    { src: img45, alt: "", title: "", },
    { src: img46, alt: "", title: "", },
    { src: img47, alt: "", title: "", },
    { src: img48, alt: "", title: "", },
    { src: img49, alt: "", title: "", },
    { src: img50, alt: "", title: "", },
   
  ];

  const portfolioImages = images || defaultImages;

  // Split images into 3 columns for different scroll speeds
  const getColumnImages = (columnIndex) => {
    return portfolioImages.filter((_, index) => index % 3 === columnIndex);
  };

  const column1Images = getColumnImages(0);
  const column2Images = getColumnImages(1);
  const column3Images = getColumnImages(2);

  return (
    <>
      <style>{`
        @keyframes scroll-slow {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes scroll-medium {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes scroll-fast {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        .scroll-column-1 {
          animation: scroll-slow 40s linear infinite;
        }

        .scroll-column-2 {
          animation: scroll-medium 35s linear infinite;
        }

        .scroll-column-3 {
          animation: scroll-fast 30s linear infinite;
        }

        .scroll-column-1:hover,
        .scroll-column-2:hover,
        .scroll-column-3:hover {
          animation-play-state: paused;
        }

        .image-overlay {
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }

        .image-container:hover .image-overlay {
          opacity: 1;
        }

        .tilt-glare {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .image-container:hover .tilt-glare {
          opacity: 1;
        }
      `}</style>

      <div className="w-full min-h-screen bg-[#fff5df] from-gray-900 via-gray-800 to-black overflow-hidden ">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              
            </h1>
            <p className="text-gray-400 text-lg">
             
            </p>
          </div>

          {/* Grid Container */}
          <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
            {/* Column 1 */}
            <div className="relative overflow-hidden">
              <div className="scroll-column-1 space-y-6">
                {/* Double the images for seamless loop */}
                {[...column1Images, ...column1Images].map((image, index) => (
                  <a
                    key={`col1-${index}`}
                    href={image.link}
                    className="image-container block relative group overflow-hidden rounded-lg shadow-2xl"
                    onMouseEnter={() => setIsHovered(null)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Overlay */}
                    <div className="image-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                      <div className="text-white">
                        <h3 className="text-xl md:text-2xl font-bold mb-2">
                          {image.title}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {image.alt}
                        </p>
                      </div>
                    </div>

                    {/* Glare Effect */}
                    <div className="tilt-glare"></div>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 */}
            <div className="relative overflow-hidden hidden md:block">
              <div className="scroll-column-2 space-y-6">
                {[...column2Images, ...column2Images].map((image, index) => (
                  <a
                    key={`col2-${index}`}
                    href={image.link}
                    className="image-container block relative group overflow-hidden rounded-lg shadow-2xl"
                    onMouseEnter={() => setIsHovered(null)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    <div className="image-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                      <div className="text-white">
                        <h3 className="text-xl md:text-2xl font-bold mb-2">
                          {image.title}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {image.alt}
                        </p>
                      </div>
                    </div>

                    <div className="tilt-glare"></div>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3 */}
            <div className="relative overflow-hidden hidden lg:block">
              <div className="scroll-column-3 space-y-6">
                {[...column3Images, ...column3Images].map((image, index) => (
                  <a
                    key={`col3-${index}`}
                    href={image.link}
                    className="image-container block relative group overflow-hidden rounded-lg shadow-2xl"
                    onMouseEnter={() => setIsHovered(null)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    <div className="image-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                      <div className="text-white">
                        <h3 className="text-xl md:text-2xl font-bold mb-2">
                          {image.title}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {image.alt}
                        </p>
                      </div>
                    </div>

                    <div className="tilt-glare"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Usage Example Component
const App = () => {
  return <Portfolio />;
};

export default App;