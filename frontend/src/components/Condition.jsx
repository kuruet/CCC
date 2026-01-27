import React from 'react';

const Condition = () => {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#FFF5DF' }}>
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Page Header */}
        <header className="text-center mb-16 border-b pb-8" style={{ borderColor: '#8A733E' }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#8A733E' }}>
            Terms & Conditions
          </h1>
          <p className="text-sm md:text-base" style={{ color: '#8A733E' }}>
            Last Updated: January 28, 2026
          </p>
        </header>

        {/* Main Content */}
        <article className="space-y-12" style={{ color: '#8A733E' }}>
          {/* Introduction */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">1. Introduction</h2>
            <p className="leading-relaxed mb-3">
              This website is operated by Creative Caricature Club. These Terms & Conditions govern your access to and use of our website, services, and online workshops.
            </p>
            <p className="leading-relaxed">
              By accessing our website or purchasing any of our workshops, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our website or services.
            </p>
          </section>

          {/* Business Information */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">2. Business Information</h2>
            <ul className="space-y-2 leading-relaxed">
              <li><strong>Brand Name:</strong> Creative Caricature Club</li>
              <li><strong>Country of Operation:</strong> India</li>
              <li><strong>Governing Law:</strong> These Terms are governed by the laws of India</li>
              <li><strong>Jurisdiction:</strong> Courts of Mumbai, Maharashtra, India</li>
            </ul>
          </section>

          {/* Services Offered */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">3. Services Offered</h2>
            <p className="leading-relaxed mb-3">
              Creative Caricature Club offers the following services:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>Live online workshops on caricature art and related techniques</li>
              <li>Live workshops with access to recorded content for future reference</li>
              <li>Art education and training programs</li>
              <li>Digital learning materials and resources</li>
            </ul>
            <p className="leading-relaxed mt-3">
              The availability, pricing, and content of workshops are subject to change without prior notice. Creative Caricature Club reserves the right to modify, suspend, or discontinue any service at any time.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">4. Eligibility</h2>
            <p className="leading-relaxed mb-3">
              To use our website and purchase our workshops, you must be at least 13 years of age. Users under the age of 18 must obtain parental or legal guardian consent before accessing or purchasing any services.
            </p>
            <p className="leading-relaxed">
              By using our website or making a purchase, you confirm that you meet these eligibility requirements and have the authority to enter into these Terms.
            </p>
          </section>

          {/* Pricing & Payments */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">5. Pricing & Payments</h2>
            <p className="leading-relaxed mb-3">
              All payments for our workshops and services are processed securely through Razorpay, a certified payment gateway. Creative Caricature Club does not store or have access to your payment card information.
            </p>
            <p className="leading-relaxed mb-3">
              Prices for workshops may change at any time without prior notice. However, once you have successfully completed a payment, the price you paid will be locked and will not be affected by subsequent price changes.
            </p>
            <p className="leading-relaxed">
              All prices are displayed in Indian Rupees (INR) unless explicitly stated otherwise. Additional taxes or fees may apply depending on your location and payment method.
            </p>
          </section>

          {/* Refund & Cancellation Policy */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">6. Refund & Cancellation Policy</h2>
            <p className="leading-relaxed mb-3">
              <strong>No refunds will be provided once payment has been successfully completed.</strong> Similarly, no cancellations are permitted after a successful payment transaction.
            </p>
            <p className="leading-relaxed mb-3">
              The only exception to this policy is if a workshop is cancelled by Creative Caricature Club. In such cases, a full refund will be issued to the original payment method.
            </p>
            <p className="leading-relaxed">
              For complete details regarding our refund and cancellation policies, please refer to our dedicated <a href="/refund-policy" className="underline hover:opacity-75 transition-opacity">Refund & Cancellation Policy</a> page.
            </p>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">7. User Conduct</h2>
            <p className="leading-relaxed mb-3">
              By using our website and services, you agree to conduct yourself in a professional and respectful manner. Specifically, you agree NOT to:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed mb-3">
              <li>Misuse the website, its content, or services in any way</li>
              <li>Harass, threaten, or abuse instructors or other workshop participants</li>
              <li>Record, share, reproduce, or redistribute any paid content, including videos, materials, or techniques</li>
              <li>Attempt to breach, compromise, or test the security of our systems</li>
              <li>Use automated tools, bots, or scripts to access or scrape website content</li>
              <li>Engage in any activity that disrupts or interferes with the website or services</li>
            </ul>
            <p className="leading-relaxed">
              Violation of these conduct rules may result in immediate termination of your access to the website and services, with no refund provided for any purchased workshops or materials.
            </p>
          </section>

          {/* Intellectual Property Rights */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">8. Intellectual Property Rights</h2>
            <p className="leading-relaxed mb-3">
              All content provided by Creative Caricature Club, including but not limited to videos, PDFs, worksheets, techniques, artwork, designs, logos, branding, and educational materials, is the exclusive intellectual property of Creative Caricature Club.
            </p>
            <p className="leading-relaxed mb-3">
              You are granted a personal, non-commercial, non-transferable license to access and use the content solely for your own learning purposes. You may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed mb-3">
              <li>Reproduce, duplicate, or copy any content</li>
              <li>Resell, redistribute, or share content with others</li>
              <li>Modify, adapt, or create derivative works from our content</li>
              <li>Use content for commercial purposes</li>
            </ul>
            <p className="leading-relaxed">
              Unauthorized use of our intellectual property may result in legal action and termination of your access to our services.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">9. Limitation of Liability</h2>
            <p className="leading-relaxed mb-3">
              To the fullest extent permitted by law, Creative Caricature Club shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our website, services, or workshops.
            </p>
            <p className="leading-relaxed mb-3">
              Our total liability to you for any claims arising from your use of our services is strictly limited to the amount you paid for the specific workshop or service in question.
            </p>
            <p className="leading-relaxed">
              We do not guarantee specific learning outcomes, skill improvements, or career benefits as a result of participating in our workshops. Results may vary based on individual effort, dedication, and circumstances.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">10. Third-Party Services</h2>
            <p className="leading-relaxed mb-3">
              Our website uses third-party services, including Razorpay for payment processing. These third-party services operate under their own terms and privacy policies, which are independent of Creative Caricature Club.
            </p>
            <p className="leading-relaxed">
              Creative Caricature Club is not responsible for any outages, technical failures, data breaches, or issues arising from the use of third-party services. For concerns related to payment processing, please contact Razorpay directly.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">11. Changes to Terms</h2>
            <p className="leading-relaxed mb-3">
              Creative Caricature Club reserves the right to update, modify, or replace these Terms & Conditions at any time without prior notice. Changes will be effective immediately upon posting to this page.
            </p>
            <p className="leading-relaxed">
              Your continued use of the website or services after any changes constitutes your acceptance of the updated Terms. We encourage you to review this page periodically to stay informed of any modifications.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">12. Contact Information</h2>
            <p className="leading-relaxed mb-4">
              If you have any questions, concerns, or require clarification regarding these Terms & Conditions, please contact us:
            </p>
            <div className="space-y-2 leading-relaxed">
              <p><strong>Email:</strong> creativecaricatureclub@gmail.com</p>
              <p><strong>Location:</strong> Mumbai, Maharashtra, India</p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Condition;