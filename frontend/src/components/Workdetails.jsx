export default function Workdetails() {
  const details = [
    {
      label: 'Date',
      value: ' March 14 & 15, 2025',
      clarifier: 'Registration closes 24 hours prior'
    },
    {
      label: 'Time',
      value: '12:00 PM - 4:00 PM ',
      clarifier: 'IST (Indian Standard Time)'
    },
    {
      label: 'Duration',
      value: '8 Hours',
      clarifier: 'Includes breaks and Q&A'
    },
    {
      label: 'Mode',
      value: 'Live Online',
      clarifier: 'Interactive video session via Zoom'
    },
    {
      label: 'Language',
      value: 'English & Hindi',
      clarifier: 'Questions accepted in both languages'
    },
    {
      label: 'Skill Level',
      value: 'Beginner to Intermediate',
      clarifier: 'No prior caricature experience required'
    },
    {
      label: 'Requirements',
      value: 'Drawing materials & stable internet',
      clarifier: 'Detailed supply list sent upon registration'
    },
    {
      label: 'Group Size',
      value: 'Limited to 60 participants',
      clarifier: 'Ensures personalized attention'
    }
  ];

  return (
    <section className="w-full bg-[#FFF5DF] py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8A733E]">
            Workshop Details
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#8A733E]/60 max-w-2xl mx-auto">
            Everything you need to know before you register
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {details.map((detail, index) => (
            <div key={index} className="space-y-3 sm:space-y-4">
              <div className="text-xs sm:text-sm tracking-wider uppercase text-[#8A733E]/50">
                {detail.label}
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#8A733E]">
                {detail.value}
              </div>
              {detail.clarifier && (
                <div className="text-sm sm:text-base text-[#8A733E]/60">
                  {detail.clarifier}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}