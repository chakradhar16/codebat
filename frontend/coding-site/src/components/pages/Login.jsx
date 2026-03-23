import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import api from "../../api/Axios";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ BLOCK LOGIN IF ALREADY LOGGED IN
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/api/auth/login", formData);

      localStorage.setItem(
        "user",
        JSON.stringify({ token: res.data.token })
      );

      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

        <div className="mb-6 text-center">
          <p className="text-gray-500 text-sm">Please enter your details</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Welcome back
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg"
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#6c63ff] text-white py-3 rounded-lg font-semibold"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?
          <span
            onClick={() => navigate("/register")}
            className="text-[#6c63ff] hover:underline font-medium cursor-pointer"
          >
            {" "}Sign up
          </span>
        </p>

        <p className="text-center text-gray-500 text-sm mt-4">
          <button
            className="text-[#6c63ff] hover:underline font-medium"
            onClick={() => navigate("/admin/login")}
          >
            Login as Admin
          </button>
        </p>

      </div>
    </div>
  );
}
