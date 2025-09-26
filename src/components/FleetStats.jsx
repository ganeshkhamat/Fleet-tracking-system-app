export default function FleetStats({ vehicles, counts, filter, onFilterChange }) {
  // console.log("vehicles:: ", vehicles, filter, onFilterChange)
  

  const buttons = [
    { key: "all", label: "All", color: "gray" },
    { key: "idle", label: "Idle", color: "yellow" },
    { key: "en_route", label: "En Route", color: "blue" },
    { key: "delivered", label: "Delivered", color: "green" },
  ];

  return (
    <div className="p-4 bg-white rounded-2xl shadow mb-6">
      <h2 className="text-gray-700 font-semibold mb-3">🔀 Filter by Status</h2>
      <div className="flex flex-wrap gap-3">
        {buttons.map((b) => (
          <button
            key={b.key}
            onClick={() => onFilterChange(b.key)}
            className={`px-4 py-2 rounded-xl border text-sm font-medium flex items-center gap-2 
              ${filter === b.key ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-300 text-gray-600"}`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                b.color === "blue"
                  ? "bg-blue-500"
                  : b.color === "green"
                  ? "bg-green-500"
                  : b.color === "yellow"
                  ? "bg-yellow-500"
                  : "bg-gray-500"
              }`}
            />
            {b.label} <span className="ml-1 text-xs font-semibold">({counts[b.key]})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
