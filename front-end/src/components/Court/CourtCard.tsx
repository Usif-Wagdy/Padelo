import { FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CourtCard({ court, isDashboard }) {
  const createdAt = new Date(court.createdAt);
  const isNew = Date.now() - createdAt.getTime() <= 7 * 24 * 60 * 60 * 1000;
  const navigate = useNavigate();

  const handleClick = () => {
    if (isDashboard) {
      navigate(`edit/${court._id}`);
    } else {
      navigate(`${court._id}`);
    }
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
    <div
      onClick={handleClick}
      className="relative bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
    >
      {/* New Badge */}
      {isNew && (
        <span className="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
          New
        </span>
      )}

      {/* Image */}
      <img
        src={court.image}
        alt={court.name}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {court.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
          {court.location}, {court.place}
        </p>

        <div className="flex flex-wrap justify-between items-center">
          {/* Price */}
          <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
            EGP {court.price}{" "}
            <span className="text-xs font-normal">/ hour</span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {renderStars(court.averageRating)}
              <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">
                {court.averageRating.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-500 text-xs">
              ({court.reviews.length} reviews)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
