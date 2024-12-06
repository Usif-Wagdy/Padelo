import React from "react";
import { useNavigate } from "react-router-dom";
import "../Pages Styles/Style.css"; // Import your CSS file

const Login = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };
   console.log("Test");
  
  return (
    <div className="container">
      <div className="overlay-container">
        {/* Your content goes here */}
      </div>
      <button id="register" onClick={goToRegister}>
        Go to Register
      </button>
    </div>
  );
};

export default Login;
