// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import VehicleTable from "./components/VehicleTable";
import StatusFilter from "./components/StatusFilter";
import VehicleDetail from "./components/VehicleDetail"; 
import FleetStats from "./components/FleetStats";

export default function App() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countsVehicle, setCountVehicle] = useState({})

  const fetchVehicles = async (status = "all") => {
    setLoading(true);
    try {
      let url, data;
      if (status === "all") {
        url = "https://case-study-26cf.onrender.com/api/vehicles?limit=100";
      } else {
        url = `https://case-study-26cf.onrender.com/api/vehicles/status/${status}?limit=10`;
      }
      const res = await fetch(url);
      if(status !== "all"){
        data = await res.json();
      } else {
          data = await res.json();
          const counts = {
          all: data.data.length,
          en_route: data.data.filter((v) => v.status === "en_route").length,
          idle: data.data.filter((v) => v.status === "idle").length,
          delivered: data.data.filter((v) => v.status === "delivered").length,
        };
        setCountVehicle(counts || {})
      }
      
      setVehicles(data.data || []);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles("all");
  }, []);

  return (
    <Router>
      <Routes>
        {/* Dashboard route */}
        <Route
          path="/"
          element={
            <div className="p-6 bg-gray-50 min-h-screen">
              <h1 className="text-2xl font-bold mb-4">Fleet Tracking Dashboard</h1>

              <FleetStats vehicles={vehicles} counts={countsVehicle} onFilterChange={fetchVehicles} />

              {loading ? (
                <p className="mt-4 text-gray-600">Loading vehicles...</p>
              ) : (
                <VehicleTable vehicles={vehicles} />
              )}
            </div>
          }
        />

        <Route path="/vehicles/:id" element={<VehicleDetail />} />
      </Routes>
    </Router>
  );
}
