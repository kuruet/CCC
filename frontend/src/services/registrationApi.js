const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetch registrations for ADMIN dashboard
 * SOURCE: /api/admin/registrations
 */
export const fetchRegistrations = async () => {
  const response = await fetch(`${API_BASE_URL}/api/admin/registrations`);

  if (!response.ok) {
    throw new Error("Failed to fetch registrations");
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || "Failed to fetch registrations");
  }

  // ✅ Admin API returns `registrations`
  return data.registrations;
};

/**
 * Update attended / certificateIssued flags
 * SOURCE: /api/registrations/:id
 */
export const updateRegistrationFlags = async (id, payload) => {
  const response = await fetch(`${API_BASE_URL}/api/registrations/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update registration");
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || "Failed to update registration");
  }

  return data.data; // { _id, attended, certificateIssued }
};
