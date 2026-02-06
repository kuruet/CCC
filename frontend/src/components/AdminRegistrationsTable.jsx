// frontend/src/components/AdminRegistrationsTable.jsx
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminRegistrationsTable = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/registrations`);
        const data = await res.json();

        if (!data.success) {
          throw new Error("Failed to fetch registrations");
        }

        setRegistrations(data.registrations || []);
      } catch (err) {
        console.error("Admin registrations error:", err);
        setError("Unable to load registrations");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) {
    return (
      <div className="border rounded p-4 text-gray-600">
        Loading registrations…
      </div>
    );
  }

  if (error) {
    return (
      <div className="border rounded p-4 text-red-600">
        {error}
      </div>
    );
  }

  if (registrations.length === 0) {
    return (
      <div className="border rounded p-4 text-gray-600">
        No registrations found.
      </div>
    );
  }

  return (
    <div className="border rounded p-4">
      <h2 className="text-lg font-medium mb-4">
        Registrations
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Phone</th>
              <th className="text-left p-2">Slot</th>
              <th className="text-left p-2">Payment Status</th>
              <th className="text-left p-2">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.registrationId} className="border-b last:border-b-0">
                <td className="p-2">{reg.name}</td>
                <td className="p-2">{reg.email}</td>
                <td className="p-2">{reg.phone}</td>
                <td className="p-2">
                  {reg.slot === "SLOT_1" ? "12–4 PM" : "6–10 PM"}
                </td>
                <td className="p-2">{reg.paymentStatus}</td>
                <td className="p-2">
                  {reg.paymentMethod || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRegistrationsTable;
