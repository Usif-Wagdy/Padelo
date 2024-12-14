import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import "../Pages Styles/Register.css";

const RegisterPage = () => {
  // Set the Navigate to Login
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/Login");
  };

  // Data to send for API
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [accept, setAccept] = useState(false);

  const [error, setError] = useState("");

  // Toggle Password Visibility
  const [type, setType] = useState("password");
  const [typeR, setTypeR] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);
  const [iconR, setIconR] = useState(faEyeSlash);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(faEye);
      setType("text");
    } else {
      setIcon(faEyeSlash);
      setType("password");
    }
  };

  const handleToggleR = () => {
    if (typeR === "password") {
      setIconR(faEye);
      setTypeR("text");
    } else {
      setIconR(faEyeSlash);
      setTypeR("password");
    }
  };

  // Set API Configuration
  async function submit(e) {
    e.preventDefault();
    let flag;
    setAccept(true);
    if (name === "" || password.length < 8 || passwordR !== password) {
      flag = false;
    } else {
      flag = true;
    }
    try {
      if (flag) {
        await axios
          .post("http://127.0.0.1:3000/api/users/register", {
            name: name,
            email: email,
            password: password,
          })
          .then();
        if (!error) {
          navigate("/Login");
        }
      }
    } catch (err) {
      // handle the response
      if (err.response?.data) {
        // If the error contains data (email already exists)
        setError(err.response.data);
      } else {
        // Handle other types of errors (network issues)
        setError("An error occurred, please try again later.");
      }
    }
  }

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

        <h2>Create Account</h2>

        <form className="form-style" onSubmit={submit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="pw-container">
            <label htmlFor="password">Password</label>
            <input
              type={type}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FontAwesomeIcon
              icon={icon}
              className="show-password"
              onClick={() => handleToggle()}
            />
          </div>

          <div className="pw-container">
            <label htmlFor="passwordR">Re-enter Password</label>
            <input
              type={typeR}
              id="passwordR"
              placeholder="Re-enter your password"
              value={passwordR}
              onChange={(e) => setPasswordR(e.target.value)}
            />
            <FontAwesomeIcon
              icon={iconR}
              className="show-password"
              onClick={() => handleToggleR()}
            />
          </div>

          {/* Display Errors */}
          <div
            className={`error ${
              accept &&
              (error ||
                name === "" ||
                !/[A-Z]/.test(password) ||
                password.length < 8 ||
                password !== passwordR)
                ? "show"
                : ""
            }`}
          >
            <p className="error-heading">Error!</p>

            {name === "" && accept && <p>User name is required.</p>}

            {!/[A-Z]/.test(password) && accept && (
              <p>Password doesn't contain at least one capital letter.</p>
            )}

            {accept && error && <p>{error}</p>}

            {password.length < 8 && accept && (
              <p>Password must be more than 8 characters.</p>
            )}

            {password !== passwordR && accept && <p>Password doesn't Match.</p>}
          </div>

          <p className="terms">
            By signing up you agree to{" "}
            <a href="#HomePage">terms and conditions</a> at Padelo.
          </p>
          {  error ? <p className ="error-message">{error}</p>:" "}

          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
