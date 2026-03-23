import React, { useEffect, useState } from "react";
import api from "../../api/Axios";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function DayPage() {
  const { day } = useParams();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const r = await api.get(`/api/problems/day/${day}`);
        setProblems(r.data || []);
      } catch (err) {
        console.error("Failed to load day problems:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [day]);

  if (loading) {
    return <div className="p-6 text-slate-500">Loading Day {day}...</div>;
  }

  if (problems.length === 0) {
    return <div className="p-6 text-slate-500">No problems for Day {day}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">

      {/* HEADER */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard/day")}
          className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Day {day} Problems
          </h1>
          <p className="text-slate-500">
            Solve the following challenges
          </p>
        </div>
      </div>

      {/* PROBLEM LIST */}
      <div className="space-y-4">
        {problems.map((p) => (
          <button
            key={p.id}
            onClick={() => navigate(`/dashboard/problems/${p.id}`)}
            className="
              w-full bg-white border border-slate-200 rounded-xl p-5
              flex justify-between items-center
              hover:border-indigo-500 hover:shadow-sm transition
            "
          >
            <span className="font-medium text-slate-800">
              {p.title}
            </span>

            <span className="text-sm text-indigo-600 font-semibold">
              Solve →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
