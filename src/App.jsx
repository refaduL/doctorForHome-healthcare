import { Route, Routes } from "react-router-dom";
import "./App.css";

import MainLayout from "./layouts/MainLayout";

import About from "./pages/About";
import Booking from "./pages/Booking";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import Services from "./pages/Services";
import DoctorsList from "./pages/DoctorsList";
import DoctorDetail from "./pages/DoctorDetail";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<DoctorsList />} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />

      </Route>
    </Routes>
  );
}

export default App;
