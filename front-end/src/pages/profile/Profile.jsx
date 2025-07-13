import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import VerificationModal from "../../helpers/VerificationModal";

export default function Profile() {
  const { auth } = useAuth();
  const user = auth?.user;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center mt-30 mb-10 gap-6">
      <div className="flex flex-col md:flex-row md:gap-6 items-center justify-center w-full lg:w-1/2 p-4 dark:border rounded-lg shadow-md bg-neutral-100 dark:bg-gray-800">
        <img
          src={user?.image || "https://www.viverefermo.it/images/user.png"}
          alt="Profile"
          className="w-42 h-42 rounded-md object-cover mb-4"
        />
        <div className="text-center md:text-start">
          <h2 className="text-2xl mb-1 font-bold text-gray-900 dark:text-white">
            {user?.name || "User"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span>{user?.email}</span>
            {user?.isVerified ? (
              <span className="text-green-600 dark:text-green-500 ml-2">
                Verified!
              </span>
            ) : (
              <button
                onClick={handleOpenModal}
                className="text-red-500 font-semibold text-xs cursor-pointer ml-2"
              >
                Click To Verify
              </button>
            )}
          </p>
        </div>
      </div>

      {/* Sidebar and Main Content Section */}
      <div className="flex flex-col w-full gap-6">
        <ProfileSidebar />
        <Outlet />
      </div>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        email={user?.email}
      />
    </div>
  );
}
