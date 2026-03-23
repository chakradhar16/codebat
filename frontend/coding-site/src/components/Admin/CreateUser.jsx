import React, { useState } from "react";
import Sidebar from "./Sidebar";
import api from "../../api/Axios"; // ✅ shared axios
import { UserPlus, Menu } from "lucide-react";

export default function CreateUser() {
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [studentId, setStudentId] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      username,
      email,
      password,
      role,
      studentId: role === "STUDENT" ? studentId : null
    };

    try {
      // ✅ baseURL = 8006, token auto-attached
      await api.post("/api/auth/register", body);

      alert("User Created Successfully!");

      setuserName("");
      setEmail("");
      setPassword("");
      setRole("USER");
      setStudentId("");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Failed to Create User!"
      );
      // 401 → auto logout handled globally
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F6F8FC]">

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
      <main className="flex-1 p-4 md:p-8 lg:p-10 pt-16 md:pt-8 md:ml-64 w-full flex justify-center">

        {/* CARD */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl
                p-4 sm:p-6 md:p-8
                w-full max-w-xl
                min-h-[calc(100vh-120px)] md:min-h-0">

          {/* HEADER */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-[#EEF2FF] text-[#465FFF]">
              <UserPlus size={22} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
              Create New User
            </h2>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <div>
              <label className="text-sm font-medium text-[#334155]">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter full name"
                value={username}
                onChange={(e) => setuserName(e.target.value)}
                required
                className="w-full mt-1 border border-[#E5E7EB] bg-[#F9FAFB] p-3 rounded-lg focus:ring-2 focus:ring-[#465FFF] outline-none"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-[#334155]">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 border border-[#E5E7EB] bg-[#F9FAFB] p-3 rounded-lg focus:ring-2 focus:ring-[#465FFF] outline-none"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-[#334155]">
                Password
              </label>
              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 border border-[#E5E7EB] bg-[#F9FAFB] p-3 rounded-lg focus:ring-2 focus:ring-[#465FFF] outline-none"
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="text-sm font-medium text-[#334155]">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mt-1 border border-[#E5E7EB] bg-[#F9FAFB] p-3 rounded-lg focus:ring-2 focus:ring-[#465FFF] outline-none"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            {/* STUDENT ID */}
            {role === "STUDENT" && (
              <div>
                <label className="text-sm font-medium text-[#334155]">
                  Student ID
                </label>
                <input
                  type="text"
                  placeholder="Enter Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                  className="w-full mt-1 border border-[#E5E7EB] bg-[#F9FAFB] p-3 rounded-lg focus:ring-2 focus:ring-[#465FFF] outline-none"
                />
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full bg-[#465FFF] hover:bg-[#3B4DFF] text-white py-3 rounded-lg font-medium transition"
            >
              Create User
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
