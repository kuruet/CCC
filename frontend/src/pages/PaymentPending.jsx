import React from "react";

/**
 * PaymentPending
 * --------------
 * Shown when payment is completed but
 * booking confirmation is still processing.
 *
 * IMPORTANT:
 * - Informational only
 * - No polling
 * - No assumptions
 * - Webhook is the source of truth
 */

const PaymentPending = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#FFF5DF" }}
    >
      <div className="max-w-xl w-full text-center">
        <h1
          className="text-3xl sm:text-4xl font-semibold mb-4"
          style={{ color: "#8A733E" }}
        >
          Payment Successful 🎉
        </h1>

        <p
          className="text-base sm:text-lg mb-6"
          style={{ color: "#8A733E" }}
        >
          Your payment has been received successfully.
          <br />
          We are now confirming your booking.
        </p>

        <div
          className="rounded-xl p-5 mb-6"
          style={{
            backgroundColor: "#FFF",
            color: "#8A733E",
          }}
        >
          <p className="text-sm sm:text-base">
            This usually takes a few moments.
            <br />
            You don’t need to do anything.
          </p>
        </div>

        <p
          className="text-sm sm:text-base"
          style={{ color: "#8A733E" }}
        >
          You will receive a confirmation email shortly.
          <br />
          If you don’t see it, please check your spam folder.
        </p>

        <p
          className="text-xs mt-6 opacity-80"
          style={{ color: "#8A733E" }}
        >
          Please don’t refresh or retry payment.
        </p>
      </div>
    </div>
  );
};

export default PaymentPending;
