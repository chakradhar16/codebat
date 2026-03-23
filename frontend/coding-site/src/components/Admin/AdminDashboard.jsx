import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import api from "../../api/Axios";
import { Pie } from "react-chartjs-2";
import { Users, UserCheck, UserX, FolderKanban, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    totalProblems: 0
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // 🔐 Protect admin route
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const usersRes = await api.get("/api/admin/users");
      const problemsRes = await api.get("/api/admin/problems");

      const users = usersRes.data;
      const problems = problemsRes.data;

      const totalUsers = users.length;
      const blockedUsers = users.filter(u => u.blocked).length;
      const activeUsers = totalUsers - blockedUsers;

      setStats({
        totalUsers,
        activeUsers,
        blockedUsers,
        totalProblems: problems.length
      });
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    }
  };

  const pieData = {
    labels: ["Active Users", "Blocked Users", "Total Users"],
    datasets: [
      {
        data: [
          stats.activeUsers,
          stats.blockedUsers,
          stats.totalUsers
        ],
        backgroundColor: ["#22C55E", "#EF4444", "#465FFF"],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="flex min-h-screen bg-[#F6F8FC] overflow-x-hidden">

      {/* MOBILE MENU */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow"
      >
        <Menu size={22} />
      </button>

      {/* SIDEBAR */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* MAIN */}
      <div className="flex-1 p-4 md:p-8 lg:p-10 pt-16 md:pt-8 md:ml-64">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
            Dashboard
          </h2>
          <p className="text-[#64748B] mt-1">
            Overview of system statistics
          </p>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          <StatCard
            title="Total Problems"
            value={stats.totalProblems}
            icon={<FolderKanban size={26} />}
            color="text-[#465FFF]"
            bg="bg-[#EEF2FF]"
            onClick={() => navigate("/admin/edit-questions")}
          />

          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<Users size={26} />}
            color="text-[#465FFF]"
            bg="bg-[#EEF2FF]"
            onClick={() => navigate("/admin/students")}
          />

          <StatCard
            title="Active Users"
            value={stats.activeUsers}
            icon={<UserCheck size={26} />}
            color="text-[#22C55E]"
            bg="bg-[#DCFCE7]"
            onClick={() => navigate("/admin/students?status=active")}
          />

          <StatCard
            title="Blocked Users"
            value={stats.blockedUsers}
            icon={<UserX size={26} />}
            color="text-[#EF4444]"
            bg="bg-[#FEE2E2]"
            onClick={() => navigate("/admin/blocked-users")}
          />

        </div>

        {/* CHART + INSIGHTS */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl border p-6">
            <h3 className="text-lg font-semibold mb-4">
              User Distribution
            </h3>
            <div className="flex justify-center">
              <div className="w-72">
                <Pie data={pieData} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border p-6 xl:col-span-2">
            <h3 className="text-lg font-semibold mb-4">
              Key Insights
            </h3>

            <ul className="space-y-4 text-sm text-[#475569]">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                {stats.activeUsers} users are actively using the platform
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                {stats.blockedUsers} users are blocked due to policy violations
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                Platform currently hosts {stats.totalProblems} coding problems
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ---------- STAT CARD ---------- */
function StatCard({ title, value, icon, color, bg, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-[#E5E7EB] p-6
                 flex items-center justify-between
                 cursor-pointer
                 hover:shadow-lg hover:scale-[1.03]
                 transition-all duration-200"
    >
      <div>
        <p className="text-sm text-[#64748B]">{title}</p>
        <p className="text-3xl font-bold text-[#0F172A] mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${bg} ${color}`}>
        {icon}
      </div>
    </div>
  );
}
