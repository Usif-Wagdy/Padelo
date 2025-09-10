import { Routes, Route } from "react-router-dom";

// Private Routes
import PrivateRoute from "./PrivateRoutes";

// UI
import Layout from "../components/layout/Layout";
import NotFound from "../pages/Errors/NotFound";
import Oops from "../pages/Errors/Oops";
import UnderMaintenance from "../pages/Errors/UnderMaintenance";

// Auth Pages
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import ResetPassword from "../pages/Auth/ResetPassword";
import ForgotPassword from "../pages/Auth/ForgotPassword";

// General Pages
import Home from "../pages/Home/Home";
import Profile from "../pages/profile/Profile";
import ProfileForm from "../pages/profile/ProfileForm";
import Courts from "../pages/Courts/Courts";
import CourtView from "../pages/Courts/CourtView";

// Admin Pages
import Dashboard from "../pages/Admin/Dashboard";
import AdminCourts from "../pages/Admin/Courts";
import EditCourt from "../components/Admin/Courts/EditCourt";
import AddCourt from "../components/Admin/Courts/AddCourt";
import Users from "../pages/Admin/Users";
import AdminHome from "../pages/Admin/Home";

export default function AppRouter() {
  return (
    <Routes>
      {/* Main Layout (with full Navbar + Footer) */}
      <Route element={<Layout isContainer={true} />}>
        <Route path="/courts" element={<Courts />} />
        <Route path="/courts/:id" element={<CourtView />} />

        {/* Under maintenance pages */}
        <Route path="/blogs" element={<UnderMaintenance />} />
        <Route path="/about" element={<UnderMaintenance />} />
        <Route path="/privacy" element={<UnderMaintenance />} />
        <Route path="/terms" element={<UnderMaintenance />} />
        <Route path="/support" element={<UnderMaintenance />} />

        {/* Private Routes */}
        <Route
          path="/login"
          element={
            <PrivateRoute type={"requireNoAuth"}>
              <Login />
            </PrivateRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PrivateRoute type={"requireNoAuth"}>
              <Register />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Main Layout (Full Width) */}
      <Route element={<Layout isContainer={false} />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute type={"requireAuth"}>
              <Profile />
            </PrivateRoute>
          }
        >
          <Route index element={<ProfileForm />} />
        </Route>
      </Route>

      {/* Dashboard Pages */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute type={"admin"}>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminHome />} />

        <Route path="courts" element={<AdminCourts />} />
        <Route path="courts/edit/:id" element={<EditCourt />} />
        <Route path="courts/add" element={<AddCourt />} />
        <Route path="users" element={<Users />} />
      </Route>

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/Oops" element={<Oops />} />
    </Routes>
  );
}
