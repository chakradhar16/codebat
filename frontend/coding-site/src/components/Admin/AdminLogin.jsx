import React, { useState, useEffect } from "react";
import api from "../../api/Axios"; // ✅ shared axios
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /* ✅ BLOCK LOGIN PAGE IF ALREADY LOGGED IN */
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ relative path, baseURL = 8006
      const response = await api.post("/api/auth/admin/login", data);

      localStorage.setItem("adminToken", response.data.token);

      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      setError("Invalid Admin Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

        <div className="mb-6 text-center">
          <p className="text-gray-500 text-sm">Restricted Access</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Admin Login
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Admin email"
            value={data.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg"
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <div className="text-center text-gray-500 text-sm mt-4">
            <button
              type="button"
              className="text-[#6c63ff] hover:underline font-medium"
              onClick={() => navigate("/login")}
            >
              Login as User
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold"
          >
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
}
