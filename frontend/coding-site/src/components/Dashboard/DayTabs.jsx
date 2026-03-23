import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DayTabs.css";

export default function DayTabs() {
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login");
  }, [navigate]);

  const handleDayClick = (day) => {
    setActiveDay(day);
    navigate(`/dashboard/day/${day}`);
  };

  return (
    <div className="daytabs">
      <div className="header">
        <h2>Task Tracker</h2>
      </div>
      <div className="day-grid">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`day-card ${activeDay === i + 1 ? "active" : ""}`}
            onClick={() => handleDayClick(i + 1)}
          >
            <h3>Day {i + 1}</h3>
            <p>Click to view coding tasks</p>
          </div>
        ))}
      </div>
    </div>
  );
}
