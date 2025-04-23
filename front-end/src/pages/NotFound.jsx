import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900 text-center text-gray-700 dark:text-gray-100">
      <div>
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-2xl my-4">Oops! Page not found.</p>
        <p className="text-lg">
          The page you are looking for might have been removed or temporarily
          unavailable.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-[#009c85] text-white py-2 px-6 rounded-lg text-lg transition duration-300 hover:bg-[#00e0c2]"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
