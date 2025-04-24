import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import Loader from "../ui/Loader";
import { useUI } from "../../context/UIContext";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const { loading } = useUI();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />
      {loading && <Loader />}
      <main className="flex-1 container mx-auto px-4 py-6 my-15">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
