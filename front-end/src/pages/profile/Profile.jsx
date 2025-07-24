import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";

export default function Profile() {
  return (
    <div className="mx-auto max-w-7xl px-4 my-10 md:mt-18">
      <div className="flex flex-col lg:flex-row gap-8">
        <ProfileSidebar />
        <main className="flex-1 min-w-0">
          <div className="h-full bg-neutral-100 dark:bg-gray-800 rounded-lg shadow-md p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
