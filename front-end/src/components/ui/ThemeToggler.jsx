import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useUI } from "../../context/UIContext";

export default function ThemeToggler({ isSettings = false }) {
  const { setLoading } = useUI();

  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : false;
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
    }, 1500);
  };

  return (
    <button
      onClick={toggleDark}
      className={`transition cursor-pointer ${
        isSettings
          ? "flex md:hidden justify-start items-center gap-3 py-2 px-3 rounded-md text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          : " text-xl p-2 rounded-full bg-neutral-100 dark:bg-gray-700 text-gray-600 dark:text-white hover:bg-neutral-200 dark:hover:bg-gray-600"
      }`}
      aria-label="Toggle Theme"
    >
      {isSettings ? "Theme: " : ""} {isDark ? <FiMoon /> : <FiSun />}
    </button>
  );
}
