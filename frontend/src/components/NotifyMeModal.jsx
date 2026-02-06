// frontend/src/components/NotifyMeModal.jsx
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const NotifyMeModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.mobile) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit");
      }

      setSuccess(true);
    } catch (err) {
      console.error("Notify Me error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-[#FFF5DF] p-6 shadow-lg">
        {!success ? (
          <>
            <h2 className="mb-2 text-xl font-semibold text-[#8A733E]">
              Notify Me
            </h2>
            <p className="mb-4 text-sm text-[#8A733E]">
              Leave your details and we’ll notify you when the next workshop is announced.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded border border-[#8A733E]/40 bg-white p-2 text-[#8A733E] focus:outline-none focus:ring-1 focus:ring-[#8A733E]"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded border border-[#8A733E]/40 bg-white p-2 text-[#8A733E] focus:outline-none focus:ring-1 focus:ring-[#8A733E]"
              />

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full rounded border border-[#8A733E]/40 bg-white p-2 text-[#8A733E] focus:outline-none focus:ring-1 focus:ring-[#8A733E]"
              />

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="rounded px-4 py-2 text-sm text-[#8A733E]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded bg-[#8A733E] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                >
                  {loading ? "Submitting…" : "Notify Me"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="mb-2 text-xl font-semibold text-[#8A733E]">
              You’re on the list 🙂
            </h2>
            <p className="mb-4 text-sm text-[#8A733E]">
              You will be notified whenever the next workshop is announced.
            </p>

            <button
              onClick={onClose}
              className="rounded bg-[#8A733E] px-4 py-2 text-sm font-medium text-white"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotifyMeModal;
