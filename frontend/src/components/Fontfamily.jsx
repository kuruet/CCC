import { Link } from 'react-router-dom';

export default function Portfolio() {
  const portfolioItems = [
    {
      id: 1,
      image: '/images/portfolio/wedding.webp',
      category: 'WEDDINGS',
      alt: 'Wedding caricature artwork by Creative Caricature Club'
    },
    {
      id: 2,
      image: '/images/portfolio/event.webp',
      category: 'EVENTS',
      alt: 'Live event caricature entertainment by Creative Caricature Club'
    },
    {
      id: 3,
      image: '/images/portfolio/corporate.webp',
      category: 'CORPORATE',
      alt: 'Corporate gifting and brand activation caricatures by Creative Caricature Club'
    }
  ];

  return (
    <section className="w-full bg-[#FFF5DF] py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#8A733E] font-normal text-center mb-12 sm:mb-16 lg:mb-20">
          Our Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-10 lg:mb-12">
          {portfolioItems.map((item) => (
            <div key={item.id} className="group">
              <div className="relative overflow-hidden shadow-sm mb-4 sm:mb-5 lg:mb-6 aspect-[4/5]">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 cursor-pointer"
                />
              </div>
              <h3 className="text-center text-sm sm:text-base lg:text-lg font-bold text-[#8A733E] tracking-wide">
                {item.category}
              </h3>
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-10 sm:mb-12 lg:mb-14">
          <Link
            to="/portfolio"
            className="inline-block px-8 sm:px-10 lg:px-12 py-3 sm:py-3.5 lg:py-4 text-sm sm:text-base lg:text-lg font-medium text-[#8A733E] border-2 border-[#8A733E] rounded-sm hover:bg-[#8A733E] hover:text-white transition-all duration-300 ease-out"
          >
            Our Gallery
          </Link>
        </div>

        <p className="text-center font-serif text-base sm:text-lg lg:text-xl italic text-[#8A733E]/75 max-w-3xl mx-auto leading-relaxed px-4">
          Transforming fleeting moments into timeless art, one sketch at a time.
        </p>
      </div>
    </section>
  );
}