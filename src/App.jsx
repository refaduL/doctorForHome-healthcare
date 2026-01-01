import "./App.css";
import Navbar from "./components/header/Navbar";
import Home from "./components/Home";
import HeroSection from "./components/NewHome";
import AboutUs from "./components/sections/AboutUs";
import BookDiagnosticTestForm from "./components/sections/BookDiagnosticTestForm";
import FAQSection from "./components/sections/FAQSection";
import FeatureSection from "./components/sections/FeatureSection";

function App() {
  return (
    <>
      {/* <Navbar />
      <Home />
      <AboutUs /> */}
      <Navbar />
      <HeroSection /> 
      <AboutUs />
      <FeatureSection />
      <BookDiagnosticTestForm />
      <FAQSection />
    </>
  );
}

export default App;
