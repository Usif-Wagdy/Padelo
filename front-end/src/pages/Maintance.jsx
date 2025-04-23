import { useNavigate } from "react-router-dom";

export default function UnderMaintenance() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-gray-900 px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
        🚧 Page Under Maintenance
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
        We're currently working on some improvements. Please check back soon or
        return to the homepage.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition"
      >
        Go to Homepage
      </button>
    </div>
  );
}
