import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import Logo from "../../ui/Logo";
import ThemeToggler from "../../ui/ThemeToggler";
import UserDropdown from "./UserDropdown";

import { navItems, authItems } from "../../../constants/navItems";
import DesktopNavLinks from "./DesktopNavLinks";
import AuthButtons from "./AuthButtons";
import MenuToggleButton from "./MenuToggleButton";
import MobileMenuOverlay from "./MobileMenuOverlay";
import { useAuth } from "../../../context/AuthContext";

export default function Navbar() {
  const token = Cookies.get("authToken");
  const { auth, logout } = useAuth();
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith("/dashboard");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (isDashboard) return null;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow bg-white dark:bg-gray-800 py-3 text-gray-700 dark:text-gray-100">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo />

        <DesktopNavLinks navItems={navItems} />

        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden md:block">
            <ThemeToggler />
          </div>

          {token ? (
            <UserDropdown
              user={auth?.user}
              logout={logout}
              isDashboard={isDashboard}
            />
          ) : (
            <AuthButtons />
          )}

          <MenuToggleButton
            isOpen={isOpen}
            toggle={() => setIsOpen(!isOpen)}
            isLogin={!!token}
            user={auth?.user}
          />
        </div>
      </div>

      {isOpen && (
        <MobileMenuOverlay
          navItems={navItems}
          authItems={authItems}
          token={token}
          showMenu={isOpen}
          closeMenu={() => setIsOpen(false)}
          logout={logout}
          isDashboard={isDashboard}
          role={auth?.user?.role}
        />
      )}
    </nav>
  );
}
