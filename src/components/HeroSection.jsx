import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set([0]));
  const autoPlayRef = useRef(null);
  const totalSlides = 1;

const preloadImage = useCallback((index) => {
  if (loadedImages.has(index)) return;

  const img = new Image();
  img.src = `/hero/hero-${index + 1}.webp`;

  img.onload = () => {
    setLoadedImages(prev => new Set([...prev, index]));
  };
}, [loadedImages]);


  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    
    const nextIndex = (index + 1) % totalSlides;
    preloadImage(nextIndex);

    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [preloadImage, totalSlides]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % totalSlides);
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  }, [currentSlide, totalSlides, goToSlide]);

  useEffect(() => {
    const nextIndex = (currentSlide + 1) % totalSlides;
    preloadImage(nextIndex);
  }, [currentSlide, totalSlides, preloadImage]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide(prev => {
        const next = (prev + 1) % totalSlides;
        const nextNext = (next + 1) % totalSlides;
        preloadImage(nextNext);
        return next;
      });
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, totalSlides, preloadImage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <style>{`
        @keyframes heroFadeZoom {
          0% {
            opacity: 0;
            transform: scale(1);
          }
          100% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .hero-slide-active {
          animation: heroFadeZoom 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .hero-slide-inactive {
          opacity: 0;
          transform: scale(1);
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-slide-active {
            animation: none;
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      <div className="absolute inset-0 z-0">
      {Array.from({ length: totalSlides }).map((_, index) => (
  loadedImages.has(index) && (
    <img
      key={index}
      src={`/hero/hero-${index + 1}.webp`}
      alt={`Creative Caricature Club showcase ${index + 1}`}
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
        index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
      loading={index === 0 ? 'eager' : 'lazy'}
      fetchPriority={index === 0 ? 'high' : 'auto'}
    />
  )
))}

      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/50 z-20" />

       

      <div className="absolute inset-x-0 top-0 z-30 flex flex-col items-center justify-start pt-32 md:pt-40 px-6 md:px-12">
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-70 leading-tight">
            {/* Capture Your Story in Art */}
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-12 sm:mb-12 max-w-2xl mx-auto">
            Transform moments into timeless caricatures that celebrate personality, emotion, and creativity
          </p>

          {/* <Link
            to="/booking"
            className="inline-block bg-white text-black px-10 py-4 rounded-full text-lg md:text-xl font-bold hover:bg-white/90 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105"
          >
            Book Now
          </Link> */}
        </div>
      </div>

      

     
    </section>
  );
};

export default Hero;