import workshopImage from '../assets/images/Learn-1.webp';
import { useNavigate } from 'react-router-dom';

const Ads = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/workshop');
  };

  return (
    <section className="w-full h-auto md:h-[50vh] lg:h-[70vh] bg-[#8A733E] flex flex-col md:flex-row">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 h-auto md:h-full">
        <img
          src={workshopImage}
          alt="Caricature Workshop"
          className="w-full h-full md:h-full object-cover"
        />
      </div>

      {/* Right Side - Text Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-6 md:px-12 lg:px-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFF5DF] mb-4 md:mb-6 leading-tight">
          Upcoming Caricature Workshop
        </h2>
        
        <p className="text-[#FFF5DF] text-base md:text-lg lg:text-xl mb-6 md:mb-8 leading-relaxed max-w-lg">
          Unlock your artistic potential and master the art of caricature drawing. 
          Join our hands-on workshop led by professional artists and bring personalities 
          to life with exaggerated, expressive illustrations.
        </p>
        
        <button
          onClick={handleRegisterClick}
          className="self-start px-8 py-3 md:px-10 md:py-4 border-2 border-[#FFF5DF] text-[#FFF5DF] font-semibold text-base md:text-lg rounded-md transition-all duration-300 ease-out hover:bg-[#FFF5DF] hover:text-[#8A733E] hover:shadow-black/20 focus:outline-none focus:ring-2 focus:ring-[#FFF5DF] focus:ring-offset-2 focus:ring-offset-[#8A733E]"
        >
          Enroll Now
        </button>
      </div>
    </section>
  );
};

export default Ads;
