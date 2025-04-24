import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function MenuToggleButton({ isOpen, toggle, isLogin, user }) {
  return isLogin ? (
    <button
      onClick={toggle}
      className={`md:hidden px-4 py-2 text-md font-medium rounded-full transition-all duration-200 cursor-pointer
        bg-neutral-100 dark:bg-gray-700 dark:text-white text-gray-800 
        hover:bg-neutral-200 dark:hover:bg-gray-600 flex items-center gap-2`}
    >
      <img
        src={user?.image || "https://www.viverefermo.it/images/user.png"}
        alt="Profile"
        className="w-8 h-8 rounded-full object-cover"
      />
      <span className="w-21 truncate">{user?.name || "User"}</span>
    </button>
  ) : (
    <button
      onClick={toggle}
      className="md:hidden text-2xl p-2 rounded-full bg-neutral-100 dark:bg-gray-700 text-gray-600 dark:text-white hover:bg-neutral-200 dark:hover:bg-gray-600 transition cursor-pointer"
    >
      {isOpen ? <HiX /> : <HiMenuAlt3 />}
    </button>
  );
}
