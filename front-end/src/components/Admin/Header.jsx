import { Menu } from "lucide-react";
import UserDropdown from "../layout/navbar/UserDropdown";

export default function Header({ toggleSidebar }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-600 dark:text-gray-400 mr-4"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-xl font-semibold">Welcome to your Dashboard!</h2>
        </div>

        <UserDropdown />
      </div>
    </header>
  );
}
