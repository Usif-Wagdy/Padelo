import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Pages Styles/Register.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  console.log(name);
  console.log(email);
  console.log(password);
  console.log(confirmPassword);
  console.log(accept);

  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    // ******************** Waiting back-end team to push the API.
    //   try {
    //     await axios.post("http://127.0.0.1:3000/api/register", {
    //       name: name,
    //       email: email,
    //       password: password,
    //     });
    //     navigate("/Login");
    //   } catch (error) {}
  }

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
        <form className="form-style" onSubmit={submit}>
          <label htmlFor="name" style={{ color: "#08260F" }}>
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your Name"
            required
            aria-label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {password !== confirmPassword && accept && (
            <p className="error">Password doesn't Match</p>
          )}

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
