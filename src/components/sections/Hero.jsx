import Button from "../customized/Button";
import Card from "../customized/Card";

const Hero = () => {
  return (
    <section className="pt-24 md:pt-32 px-6 md:px-16 bg-gradient-to-br from-light via-white to-secondary/10 min-h-[90vh] flex flex-col md:flex-row items-center justify-center gap-10">
      
      {/* Left Text Card */}
      <Card className="flex flex-col justify-center w-full md:w-1/2 p-10 bg-secondary backdrop-blur-md">
        <h1 className="text-5xl md:text-6xl font-extrabold text-dark leading-tight mb-6">
          CARE. <br /> EXCELLENCE. <br /> FUTURE.
        </h1>
        <p className="text-muted mb-8">
          Advanced healthcare that combines compassion and technology for a healthier tomorrow.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Book Appointment</Button>
          <Button variant="outline">Book Diagnostic Test</Button>
        </div>
      </Card>

      {/* Right Image Card */}
      <Card className="w-full md:w-1/2 flex justify-center items-center bg-light/70 backdrop-blur-md">
        <img
          src="https://images.unsplash.com/photo-1758654859680-b1806c93f422?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1039"
          alt="Healthcare illustration"
          className="max-w-sm md:max-w-md object-contain"
        />
      </Card>
    </section>
  );
};

export default Hero;
