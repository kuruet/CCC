import learnImage from '../assets/images/learn-1.webp';
import audienceImage from '../assets/images/learn-2.webp';

export default function Learn() {
  const learningOutcomes = [
    'Master the fundamentals of facial feature exaggeration and proportion',
    'Develop speed sketching techniques for live event environments',
    'Learn professional shading and linework for polished caricatures',
    'Understand client interaction and commercial workflow practices',
    'Create portfolio-ready caricature artwork in multiple styles'
  ];

  const targetAudience = [
    'Aspiring artists looking to enter the professional caricature industry',
    'Illustrators wanting to add live event entertainment to their skillset',
    'Beginners with basic drawing experience ready to specialize',
    'Creative professionals seeking alternative income streams',
    'Anyone passionate about portrait art and character storytelling'
  ];

  return (
    <section className="w-full bg-[#8A733E]">
      
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="w-full h-full min-h-[400px] lg:min-h-[600px]">
          <img
            src={learnImage}
            alt="Caricature artist demonstrating live sketching techniques"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center justify-center px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-20">
          <div className="max-w-xl space-y-6 sm:space-y-7 lg:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFF5DF]">
              What You'll Learn
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-[#FFF5DF]/80 leading-relaxed">
              This workshop takes you from fundamental concepts to professional execution. You'll develop the technical skills and industry knowledge needed to create compelling caricatures in real-world settings.
            </p>

            <ul className="space-y-3 sm:space-y-4">
              {learningOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-start space-x-3 sm:space-x-4">
                  <span className="flex-shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FFF5DF] mt-2 sm:mt-2.5"></span>
                  <span className="text-sm sm:text-base lg:text-lg text-[#FFF5DF]/80 leading-relaxed">
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-20 order-2 lg:order-1">
          <div className="max-w-xl space-y-6 sm:space-y-7 lg:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFF5DF]">
              Who This Workshop Is For
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-[#FFF5DF]/80 leading-relaxed">
              This workshop is designed for artists ready to move beyond casual sketching and develop professional caricature skills. Whether you're building a new career or expanding your artistic range, this is your starting point.
            </p>

            <ul className="space-y-3 sm:space-y-4">
              {targetAudience.map((audience, index) => (
                <li key={index} className="flex items-start space-x-3 sm:space-x-4">
                  <span className="flex-shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FFF5DF] mt-2 sm:mt-2.5"></span>
                  <span className="text-sm sm:text-base lg:text-lg text-[#FFF5DF]/80 leading-relaxed">
                    {audience}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full h-full min-h-[400px] lg:min-h-[600px] order-1 lg:order-2">
          <img
            src={audienceImage}
            alt="Workshop participants learning caricature techniques"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}