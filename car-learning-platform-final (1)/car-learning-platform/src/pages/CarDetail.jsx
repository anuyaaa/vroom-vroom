// CarDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import CarModelViewer from "../components/CarModelViewer";
import { Tab } from "@headlessui/react";

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

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

  if (!car) return <p className="p-10">Loading car details...</p>;

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-4">
        {car.brand} {car.model}
      </h2>
      <p className="text-gray-700 text-lg mb-4">{car.useCase}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 3D Viewer */}
        <div className="bg-gray-100 rounded-lg h-[500px]">
          <CarModelViewer modelUrl={car.modelUrl} />
        </div>

        {/* Tabbed Car Info */}
        <div className="space-y-4 text-gray-800">
          <Tab.Group>
            <Tab.List className="flex space-x-4 border-b mb-4">
              {["Beginner", "Intermediate", "Expert"].map((tab, i) => (
                <Tab
                  key={i}
                  className={({ selected }) =>
                    selected
                      ? "border-b-2 border-blue-600 font-bold text-blue-700 px-4 py-2"
                      : "text-gray-500 px-4 py-2"
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels className="space-y-4">
              {/* Beginner Tab */}
              <Tab.Panel>
                <p><strong>Fuel:</strong> {car.fuel}</p>
                <p><strong>Body Type:</strong> {car.body_type}</p>
                <p><strong>Price:</strong> {car.price}</p>
                <p><strong>Use Case:</strong> {car.useCase}</p>
              </Tab.Panel>

              {/* Intermediate Tab */}
              <Tab.Panel>
                <p><strong>Top Speed:</strong> {car.intermediateDetails?.top_speed || "Coming soon"}</p>
                <p><strong>Acceleration:</strong> {car.intermediateDetails?.acceleration || "Coming soon"}</p>
                <p><strong>Transmission:</strong> {car.intermediateDetails?.transmission || "Coming soon"}</p>
              </Tab.Panel>

              {/* Expert Tab */}
              <Tab.Panel>
                <p><strong>Engine Specs:</strong> {car.expertDetails?.engine_specs || "Coming soon"}</p>
                <p><strong>Torque:</strong> {car.expertDetails?.torque || "Coming soon"}</p>
                <p><strong>Technology:</strong> {car.expertDetails?.technology || "Coming soon"}</p>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
