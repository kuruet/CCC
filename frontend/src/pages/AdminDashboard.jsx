// frontend/src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import AdminRegistrationsTable from "../components/AdminRegistrationsTable";
import AdminNotifySubscribers from "../components/AdminNotifySubscribers";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
  const [seatStats, setSeatStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSeatStats = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/seat-stats`);
        const data = await res.json();

        if (!data.success) {
          throw new Error("Failed to load seat stats");
        }

        setSeatStats(data);
      } catch (err) {
        console.error("Admin seat stats error:", err);
        setError("Unable to load admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchSeatStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading admin dashboard…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      {/* Seat Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded p-4">
          <h2 className="font-medium mb-2">Slot 1 (12 PM – 4 PM)</h2>
          <p>Filled: {seatStats.slots.SLOT_1.filled}</p>
          <p>Remaining: {seatStats.slots.SLOT_1.remaining}</p>
        </div>

        <div className="border rounded p-4">
          <h2 className="font-medium mb-2">Slot 2 (6 PM – 10 PM)</h2>
          <p>Filled: {seatStats.slots.SLOT_2.filled}</p>
          <p>Remaining: {seatStats.slots.SLOT_2.remaining}</p>
        </div>
      </div>

      {/* Registrations Table */}
      <AdminRegistrationsTable />

      {/* Notify Subscribers */}
      <AdminNotifySubscribers />
    </div>
  );
};

export default AdminDashboard;
