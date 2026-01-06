import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/header/NewNavbar";
import AboutUs from "./components/sections/AboutUs";
import BookingAppointment from "./components/sections/BookingAppointment";
import FAQSection from "./components/sections/FAQSection";
import FeatureSection from "./components/sections/FeaturesSection";
import HeroSection from "./components/sections/HeroSection";

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
