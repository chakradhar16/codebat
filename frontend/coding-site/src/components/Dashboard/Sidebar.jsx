import React from "react";
import {
  Home,
  BarChart3,
  ListChecks,
  User,
  Settings,
  Bell,
  Lock,
  LogOut,
  Code2,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", icon: <Home size={18} />, label: "Dashboard" },
    { path: "/dashboard/day", icon: <BarChart3 size={18} />, label: "Day-wise" },
    { path: "/dashboard/problems", icon: <ListChecks size={18} />, label: "Problems" },
    { path: "/dashboard/profile", icon: <User size={18} />, label: "Profile" },
    { path: "/dashboard/settings", icon: <Settings size={18} />, label: "Settings" },
    { path: "/dashboard/notifications", icon: <Bell size={18} />, label: "Notifications" },
    { path: "/dashboard/security", icon: <Lock size={18} />, label: "Security" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false); // 🔥 auto-close on mobile
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen w-64 bg-[#F8FAFC] border-r border-gray-200
        flex flex-col px-4 py-6 z-40
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* LOGO */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-600 text-white">
          <Code2 size={18} />
        </div>
        <span className="text-lg font-semibold text-gray-800">
          Coding Platform
        </span>
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-1 flex-grow">
        {menuItems.map((item) => {
          const active =
            item.path === "/dashboard/day"
              ? location.pathname.startsWith("/dashboard/day")
              : location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                ${
                  active
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium
                   text-red-600 hover:bg-red-50 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
