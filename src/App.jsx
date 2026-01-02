import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/header/Navbar";
import HeroSection from "./components/NewHome";
import AboutUs from "./components/sections/AboutUs";
import BookingAppointment from "./components/sections/BookingAppointment";
import FAQSection from "./components/sections/FAQSection";
import FeatureSection from "./components/sections/FeatureSection";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutUs />
      <FeatureSection />
      <BookingAppointment />
      <FAQSection />
      <Footer />
    </>
  );
}

export default App;
