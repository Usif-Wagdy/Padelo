import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { profileItems } from "../../constants/index";
import VerificationModal from "../../helpers/VerificationModal";

export default function ProfileSidebar() {
  const { auth } = useAuth();
  const user = auth?.user;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // The sidebar container. Fixed width on desktop, full width on mobile.
    <aside className="w-full lg:w-80 lg:flex-shrink-0">
      <div className="h-full p-4 space-y-6 bg-neutral-100 dark:bg-gray-800 rounded-lg shadow-md">
        {/* --- User Info Card --- */}
        <div className="flex flex-col items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
          <img
            src={user?.image || "https://www.viverefermo.it/images/user.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-[#009c85]"
          />
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {user?.name || "User"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate w-48">
              {user?.email}
            </p>
            <div className="mt-2 text-xs">
              {user?.isVerified ? (
                <span className="inline-flex items-center gap-1 font-semibold text-green-600 dark:text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified
                </span>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="font-semibold text-red-500 hover:underline"
                >
                  Click To Verify
                </button>
              )}
            </div>
          </div>
        </div>

        {/* --- Navigation Links --- */}
        <nav className="flex flex-col gap-2">
          {profileItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path == ""}
              className={({ isActive }) =>
                `block py-2.5 px-4 rounded-md transition-colors text-sm font-medium ${
                  isActive
                    ? "bg-[#009c85]/80 dark:bg-[#009c85]/40 text-white shadow"
                    : "text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <VerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={user?.email}
      />
    </aside>
  );
}
