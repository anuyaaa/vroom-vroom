import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Explore() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const querySnapshot = await getDocs(collection(db, "cars"));
      const carData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCars(carData);
    };

    fetchCars();
  }, []);

  return (
    <div className="p-10 min-h-screen" style={{ backgroundColor: "#0A0A23" }}>
      <h2 className="text-3xl font-bold mb-6" style={{ color: "#725CAD" }}>
        Explore Cars
      </h2>

      {cars.length === 0 ? (
        <p className="text-gray-300">Loading cars...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {cars.map((car) => (
            <Link
              key={car.id}
              to={`/car/${car.id}`}
              className="rounded-lg shadow-md hover:shadow-xl p-5 transition duration-300 transform hover:scale-105"
              style={{
                backgroundColor: "rgba(114, 92, 173, 0.8)", // 80% opacity of #725CAD
                backdropFilter: "blur(4px)"
              }}
            >
              <h3 className="text-xl font-bold" style={{ color: "#000000" }}>
                {car.brand} {car.model}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
