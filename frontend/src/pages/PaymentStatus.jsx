import React from "react";

/**
 * PaymentStatus
 * -------------
 * Generic status page for showing final or intermediate
 * payment / booking states.
 *
 * This component is UI-only.
 * Actual status resolution happens via backend/webhook.
 */

const PaymentStatus = ({
  title = "Checking Booking Status…",
  message = "Please wait while we confirm your booking.",
  subMessage = "This may take a few moments.",
  showSpinner = true,
}) => {
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
          {title}
        </h1>

        <p
          className="text-base sm:text-lg mb-6"
          style={{ color: "#8A733E" }}
        >
          {message}
        </p>

        <div
          className="rounded-xl p-5 mb-6"
          style={{
            backgroundColor: "#FFF",
            color: "#8A733E",
          }}
        >
          <p className="text-sm sm:text-base">
            {subMessage}
          </p>
        </div>

        {showSpinner && (
          <div className="flex justify-center mb-6">
            <div
              className="h-8 w-8 border-4 border-t-transparent rounded-full animate-spin"
              style={{
                borderColor: "#8A733E",
                borderTopColor: "transparent",
              }}
            />
          </div>
        )}

        <p
          className="text-xs opacity-80"
          style={{ color: "#8A733E" }}
        >
          Please do not refresh or make another payment.
        </p>
      </div>
    </div>
  );
};

export default PaymentStatus;
