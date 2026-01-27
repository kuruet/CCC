import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#FFF5DF' }}>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3" style={{ color: '#8A733E' }}>
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: '#8A733E' }}>
            Last Updated: January 28, 2026
          </p>
        </header>

        <div className="space-y-8" style={{ color: '#8A733E' }}>
          <section>
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="mb-4 leading-relaxed">
              CreativeCaricatureClub is a professional creative services company based in India, offering paid online workshops and related creative services. This Privacy Policy governs the use of our website and explains how we collect, use, and protect your personal information.
            </p>
            <p className="leading-relaxed">
              By accessing or using our website, you agree to the terms outlined in this Privacy Policy. If you do not agree with any part of this policy, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p className="mb-4 leading-relaxed">
              We collect personal information that you voluntarily provide to us when you register for workshops, contact us, or use our services. The information we collect includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Workshop registration details</li>
              <li>Any other information you choose to provide through forms or communications</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              We only collect information that is necessary for providing our services. We do not collect unnecessary data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
            <p className="mb-4 leading-relaxed">
              All payments for our workshops and services are processed securely through Razorpay, a certified payment gateway provider. CreativeCaricatureClub does not store, process, or have access to your credit card, debit card, or other sensitive payment information.
            </p>
            <p className="leading-relaxed">
              Payment data is handled entirely by the payment gateway in compliance with industry security standards. For questions regarding payment security, please refer to Razorpay's privacy and security policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How We Use Collected Information</h2>
            <p className="mb-4 leading-relaxed">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>Processing workshop registrations and enrollment</li>
              <li>Sending registration confirmations, workshop updates, and important notifications</li>
              <li>Providing customer support and responding to inquiries</li>
              <li>Improving our services and user experience</li>
              <li>Communicating about upcoming workshops, services, and relevant updates</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Cookies & Analytics</h2>
            <p className="mb-4 leading-relaxed">
              Our website uses cookies and similar technologies to enhance your browsing experience, analyze website traffic, and understand user behavior. We may use analytics tools such as Google Analytics to collect information about how visitors use our website.
            </p>
            <p className="leading-relaxed">
              You can manage or disable cookies through your browser settings. Please note that disabling cookies may affect the functionality of certain features on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Sharing & Disclosure</h2>
            <p className="mb-4 leading-relaxed">
              We respect your privacy and do not sell, rent, or trade your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>With payment processors such as Razorpay to facilitate secure transactions</li>
              <li>With service providers who assist us in operating our website and delivering services, under strict confidentiality agreements</li>
              <li>When required by law, regulation, legal process, or governmental request</li>
              <li>To protect our rights, property, safety, or the rights of our users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <p className="mb-4 leading-relaxed">
              We implement reasonable administrative, technical, and physical security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. We use industry-standard practices to safeguard the data we collect.
            </p>
            <p className="leading-relaxed">
              However, please be aware that no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">User Rights</h2>
            <p className="mb-4 leading-relaxed">
              You have the right to access, correct, update, or request deletion of your personal information that we hold. If you wish to exercise any of these rights, please contact us using the contact information provided below.
            </p>
            <p className="leading-relaxed">
              We will respond to your requests in accordance with applicable data protection laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Policy Updates</h2>
            <p className="mb-4 leading-relaxed">
              We reserve the right to update or modify this Privacy Policy at any time to reflect changes in our practices, legal requirements, or business operations. When we make changes, we will update the "Last Updated" date at the top of this page.
            </p>
            <p className="leading-relaxed">
              We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information. Your continued use of our services after any changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="mb-4 leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="leading-relaxed">
              <strong>Email:</strong> creativecaricatureclub@gmail.com
            </p>
            <p className="leading-relaxed">
              <strong>Location:</strong> India
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;