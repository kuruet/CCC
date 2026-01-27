import React from 'react';

const Refund = () => {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#FFF5DF' }}>
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header Section */}
        <header className="text-center mb-16 border-b pb-8" style={{ borderColor: '#8A733E' }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#8A733E' }}>
            Refund & Cancellation Policy
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
              This Refund & Cancellation Policy outlines the terms and conditions regarding refunds and cancellations for paid online workshops offered by Creative Caricature Club.
            </p>
            <p className="leading-relaxed">
              This policy applies to all users who purchase workshops or services through our website. By completing a payment, you acknowledge that you have read, understood, and agree to be bound by this policy.
            </p>
          </section>

          {/* General Refund Policy */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">2. General Refund Policy</h2>
            <p className="leading-relaxed mb-3">
              Payments made for Creative Caricature Club workshops are processed for limited-capacity online sessions. Due to the nature of digital educational services and capacity constraints, we maintain a strict refund policy.
            </p>
            <p className="leading-relaxed">
              <strong>No refunds will be issued once payment has been successfully completed</strong>, except in the specific circumstances outlined in this policy.
            </p>
          </section>

          {/* Workshop Cancellation by Organizer */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">3. Workshop Cancellation by Organizer</h2>
            <p className="leading-relaxed mb-3">
              If Creative Caricature Club cancels a workshop due to unforeseen circumstances, technical issues, or any other reason, enrolled users will be offered one of the following options:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed mb-3">
              <li>A full refund of the workshop fee</li>
              <li>The opportunity to attend a rescheduled session at a later date</li>
            </ul>
            <p className="leading-relaxed">
              The final decision regarding which option is offered rests solely with Creative Caricature Club. We will make reasonable efforts to accommodate user preferences where possible.
            </p>
          </section>

          {/* User-Initiated Cancellation */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">4. User-Initiated Cancellation</h2>
            <p className="leading-relaxed mb-3">
              If a user voluntarily chooses to cancel their workshop enrollment after payment has been completed, no refund will be issued under any circumstances.
            </p>
            <p className="leading-relaxed mb-3">
              This policy applies regardless of the reason for cancellation, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>Change of mind or personal preference</li>
              <li>Scheduling conflicts or time zone issues</li>
              <li>Personal emergencies or unforeseen circumstances</li>
              <li>Dissatisfaction with workshop content or format</li>
            </ul>
          </section>

          {/* Missed Workshops */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">5. Missed Workshops</h2>
            <p className="leading-relaxed mb-3">
              If a user fails to attend a workshop after completing payment, whether due to forgetting, scheduling errors, or any other reason, no refund will be issued.
            </p>
            <p className="leading-relaxed">
              Creative Caricature Club is under no obligation to reschedule the workshop or provide alternative attendance options for users who miss their scheduled sessions.
            </p>
          </section>

          {/* Recorded Content Access */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">6. Recorded Content Access</h2>
            <p className="leading-relaxed mb-3">
              Some workshops include access to recorded content, digital materials, or downloadable resources. Once access to such content or materials has been granted to a user, no refund will be issued.
            </p>
            <p className="leading-relaxed">
              The provision of digital access is considered fulfillment of service delivery. Users who have accessed workshop materials, recordings, or resources forfeit eligibility for any refund, even if they do not attend the live session.
            </p>
          </section>

          {/* Technical Issues (User Side) */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">7. Technical Issues (User Side)</h2>
            <p className="leading-relaxed mb-3">
              Creative Caricature Club is not responsible for technical issues that originate from the user's end. No refunds will be issued for issues including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed mb-3">
              <li>Internet connectivity failures or slow connection speeds</li>
              <li>Device malfunctions, compatibility issues, or software problems</li>
              <li>Power outages or electrical disruptions</li>
              <li>User error in accessing workshop links or platforms</li>
              <li>Browser or application configuration issues</li>
            </ul>
            <p className="leading-relaxed">
              It is the user's responsibility to ensure they have a stable internet connection, compatible devices, and appropriate technical setup to attend online workshops.
            </p>
          </section>

          {/* Technical Issues (Organizer Side) */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">8. Technical Issues (Organizer Side)</h2>
            <p className="leading-relaxed mb-3">
              If technical issues originating from Creative Caricature Club's systems, platforms, or infrastructure prevent the successful delivery of a workshop, we will take appropriate action to remedy the situation.
            </p>
            <p className="leading-relaxed">
              In such cases, the workshop may be rescheduled to a later date, or a refund may be issued at the sole discretion of Creative Caricature Club. We will communicate any such decisions to affected users promptly.
            </p>
          </section>

          {/* Payment & Refund Processing */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">9. Payment & Refund Processing</h2>
            <p className="leading-relaxed mb-3">
              All payments are processed securely through Razorpay. In cases where a refund is approved in accordance with this policy, refunds will be processed manually via bank transfer to the original payment method.
            </p>
            <p className="leading-relaxed mb-3">
              Please note that refunds are not processed automatically. Once a refund request is approved, processing typically takes 5 to 7 business days, depending on your bank or payment provider.
            </p>
            <p className="leading-relaxed">
              Users are responsible for providing accurate bank or payment details for refund processing. Creative Caricature Club is not liable for delays or failures resulting from incorrect information provided by the user.
            </p>
          </section>

          {/* Transaction Fees */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">10. Transaction Fees</h2>
            <p className="leading-relaxed">
              Payment gateway fees, transaction charges, or any other processing fees incurred during the original payment are non-refundable. If a refund is issued, only the workshop fee will be refunded, excluding all transaction-related charges.
            </p>
          </section>

          {/* Abuse & Misuse Prevention */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">11. Abuse & Misuse Prevention</h2>
            <p className="leading-relaxed mb-3">
              Creative Caricature Club reserves the right to deny refund requests that are deemed fraudulent, abusive, or made in bad faith. This includes but is not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed mb-3">
              <li>Repeated refund requests from the same user</li>
              <li>Attempts to exploit refund policies</li>
              <li>False claims or misrepresentation of circumstances</li>
              <li>Chargeback disputes initiated without prior communication</li>
            </ul>
            <p className="leading-relaxed">
              All refund decisions made by Creative Caricature Club are final and binding. We reserve the right to terminate access to services for users who violate this policy.
            </p>
          </section>

          {/* Policy Changes */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">12. Policy Changes</h2>
            <p className="leading-relaxed mb-3">
              Creative Caricature Club reserves the right to update, modify, or amend this Refund & Cancellation Policy at any time without prior notice. Changes will be effective immediately upon posting to this page.
            </p>
            <p className="leading-relaxed">
              Continued use of our services following any changes constitutes acceptance of the updated policy. We encourage users to review this page periodically to stay informed of any modifications.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">13. Contact Information</h2>
            <p className="leading-relaxed mb-4">
              If you have questions regarding this Refund & Cancellation Policy or need to discuss a specific refund request, please contact us:
            </p>
            <div className="space-y-2 leading-relaxed">
              <p><strong>Email:</strong> creativecaricatureclub@gmail.com</p>
              <p><strong>Location:</strong> India</p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Refund;