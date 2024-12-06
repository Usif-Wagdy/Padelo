import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/Login");
  };

  return (
    <div>
      <h1>Register Page</h1>
      <button onClick={goToLogin}>Go to Login</button>
    </div>
  );
};

export default RegisterPage;
