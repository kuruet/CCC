import instructorImage from '../assets/images/Instructor.webp';

export default function Instructor() {
  const achievements = [
    { metric: '10+ Years', label: 'Professional Experience' },
    { metric: '5000+', label: 'Students Trained' },
    { metric: '100+', label: 'Workshops Conducted' },
    { metric: 'Pan-India', label: 'Event Coverage' }
  ];

  return (
    <section className="w-full bg-[#FFF5DF] py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8A733E]">
            Meet Your Instructor
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#8A733E]/70 max-w-2xl mx-auto">
            Learn from one of India's most accomplished caricature artists
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-20 lg:mb-24">
          
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md aspect-square rounded-2xl overflow-hidden">
              <img
                src={instructorImage}
                alt="Lead instructor and founder of Creative Caricature Club"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 sm:space-y-7 lg:space-y-8 max-w-xl mx-auto lg:mx-0">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#8A733E]">
                Ritesh Gupta
              </h3>
              <p className="text-base sm:text-lg text-[#8A733E]/60">
                Founder & Lead Artist, Creative Caricature Club
              </p>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-[#8A733E]/80 leading-relaxed">
              With over 10 years of professional experience, Ritesh has trained thousands of artists and delivered live caricature entertainment at corporate events, weddings, and brand activations across India. His expertise spans traditional and digital mediums, making him one of the country's most sought-after caricature instructors.
            </p>

            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6 pt-4">
              {achievements.map((item, index) => (
                <div key={index} className="space-y-1 sm:space-y-2">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#8A733E]">
                    {item.metric}
                  </div>
                  <div className="text-sm sm:text-base text-[#8A733E]/60">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-5">
          <h4 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#8A733E]">
            Backed by Creative Caricature Club
          </h4>
          <p className="text-base sm:text-lg lg:text-xl text-[#8A733E]/70 leading-relaxed">
            Creative Caricature Club is India's premier caricature artist collective, trusted by government institutions, and entertainment platforms. With a network of professional artists and a track record of over 1000 successful events, the brand stands for quality, professionalism, and artistic excellence.
          </p>
        </div>
      </div>
    </section>
  );
}