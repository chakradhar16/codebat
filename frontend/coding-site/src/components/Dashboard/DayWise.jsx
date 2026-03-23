import React from "react";
import { useNavigate } from "react-router-dom";

export default function DayWise() {
  const navigate = useNavigate();

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Day-wise Practice
        </h1>
        <p className="text-slate-500 mt-1">
          Select a day to view problems
        </p>
      </div>

      {/* DAY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => navigate(`/dashboard/day/${day}`)}
            className="
                bg-white border-2 border-slate-300 rounded-xl p-6
                text-slate-900 font-semibold text-lg
                hover:border-indigo-500 hover:bg-indigo-50
                hover:text-indigo-700 hover:shadow-md
                transition-all
                "

          >
            Day {day}
          </button>
        ))}
      </div>
    </div>
  );
}
