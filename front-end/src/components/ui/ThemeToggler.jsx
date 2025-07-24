import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useUI } from "../../context/UIContext";

export default function ThemeToggler({ isSettings = false }) {
  const { setLoading } = useUI();

  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleDark = () => {
    setLoading(true);
    setTimeout(() => {
      setIsDark((prev) => !prev);
      setLoading(false);
    }, 500);
  };

  return isSettings ? (
    <button
      onClick={toggleDark}
      className="w-full flex items-center justify-center p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
    >
      {isDark ? (
        <FiSun size={20} className="text-yellow-400" />
      ) : (
        <FiMoon size={20} className="text-indigo-600" />
      )}
      <span className="ml-2">{isDark ? "Light Mode" : "Dark Mode"}</span>
    </button>
  ) : (
    <button
      onClick={toggleDark}
      className="transition cursor-pointer text-xl p-2 rounded-full bg-neutral-100 dark:bg-gray-700 text-gray-600 dark:text-white hover:bg-neutral-200 dark:hover:bg-gray-600"
      aria-label="Toggle Theme"
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </button>
  );
}
