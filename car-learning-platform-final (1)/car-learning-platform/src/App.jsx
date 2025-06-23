import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import CarDetail from "./pages/CarDetail";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <nav className="bg-gray-900 text-white p-4 flex justify-between">
        <div className="text-xl font-bold">Vroom Vroom</div>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/explore" className="hover:text-blue-400">Explore</Link>
          <Link to="/login" className="hover:text-blue-400">Login</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
