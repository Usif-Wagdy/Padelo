import { useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
// import StatsOverview from "../../components/Admin/StatsOverview";
// import RecentActivity from "../../components/Admin/RecentActivity";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function DashboardLayout() {
  const { auth } = useAuth();
  const user = auth?.user;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto">
            <Outlet context={user} />
          </div>
        </main>
      </div>
    </div>
  );
}
