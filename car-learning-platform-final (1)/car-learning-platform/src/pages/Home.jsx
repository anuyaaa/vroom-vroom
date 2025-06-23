import { Link } from "react-router-dom";
import heroImage from "../assets/sc18-hero.jpg"; // Make sure you save the uploaded image as sc18-hero.png in /src/assets

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Hero Section */}
      <div
        className="relative h-[80vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 text-center p-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-pulse">
            Welcome to Car Learn 🚗
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Your journey from car enthusiast to automotive expert starts here.
          </p>
          <Link
            to="/explore"
            className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full text-lg font-semibold transition"
          >
            Explore Cars →
          </Link>
        </div>
      </div>

      {/* Learning Levels Section */}
      <div className="p-10 text-center">
        <h2 className="text-3xl font-bold mb-6">Choose Your Learning Level</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              level: "Basic",
              desc: "Get introduced to car specs, body types, and basic terms.",
            },
            {
              level: "Intermediate",
              desc: "Understand performance metrics, acceleration, and transmission.",
            },
            {
              level: "Expert",
              desc: "Dive into engine specs, torque, aerodynamics, and innovations.",
            },
          ].map(({ level, desc }) => (
            <div
              key={level}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition"
            >
              <h3 className="text-2xl font-bold mb-2">{level}</h3>
              <p className="text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
