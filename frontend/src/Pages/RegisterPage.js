import React from "react";
import { useNavigate } from "react-router-dom";
import "../Pages Styles/Register.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/Login");
  };

  return (
    <div className="register-container">
      <div className="to-login">
        <img
          src={require("../assets/OIP.jpg")}
          alt="Logo"
          className="logo-image"
        />
        <div className="logo1">Padelo.</div>
        <button onClick={goToLogin} className="login1">
          Login
        </button>
      </div>

      <div className="register-form">
        <h2 style={{ color: "#08260F" }}>Create Account</h2>
        <form className="form-style">
          <label htmlFor="name" style={{ color: "#08260F" }}>
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your Name"
            required
            aria-label="Name"
          />
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
          <label htmlFor="password-2" style={{ color: "#08260F" }}>
            Re-enter Password
          </label>
          <input
            type="password"
            id="password-2"
            placeholder="Re-enter your password"
            required
            aria-label="Password-2"
          />
          <p>
            By signing up you agree to{" "}
            <a style={{ color: "#003df3", textDecoration: "none" }} href="#">
              terms and conditions
            </a>{" "}
            at Padelo.
          </p>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
