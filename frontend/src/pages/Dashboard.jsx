import React, { useEffect, useRef, useState } from "react";
import {
  fetchRegistrations,
  updateRegistrationFlags,
} from "../services/registrationApi";

const POLL_INTERVAL_MS = 15000;

const Dashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pollError, setPollError] = useState("");
  const [actionError, setActionError] = useState("");
  const [savingMap, setSavingMap] = useState({});
  const isPollingRef = useRef(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const loadInitial = async () => {
      try {
        const data = await fetchRegistrations();
        setRegistrations(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    loadInitial();
  }, []);

  useEffect(() => {
    if (loading || error) return;
    const poll = async () => {
      if (isPollingRef.current) return;
      isPollingRef.current = true;
      try {
        const data = await fetchRegistrations();
        setRegistrations(data);
        setPollError("");
      } catch {
        setPollError("Live update failed. Retrying…");
      } finally {
        isPollingRef.current = false;
      }
    };
    intervalRef.current = setInterval(poll, POLL_INTERVAL_MS);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [loading, error]);

  const setSaving = (id, val) =>
    setSavingMap((m) => ({ ...m, [id]: val }));

  const applyServerUpdate = (id, serverData) => {
    setRegistrations((list) =>
      list.map((r) => (r._id === id ? { ...r, ...serverData } : r))
    );
  };

  const onToggleAttended = async (reg) => {
    const id = reg._id;
    setActionError("");
    setSaving(id, true);
    try {
      const serverData = await updateRegistrationFlags(id, {
        attended: !reg.attended,
      });
      applyServerUpdate(id, serverData);
    } catch (err) {
      setActionError(err.message || "Update failed");
    } finally {
      setSaving(id, false);
    }
  };

  const onToggleCertificate = async (reg) => {
    const id = reg._id;
    setActionError("");
    setSaving(id, true);
    try {
      const serverData = await updateRegistrationFlags(id, {
        certificateIssued: !reg.certificateIssued,
      });
      applyServerUpdate(id, serverData);
    } catch (err) {
      setActionError(err.message || "Update failed");
    } finally {
      setSaving(id, false);
    }
  };


  // console.log(registrations[0]);


  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF5DF] px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#8A733E] mb-2">
              Online Caricature Workshop Dashboard
            </h1>
            <p className="text-[#8A733E] text-sm opacity-75">
              Manage workshop registrations, attendance, and certificates
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#8A733E] bg-opacity-5 border-b border-[#8A733E] border-opacity-10">
                  <tr>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[#8A733E] w-16">No.</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#8A733E] w-48">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#8A733E] w-40">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#8A733E] w-56">Email</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[#8A733E] w-28">
  Slot
</th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#8A733E] w-44">Registered At</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[#8A733E] w-32">Attended</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[#8A733E] w-32">Certificate</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b border-[#8A733E] border-opacity-5">
                        <td className="px-6 py-4 text-center w-16">
  <div className="h-4 bg-[#8A733E] bg-opacity-10 rounded animate-pulse w-6 mx-auto"></div>
</td>

                      <td className="px-6 py-4 w-48">
                        <div className="h-4 bg-[#8A733E] bg-opacity-10 rounded animate-pulse w-32"></div>
                      </td>
                      <td className="px-6 py-4 w-40">
                        <div className="h-4 bg-[#8A733E] bg-opacity-10 rounded animate-pulse w-24"></div>
                      </td>
                      <td className="px-6 py-4 w-56">
                        <div className="h-4 bg-[#8A733E] bg-opacity-10 rounded animate-pulse w-40"></div>
                      </td>
                       
                    <td className="px-6 py-4 text-center w-28">
  <div className="h-4 bg-[#8A733E] bg-opacity-10 rounded animate-pulse w-12 mx-auto"></div>
</td>

<td className="px-6 py-4 w-44">
  <div className="h-4 bg-[#8A733E] bg-opacity-10 rounded animate-pulse w-28"></div>
</td>


                      <td className="px-6 py-4 text-center w-32">
                        <div className="h-5 w-5 bg-[#8A733E] bg-opacity-10 rounded mx-auto animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4 text-center w-32">
                        <div className="h-5 w-5 bg-[#8A733E] bg-opacity-10 rounded mx-auto animate-pulse"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FFF5DF] px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#8A733E] mb-2">
              Online Caricature Workshop Dashboard
            </h1>
            <p className="text-[#8A733E] text-sm opacity-75">
              Manage workshop registrations, attendance, and certificates
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg px-6 py-4 text-red-800">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF5DF] px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#8A733E] mb-2">
            Online Caricature Workshop Dashboard
          </h1>
          <p className="text-[#8A733E] text-sm opacity-75">
            Manage workshop registrations, attendance, and certificates
          </p>
        </div>

        {pollError && (
          <div className="sticky top-0 z-10 mb-6 bg-amber-50 border border-amber-200 rounded-lg px-6 py-4 text-amber-800 shadow-sm">
            {pollError}
          </div>
        )}

        {actionError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg px-6 py-4 text-red-800 shadow-sm">
            {actionError}
          </div>
        )}

        {registrations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md px-12 py-16 text-center">
            <div className="mb-4">
              <svg className="mx-auto h-24 w-24 text-[#8A733E] opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-[#8A733E] text-lg font-medium">No registrations yet</p>
            <p className="text-[#8A733E] text-sm opacity-60 mt-2">New registrations will appear here automatically</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FFF5DF] bg-opacity-5 border-b border-[#8A733E] border-opacity-10">
                  <tr>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[#8A733E] w-16">No.</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#8A733E] w-48">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#8A733E] w-40">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#8A733E] w-56">Email</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[#8A733E] w-28">
  Slot
</th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#8A733E] w-44">Registered At</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[#8A733E] w-32">Attended</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[#8A733E] w-32">Certificate</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg, index) => {
                    const isSaving = savingMap[reg._id];
                    return (
                      <tr key={reg._id} className="border-b border-[#8A733E] border-opacity-5  hover:bg-opacity-5 transition-colors">
                        <td className="px-6 py-4 text-center text-sm font-medium text-[#8A733E] w-16">
  {index + 1}
</td>

                        <td className="px-6 py-4 text-sm text-[#8A733E] w-48">{reg.name}</td>
                        <td className="px-6 py-4 text-sm text-[#8A733E] w-40">{reg.phone}</td>
                        <td className="px-6 py-4 text-sm text-[#8A733E] w-56">{reg.email}</td>

<td className="px-6 py-4 text-center text-sm font-medium text-[#8A733E] w-28">
  {reg.slot === "SLOT_1"
    ? "Slot 1"
    : reg.slot === "SLOT_2"
    ? "Slot 2"
    : "—"}
</td>

<td className="px-6 py-4 text-sm text-[#8A733E] w-44">
  {new Date(reg.createdAt).toLocaleString()}
</td>


                        <td className="px-6 py-4 text-center w-32">
                          <input
                            type="checkbox"
                            checked={reg.attended}
                            onChange={() => onToggleAttended(reg)}
                            disabled={isSaving}
                            className="h-5 w-5 rounded border-2 border-[#8A733E] text-[#8A733E] focus:ring-2 focus:ring-[#8A733E] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            aria-label="Mark as attended"
                          />
                        </td>
                        <td className="px-6 py-4 text-center w-32">
                          <input
                            type="checkbox"
                            checked={reg.certificateIssued}
                            onChange={() => onToggleCertificate(reg)}
                            disabled={isSaving}
                            className="h-5 w-5 rounded border-2 border-[#8A733E] text-[#8A733E] focus:ring-2 focus:ring-[#8A733E] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            aria-label="Mark certificate issued"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;