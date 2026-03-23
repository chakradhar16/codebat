import { useState } from "react";
import Sidebar from "../Dashboard/Sidebar";

export default function SolveLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden bg-[#F7F8FA]">

      {/* TOP BAR */}
      <div className="h-14 flex items-center gap-3 px-4 border-b bg-white">
        <button
          onClick={() => setMenuOpen(true)}
          className="text-2xl"
        >
          ☰
        </button>
        <h1 className="font-semibold text-lg">Solve Problem</h1>
      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* SIDEBAR (overlay style) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50
        transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="h-[calc(100vh-56px)] overflow-auto">
        {children}
      </div>
    </div>
  );
}
