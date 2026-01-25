import { useState, useEffect, useRef } from 'react';

/**
 * Contact Component - Premium Contact Section with Form
 * 
 * CUSTOMIZATION:
 * - Email address: Search for "adfisherdesign@gmail.com" and replace with your email
 * - Heading & copy: Edit the defaultContent object below
 * - Form endpoint: Update the submitForm function with your API endpoint
 * 
 * INTEGRATION OPTIONS:
 * - Formspree: Change endpoint to https://formspree.io/f/YOUR_FORM_ID
 * - Custom API: Replace fetch URL in submitForm function
 * - Email service: Use EmailJS, SendGrid, or similar
 * 
 * ACCESSIBILITY:
 * - Full keyboard navigation
 * - Screen reader announcements for errors/success
 * - ARIA labels and descriptions
 * - Focus management
 */

// Default content - customize as needed
const defaultContent = {
  heading: "Let's Connect",
  paragraph: "Feel free to leave us a message via the form, or you can get a hold of me at ",
  email: "collabccc15@gmail.com",
  closingText: ""
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const formRef = useRef(null);
  const statusRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    setIsVisible(true);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  async function submitForm(data) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const success = Math.random() > 0.1;
    return { ok: success };
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length > 5000) {
      newErrors.message = 'Message must be less than 5000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) errorElement.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const sanitizedData = Object.entries(formData).reduce((acc, [key, value]) => {
        acc[key] = typeof value === 'string' ? value.trim() : value;
        return acc;
      }, {});

      const result = await submitForm(sanitizedData);

      if (result.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      if (statusRef.current) {
        statusRef.current.focus();
      }
    }
  };

  const handleReset = () => {
    setSubmitStatus(null);
    if (formRef.current) {
      const firstInput = formRef.current.querySelector('input');
      if (firstInput) firstInput.focus();
    }
  };

  return (
    <>
      {/* Morion Font */}
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
      `}</style>

      <section
        ref={sectionRef}
        role="region"
        aria-labelledby="contact-heading"
        className="w-full py-16 md:py-24"
        style={{ backgroundColor: '#fff5df' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            <div 
              className={`relative ${
                prefersReducedMotion
                  ? ''
                  : `transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`
              }`}
            >
              <div 
                className="hidden lg:block absolute -left-16 top-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl" 
                style={{ color: "#8a733e" }}
                aria-hidden="true"
              ></div>

              <div className="relative z-10 max-w-xl">
                <h2
                  id="contact-heading"
                  className="morion-text font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight"
                  style={{ color: "#8a733e" }}
                >
                  {defaultContent.heading}
                </h2>

                <div className="w-24 rounded-full mb-8" style={{ backgroundColor: "#8a733e" }} aria-hidden="true"></div>

                <p className="morion-text text-base md:text-lg leading-relaxed mb-4" style={{ color: "#8a733e" }}>
                  {defaultContent.paragraph}
                  <a
                    href={`mailto:${defaultContent.email}`}
                    className="morion-text font-semibold hover:underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded"
                    style={{ color: "#8a733e" }}
                    aria-label={`Email us at ${defaultContent.email}`}
                    rel="noopener noreferrer"
                  >
                    {defaultContent.email}
                  </a>
                  {defaultContent.closingText}
                </p>
              </div>
            </div>

            <div
              className={`${
                prefersReducedMotion
                  ? ''
                  : `transition-all duration-700 delay-200 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`
              }`}
            >
              <div className="rounded-xl shadow-lg p-6 md:p-10">
                {submitStatus === 'success' ? (
                  <div
                    ref={statusRef}
                    role="status"
                    tabIndex="-1"
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ color: "#8a733e" }}>
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-[#8a733e] text-2xl font-bold mb-2">Thank you!</h3>
                    <p className="morion-text text-gray-600 mb-6">Your submission has been received!</p>
                    <button
                      onClick={handleReset}
 className="
      inline-block font-semibold text-base md:text-lg px-8 py-4 rounded-2xl shadow-lg
      text-[#8a733e] bg-[#fff5df] border-2 border-[#8a733e]
      hover:bg-[#8a733e] hover:text-[#fff5df] hover:shadow-xl
      transition-all duration-300 transform hover:-translate-y-1
      focus:outline-none focus:ring-4 focus:ring-gray-900 focus:ring-offset-4
      visited:text-[#8a733e]
    "                       
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : submitStatus === 'error' ? (
                  <div
                    ref={statusRef}
                    role="alert"
                    tabIndex="-1"
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </div>
                    <h3 className="morion-text text-2xl font-bold text-gray-900 mb-2">Oops!</h3>
                    <p className="morion-text text-gray-600 mb-6">Something went wrong while submitting the form.</p>
                    <button
                      onClick={handleReset}
 className="
      inline-block font-semibold text-base md:text-lg px-8 py-4 rounded-2xl shadow-lg
      text-[#8a733e] bg-[#fff5df] border-2 border-[#8a733e]
      hover:bg-[#8a733e] hover:text-[#fff5df] hover:shadow-xl
      transition-all duration-300 transform hover:-translate-y-1
      focus:outline-none focus:ring-4 focus:ring-gray-900 focus:ring-offset-4
      visited:text-[#8a733e]
    "                      style={{ color: "#8a733e" }}
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <div ref={formRef} aria-label="Contact form" role="group">
                    <div className="mb-6">
                      <label
                        htmlFor="name"
                        className="morion-text block text-sm font-semibold mb-2" 
                        style={{ color: "#8a733e" }}
                      >
                        Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={`w-full border ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        } rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors text-black`}
                      />
                      {errors.name && (
                        <p id="name-error" className="morion-text text-red-600 text-sm mt-1" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="morion-text block text-sm font-semibold mb-2"
                        style={{ color: "#8a733e" }}
                      >
                        Email Address <span className="text-black">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoCapitalize="off"
                        inputMode="email"
                        aria-required="true"
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`w-full border ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors text-black`}
                      />
                      {errors.email && (
                        <p id="email-error" className="morion-text text-red-600 text-sm mt-1" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="phone"
                        className="morion-text block text-sm font-semibold mb-2"
                        style={{ color: "#8a733e" }}
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        inputMode="tel"
                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors text-black"
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="subject"
                        className="morion-text block text-sm font-semibold mb-2"
                        style={{ color: "#8a733e" }}
                      >
                        What's this regarding? <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={errors.subject ? 'true' : 'false'}
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                        className={`w-full border ${
                          errors.subject ? 'border-red-500' : 'border-gray-300'
                        } rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors text-black`}
                      />
                      {errors.subject && (
                        <p id="subject-error" className="morion-text text-red-600 text-sm mt-1" role="alert">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="morion-text block text-sm font-semibold mb-2"
                        style={{ color: "#8a733e" }}
                      >
                        Message <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="6"
                        maxLength="5000"
                        aria-required="true"
                        aria-invalid={errors.message ? 'true' : 'false'}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={`w-full border ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        } rounded-md px-4 py-3 min-h-[140px] md:min-h-[180px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors resize-y text-black`}
                      ></textarea>
                      {errors.message && (
                        <p id="message-error" className="morion-text text-red-600 text-sm mt-1" role="alert">
                          {errors.message}
                        </p>
                      )}
                      <p className="morion-text text-xs mt-1" style={{ color: "#8a733e" }}>
                        {formData.message.length}/5000 characters
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`morion-text w-full md:w-auto font-semibold px-8 py-3 rounded-lg shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                        text-[#8a733e] bg-[#fff5df] border-2 border-[#8a733e]
                        ${isSubmitting ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'hover:shadow-xl transform hover:-translate-y-0.5 hover:bg-[#8a733e] hover:text-[#fff5df]'}`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;