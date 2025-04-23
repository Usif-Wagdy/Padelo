import { NavLink } from "react-router-dom";
import MobileMenuSection from "./MobileMenuSection";
import ThemeToggler from "../../ui/ThemeToggler";

export default function MobileMenuOverlay({
  navItems,
  authItems,
  token,
  closeMenu,
  showMenu,
  logout,
  isDashboard,
  role,
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black z-30 transition-opacity duration-300 ease-in-out ${
          showMenu ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-0 left-0 h-screen w-[80%] max-w-xs bg-white dark:bg-gray-900 shadow-lg z-40 overflow-y-auto transition-opacity duration-300 ease-in-out ${
          showMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-6 flex flex-col gap-8 h-full">
          {/* Auth/Profile Section */}
          <MobileMenuSection
            title={token ? "Profile & Settings" : "Login / Register"}
          >
            {token ? (
              <>
                <NavLink
                  to="/profile"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-md transition ${
                      isActive
                        ? "bg-[#009c85] text-white font-semibold"
                        : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  Profile
                </NavLink>
                {role === "admin" && (
                  <NavLink
                    to={isDashboard ? "/" : "/dashboard"}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded-md transition ${
                        isActive
                          ? "bg-[#009c85] text-white font-semibold"
                          : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`
                    }
                  >
                    {isDashboard ? "Home" : "Admin Dashboard"}
                  </NavLink>
                )}
              </>
            ) : (
              authItems.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-md transition ${
                      isActive
                        ? "bg-[#009c85] text-white font-semibold"
                        : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))
            )}
          </MobileMenuSection>

          {/* Nav Links Section */}
          <MobileMenuSection title="Links">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-md transition ${
                    isActive
                      ? "bg-[#009c85] text-white font-semibold"
                      : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </MobileMenuSection>

          {/* Others Section */}
          <MobileMenuSection title="Settings">
            <ThemeToggler isSettings={true} />

            {token && (
              <button
                onClick={logout}
                className="block w-full text-left py-2 px-3 rounded-md text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900 transition cursor-pointer"
              >
                Logout
              </button>
            )}
          </MobileMenuSection>
        </div>
      </div>
    </>
  );
}
