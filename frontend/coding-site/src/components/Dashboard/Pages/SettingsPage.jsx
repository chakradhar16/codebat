import React, { useEffect, useState } from "react";
import api from "../../../api/Axios";

export default function SettingsPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    fullName: "",
    phone: ""
  });

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/api/users/me");
        setForm({
          username: res.data.username,
          email: res.data.email,
          fullName: res.data.fullName || "",
          phone: res.data.phone || ""
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    try {
      await api.put("/api/users/me", {
        fullName: form.fullName,
        phone: form.phone
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (loading) return <div className="p-6">Loading settings...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <div className="bg-white rounded shadow p-6 space-y-4">
        <Input label="Username" value={form.username} disabled />

        <Input label="Email" value={form.email} disabled />

        <Input
          label="Full Name"
          value={form.fullName}
          onChange={(e) =>
            setForm({ ...form, fullName: e.target.value })
          }
        />

        <Input
          label="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>

      {saved && <p className="text-green-600 mt-2">Saved ✔</p>}
    </div>
  );
}

function Input({ label, value, disabled, onChange }) {
  return (
    <div>
      <label className="block text-sm text-slate-500 mb-1">{label}</label>
      <input
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={`border rounded p-2 w-full ${
          disabled ? "bg-slate-100 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}
