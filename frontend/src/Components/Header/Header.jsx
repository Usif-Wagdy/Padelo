import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import "./header.css";

export default function Header() {
  // set active link
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  // update active link based on current location
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // get token from cookies
  const cookie = new Cookies();

  // initialize user to set the data onto (we got the data from the cookie)
  const [user, setUser] = useState({});
  console.log(user);

  useEffect(() => {
    const token = cookie.get("JWT"); // get the token from cookie

    if (token) {
      // Decode the token
      const decodedToken = jwtDecode(token);

      // save the user's data
      setUser(decodedToken);
    }
  }, []);

  return (
    <div className="header">
      <div className="container">
        <div className="left">
          <img src={require("../../assets/Logo.png")} alt="Logo" />
          <div className="main-logo">Padelo</div>
        </div>
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
        {user.name === "" ? (
          <div className="right">
            <Link to={"/register"} className="main-btn">
              Register
            </Link>
            <Link to={"/login"} className="main-btn">
              Login
            </Link>
          </div>
        ) : (
          <div className="right">
            <Link to={"/profile"} className="main-btn">
              Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
