import { useState } from 'react';

export default function Client() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const governmentClients = [
    { name: 'Reserve Bank of India', logo: '/images/clients/rbi.png' },
    { name: 'State Bank of India', logo: '/images/clients/sbi.png' },
    { name: 'Indian Navy', logo: '/images/clients/indian-navy.png' },
    { name: 'Income Tax Department', logo: '/images/clients/income-tax.png' }
  ];

  const commercialClients = [
    { name: 'Myntra', logo: '/images/clients/myntra.png' },
    { name: 'Zee Entertainment', logo: '/images/clients/Zee.svg' },
    { name: 'Pro Kabaddi League', logo: '/images/clients/pkl.jpeg' },
    { name: 'Aankho Ki Gustakhiyan', logo: '/images/clients/film.svg' }
  ];

  const testimonials = [
    {
      quote: 'Creative Caricature Club delivered exceptional live caricature services at our national event. Their professionalism and attention to detail ensured seamless execution across multiple venues.',
      name: 'Rajesh Kumar',
      company: 'Event Director, National Corporate Forum'
    },
    {
      quote: 'The team demonstrated remarkable efficiency and discretion during our institutional gathering. Their artists engaged attendees professionally while maintaining the formal tone required for our environment.',
      name: 'Priya Sharma',
      company: 'Head of Communications, Public Sector Enterprise'
    },
    {
      quote: 'From planning to execution, Creative Caricature Club managed our brand activation with precision. The quality of artwork and guest engagement exceeded our expectations at multiple high-profile events.',
      name: 'Amit Desai',
      company: 'Marketing Head, Fortune 500 Company'
    }
  ];

  const metrics = [
    { value: '1000+', label: 'Live Events Executed' },
    { value: '15+ Years', label: 'Industry Experience' },
    { value: 'Pan-India', label: 'Geographic Coverage' },
    { value: '98%', label: 'Client Retention Rate' }
  ];

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-[#7f4f24] py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        <div className="text-center mb-16 sm:mb-20 lg:mb-24 space-y-4 sm:space-y-5 lg:space-y-6">
          {/* <div className="text-xs sm:text-sm tracking-[0.3em] uppercase text-gray-400">
            Clients & Trust
          </div> */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Trusted by Institutions, Brands<br className="hidden sm:block" /> & National Platforms
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto">
            Delivering professional caricature artistry for government bodies, corporate enterprises, and major entertainment platforms across India
          </p>
        </div>

        <div className="space-y-20 sm:space-y-30 lg:space-y-28">
          
          <div className="space-y-10 sm:space-y-18">
            <div className="text-center space-y-3 sm:space-y-4">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
                Government & Institutional Engagements
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Entrusted with high-profile assignments requiring discretion, professionalism, and consistent quality at national-scale events
              </p>
            </div>
            
<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-14 items-center justify-items-center">
              {governmentClients.map((client, index) => (
                <div
                  key={index}
                  className="w-full h-24 sm:h-28 md:h-32 flex items-center justify-center p-4 sm:p-5 opacity-60 hover:opacity-100 transition-opacity duration-300">
                 <img
  src={client.logo}
  alt={client.name}
  className="max-h-16 sm:max-h-18 md:max-h-20 max-w-full object-contain"
/>

                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10 sm:space-y-12">
            <div className="text-center space-y-3 sm:space-y-4">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
                Entertainment & Commercial Collaborations
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Partnering with leading brands across fashion, broadcast media, sports, and cinema for innovative brand activations
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 items-center justify-items-center">
              {commercialClients.map((client, index) => (
               <div
  key={index}
  className="w-full h-24 sm:h-28 md:h-32 flex items-center justify-center p-4 sm:p-5 opacity-80 hover:opacity-100 hover:scale-[1.03] transition-all duration-300"
>

                  <img
  src={client.logo}
  alt={client.name}
className="max-h-14 sm:max-h-16 md:max-h-18 max-w-full object-contain transition-transform duration-300"
/>

                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10 sm:space-y-12">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
                Client Testimonials
              </h3>
            </div>

            <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-[#a68a64] border border-gray-800 p-6 lg:p-8 space-y-4 hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  <p className="text-white text-sm sm:text-base leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="pt-2 border-t border-gray-800">
                    <p className="text-white font-medium text-sm sm:text-base">
                      {testimonial.name}
                    </p>
                    <p className="text-black text-xs sm:text-sm mt-1">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:hidden relative">
              <div className="bg-[#222222] border border-gray-800 p-6 space-y-4 min-h-[280px] flex flex-col justify-between">
                <p className="text-gray-300 text-sm leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div className="pt-2 border-t border-gray-800">
                  <p className="text-white font-medium text-sm">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center space-x-4 mt-6">
                <button
                  onClick={handlePrevTestimonial}
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800 transition-colors duration-200"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex items-center space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? 'w-8 bg-white'
                          : 'w-1 bg-gray-600'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextTestimonial}
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800 transition-colors duration-200"
                  aria-label="Next testimonial"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* <div className="pt-8 sm:pt-10 lg:pt-12 border-t border-gray-800">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                    {metric.value}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base text-gray-400 uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}