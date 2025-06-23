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
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Explore Cars</h2>

      {cars.length === 0 ? (
        <p className="text-gray-500">Loading cars...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {cars.map((car) => (
            <Link
              key={car.id}
              to={`/car/${car.id}`}
              className="bg-white rounded-lg shadow hover:shadow-lg p-5 transition"
            >
              <h3 className="text-xl font-bold text-gray-800">{car.brand} {car.model}</h3>
              <p className="text-sm text-gray-600">{car.useCase}</p>
              <p className="text-xs text-gray-400 mt-1">{car.fuel} • {car.body_type}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
