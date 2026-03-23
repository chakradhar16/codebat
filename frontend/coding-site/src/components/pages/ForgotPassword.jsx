import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelopeOpenText } from "react-icons/fa";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      // 🧩 Later connect this to your backend (example endpoint below)
      // await axios.post("http://localhost:8006/api/auth/forgot-password", { email });

      setMessage("✅ Password reset link has been sent to your email!");
      setEmail("");
    } catch (err) {
      setError("❌ Failed to send reset link. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100 text-center">
        <FaEnvelopeOpenText className="text-4xl text-indigo-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Forgot Your Password?
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter your registered email address and we’ll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       text-gray-900 placeholder-gray-400"
          />

          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg 
                       font-semibold transition duration-200 shadow-sm"
          >
            Send Reset Link
          </button>
        </form>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 text-indigo-600 hover:underline font-medium"
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
}
