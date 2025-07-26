export default function ViewToggle({ view, setView }) {
  return (
    <div className="flex gap-2">
      <button
        disabled={view == "card"}
        onClick={() => setView("card")}
        className={`px-3 py-1 rounded text-sm font-medium cursor-pointer opacity-50 hover:bg-neutral-200 dark:hover:bg-gray-600 bg-gray-200 dark:bg-gray-700 
          ${view == "list" ? "opacity-100" : ""}
          `}
      >
        Grid
      </button>
      <button
        disabled={view == "list"}
        onClick={() => setView("list")}
        className={`px-3 py-1 rounded text-sm font-medium cursor-pointer opacity-50 hover:bg-neutral-200 dark:hover:bg-gray-600 bg-gray-200 dark:bg-gray-700 
        ${view == "card" ? "opacity-100" : ""}
          `}
      >
        List
      </button>
    </div>
  );
}
