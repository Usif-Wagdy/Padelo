import React from "react";
import { Home, BarChart2, Users, Settings, Sun, Moon } from "lucide-react";
import ThemeToggler from "../ui/ThemeToggler";

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
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          Dashboard
        </h1>
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-600 dark:text-gray-400"
        >
          ✕
        </button>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-3">
          {[
            { icon: <Home size={20} />, label: "Home" },
            { icon: <BarChart2 size={20} />, label: "Analytics" },
            { icon: <Users size={20} />, label: "Users" },
            { icon: <Settings size={20} />, label: "Settings" },
          ].map((item, i) => (
            <li key={i}>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <ThemeToggler isSettings="true" />
    </aside>
  );
}
