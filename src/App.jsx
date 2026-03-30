import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";

import Booking from "../../store/pages/BookingAppointment";
import About from "./pages/About";
import DoctorDetail from "./pages/DoctorDetail";
import DoctorsList from "./pages/DoctorsList";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import Services from "./pages/Services";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import PatientDashboard from "./pages/dashboard/PatientDashboard";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/booking" element={<AppointmentBooking />} /> */}
          <Route path="/booking" element={<Booking />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />

          <Route
            path="*"
            element={
              <h1 className="text-center mt-20 text-3xl font-bold text-gray-900 dark:text-white">
                404 — Page Not Found
              </h1>
            }
          />
        </Route>

        {/* DASHBOARD ROUTES */}
        <Route element={<DashboardLayout />}>
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
