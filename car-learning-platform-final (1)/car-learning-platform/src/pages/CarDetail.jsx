import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import CarModelViewer from "../components/CarModelViewer";

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("Beginner");

  useEffect(() => {
    const fetchCar = async () => {
      const docRef = doc(db, "cars", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCar({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchCar();
  }, [id]);

  if (!car) return <p className="p-10 text-white">Loading car details...</p>;

  return (
    <div className="p-10 min-h-screen" style={{ backgroundColor: "#0A0A23" }}>
      <h2 className="text-3xl font-bold mb-4" style={{ color: "#725CAD" }}>
        {car.brand} {car.model}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 3D Viewer */}
        <div
          className="rounded-lg h-[500px] shadow-lg"
          style={{
            backgroundColor: "rgba(114, 92, 173, 0.2)",
            backdropFilter: "blur(6px)",
          }}
        >
          <CarModelViewer modelUrl={car.modelUrl} />
        </div>

        {/* Dropdown Car Info */}
        <div className="space-y-4" style={{ color: "#725CAD" }}>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-2 rounded-md shadow text-black font-semibold"
            style={{
              backgroundColor: "rgba(114, 92, 173, 0.3)",
              backdropFilter: "blur(4px)",
            }}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>

          {selectedLevel === "Beginner" && (
            <div className="space-y-2">
              <p><strong>Fuel:</strong> {car.fuel}</p>
              <p><strong>Body Type:</strong> {car.body_type}</p>
              <p><strong>Price:</strong> {car.price}</p>
              <p><strong>Use Case:</strong> {car.useCase}</p>
            </div>
          )}

          {selectedLevel === "Intermediate" && (
            <div className="space-y-2">
              <p><strong>Top Speed:</strong> {car.intermediateDetails?.top_speed || "Coming soon"}</p>
              <p><strong>Acceleration:</strong> {car.intermediateDetails?.acceleration || "Coming soon"}</p>
              <p><strong>Transmission:</strong> {car.intermediateDetails?.transmission || "Coming soon"}</p>
            </div>
          )}

          {selectedLevel === "Expert" && (
            <div className="space-y-2">
              <p><strong>Engine Specs:</strong> {car.expertDetails?.engine_specs || "Coming soon"}</p>
              <p><strong>Torque:</strong> {car.expertDetails?.torque || "Coming soon"}</p>
              <p><strong>Technology:</strong> {car.expertDetails?.technology || "Coming soon"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
