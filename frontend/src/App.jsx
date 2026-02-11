import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Service from "./pages/Service";
import Workshop from "./pages/Workshop";
import Register from "./pages/Register";
import PrivacyPolicy from "./pages/Privacy";
import Condition from "./pages/Condition";
import Refund from "./pages/Refund";
import Disclaimer from "./pages/Disclaimer";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

import PaymentPending from "./pages/PaymentPending";
import PaymentStatus from "./pages/PaymentStatus";

import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* =====================
          PUBLIC ROUTES
         ===================== */}
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/service" element={<Service />} />
      <Route path="/workshop" element={<Workshop />} />
      <Route path="/workshop/register" element={<Register />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<Condition />} />
      <Route path="/refund-policy" element={<Refund />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
      <Route path="/login" element={<Login />} />

      {/* =====================
          PAYMENT TRUST LAYER (PUBLIC, ISOLATED)
         ===================== */}
      <Route path="/payment-pending" element={<PaymentPending />} />
      <Route path="/payment-status" element={<PaymentStatus />} />
      <Route path="/payment-status/:orderId" element={<PaymentStatus />} />

      {/* =====================
          ADMIN ROUTES (PROTECTED)
         ===================== */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* =====================
          SAFE FALLBACK (NO LOGIN REDIRECT)
         ===================== */}
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
};

export default App;
