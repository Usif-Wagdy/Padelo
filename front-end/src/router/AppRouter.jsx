import { Routes, Route } from "react-router-dom";

// Private
import PrivateRoute from "./PrivateRoutes";

// UI
import Layout from "../components/layout/Layout";
import NotFound from "../pages/Errors/NotFound";
import Oops from "../pages/Errors/Oops";
import UnderMaintenance from "../pages/Errors/UnderMaintenance";

// Pages
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Profile from "../pages/profile/Profile";
import ProfileForm from "../pages/profile/ProfileForm";
import Courts from "../pages/Courts/Courts";

export default function AppRouter() {
  return (
    <Routes>
      {/* Main Layout (with full Navbar + Footer) */}
      <Route element={<Layout isContainer={true} />}>
        <Route path="/courts" element={<Courts />} />

        {/* Under maintenance pages */}
        <Route path="/dashboard" element={<UnderMaintenance />} />
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

      {/* Main Layout (Full Width) */}
      <Route element={<Layout isContainer={false} />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/Oops" element={<Oops />} />
    </Routes>
  );
}
