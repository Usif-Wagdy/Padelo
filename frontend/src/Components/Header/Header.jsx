import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  // set active link
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  // update active link based on current location
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // get token from cookie
  const cookie = new Cookies();
  const token = cookie.get("JWT");

  // initialize user to set the data onto (we got the data from the cookie)
  const [user, setUser] = useState({});
  console.log(user);

  useEffect(() => {
    if (token && token !== "undefined") {
      // Decode the token
      const decodedToken = jwtDecode(token);

      // save the user's data
      setUser(decodedToken);
    } else {
      setUser({});
    }
  }, []);

  // toggle bars to side bar on responsive design
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
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
                {/* <Link to={"/register"} className="main-btn">
                  Register
                </Link> */}
                <Link to={"/login"} className="main-btn">
                  Login
                </Link>
              </div>
            ) : (
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
