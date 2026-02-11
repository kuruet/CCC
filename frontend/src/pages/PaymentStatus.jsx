import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * PaymentStatus (PRODUCTION-READY)
 * --------------------------------
 * Backend-authoritative payment confirmation page.
 *
 * Rules:
 * - Frontend NEVER assumes success
 * - Webhook is the only authority
 * - This page polls backend until final state
 */

const POLL_INTERVAL_MS = 3000;      // 3 seconds
const MAX_POLL_TIME_MS = 2 * 60 * 1000; // 2 minutes

const PaymentStatus = () => {
 
const { orderId } = useParams();
  const [status, setStatus] = useState("CHECKING"); // CHECKING | CONFIRMED | FAILED
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!orderId) {
      setStatus("FAILED");
      setError("Missing order reference.");
      return;
    }

    let elapsed = 0;
    const startTime = Date.now();

    const pollStatus = async () => {
      try {
        const res = await fetch(
  `${API_BASE_URL}/api/payment/status/${orderId}`,
  { cache: "no-store" }
);


        const data = await res.json();

        if (!data || !data.status) return;


        if (data.status === "CONFIRMED") {
  setStatus("CONFIRMED");
  clearInterval(interval);
  return;
}


        if (data.status === "FAILED" || data.status === "CANCELLED") {
          setStatus("FAILED");
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Status polling error:", err);
      }

      elapsed = Date.now() - startTime;

    if (elapsed > MAX_POLL_TIME_MS) {
  clearInterval(interval);
  setError(
    "Payment received. Confirmation is taking longer than usual. You will receive an email shortly."
  );
}

    };

    pollStatus(); // immediate
    const interval = setInterval(pollStatus, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
}, [orderId, API_BASE_URL]);

  // ---------------- UI STATES ----------------

  if (status === "CONFIRMED") {
  return (
    <StatusLayout
      title="Booking Confirmed 🎉"
      message="Your seat has been successfully reserved."
      subMessage="A confirmation email has been sent to your registered email."
      showSpinner={false}
    />
  );
}

  if (status === "FAILED") {
    return (
      <StatusLayout
        title="Payment Not Confirmed"
        message={error || "Your payment could not be confirmed."}
        subMessage="If money was deducted, it will be auto-refunded within 3–5 working days."
        showSpinner={false}
      />
    );
  }

  return (
    <StatusLayout
      title="Confirming Your Booking…"
      message="We are verifying your payment securely."
      subMessage="This may take a few moments. Please do not refresh."
      showSpinner={true}
    />
  );
};

 


// ---------------- UI LAYOUT ----------------

const StatusLayout = ({
  title,
  message,
  subMessage,
  showSpinner,
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
          style={{ backgroundColor: "#FFF", color: "#8A733E" }}
        >
          <p className="text-sm sm:text-base">{subMessage}</p>
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
          Please do not make another payment.
        </p>
      </div>
    </div>
  );
};

export default PaymentStatus;
