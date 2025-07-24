import { useEffect, useState } from "react";
import { allCourts } from "../../api/Courts";

// Components
import CourtCard from "../../components/Court/CourtCard";
import CourtListItem from "../../components/Court/CourtListItem";
import SkeletonCard from "../../components/Court/SkeletonCard";
import SkeletonListItem from "../../components/Court/SkeletonListItem";
import FilterBar from "../../components/Court/FilterBar";
import ViewToggle from "../../components/Court/ViewToggle";

export default function CourtsPage() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters from localStorage
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(
    () => localStorage.getItem("courtsLocation") || ""
  );
  const [sort, setSort] = useState(
    () => localStorage.getItem("courtsSort") || "rating"
  );
  const [view, setView] = useState(
    () => localStorage.getItem("courtsView") || "card"
  );
  const [page, setPage] = useState(1);

  const perPage = view === "card" ? 6 : 2;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await allCourts();
      setCourts(data.courts || []);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  // Update localStorage when values change
  useEffect(() => {
    localStorage.setItem("courtsLocation", location);
  }, [location]);

  useEffect(() => {
    localStorage.setItem("courtsSort", sort);
  }, [sort]);

  useEffect(() => {
    localStorage.setItem("courtsView", view);
  }, [view]);

  // Get unique location list from courts
  const locations = Array.from(new Set(courts.map((c) => c.place))).filter(
    Boolean
  );

  // Filter + Sort + Paginate
  const filtered = courts
    .filter(
      (court) =>
        court.name.toLowerCase().includes(search.toLowerCase()) &&
        (location ? court.place === location : true)
    )
    .sort((a, b) => {
      if (sort === "rating") return b.averageRating - a.averageRating;
      if (sort === "reviews") return b.reviews.length - a.reviews.length;
      if (sort === "new") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const renderSkeletons = () => {
    return Array.from({ length: perPage }).map((_, i) =>
      view === "card" ? <SkeletonCard key={i} /> : <SkeletonListItem key={i} />
    );
  };

  return (
    <section className="min-h-[calc(100vh-80px)] py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Available Courts</h1>
        <ViewToggle view={view} setView={setView} />
      </div>

      <FilterBar
        search={search}
        setSearch={setSearch}
        location={location}
        setLocation={setLocation}
        sort={sort}
        setSort={setSort}
        locations={locations}
        page={page}
        totalPages={totalPages}
        totalCourts={filtered.length}
        onPageChange={setPage}
      />

      {loading ? (
        <div
          className={
            view === "card"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-6"
          }
        >
          {renderSkeletons()}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400 mt-12">
          No courts found.
        </div>
      ) : (
        <div
          className={
            view === "card"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-6"
          }
        >
          {paginated.map((court) =>
            view === "card" ? (
              <CourtCard key={court._id} court={court} />
            ) : (
              <CourtListItem key={court._id} court={court} />
            )
          )}
        </div>
      )}
    </section>
  );
}
