// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../Pages Styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");
   const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasMinLength = password.length >= 8;
    return { hasCapitalLetter, hasMinLength };
  };
  const handleSubmit = (e) => {
  


    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    const { hasCapitalLetter, hasMinLength } = validatePassword(password);
    if (!hasCapitalLetter || !hasMinLength) {
      let error = "Password must: ";
      if (!hasMinLength && !hasCapitalLetter) {error += "be at least 8 characters & contain at least one uppercase letter.";}
    
      else if (!hasMinLength) {error += "be at least 8 characters.";}
      else if (!hasCapitalLetter) error += " contain at least one uppercase letter.";
      setPasswordError(error);
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      console.log("Form submitted successfully.");
    }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderColor: emailError ? "red" : "" }}
            aria-label="Email"
            onChange={(e) => setUsername(e.target.value)}
            
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
            onChange={(e) => setPassword(e.target.value)}
          />

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
