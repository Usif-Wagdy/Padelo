import { NavLink } from "react-router-dom";
import ThemeToggler from "../ui/ThemeToggler";
import { dashboardItems } from "../../constants";
import { FaTimes } from "react-icons/fa";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } 
      md:translate-x-0 md:relative w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
      p-6 space-y-6 transition-transform duration-300 flex flex-col shadow-lg md:shadow-none`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#009c85]">Dashboard</h1>
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-600 dark:text-gray-400"
        >
          <FaTimes size={24} />
        </button>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-3">
          {dashboardItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "home"} // exact match only for home
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-indigo-100 text-indigo-600 dark:bg-gray-700 dark:text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700"
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <ThemeToggler isSettings="true" />
    </aside>
  );
}
