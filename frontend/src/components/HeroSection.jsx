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

       

    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/50 z-20" />

<div className="absolute inset-0 z-30 flex items-center justify-center px-6 -translate-y-16 md:-translate-y-24 sm:-translate-y-18">
  <div className="max-w-2xl text-center">
    <p className="text-xl md:text-2xl font-medium text-white/90 mb-2">
      Learn live caricature artistry in an immersive hands-on workshop
    </p>

    <p className="text-2xl md:text-3xl font-bold text-white mb-6">
      Designed for artists who want to sharpen skills and stand out
    </p>

    <Link
      to="/workshop"
      className="inline-block bg-[#fff5df] -translate-y-5 sm:translate-y-0 text-black px-8 py-3 md:px-10 md:py-4 rounded-full text-lg md:text-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
    >
      Register
    </Link>
  </div>
</div>





      

     
    </section>
  );
};

export default Hero;