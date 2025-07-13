export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow">
      <div className="h-48 bg-gray-300 dark:bg-gray-700" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
      </div>
    </div>
  );
}
