import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/adminAuthApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await adminLogin({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#FFF5DF' }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8" style={{ color: '#8A733E' }}>
            Admin Login
          </h1>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm text-[#8A733E] font-medium mb-2" style={{ color: '#8A733E' }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#8A733E] focus:outline-none focus:ring-2 transition-all"
                 
                disabled={loading}
              />
            </div>

            <div>
  <label
    htmlFor="password"
    className="block text-sm font-medium mb-2"
    style={{ color: "#8A733E" }}
  >
    Password
  </label>

  <div className="relative">
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      disabled={loading}
      className="
        w-full px-4 py-3 pr-12
        border border-gray-300
        rounded-lg
        text-[#8A733E]
        placeholder-[#8A733E]/60
        caret-[#8A733E]
        focus:outline-none
        focus:ring-2 focus:ring-[#8A733E]
        focus:border-[#8A733E]
        transition-all
      "
    />

    <button
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      className="
        absolute inset-y-0 right-3
        flex items-center
        text-sm font-medium
        text-[#8A733E]
        hover:opacity-80
        focus:outline-none
      "
      tabIndex={-1}
    >
      {showPassword ? "Hide" : "Show"}
    </button>
  </div>
</div>


            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90"
              style={{ backgroundColor: '#8A733E' }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}