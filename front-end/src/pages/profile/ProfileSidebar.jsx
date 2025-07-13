import { NavLink } from "react-router-dom";
import MobileMenuSection from "../../components/layout/navbar/MobileMenuSection";
import { profileItems } from "../../constants/index";

export default function ProfileSidebar() {
  return (
    <div className="w-full lg:max-w-5xl mx-auto">
      <MobileMenuSection title={"settings"}>
        <div className="bg-neutral-100 dark:bg-gray-800 shadow-sm p-4">
          {/* Layout changes based on screen size */}
          <div className="flex flex-row gap-2">
            {profileItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-md transition ${
                    isActive
                      ? "bg-[#009c85] text-white font-semibold"
                      : "text-gray-800 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </MobileMenuSection>
    </div>
  );
}
