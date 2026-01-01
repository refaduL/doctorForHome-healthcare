import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We provide personalized health checkups, diagnostic tests, and home healthcare support tailored to your needs.",
  },
  {
    question: "How can I book an appointment?",
    answer: "You can book directly through our website using the 'Book Test' button or by contacting our support team.",
  },
  {
    question: "Do you provide home sample collection?",
    answer: "Yes, our team can collect samples from your home at your preferred time slot.",
  },
  {
    question: "Is online payment available?",
    answer: "Absolutely. We support all major payment methods, including mobile banking and debit/credit cards.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl md:max-w-4xl mx-auto my-20 px-6">
        <h3 className="text-center text-md uppercase font-semibold tracking-wider text-muted mb-2">
          [FAQs]
        </h3>
      <h2 className="text-4xl font-bold text-center mb-10 text-primary">Answer To Your Questions</h2>
      <div className="space-y-5">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-md rounded-diag hover:bg-secondary/10 transition-all duration-500"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-6 text-left font-semibold text-lg text-gray-800"
            >
              {faq.question}
              <FaChevronDown
                className={`text-base transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180 text-primary" : "text-gray-400"
                }`}
              />
            </button>
            <div
              className={`px-6 text-gray-600 leading-relaxed transition-all duration-500 ${
                openIndex === index
                  ? "max-h-40 opacity-100 pb-5"
                  : "max-h-0 opacity-0 pb-0"
              } overflow-hidden`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
