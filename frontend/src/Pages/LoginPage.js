// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Pages Styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length > 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      let error = "you must enter a password";
      setPasswordError(error);
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
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
          setLoginError("Invalid email or password. Please try again.");
        });
    }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderColor: emailError ? "red" : "" }}
            aria-label="Email"
          />
          {emailError && <p className="error-message">{emailError}</p>}

          <label htmlFor="password" style={{ color: "#08260F" }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderColor: passwordError ? "red" : "" }}
            aria-label="Password"
          />

          {loginError && <p className="error-message">{loginError}</p>}
          {passwordError && <p className="error-message">{passwordError}</p>}

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
