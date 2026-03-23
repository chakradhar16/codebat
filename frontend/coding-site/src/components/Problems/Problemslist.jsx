import React, { useEffect, useState } from "react";
import api from "../../api/Axios";
import { useNavigate } from "react-router-dom";

export default function ProblemsList() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await api.get("/api/problems/all");
        setProblems(res.data || []);
      } catch (err) {
        console.error("Failed to load problems:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-500">Loading problems...</div>;
  }

  if (problems.length === 0) {
    return <div className="p-6 text-slate-500">No problems available.</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Problems
        </h1>
        <p className="text-slate-500 mt-1">
          Browse and solve available coding problems
        </p>
      </div>

      {/* PROBLEMS LIST */}
      <div className="space-y-4">
        {problems.map((p) => (
          <div
            key={p.id}
            className="
              bg-white border border-slate-200 rounded-xl p-5
              flex flex-col sm:flex-row sm:items-center sm:justify-between
              gap-4 hover:shadow-sm transition
            "
          >
            {/* LEFT */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {p.title}
              </h2>

              <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                <span>
                  Day: <span className="font-medium text-slate-700">{p.dayNumber}</span>
                </span>

                <span>
                  Difficulty:{" "}
                  <span
                    className={`font-semibold ${
                      p.difficulty === "EASY"
                        ? "text-green-600"
                        : p.difficulty === "MEDIUM"
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}
                  >
                    {p.difficulty}
                  </span>
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <button
              onClick={() => navigate(`/dashboard/solve/${p.id}`)}
              className="
                px-5 py-2 rounded-lg font-medium
                bg-indigo-600 text-white
                hover:bg-indigo-700 transition
                self-start sm:self-center
              "
            >
              Solve →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
