import { useState } from 'react';
import Thumbnail from '../assets/images/thumbnail.webp';


export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
  };

  return (
    <section className="relative w-full min-h-[80vh] bg-[#FFF5DF] flex items-center py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          
          <div className="space-y-6 sm:space-y-7 lg:space-y-8">
            <div className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#8A733E]/60">
              Live Workshop
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#8A733E] leading-tight">
              Master Live Caricature Art
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#8A733E]/80 max-w-xl leading-relaxed">
              Learn professional techniques from India's leading caricature artists. Perfect for aspiring artists and creative professionals.
            </p>

            <div className="space-y-3 pt-2">
              <button className="w-full sm:w-auto px-8 sm:px-10 lg:px-12 py-4 sm:py-4.5 lg:py-5 text-base sm:text-lg lg:text-xl font-semibold text-[#FFF5DF] bg-[#8A733E] rounded-lg hover:bg-[#8A733E]/90 focus:outline-none focus:ring-4 focus:ring-[#8A733E]/30 transform hover:scale-105 active:scale-95 transition-all duration-300">
                Register for ₹1999
              </button>

              <p className="text-xs sm:text-sm text-[#8A733E]/60 pl-1">
                Instant confirmation • Secure payment
              </p>
            </div>
          </div>

          <div className="relative w-full max-w-2xl mx-auto lg:mx-0">
       <div 
  onClick={openModal}
  className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group hover:brightness-90 transition-all duration-300"
>
  <img
    src={Thumbnail} // ← Replace with your thumbnail path
    alt="Workshop Preview"
    className="w-full h-full object-cover"
  />

  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-16 h-16 sm:w-20 sm:h-24 rounded-full bg-[#8A733E] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
      <div className="w-0 h-0 border-t-[10px] sm:border-t-[12px] lg:border-t-[14px] border-t-transparent border-l-[16px] sm:border-l-[20px] lg:border-l-[24px] border-l-[#FFF5DF] border-b-[10px] sm:border-b-[12px] lg:border-b-[14px] border-b-transparent ml-1"></div>
    </div>
  </div>

  <div className="absolute bottom-4 left-4 right-4">
    <p className="text-sm sm:text-base lg:text-lg font-medium text-[#8A733E]">
      Watch Workshop Preview
    </p>
  </div>
</div>

          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-[#8A733E]/80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div
            className="relative w-full max-w-4xl bg-[#FFF5DF] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#8A733E] text-[#FFF5DF] flex items-center justify-center hover:bg-[#8A733E]/90 focus:outline-none focus:ring-4 focus:ring-[#8A733E]/30 z-10 transition-all duration-200"
              aria-label="Close video"
            >
              <span className="text-2xl leading-none">×</span>
            </button>

            <div className="aspect-video bg-[#8A733E]/10 flex items-center justify-center">
               <video
          src="/videos/workshop_video.mp4"  // ← Replace this with your MP4 path
          controls
          autoPlay
          className="w-full h-full object-cover"
        />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}