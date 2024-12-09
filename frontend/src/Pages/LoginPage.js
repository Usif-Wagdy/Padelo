import React from "react";
import { useNavigate } from "react-router-dom";
import "../Pages Styles/Style.css"; // Import your CSS file

const Login = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container">
      <div className="overlay-container">
        <div className="login-container">
          <h2 className="form-title">Log in</h2>
          <form action="#" className="login-form">
            <label>Email</label>
            <div className="input wrapper">
              <input
                type="email"
                placeholder="Enter your Email"
                className="input-field"
                required
              />
            </div>
            <label>Password</label>
            <div className="input wrapper">
              <input
                type="password"
                placeholder="Enter your password"
                className="input-field"
                required
              />
            </div>
            <button className="login-button">Login</button>
          </form>
        </div>
      </div>

      <button id="register" onClick={goToRegister}>
        Go to Register
      </button>
    </div>
  );
};

export default Login;
