import React, { useEffect, useState } from "react";
import api from "../../../api/Axios";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/users/me");
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (!profile) return <div className="p-6">Profile not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-full bg-indigo-200 flex items-center justify-center text-3xl font-bold text-indigo-700">
          {profile.username?.[0]?.toUpperCase()}
        </div>

        <div>
          <h2 className="text-xl font-semibold">{profile.username}</h2>
          <p className="text-slate-500">{profile.email}</p>
        </div>
      </div>

      <div className="bg-white rounded shadow p-6 space-y-4">
        <Field label="Full Name" value={profile.fullName || "Not set"} />
        <Field label="Phone" value={profile.phone || "Not set"} />
      </div>

      <button
        onClick={() => navigate("/dashboard/settings")}
        className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Edit Profile
      </button>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <label className="text-sm text-slate-500">{label}</label>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
