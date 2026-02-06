// frontend/src/components/AdminNotifySubscribers.jsx
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminNotifySubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/notify-subscribers`);
        const data = await res.json();

        if (!data.success) {
          throw new Error("Failed to fetch notify subscribers");
        }

        setSubscribers(data.subscribers || []);
      } catch (err) {
        console.error("Admin notify subscribers error:", err);
        setError("Unable to load notify subscribers");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  if (loading) {
    return (
      <div className="border rounded p-4 text-gray-600">
        Loading notify subscribers…
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

  if (subscribers.length === 0) {
    return (
      <div className="border rounded p-4 text-gray-600">
        No notify subscribers yet.
      </div>
    );
  }

  return (
    <div className="border rounded p-4">
      <h2 className="text-lg font-medium mb-4">
        Notify Subscribers
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Mobile</th>
              <th className="text-left p-2">Submitted On</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub.id} className="border-b last:border-b-0">
                <td className="p-2">{sub.name}</td>
                <td className="p-2">{sub.email}</td>
                <td className="p-2">{sub.mobile}</td>
                <td className="p-2">
                  {new Date(sub.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminNotifySubscribers;
