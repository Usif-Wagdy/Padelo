import { Routes, Route } from "react-router-dom";
// UI
import Layout from "../components/layout/Layout";
import NotFound from "../pages/Errors/NotFound";
import UnderMaintenance from "../pages/Errors/UnderMaintenance";

// Pages
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Profile from "../pages/profile/Profile";
import ProfileForm from "../pages/profile/ProfileForm";
// import Courts from "../pages/Courts/Coutrs";

export default function AppRouter() {
  return (
    <Routes>
      {/* Main Layout (with full Navbar + Footer) */}
      <Route element={<Layout isContainer={true} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />}>
          <Route index element={<ProfileForm />} />
        </Route>
        {/* under maintance pages */}
        <Route path="/dashboard" element={<UnderMaintenance />} />
        {/* <Route path="/courts" element={<Courts />} /> */}
        <Route path="/blogs" element={<UnderMaintenance />} />
        <Route path="/about" element={<UnderMaintenance />} />
        <Route path="/privacy" element={<UnderMaintenance />} />
        <Route path="/terms" element={<UnderMaintenance />} />
        <Route path="/support" element={<UnderMaintenance />} />
      </Route>

      {/* Main Layout (Full Width) */}
      <Route element={<Layout isContainer={false} />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
