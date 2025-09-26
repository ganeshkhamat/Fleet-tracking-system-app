const statuses = [
  { key: "all", label: "All", dot: "bg-gray-400" },
  { key: "idle", label: "Idle", dot: "bg-gray-500" },
  { key: "en_route", label: "En Route", dot: "bg-blue-500" },
  { key: "delivered", label: "Delivered", dot: "bg-green-500" },
];

export default function StatusFilter({ onFilterChange, counts }) {
  return (
    <div className="bg-white shadow rounded-2xl p-4 w-full md:w-64">
      <h3 className="text-sm font-semibold text-gray-600 mb-3">
        Filter by Status
      </h3>
      <div className="flex flex-col gap-2">
        {statuses.map((s) => (
          <button
            key={s.key}
            onClick={() => onFilterChange(s.key)}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 border border-gray-200"
          >
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
              <span>{s.label} ({counts?.[s.key] ?? 0})</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
