// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom"; // Import Link and useLocation

import '../Pages Styles/Login.css'; 

const Login = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    fetch("http://127.0.0.1:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      
    })
      .then((response) => response.json())
      .then((data) => {

        console.log("Success:", data);
        // route to home page
        navigate("/Home");
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle login error here
        setError("Invalid email or password. Please try again.");
      });
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <h2 style={{ color: "#08260F" }}>Login</h2>
        <form className="form-style" onSubmit={handleSubmit}>
          <label htmlFor="email" style={{ color: "#08260F" }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            required
            aria-label="Email"
            onChange={(e) => setUsername(e.target.value)}
            
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
            onChange={(e) => setPassword(e.target.value)}
          />
            {  error ? <p className ="error-message">{error}</p>:" "}

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
