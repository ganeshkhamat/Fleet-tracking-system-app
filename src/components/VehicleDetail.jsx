import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch(`https://case-study-26cf.onrender.com/api/vehicles/${id}`);
        const data = await res.json();
        setVehicle(data.data);
      } catch (err) {
        console.error("Error fetching vehicle:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) return <p className="p-6">Loading vehicle details...</p>;
  if (!vehicle) return <p className="p-6">Vehicle not found.</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 relative overflow-y-auto max-h-[90vh]">
        
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          onClick={() => navigate("/")}
        >
          ×
        </button>

        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2">🚚</span>
          <h2 className="text-xl font-bold">{vehicle.vehicleNumber}</h2>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          👤 {vehicle.driverName} • {vehicle.status.toUpperCase()}
        </p>

    
        <div className="grid grid-cols-2 gap-4 text-sm">
          <DetailCard label="Status">
            <StatusBadge status={vehicle.status} />
          </DetailCard>

          <DetailCard label="Current Speed">
            <strong>{vehicle.speed} mph</strong>
          </DetailCard>

          <DetailCard label="Driver">{vehicle.driverName}</DetailCard>

          <DetailCard label="Phone">
            <a href={`tel:${vehicle.driverPhone}`} className="text-black font-medium">
              {vehicle.driverPhone}
            </a>
          </DetailCard>

          <DetailCard label="Destination">{vehicle.destination}</DetailCard>

          <DetailCard label="Location">
            {vehicle.currentLocation.lat.toFixed(6)}, {vehicle.currentLocation.lng.toFixed(6)}
          </DetailCard>

          <DetailCard label="Battery Level">
            <BatteryBar level={vehicle.batteryLevel} />
          </DetailCard>

          <DetailCard label="Fuel Level">
            <FuelBar level={vehicle.fuelLevel} />
          </DetailCard>

          <DetailCard label="Last Updated">
            {new Date(vehicle.lastUpdated).toLocaleString("en-GB")}
          </DetailCard>
        </div>
      </div>
    </div>
  );
}


function DetailCard({ label, children }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
      <p className="text-xs text-gray-500 uppercase mb-1">{label}</p>
      <div className="text-sm">{children}</div>
    </div>
  );
}


function StatusBadge({ status }) {
  const colors = {
    en_route: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
  };
  const label = status.replace("_", " ").toUpperCase();

  return (
    <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${colors[status] || "bg-gray-100 text-gray-700"}`}>
      ✅ {label}
    </span>
  );
}


function BatteryBar({ level }) {
  const barColor = level < 25 ? "bg-red-500" : "bg-green-500";
  return (
    <div>
      <p>{level}%</p>
      <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
        <div className={`${barColor} h-2 rounded-full`} style={{ width: `${level}%` }}></div>
      </div>
    </div>
  );
}

function FuelBar({ level }) {
  const barColor = level < 25 ? "bg-red-500" : "bg-orange-400";
  return (
    <div>
      <p>{level}%</p>
      <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
        <div className={`${barColor} h-2 rounded-full`} style={{ width: `${level}%` }}></div>
      </div>
    </div>
  );
}
