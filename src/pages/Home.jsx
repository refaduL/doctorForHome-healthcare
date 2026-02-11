import AboutSection from "../components/sections/AboutSection";
import BookingAppointment from "../components/sections/AppointmentBookingForm";
import FAQSection from "../components/sections/FAQSection";
import FeatureSection from "../components/sections/FeaturesSection";
import HeroSection from "../components/sections/HeroSection";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <FeatureSection />
      <BookingAppointment />
      <FAQSection />
    </main>
  );
};

export default Home;
