import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Dashboard/Sidebar";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function DashboardWrapper() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Hide sidebar only on solve page
  const hideSidebar = location.pathname.startsWith("/dashboard/solve");

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative">

      {/* MOBILE MENU BUTTON */}
      {!hideSidebar && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow"
        >
          <Menu size={22} />
        </button>
      )}

      {/* SIDEBAR */}
      {!hideSidebar && (
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      )}

      {/* BACKDROP (mobile only) */}
      {sidebarOpen && !hideSidebar && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main
        className={`min-h-screen overflow-y-auto transition-all duration-300
          ${hideSidebar ? "ml-0" : "md:ml-64"}
        `}
      >
        <Outlet />
      </main>
    </div>
  );
}
