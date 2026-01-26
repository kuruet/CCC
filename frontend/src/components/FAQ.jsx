import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What materials do I need for the workshop?',
      answer: 'You will need basic drawing materials including pencils (HB, 2B, 4B), sketch paper or a sketchbook, an eraser, and a black fine-liner pen. A detailed supply list with recommended brands will be sent to you upon registration. Digital artists can use a drawing tablet with their preferred software.'
    },
    {
      question: 'Will I receive a recording of the workshop?',
      answer: 'Yes, all registered participants will receive access to a recording of the workshop within 48 hours of completion. The recording will be available for 30 days, allowing you to revisit techniques and practice at your own pace.'
    },
    {
      question: 'Do I need prior drawing experience?',
      answer: 'Basic drawing experience is helpful but not required. The workshop is designed for beginners to intermediate artists. We start with fundamentals and progressively build skills throughout the session. As long as you are comfortable holding a pencil and have an interest in learning, you will benefit from this workshop.'
    },
    {
      question: 'What if I cannot attend the live session?',
      answer: 'The workshop is designed as a live, interactive experience for maximum learning value. However, if you cannot attend, you will still receive the full recording. Please note that you will miss live feedback, Q&A, and real-time demonstrations. We recommend attending live whenever possible.'
    },
    {
      question: 'Is there a certificate provided after completion?',
      answer: 'Yes, all participants who attend the full workshop will receive a digital certificate of completion from Creative Caricature Club. The certificate will be sent via email within one week of the workshop conclusion.'
    },
    {
      question: 'Can I get a refund if I change my mind?',
      answer: 'Refund requests are accepted up to 48 hours before the workshop start time. After that window, refunds are not available, but you will retain access to the workshop recording. Please contact us via email with your registration details to process a refund.'
    },
    {
      question: 'Will there be interaction with the instructor during the workshop?',
      answer: 'Absolutely. The workshop includes dedicated Q&A segments where you can ask questions directly to the instructor. There will also be live demonstrations with real-time feedback opportunities. We maintain a manageable group size to ensure personalized attention.'
    },
    {
      question: 'What platform will the workshop be conducted on?',
      answer: 'The workshop will be conducted via Google Meet. A meeting link and instructions will be sent to your registered email address 24 hours before the workshop. Please ensure you have a stable internet connection.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFAQ(index);
    }
  };

  return (
    <section className="w-full bg-[#FFF5DF] py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#8A733E]">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#8A733E]/60 max-w-2xl mx-auto">
            Everything you need to know about the workshop
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-[#8A733E]/20 pb-4 sm:pb-5 lg:pb-6"
            >
              <button
                onClick={() => toggleFAQ(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-full flex items-start justify-between text-left group focus:outline-none"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-base sm:text-lg lg:text-xl font-semibold text-[#8A733E] pr-4 group-hover:opacity-80 transition-opacity duration-200">
                  {faq.question}
                </span>
                <svg
                  className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 text-[#8A733E] transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-[500px] opacity-100 mt-3 sm:mt-4' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-sm sm:text-base lg:text-lg text-[#8A733E]/70 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}