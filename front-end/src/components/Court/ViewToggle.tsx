export default function ViewToggle({ view, setView }) {
  return (
    <div className="flex gap-2">
      <button
        disabled={view == "card"}
        onClick={() => setView("card")}
        className={`px-3 py-1 rounded text-sm font-medium cursor-pointer disabled:opacity-50 hover:bg-neutral-200 dark:hover:bg-gray-600 bg-gray-200 dark:bg-gray-700`}
      >
        Grid
      </button>
      <button
        disabled={view == "list"}
        onClick={() => setView("list")}
        className={`px-3 py-1 rounded text-sm font-medium cursor-pointer disabled:opacity-50 hover:bg-neutral-200 dark:hover:bg-gray-600 bg-gray-200 dark:bg-gray-700`}
      >
        List
      </button>
    </div>
  );
}
