import { Link } from "react-router-dom";

export default function VehicleTable({ vehicles }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-2xl">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="p-3">Vehicle</th>
            <th className="p-3">Driver</th>
            <th className="p-3">Status</th>
            <th className="p-3">Speed</th>
            <th className="p-3">Destination</th>
            <th className="p-3">ETA</th>
            <th className="p-3">Last Update</th>
            <th className="p-3">Location</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id} className="border-t hover:bg-gray-50">
              <td className="p-3 font-medium text-blue-600 hover:underline">
                <Link to={`/vehicles/${v.id}`}>{v.vehicleNumber}</Link>
              </td>
              <td className="p-3">{v.driverName}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    v.status === "en_route"
                      ? "bg-blue-100 text-blue-700"
                      : v.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {v.status.toUpperCase()}
                </span>
              </td>
              <td className="p-3">{v.speed} mph</td>
              <td className="p-3">{v.destination}</td>
              <td className="p-3">
                {v.estimatedArrival
                  ? new Date(v.estimatedArrival).toLocaleTimeString()
                  : "-"}
              </td>
              <td className="p-3">
                {new Date(v.lastUpdated).toLocaleString()}
              </td>
              <td className="p-3">
                {v.currentLocation.lat.toFixed(4)},{" "}
                {v.currentLocation.lng.toFixed(4)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
