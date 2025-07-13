/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSection({ bgImage, isAuthed }) {
  return (
    <section
      className="text-center px-6 text-gray-600 dark:text-white bg-cover bg-center min-h-screen flex flex-col items-center justify-center relative"
      style={
        bgImage
          ? { backgroundImage: `url(${bgImage})` }
          : {
              /* backgroundColor: '#f0f0f0' // Example fallback */
            }
      }
    >
      <div className="absolute inset-0 bg-black opacity-20 dark:opacity-60"></div>

      <div className="relative z-10">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-4 text-white"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Reserve Your Padel Court Instantly
        </motion.h1>
        <motion.p
          className="text-lg max-w-xl mx-auto mb-8 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Padelo makes finding and reserving your court effortless. Track
          bookings, get verified, and enjoy the game.
        </motion.p>
        <motion.div
          className="flex flex-col md:flex-row justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/courts"
            className="w-full md:w-auto py-3 px-8 bg-[#009c85] text-white rounded-md hover:bg-[#007e6d] transition text-lg font-medium"
          >
            Explore Courts
          </Link>
          {!isAuthed && (
            <Link
              to="/register"
              className="w-full md:w-auto py-3 px-8 border-2 border-gray-200 text-gray-50 rounded-md hover:bg-gray-200 hover:text-[#009c85] transition text-lg font-medium"
            >
              Join Now
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
