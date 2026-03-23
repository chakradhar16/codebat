import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-black flex items-center justify-between px-10 py-4 shadow-md border-b border-gray-800">
      {/* Left: Logo */}
      <h2
        className="text-2xl font-bold text-purple-500 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Coding Platform
      </h2>

      {/* Right: Login Button */}
      <button
        onClick={() => navigate("/login")}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200 shadow-md"
      >
        Login
      </button>
    </nav>
  );
}
