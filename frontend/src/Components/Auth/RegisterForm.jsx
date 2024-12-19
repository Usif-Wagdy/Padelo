/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCircleCheck,
  faCircleXmark,
  faUser,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

const RegisterForm = ({ userNow }) => {
  const navigate = useNavigate();

  // set cookies to save user's token in
  const cookie = new Cookies();

  // data which will be sent to the API
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // capture errors
  const [errors, setErrors] = useState({});

  // indicate user's first touch to the input field
  const [touched, setTouched] = useState({});

  // show and hide password
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);
  const [typeC, setTypeC] = useState("password");
  const [iconC, setIconC] = useState(faEyeSlash);

  const toggleVisibility = () => {
    setType(type === "password" ? "text" : "password");
    setIcon(icon === faEyeSlash ? faEye : faEyeSlash);
  };

  const toggleVisibilityC = () => {
    setTypeC(typeC === "password" ? "text" : "password");
    setIconC(iconC === faEyeSlash ? faEye : faEyeSlash);
  };

  // inputs validation
  const validateInputs = () => {
    const { name, email, password, confirmPassword } = formData;
    const validationErrors = {};

    if (name.trim() === "") validationErrors.name = "User name is required.";
    if (email.trim() === "") validationErrors.email = "Email is required.";
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
      validationErrors.email = "Enter a valid email. ex: example@gmail.com";

    if (password.trim() === "")
      validationErrors.password = "Password is required.";
    else {
      if (password.length < 8)
        validationErrors.password = "Password must be at least 8 characters.";
      if (!/[A-Z]/.test(password))
        validationErrors.password =
          "Password must contain an uppercase letter.";
      if (!/[a-z]/.test(password))
        validationErrors.password = "Password must contain a lowercase letter.";
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
        validationErrors.password =
          "Password must contain a special character.";
      if (!/[0-9]/.test(password))
        validationErrors.password = "Password must contain a number.";
    }

    if (password !== confirmPassword)
      validationErrors.confirmPassword = "Passwords do not match.";

    setErrors(validationErrors);
  };

  useEffect(() => {
    validateInputs();
  }, [formData]);

  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(formData).every((value) => value.trim() !== "");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  async function submit(e) {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const res = await axios.post(
        "http://127.0.0.1:3000/api/users/register",
        formData
      );

      const token = res.data.token;
      cookie.set("JWT", token);
      userNow.setAuth({ token, userDetails: res.data.user });
      navigate("/");
    } catch (err) {
      if (err.response?.data) {
        setErrors((prev) => ({ ...prev, email: err.response.data }));
      } else {
        setErrors((prev) => ({
          ...prev,
          general: "An error occurred. Please try again later.",
        }));
      }
    }
  }

  return (
    <form className="form-control" onSubmit={submit}>
      <div className="input-container">
        <div className="icon">
          <FontAwesomeIcon icon={faUser} />
        </div>

        <div className="col">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>
        {touched.name && (
          <FontAwesomeIcon
            icon={
              errors.name
                ? faCircleXmark
                : formData.name && !errors.name
                ? faCircleCheck
                : null
            }
            className={`validation-icon ${errors.name ? "error" : "success"}`}
            title={errors.name}
          />
        )}
      </div>

      <div className="input-container">
        <div className="icon">
          <FontAwesomeIcon icon={faEnvelope} />
        </div>

        <div className="col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>
        {touched.email && (
          <FontAwesomeIcon
            icon={
              errors.email
                ? faCircleXmark
                : formData.email && !errors.email
                ? faCircleCheck
                : null
            }
            className={`validation-icon ${errors.email ? "error" : "success"}`}
            title={errors.email}
          />
        )}
      </div>

      <div className="input-container">
        <div className="icon">
          <FontAwesomeIcon icon={faLock} />
        </div>

        <div className="col">
          <label htmlFor="password">Password</label>
          <div className="row">
            <input
              id="password"
              name="password"
              type={type}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            <FontAwesomeIcon
              icon={icon}
              className="show-password"
              onClick={toggleVisibility}
            />
          </div>
        </div>
        {touched.password && (
          <FontAwesomeIcon
            icon={
              errors.password
                ? faCircleXmark
                : formData.password && !errors.password
                ? faCircleCheck
                : null
            }
            className={`validation-icon ${
              errors.password ? "error" : "success"
            }`}
            title={errors.password}
          />
        )}
      </div>

      <div className="input-container">
        <div className="icon">
          <FontAwesomeIcon icon={faLock} />
        </div>

        <div className="col">
          <label htmlFor="confirmPassword">Confirm your password</label>
          <div className="row">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={typeC}
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            <FontAwesomeIcon
              icon={iconC}
              className="show-password"
              onClick={toggleVisibilityC}
            />
          </div>
        </div>
        {touched.confirmPassword && (
          <FontAwesomeIcon
            icon={
              errors.confirmPassword
                ? faCircleXmark
                : formData.confirmPassword && !errors.confirmPassword
                ? faCircleCheck
                : null
            }
            className={`validation-icon ${
              errors.confirmPassword ? "error" : "success"
            }`}
            title={errors.confirmPassword}
          />
        )}
      </div>

      <button type="submit" className="main-btn" disabled={!isFormValid}>
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
