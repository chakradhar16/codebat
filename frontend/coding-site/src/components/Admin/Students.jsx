import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import api from "../../api/Axios";
import { Search, Ban, CheckCircle, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();

  /* ================= READ QUERY PARAM ================= */
  const params = new URLSearchParams(location.search);
  const statusFilter = params.get("status"); // "active" | null

  /* ================= LOAD STUDENTS ================= */
  const loadStudents = async () => {
    try {
      const res = await api.get("/api/admin/users");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      alert("Could not load student list");
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  /* ================= BLOCK / UNBLOCK ================= */
  const blockUser = async (id) => {
    try {
      await api.put(`/api/admin/users/block/${id}`);
      loadStudents();
    } catch (err) {
      alert("Failed to block user");
    }
  };

  const unblockUser = async (id) => {
    try {
      await api.put(`/api/admin/users/unblock/${id}`);
      loadStudents();
    } catch (err) {
      alert("Failed to unblock user");
    }
  };

  /* ================= FILTERING ================= */

  const filteredStudents = students
    // 🔥 STATUS FILTER (ACTIVE ONLY)
    .filter((stu) => {
      if (statusFilter === "active") {
        return !stu.blocked;
      }
      return true; // default → all users
    })
    // 🔍 SEARCH FILTER
    .filter((stu) => {
      const q = search.toLowerCase();
      return (
        (stu.username || "").toLowerCase().includes(q) ||
        (stu.email || "").toLowerCase().includes(q) ||
        String(stu.id).includes(q)
      );
    });

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  /* ================= UI ================= */

  return (
    <div className="flex min-h-screen bg-[#F6F8FC]">

      {/* MOBILE MENU */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow"
      >
        <Menu size={22} />
      </button>

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 p-4 md:p-8 lg:p-10 pt-16 md:pt-8 md:ml-64 w-full">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
            {statusFilter === "active" ? "Active Students" : "Students"}
          </h2>
          <p className="text-[#64748B] mt-1">
            Manage student access and status
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex items-center bg-white border rounded-xl px-4 py-3 w-full md:w-96 mb-6">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none w-full text-sm"
          />
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block bg-white border rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#F1F5F9]">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Student ID</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((stu) => (
                <tr key={stu.id} className="border-t">
                  <td className="p-4 font-medium">{stu.username}</td>
                  <td className="p-4">{stu.email}</td>
                  <td className="p-4">{stu.id}</td>
                  <td className="p-4">
                    {stu.blocked ? (
                      <span className="flex items-center gap-2 text-red-600 font-semibold">
                        <Ban size={16} /> BLOCKED
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-green-600 font-semibold">
                        <CheckCircle size={16} /> ACTIVE
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {stu.blocked ? (
                      <button
                        onClick={() => unblockUser(stu.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => blockUser(stu.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg"
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}
