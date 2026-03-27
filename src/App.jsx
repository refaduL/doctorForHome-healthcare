import { Route, Routes } from "react-router-dom";
import "./App.css";

import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import About from "./pages/About";
import Booking from "./pages/Booking";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import Services from "./pages/Services";
import DoctorsList from "./pages/DoctorsList";
import DoctorDetail from "./pages/DoctorDetail";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
// import AdminDashboard   from "./pages/dashboard/AdminDashboard";    // will code it soon bruh

function App() {
  return (
    <Routes>

       {/* PUBLIC ROUTES: Navbar + Footer */}
      <Route element={<MainLayout />}>
        <Route path="/"               element={<Home />}         />
        <Route path="/about"          element={<About />}        />
        <Route path="/booking"        element={<Booking />}      />
        <Route path="/faq"            element={<FAQ />}          />
        <Route path="/services"       element={<Services />}     />
        <Route path="/doctors"        element={<DoctorsList />}  />
        <Route path="/doctors/:id"    element={<DoctorDetail />} />

        <Route
          path="*"
          element={
            <h1 className="text-center mt-20 text-3xl font-bold text-gray-900 dark:text-white">
              404 — Page Not Found
            </h1>
          }
        />
      </Route>

      {/* DASHBOARD ROUTES:  Sidebar layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/patient/dashboard"  element={<PatientDashboard />} />
        <Route path="/doctor/dashboard"   element={<DoctorDashboard />} />
        {/* <Route path="/admin/dashboard"    element={<AdminDashboard />}  /> */}
      </Route>

    </Routes>
  );
}

export default App;