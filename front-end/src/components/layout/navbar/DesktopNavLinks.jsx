import { NavLink } from "react-router-dom";

export default function DesktopNavLinks({ navItems }) {
  return (
    <ul className="hidden md:flex items-center space-x-6">
      {navItems.map(({ path, label }) => (
        <li key={path}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              isActive
                ? "text-[#009c85] dark:text-[#00e0c2] font-semibold"
                : "text-gray-700 dark:text-gray-200 hover:text-[#009c85] dark:hover:text-[#00e0c2]"
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
