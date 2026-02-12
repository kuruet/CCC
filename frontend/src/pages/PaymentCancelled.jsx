import React from "react";

const PaymentCancelled = () => {
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
          Payment Cancelled
        </h1>

        <p
          className="text-base sm:text-lg mb-6"
          style={{ color: "#8A733E" }}
        >
          Your payment was not completed.
        </p>

        <div
          className="rounded-xl p-5 mb-6"
          style={{ backgroundColor: "#FFF", color: "#8A733E" }}
        >
          <p className="text-sm sm:text-base">
            If money was deducted, it will be automatically refunded.
          </p>
        </div>

        <p
          className="text-xs opacity-80"
          style={{ color: "#8A733E" }}
        >
          You can try registering again.
        </p>
      </div>
    </div>
  );
};

export default PaymentCancelled;
