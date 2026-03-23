import React, { useEffect, useState } from "react";
import api from "../../../api/Axios";

export default function NotificationsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: false,
    smsNotifications: false,
    pushNotifications: false,
  });

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // 🔄 Load notification settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/api/users/me");

        setSettings({
          emailNotifications: !!res.data.emailNotifications,
          smsNotifications: !!res.data.smsNotifications,
          pushNotifications: !!res.data.pushNotifications,
        });
      } catch (err) {
        console.error("Failed to load notification settings:", err);
        setError("Failed to load notification settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // 🔁 Toggle handler
  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // 💾 Save settings
  const handleSave = async () => {
    try {
      await api.put("/api/users/me/notifications", settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Update failed:", err);
      setError("Failed to save notification settings");
    }
  };

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="p-6 text-slate-500">
        Loading notification settings…
      </div>
    );
  }

  // ❌ Error state
  if (error) {
    return (
      <div className="p-6 text-red-600 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Notifications
      </h1>

      <div className="bg-white shadow rounded p-4 space-y-4">
        <label className="flex items-center justify-between cursor-pointer">
          <span>Email Notifications</span>
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={() => handleToggle("emailNotifications")}
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <span>SMS Notifications</span>
          <input
            type="checkbox"
            checked={settings.smsNotifications}
            onChange={() => handleToggle("smsNotifications")}
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <span>Push Notifications</span>
          <input
            type="checkbox"
            checked={settings.pushNotifications}
            onChange={() => handleToggle("pushNotifications")}
          />
        </label>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        Save Changes
      </button>

      {saved && (
        <p className="text-green-600 mt-2 font-medium">
          Saved ✔
        </p>
      )}
    </div>
  );
}
