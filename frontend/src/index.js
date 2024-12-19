import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Website Pages
import Login from "./Pages/Auth/LoginPage";
import Register from "./Pages/Auth/RegisterPage";
import HomePage from "./Pages/HomePage";
import Courts from "./Pages/CourtsPage";
import ContactUs from "./Pages/ContactUsPage";
import Profile from "./Pages/ProfilePage";
import Admin from "./Pages/AdminsPage";
import Admin2 from "./Pages/adminPage2";
import Reservation from "./Pages/ReservationPage";

// Auth Controllers
import UserProvider from "./Context/UserContext";
import RequireAuth from "./Pages/Auth/RequireAuth";
import PersistLogin from "./Pages/Auth/PersistLogin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courts" element={<Courts />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected Paths: Requires Auth */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/Admin/:id" element={<Admin2 />} />
              <Route path="/reservation/:id" element={<Reservation />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
