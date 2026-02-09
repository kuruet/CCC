const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * ================================
 * ADMIN: Fetch registrations
 * SOURCE: /api/admin/registrations
 * ================================
 */
export const fetchRegistrations = async () => {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/registrations`,
    {
      credentials: "include", // 🔑 REQUIRED for admin auth
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch registrations (${response.status})`);
  }

  const data = await response.json();

  if (!data?.success) {
    throw new Error(data?.message || "Failed to fetch registrations");
  }

  return data.registrations;
};

/**
 * ======================================
 * ADMIN: Update attended / certificate flags
 * SOURCE: /api/registrations/:id
 * ======================================
 */
export const updateRegistrationFlags = async (id, payload) => {
  if (!id) {
    throw new Error("Missing registration id");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/registrations/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 🔑 REQUIRED for admin auth
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to update registration (${response.status})`);
  }

  const data = await response.json();

  if (!data?.success) {
    throw new Error(data?.message || "Failed to update registration");
  }

  return data.data; // { _id, attended, certificateIssued }
};

/**
 * ======================================
 * PUBLIC: Fetch payment + booking status
 * SOURCE: /api/payment/status/:orderId
 *
 * CRITICAL RULES:
 * - READ ONLY
 * - SAFE FOR POLLING
 * - NO FRONTEND ASSUMPTIONS
 * ======================================
 */
export const fetchPaymentStatus = async (orderId) => {
  if (!orderId) {
    return {
      success: false,
      status: "INVALID",
      message: "Missing order reference",
    };
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/payment/status/${orderId}`,
      {
        headers: {
          "Cache-Control": "no-store", // 🔒 prevent stale status
        },
      }
    );

    if (!response.ok) {
      return {
        success: false,
        status: "ERROR",
        message: "Unable to fetch payment status",
      };
    }

    const data = await response.json();

    // HARD RULE: frontend never infers meaning
    return {
      success: Boolean(data.success),
      status: data.status || "UNKNOWN", // CONFIRMED | PENDING | FAILED | CANCELLED
      registrationId: data.registrationId || null,
    };
  } catch (err) {
    console.error("Payment status fetch failed:", err);

    return {
      success: false,
      status: "ERROR",
      message: "Network error while checking payment status",
    };
  }
};
