import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  FilePlus,
  UserPlus,
  Ban,
  ChevronDown,
  ChevronUp,
  Pencil,
  X,
  LogOut
} from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [questionMenuOpen, setQuestionMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login", { replace: true });
  };

  return (
    <>
      {/* BACKDROP (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-full
          w-full md:w-64
          bg-white
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E7EB]">
          <h2 className="text-xl font-bold text-[#0F172A]">
            Admin Panel
          </h2>

          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-4 py-6 text-sm space-y-1 overflow-y-auto">

          <SidebarItem
            to="/admin/dashboard"
            icon={<Home size={18} />}
            label="Dashboard"
            active={isActive("/admin/dashboard")}
            setSidebarOpen={setSidebarOpen}
          />

          <SidebarItem
            to="/admin/students"
            icon={<Users size={18} />}
            label="Student List"
            active={isActive("/admin/students")}
            setSidebarOpen={setSidebarOpen}
          />

          {/* QUESTIONS */}
          <div>
            <button
              onClick={() => setQuestionMenuOpen(!questionMenuOpen)}
              className="flex items-center justify-between w-full px-4 py-2 rounded-lg text-[#334155] hover:bg-[#EEF2FF]"
            >
              <span className="flex items-center gap-3">
                <FilePlus size={18} />
                Questions
              </span>
              {questionMenuOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>

            {questionMenuOpen && (
              <div className="ml-6 mt-1 space-y-1">
                <SidebarItem
                  to="/admin/questions"
                  icon={<FilePlus size={16} />}
                  label="Add Questions"
                  active={isActive("/admin/questions")}
                  setSidebarOpen={setSidebarOpen}
                />
                <SidebarItem
                  to="/admin/edit-questions"
                  icon={<Pencil size={16} />}
                  label="Questions"
                  active={isActive("/admin/edit-questions")}
                  setSidebarOpen={setSidebarOpen}
                />
                <SidebarItem
                  to="/admin/manage-testcases"
                  icon={<FilePlus size={16} />}
                  label="Manage Testcases"
                  active={isActive("/admin/manage-testcases")}
                  setSidebarOpen={setSidebarOpen}
                />
              </div>
            )}
          </div>

          <SidebarItem
            to="/admin/create-user"
            icon={<UserPlus size={18} />}
            label="Create User"
            active={isActive("/admin/create-user")}
            setSidebarOpen={setSidebarOpen}
          />

          <SidebarItem
            to="/admin/blocked-users"
            icon={<Ban size={18} />}
            label="Blocked Users"
            active={isActive("/admin/blocked-users")}
            setSidebarOpen={setSidebarOpen}
          />
        </nav>

        {/* LOGOUT */}
        <div className="px-4 py-4 border-t border-[#E5E7EB]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2
                       px-4 py-2 rounded-lg
                       bg-red-500 text-white font-medium
                       hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

/* ---------- SIDEBAR ITEM ---------- */
function SidebarItem({ to, icon, label, active, setSidebarOpen }) {
  return (
    <Link
      to={to}
      onClick={() => setSidebarOpen(false)}
      className={`
        flex items-center gap-3 px-4 py-2 rounded-lg transition
        ${
          active
            ? "bg-[#EEF2FF] text-[#465FFF] font-medium"
            : "text-[#334155] hover:bg-[#F1F5F9]"
        }
      `}
    >
      {icon}
      {label}
    </Link>
  );
}
