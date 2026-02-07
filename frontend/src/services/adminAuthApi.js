const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Admin login
 * POST /api/admin/login
 */
export const adminLogin = async ({ email, password }) => {
  const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔑 allow httpOnly cookies
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

/**
 * Admin logout
 * POST /api/admin/logout
 */
export const adminLogout = async () => {
  const res = await fetch(`${API_BASE_URL}/api/admin/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }
};

/**
 * Check admin authentication
 * GET /api/admin/me
 */
export const getAdminMe = async () => {
  const res = await fetch(`${API_BASE_URL}/api/admin/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
};
