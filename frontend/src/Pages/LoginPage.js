// src/Login.js
import React from "react";
import { Link } from "react-router-dom"; // Import Link and useLocation

import "../Pages Styles/Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2 style={{ color: "#08260F" }}>Login</h2>
        <form className="form-style">
          <label htmlFor="email" style={{ color: "#08260F" }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            required
            aria-label="Email"
          />
          <label htmlFor="password" style={{ color: "#08260F" }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            aria-label="Password"
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
      <div className="login-image">
        <img
          src={require("../assets/OIP.jpg")}
          alt="Logo"
          className="logo-image"
        />
        <div className="logo1">Padelo.</div>
        <Link to="/Register">
          <button className="register1">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
