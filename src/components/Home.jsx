
import Navbar from "./header/Navbar";
import Hero from "./sections/Hero";
import AboutUs from "./sections/AboutUs";

const Home = () => {
  return (
    <div className="min-h-screen bg-light text-dark">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main>
        <Hero />
        <AboutUs />
      </main>

      {/* Footer (optional placeholder for now) */}
      <footer className="bg-dark text-light text-center py-6 mt-10 rounded-t-diag">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Hospique. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
