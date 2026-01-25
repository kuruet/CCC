import { useEffect, useState } from 'react';
import profile from '../assets/profilePhoto.jpg';
import LineDesign from './LineDesign';

// Using high-quality placeholder image from Unsplash
// In your project, replace this URL with your own image URL
const profileImg = profile;

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true);
  }, []);

  return (
    <section 
      className="w-full min-h-screen flex items-center"
      style={{ backgroundColor: '#fff5df' }}
    >
      <div className="container mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <div 
            className={`space-y-6 transition-all duration-1000 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Main Heading */}
            <h1 className="morion-text font-bold text-5xl md:text-6xl lg:text-7xl leading-tight" style={{ color: "#8a733e" }}>
              Hello!
            </h1>

            {/* Subheading / Short Bio */}
            <div className="space-y-4">
              <p className="morion-text text-lg md:text-xl leading-relaxed" style={{ color: "#b7a26e" }}>
                We are a dedicated team of artists specializing in premium caricatures and portraits.
With years of experience capturing moments at weddings, events, and personal milestones
              </p>
              
              {/* Bio Description */}
              <p className="morion-text text-base md:text-lg leading-relaxed" style={{ color: "#b7a26e" }}>
                we create artwork that tells your story in a unique and memorable way.
Our passion lies in turning emotions, personalities, and memories into timeless pieces of art that clients treasure forever.
                <br /><br />
                {/* My passion lies in crafting premium caricatures and portraits that capture personality and emotion in every brushstroke. */}
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <a
    href="/about"
    className="
      morion-text inline-block font-semibold text-base md:text-lg px-8 py-4 rounded-2xl shadow-lg
      text-[#8a733e] bg-[#fff5df] border-2 border-[#8a733e]
      hover:bg-[#8a733e] hover:text-[#fff5df] hover:shadow-xl
      transition-all duration-300 transform hover:-translate-y-1
      focus:outline-none focus:ring-4 focus:ring-gray-900 focus:ring-offset-4
      visited:text-[#8a733e]
    "
  >
    Know More
  </a>
            </div>

            {/* Decorative Line Accent (replaced with LineDesign component) */}
           <div className="block pt-8">
  <LineDesign />
</div>

          </div>

          {/* Right Column - Image */}
          <div 
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}
          >
            {/* Background Decorative Shape */}
            <div className="absolute -top-6 -right-6 w-72 h-72  rounded-full opacity-20 blur-3xl animate-pulse hidden lg:block"></div>
            
            {/* Image Container */}
            <div className="relative z-10">
              {/* Rotating Accent Circle */}
              <div 
                className="absolute -top-8 -left-8 w-24 h-24 border-4 border-gray-900 rounded-full opacity-30 hidden md:block"
                style={{
                  animation: 'spin 20s linear infinite'
                }}
              ></div>

              {/* Main Image */}
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img
                  src={profileImg}
                  alt="Professional portrait"
                  className="w-full h-auto object-cover aspect-square lg:aspect-[4/5]"
                  loading="lazy"
                />
                
                {/* Subtle Overlay for Premium Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>

              {/* Bottom Right Decorative Element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32  rounded-full opacity-10 hidden md:block"></div>
            </div>

            {/* Floating Decorative Shapes */}
            <div 
              className="absolute top-1/4 -right-8 w-16 h-16  rounded-lg opacity-20 hidden lg:block"
              style={{
                animation: 'float 6s ease-in-out infinite'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* CSS Animations and Morion Font */}
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        /* spin used for rotating accent */
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

    </section>
  );
};

export default About;