export default function FilterBar({
  search,
  setSearch,
  location,
  setLocation,
  sort,
  setSort,
  locations,
  page,
  totalPages,
  totalCourts,
  onPageChange,
}) {
  return (
    <div className="flex flex-col gap-6 mb-8 md:gap-4 md:flex-col lg:flex-row lg:items-center lg:justify-between">
      {/* Filters Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-4 w-full lg:w-auto">
        {/* Search */}
        <div className="flex flex-col text-sm text-gray-700 dark:text-gray-300 w-full sm:w-full lg:w-64">
          <label htmlFor="search">Find Court</label>
          <input
            id="search"
            type="text"
            placeholder="Search courts..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onPageChange(1);
            }}
            className="px-4 py-2 mt-1 w-full rounded border dark:bg-gray-800 dark:border-gray-600"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col text-sm text-gray-700 dark:text-gray-300 w-full sm:w-full lg:w-48">
          <label htmlFor="location">Filter by Location</label>
          <select
            id="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              onPageChange(1);
            }}
            className="px-3 py-2 mt-1 w-full rounded border dark:bg-gray-800 dark:border-gray-600 cursor-pointer"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="flex flex-col text-sm text-gray-700 dark:text-gray-300 w-full sm:w-full lg:w-48">
          <label htmlFor="sort">Sort by</label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              onPageChange(1);
            }}
            className="px-3 py-2 mt-1 w-full rounded border dark:bg-gray-800 dark:border-gray-600 cursor-pointer"
          >
            <option value="rating">Rating</option>
            <option value="reviews">Reviews</option>
            <option value="new">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Pagination Info & Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 w-full lg:w-auto">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {totalCourts} courts found
        </span>
        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm disabled:opacity-50 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-600"
          >
            Prev
          </button>
          <span className="text-sm text-gray-800 dark:text-gray-200">
            Page {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm disabled:opacity-50 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
