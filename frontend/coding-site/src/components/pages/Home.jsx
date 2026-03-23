import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white text-center px-6">
      
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
        Create. Code. Publish.{" "}
        <span className="text-purple-500">Together.</span>
      </h1>

      <p className="text-gray-300 max-w-2xl mb-8 text-lg">
        Empower your coding journey with collaborative projects, real challenges, and growth opportunities.
        Join a thriving developer community today.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/how-it-works">
          <button className="border border-gray-400 hover:border-purple-500 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-semibold transition">
            OverView
          </button>
        </Link>
      </div>

    </div>
  );
}
