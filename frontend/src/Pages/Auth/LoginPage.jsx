import React, { useContext } from "react";
import LoginForm from "../../Components/Auth/LoginForm";
import { User } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

const RegisterPage = () => {
  const userNow = useContext(User);
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="auth-box">
        <div className="form">
          <button className="back-to-home" onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faLeftLong} />
            Home
          </button>

          <h2>Login</h2>
          <LoginForm userNow={userNow} />
        </div>

        <div className="auth-switch">
          <h2>
            Welcome back to <span className="main-logo">Padelo</span>
          </h2>
          <p>Don't have an account yet?</p>
          <button className="main-btn" onClick={() => navigate("/Register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
