import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/Axios";

export default function ProblemDetails() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await api.get(`/api/problems/${id}`);
        setProblem(res.data);
      } catch (err) {
        console.error("Failed to load problem:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-slate-500">Loading problem...</div>;
  }

  if (!problem) {
    return <div className="p-6 text-slate-500">Problem not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-indigo-600 font-medium hover:underline"
      >
        ← Back
      </button>

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        {problem.title}
      </h1>

      <p className="text-slate-500 mb-6">
        Difficulty:{" "}
        <span
          className={`font-semibold ${
            problem.difficulty === "EASY"
              ? "text-green-600"
              : problem.difficulty === "MEDIUM"
              ? "text-amber-600"
              : "text-red-600"
          }`}
        >
          {problem.difficulty}
        </span>{" "}
        · Day {problem.dayNumber}
      </p>

      {/* DESCRIPTION */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-lg mb-2">Problem Description</h2>
        <p className="text-slate-700 whitespace-pre-line">
          {problem.description}
        </p>
      </div>

      {/* SAMPLE IO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-semibold mb-2">Sample Input</h3>
          <pre className="bg-slate-100 p-3 rounded text-sm whitespace-pre-wrap">
            {problem.sampleInput || "N/A"}
          </pre>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-semibold mb-2">Sample Output</h3>
          <pre className="bg-slate-100 p-3 rounded text-sm whitespace-pre-wrap">
            {problem.sampleOutput || "N/A"}
          </pre>
        </div>
      </div>

      {/* SOLVE BUTTON */}
      <button
        onClick={() => navigate(`/dashboard/solve/${id}`)}
        className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium"
      >
        Solve Problem →
      </button>
    </div>
  );
}
