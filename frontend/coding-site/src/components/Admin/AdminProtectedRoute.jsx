import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  // ❌ Not logged in → go to admin login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ Logged in → allow access
  return children;
}
