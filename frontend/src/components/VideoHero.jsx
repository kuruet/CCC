import workshopVideo from '../assets/videos/workshop.mp4';
import { useNavigate } from 'react-router-dom';

export default function VideoHero() {

    const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/workshop/register');
  };
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden bg-[#FFF5DF]">
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={workshopVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[#8A733E]/30"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFF5DF] mb-6 sm:mb-8 md:mb-10 max-w-4xl leading-tight">
          Transform Your Passion Into Professional Artistry
        </h2>

        <button
        onClick={handleRegisterClick}

          aria-label="Register for Workshop"
          className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 text-base sm:text-lg md:text-xl font-semibold text-[#FFF5DF] bg-[#8A733E] rounded-lg hover:bg-[#8A733E]/90 focus:outline-none focus:ring-4 focus:ring-[#8A733E]/50 transform hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Register Now
        </button>
      </div>
    </section>
  );
}