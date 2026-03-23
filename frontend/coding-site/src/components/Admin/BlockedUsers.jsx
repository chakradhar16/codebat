import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import api from "../../api/Axios"; // ✅ shared axios
import { Ban, Search, Menu } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function BlockedUsers() {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------- Load Blocked Users ---------------- */
  const loadBlockedUsers = async () => {
    try {
      const res = await api.get("/api/admin/users");
      const filtered = res.data.filter((u) => u.blocked === true);
      setBlockedUsers(filtered);
    } catch (err) {
      console.error(err);
      alert("Could not load blocked users");
      // 401 → auto logout handled by interceptor
    }
  };

  useEffect(() => {
    loadBlockedUsers();
  }, []);

  /* ---------------- Unblock ---------------- */
  const unblockUser = async (id) => {
    try {
      await api.put(`/api/admin/users/unblock/${id}`);
      loadBlockedUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to unblock user");
    }
  };

  /* ---------------- Search Filter ---------------- */
  const filteredUsers = blockedUsers.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.username || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q) ||
      String(u.id).includes(q)
    );
  });

  /* ---------------- Pagination ---------------- */
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

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
            Blocked Users
          </h2>
          <p className="text-[#64748B] mt-1">
            Manage users who are currently blocked
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex items-center bg-white border rounded-xl px-4 py-3 mb-6 w-full md:w-96">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            placeholder="Search blocked users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none w-full text-sm"
          />
        </div>

        {/* MOBILE VIEW */}
        <div className="md:hidden space-y-4">
          {paginatedUsers.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center text-gray-500">
              No blocked users found.
            </div>
          ) : (
            paginatedUsers.map((u) => (
              <div key={u.id} className="bg-white border rounded-xl p-4">
                <p className="font-semibold">{u.username}</p>
                <p className="text-sm text-gray-600 break-all">{u.email}</p>
                <p className="text-sm text-gray-500 mb-3">ID: {u.id}</p>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-red-600 font-semibold">
                    <Ban size={16} /> BLOCKED
                  </span>

                  <button
                    onClick={() => unblockUser(u.id)}
                    className="px-4 py-1.5 rounded-lg text-sm bg-green-600 text-white"
                  >
                    Unblock
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block bg-white border rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#F1F5F9]">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">User ID</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    No blocked users found.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((u) => (
                  <tr key={u.id} className="border-t">
                    <td className="p-4 font-medium">{u.username}</td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4">{u.id}</td>
                    <td className="p-4">
                      <span className="flex items-center gap-2 text-red-600 font-semibold">
                        <Ban size={16} /> BLOCKED
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => unblockUser(u.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg"
                      >
                        Unblock
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 rounded border disabled:opacity-40"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded border ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 rounded border disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

      </main>
    </div>
  );
}
