import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  CalendarDays,
  FileCode2,
  TrendingUp,
  XCircle
} from "lucide-react";
import api from "../../api/Axios";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [solvedCount, setSolvedCount] = useState(0);
  const [daysCompleted, setDaysCompleted] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // ✅ fetch user profile
        const userRes = await api.get("/api/users/me");
        setUsername(userRes.data?.username || "");

        const subRes = await api.get("/api/submissions/my");
        setSubmissions(subRes.data || []);

        const solvedRes = await api.get("/api/submissions/my/solved-count");
        setSolvedCount(solvedRes.data || 0);

        const dayRes = await api.get("/api/day-progress/my/count");
        setDaysCompleted(dayRes.data || 0);

        const streakRes = await api.get("/api/users/me/streak");
        setStreak(streakRes.data || 0);

      } catch (err) {
        console.error(err);
        setError("Unable to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <div className="p-8 text-slate-500">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back{username && `, ${username}`} 👋
        </h1>
        <p className="text-slate-500 mt-1">
          Here’s a quick look at your learning progress
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        <StatCard
          title="Problems Solved"
          value={solvedCount}
          icon={<CheckCircle size={24} />}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />

        <StatCard
          title="Days Completed"
          value={daysCompleted}
          icon={<CalendarDays size={24} />}
          iconBg="bg-indigo-100"
          iconColor="text-indigo-600"
        />

        <StatCard
          title="Total Submissions"
          value={submissions.length}
          icon={<FileCode2 size={24} />}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />

        <StatCard
          title="Current Streak"
          value={
            streak === 0
              ? "On Track"
              : `${streak} day${streak > 1 ? "s" : ""}`
          }
          icon={<TrendingUp size={24} />}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="p-6 border-b flex items-center gap-2 font-semibold">
          <TrendingUp size={18} />
          Recent Activity
        </div>

        {submissions.length === 0 ? (
          <div className="p-6 text-slate-500">
            No submissions yet. Start solving problems 🚀
          </div>
        ) : (
          <div className="divide-y">
            {submissions.slice(0, 5).map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <p className="font-medium text-slate-800">
                    Problem #{s.problem?.id}
                  </p>
                  <p className="text-sm text-slate-500">
                    {s.problem?.title || "Problem"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {s.allPassed ? (
                    <>
                      <CheckCircle size={18} className="text-green-600" />
                      <span className="text-green-600 font-medium text-sm">
                        Accepted
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle size={18} className="text-red-500" />
                      <span className="text-red-500 font-medium text-sm">
                        Failed
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- STAT CARD ---------- */

function StatCard({ title, value, icon, iconBg, iconColor }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-3xl font-bold text-slate-900 mt-1">
          {value}
        </p>
      </div>

      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
        {icon}
      </div>
    </div>
  );
}
