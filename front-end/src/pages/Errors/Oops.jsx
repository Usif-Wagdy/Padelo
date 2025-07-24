import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Oops() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
          Oops, You're Not Signed In!
        </h1>
        <p className="text-lg my-4 text-gray-600 dark:text-gray-300">
          To access this page, you need to sign in first. Let's get you back on
          track!
        </p>
        <button
          onClick={() => navigate("/login")}
          className="cursor-pointer mt-6 inline-block bg-[#009c85] text-white py-2 px-6 rounded-lg text-lg transition duration-300 hover:bg-[#00e0c2]"
        >
          Sign In
        </button>
      </motion.div>
    </div>
  );
}
