export default function SkeletonListItem() {
  return (
    <div className="flex flex-col md:flex-row animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow p-4 gap-4">
      <div className="w-full md:w-64 h-40 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="flex flex-col flex-1 space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
        <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-32 mt-auto" />
      </div>
    </div>
  );
}
