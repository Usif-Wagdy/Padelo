import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function UserDropdown({ user, logout, isDashboard }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`px-4 py-2 text-md font-medium rounded-full transition-all duration-200  cursor-pointer
        bg-neutral-100 dark:bg-gray-700 dark:text-white text-gray-800 
        hover:bg-neutral-200 dark:hover:bg-gray-600 items-center gap-2 hidden md:flex`}
      >
        <img
          src={user.image || "https://www.viverefermo.it/images/user.png"}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="w-21 truncate">{user.name || "User"}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 shadow-lg rounded-md z-50">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `block px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-[#009c85] text-white font-semibold"
                  : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
              }`
            }
            onClick={() => setOpen(false)}
          >
            Profile
          </NavLink>
          {user.role === "admin" && (
            <NavLink
              to={isDashboard ? "/" : "/dashboard"}
              className={({ isActive }) =>
                `block px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-[#009c85] text-white font-semibold"
                    : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                }`
              }
              onClick={() => setOpen(false)}
            >
              {isDashboard ? "Home" : "Admin Dashboard"}
            </NavLink>
          )}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 cursor-pointer text-sm transition-all duration-200 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 "
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
