import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

/**
 * PaymentPending (PRODUCTION-READY)
 * --------------------------------
 * Transitional trust-layer page.
 *
 * RULES:
 * - NEVER say "Payment Successful"
 * - NEVER assume booking is confirmed
 * - Redirects user to backend-authoritative status page
 * - Webhook is the only source of truth
 */

const PaymentPending = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    // If orderId exists, move user to authoritative status page
    if (orderId) {
      navigate(`/payment-status?orderId=${orderId}`, { replace: true });
    } else {
      // Defensive fallback: no order reference
      navigate("/payment-status", { replace: true });
    }
  }, [orderId, navigate]);

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
          Confirming Your Payment…
        </h1>

        <p
          className="text-base sm:text-lg mb-6"
          style={{ color: "#8A733E" }}
        >
          Please wait while we securely verify your payment.
        </p>

        <div
          className="rounded-xl p-5 mb-6"
          style={{
            backgroundColor: "#FFF",
            color: "#8A733E",
          }}
        >
          <p className="text-sm sm:text-base">
            This may take a few moments.
            <br />
            Do not refresh or attempt another payment.
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div
            className="h-8 w-8 border-4 border-t-transparent rounded-full animate-spin"
            style={{
              borderColor: "#8A733E",
              borderTopColor: "transparent",
            }}
          />
        </div>

        <p
          className="text-xs opacity-80"
          style={{ color: "#8A733E" }}
        >
          You will be notified once confirmation is complete.
        </p>
      </div>
    </div>
  );
};

export default PaymentPending;
