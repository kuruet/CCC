import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAdminMe } from "../services/adminAuthApi";

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let active = true;

    const verify = async () => {
      try {
        await getAdminMe();
        if (active) setAuthorized(true);
      } catch {
        if (active) setAuthorized(false);
      } finally {
        if (active) setChecking(false);
      }
    };

    verify();

    return () => {
      active = false;
    };
  }, [location.pathname]); // 🔑 RE-CHECK ON EVERY ROUTE ENTRY

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF5DF]">
        <p className="text-[#8A733E] text-sm">Checking authentication…</p>
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
