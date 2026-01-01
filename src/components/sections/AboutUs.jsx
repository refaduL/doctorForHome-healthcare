import { FaHandsHelping, FaHeartbeat, FaUserMd } from "react-icons/fa";
import Button from "../customized/Button";
import Card from "../customized/Card";

const AboutUs = () => {
  const features = [
    {
      icon: <FaUserMd className="text-4xl text-white" />,
      title: "Experienced Care Team",
      desc: "Our caregivers combine expertise with compassion, ensuring every patient feels valued and safe.",
    },
    {
      icon: <FaHeartbeat className="text-4xl text-white" />,
      title: "Personalized Care Plans",
      desc: "We tailor every care plan to match each patient’s medical and emotional needs.",
    },
    {
      icon: <FaHandsHelping className="text-4xl text-white" />,
      title: "Holistic Well-Being",
      desc: "From nutrition to emotional support, we promote all-round well-being.",
    },
    {
      icon: <FaHeartbeat className="text-4xl text-white" />,
      title: "Safe & Comfortable Environment",
      desc: "Clean, calm, and technologically advanced facilities for your peace of mind.",
    },
  ];

  return (
    <section className="bg-soft-light">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        {/* Section Title */}
        <h3 className="text-md font-semibold uppercase tracking-wider text-muted mb-2">
          [Who We Are]
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Care that respects, comforts, and supports
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
          We believe in more than treatment — we deliver comfort, confidence,
          and care that truly matters.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <Card
              key={i}
              className="relative flex flex-col items-center text-center px-6 py-12 bg-white rounded-2xl border border-gray-200
                       transition-all duration-300 hover:border-blue-300 hover:shadow-sm hover:-translate-y-1"
            >
              {/* Icon Top */}
              <div
                className="w-16 h-16 flex items-center justify-center bg-blue-500 rounded-full shadow-md mb-6
                            transition-colors duration-300 hover:bg-blue-600"
              >
                {f.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>

        {/* Button */}
        <div className="mt-16">
          <Button variant="outline" className="px-16 text-xl md:text-2xl">Know More</Button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
