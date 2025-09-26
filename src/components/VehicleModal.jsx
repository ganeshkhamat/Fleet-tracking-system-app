export default function VehicleModal({ vehicle, onClose }) {
  if (!vehicle) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close" onClick={onClose}>✖</button>
        <h2>{vehicle.name}</h2>
        <p><b>ID:</b> {vehicle.id}</p>
        <p><b>Status:</b> {vehicle.status}</p>
        <p><b>Speed:</b> {vehicle.speed} km/h</p>
        <p><b>Coordinates:</b> {vehicle.lat}, {vehicle.lon}</p>
        <p><b>Last Updated:</b> {new Date(vehicle.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
