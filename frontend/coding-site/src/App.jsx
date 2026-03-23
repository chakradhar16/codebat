import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/pages/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import ForgotPassword from "./components/pages/ForgotPassword";

import DashboardWrapper from "./components/DashboardWrapper";
import Dashboard from "./components/Dashboard/Dashboard";
import SettingsPage from "./components/Dashboard/Pages/SettingsPage";
import ProfilePage from "./components/Dashboard/Pages/ProfilePage";
import NotificationsPage from "./components/Dashboard/Pages/NotificationsPage";
import PrivacySecurityPage from "./components/Dashboard/Pages/PrivacySecurityPage";
import DayPage from "./components/Dashboard/DayPage";
import ProtectedRoute from "./components/ProtectedRoute";

import ProblemsList from "./components/Problems/ProblemsList";
import ProblemDetails from "./components/Problems/ProblemDetails";
import SolveProblem from "./components/Problems/SolveProblem";
import SolveLayout from "./components/Problems/SolveLayout";
import DayWise from "./components/Dashboard/DayWise";

import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Students from "./components/Admin/Students";
import Questions from "./components/Admin/Questions";
import CreateUser from "./components/Admin/CreateUser";
import BlockedUsers from "./components/Admin/BlockedUsers";
import EditQuestions from "./components/Admin/EditQuestions";
import ManageTestcases from "./components/Admin/ManageTestcases";
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute";
import HowItWorks from "./components/pages/HowItWorks"

function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC PAGES */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/login" element={<><Navbar /><Login /></>} />
        <Route path="/forgot-password" element={<><Navbar /><ForgotPassword /></>} />
        <Route path="/how-it-works" element={<><Navbar /><HowItWorks /></>} /> 

        {/* DASHBOARD (PROTECTED) */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardWrapper />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="security" element={<PrivacySecurityPage />} />

          <Route path="day" element={<DayWise />} />
          <Route path="day/:day" element={<DayPage />} />

          <Route path="problems" element={<ProblemsList />} />
          <Route path="problems/:id" element={<ProblemDetails />} />

          <Route
            path="solve/:id"
            element={
              <SolveLayout>
                <SolveProblem />
              </SolveLayout>
            }
          />
        </Route>

        {/* PUBLIC PROBLEM VIEW */}
        <Route path="/problems/:id" element={<ProblemDetails />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <AdminProtectedRoute>
              <Students />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/questions"
          element={
            <AdminProtectedRoute>
              <Questions />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/create-user"
          element={
            <AdminProtectedRoute>
              <CreateUser />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/blocked-users"
          element={
            <AdminProtectedRoute>
              <BlockedUsers />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-questions"
          element={
            <AdminProtectedRoute>
              <EditQuestions />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-testcases"
          element={
            <AdminProtectedRoute>
              <ManageTestcases />
            </AdminProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;
