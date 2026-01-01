import Button from "./customized/Button";

export default function HeroSection() {
  return (
    <section className="bg-subtle-glow px-6 md:px-12 py-16 min-h-screen flex flex-col justify-center">
      
      {/* Section Heading */}
      <div className="max-w-4xl mx-auto pt-6 text-center mb-16 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 tracking-tight leading-tight">
          Your Health. Our Commitment.
        </h1>
        <p className="text-gray-600 mt-4 text-lg md:text-xl">
          Compassionate care with cutting-edge diagnostics — where trust meets technology.
        </p>
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        
        {/* Left box */}
        <div className="bg-secondary/10 backdrop-blur-sm p-8 md:p-12 rounded-tl-[100px] rounded-br-[100px] shadow-md flex flex-col justify-between min-h-[380px] md:min-h-[440px] lg:min-h-[520px]">
          
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary leading-snug">
              CARE.<br />EXCELLENCE.<br />FUTURE.
            </h2>

            <div className="mt-10 flex flex-col sm:flex-row gap-5">
              <Button variant="primary">Book Appointment</Button>
              <Button variant="outline">Book Diagnostic Test</Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-gray-700 text-base md:text-lg">
            <p className="font-medium mb-1 text-muted">Call us at</p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-secondary/10 text-primary font-semibold rounded-full shadow-sm hover:bg-secondary/20 transition">
                +8801 2345 67
              </span>
              <span className="px-4 py-2 bg-secondary/10 text-primary font-semibold rounded-full shadow-sm hover:bg-secondary/20 transition">
                +8801 2345 67
              </span>
            </div>
          </div>
        </div>

        {/* Right box */}
        <div className="relative bg-white/80 rounded-tr-[100px] rounded-bl-[100px] shadow-soft overflow-hidden min-h-[300px] md:min-h-[420px] lg:min-h-[520px]">
          <img
            src="https://images.unsplash.com/photo-1758654859680-b1806c93f422?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1039"
            alt="Healthcare Illustration"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/25 to-transparent"></div>
        </div>

      </div>
    </section>
  );
}
