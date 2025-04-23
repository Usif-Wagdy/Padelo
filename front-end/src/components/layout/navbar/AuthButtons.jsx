import { NavLink } from "react-router-dom";
import { authItems } from "../../../constants/navItems";

export default function AuthButtons() {
  return (
    <div className="gap-2 hidden md:flex ">
      {authItems.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `px-4 py-2 text-md font-medium rounded-full transition-all duration-200 ${
              isActive
                ? "bg-[#009c85] text-white"
                : "bg-neutral-100 dark:bg-gray-700 dark:text-white text-gray-800 hover:bg-neutral-200 dark:hover:bg-gray-600"
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
}
