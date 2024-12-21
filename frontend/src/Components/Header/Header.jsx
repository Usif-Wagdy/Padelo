import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons"; // Import the logout icon

export default function Header() {
  // set active link
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname.startsWith("/profile")) {
      setActiveLink("/profile");
    } else {
      setActiveLink(location.pathname);
    }
  }, [location]);

  // get token from cookie
  const cookie = new Cookies();
  const token = cookie.get("JWT");

  const [user, setUser] = useState({});

  useEffect(() => {
    if (token && token !== "undefined") {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    } else {
      setUser({});
    }
  }, [token]);

  // toggle bars to side bar on responsive design
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  // Logout function
  const navigate = useNavigate();
  const logout = () => {
    cookie.remove("JWT");
    setUser({});
    navigate("/login"); // Redirect to home page or login page
  };

  return (
    <div className="header">
      <div className="container">
        <div className="left">
          <img src={require("../../assets/Logo.png")} alt="Logo" />
          <div className="main-logo">Padelo</div>
        </div>

        <FontAwesomeIcon
          onClick={toggleVisibility}
          className="toggle-bars"
          icon={faBarsStaggered}
        />

        <div className={`wrapper ${isVisible ? "show" : "hide"}`}>
          <div className="mid">
            <ul>
              <li className={activeLink === "/" ? "active" : ""}>
                <Link to={"/"}>Home</Link>
              </li>
              <li className={activeLink === "/courts" ? "active" : ""}>
                <Link to={"/courts"}>Courts</Link>
              </li>
              <li className={activeLink === "/contactUs" ? "active" : ""}>
                <Link to={"/contactUs"}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="right">
            {!token ? (
              <div className="auth">
                <Link to={"/login"} className="main-btn">
                  Login
                </Link>
              </div>
            ) : (
              <div className="right">
                <div
                  title="Go To Your Profile"
                  className={`profile ${
                    activeLink === "/profile" ? "active" : ""
                  }`}
                >
                  <Link className="profile-btn" to={"/profile"}>
                    {user.name}
                  </Link>
                  <img src={user.image} alt="profile-pic" />
                  {/* Logout Icon */}
                </div>
                <FontAwesomeIcon
                  onClick={logout}
                  className="logout-icon"
                  icon={faSignOutAlt} // Logout icon
                  title="Logout"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
