import { FaStar, FaRegStar } from "react-icons/fa";
import { FiPhone, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function CourtListItem({ court }) {
  const createdAt = new Date(court.createdAt);
  const isNew = Date.now() - createdAt.getTime() <= 7 * 24 * 60 * 60 * 1000;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${court._id}`);
  };
  const renderStars = (rating) => {
    const numericRating = Number(rating) || 0;
    const stars = [];
    const fullStars = Math.floor(numericRating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="relative flex flex-col md:flex-row w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
      {isNew && (
        <span className="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-semibold px-2 py-0.5 rounded z-10">
          New
        </span>
      )}

      {/* Image Section */}
      <div className="w-full md:w-64 lg:w-72 flex-shrink-0">
        <img
          src={court.image}
          alt={court.name}
          className="w-full h-48 md:h-full object-cover"
        />
      </div>

      {/* Details Section */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {court.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {court.location}, {court.place}
            </p>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{`EGP ${court.price}`}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">per hour</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 text-sm">
          <a
            href={`tel:${court.contactNumber}`}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:underline"
          >
            <FiPhone className="text-emerald-500" />
            <span>{court.contactNumber}</span>
          </a>
          <a
            href={`mailto:${court.email}`}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:underline"
          >
            <FiMail className="text-emerald-500" />
            <span>{court.email}</span>
          </a>
        </div>

        {/* Footer */}
        <div className="mt-auto flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              {renderStars(court.averageRating)}
            </div>
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              {court.averageRating.toFixed(1)} ({court.reviews.length} reviews)
            </span>
          </div>
          <button
            onClick={handleClick}
            className="w-full sm:w-auto bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-700 cursor-pointer transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
