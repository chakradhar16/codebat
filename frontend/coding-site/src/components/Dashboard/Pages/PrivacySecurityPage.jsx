import React, { useState, useEffect } from "react";
import api from "../../../api/Axios";
import { useNavigate } from "react-router-dom";

export default function PrivacySecurityPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [loading, setLoading] = useState(true);
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/api/users/me");
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handlePasswordChange = async () => {
    setError("");

    try {
      await api.put("/api/users/change-password", {
        currentPassword: oldPass,
        newPassword: newPass
      });

      localStorage.removeItem("token");
      setChanged(true);

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1200);
    } catch (err) {
      setError(err.response?.data || "Password change failed");
    }
  };

  if (loading) return <div className="p-6">Loading security...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Privacy & Security</h1>

      <div className="bg-white rounded shadow p-6 mb-6">
        <p className="text-slate-500 text-sm">Logged in as</p>
        <p className="font-semibold">{profile.email}</p>
      </div>

      <div className="bg-white rounded shadow p-6 space-y-4">
        <h2 className="font-semibold">Change Password</h2>

        <input
          type="password"
          placeholder="Current password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
          className="border rounded p-2 w-full"
        />

        <input
          type="password"
          placeholder="New password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          className="border rounded p-2 w-full"
        />

        <button
          onClick={handlePasswordChange}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Update Password
        </button>

        {changed && (
          <p className="text-green-600">
            Password changed. Redirecting…
          </p>
        )}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
}
