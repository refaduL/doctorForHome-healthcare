import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do virtual consultations work?",
      answer: "Simply book an appointment through our platform, and at your scheduled time, connect via secure HD video call with your chosen healthcare provider. You can do this from any device with internet access."
    },
    {
      question: "Is my health data secure and private?",
      answer: "Absolutely. We use military-grade encryption and are fully HIPAA compliant. Your medical records and personal information are protected with the highest security standards in healthcare technology."
    },
    {
      question: "Can I get prescriptions through telemedicine?",
      answer: "Yes! After your consultation, if medication is needed, our doctors can send e-prescriptions directly to your preferred pharmacy. You'll also receive medication reminders through our platform."
    },
    {
      question: "Do you offer home visits for medical care?",
      answer: "Yes, we provide professional home healthcare services with certified nurses and medical staff. You can schedule home visits for routine checkups, sample collection, or ongoing care management."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards, mobile banking, digital wallets, and most health insurance plans. Payment is processed securely through our encrypted payment gateway."
    },
    {
      question: "Is telemedicine available 24/7?",
      answer: "Yes! Our platform provides round-the-clock access to healthcare professionals. Whether it's an urgent concern or a routine consultation, medical support is always available when you need it."
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full mb-6 backdrop-blur-sm">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-semibold tracking-wider uppercase">
              FAQs
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Questions?
            </span>
            <br />
            <span className="text-white">
              We've got answers
            </span>
          </h2>
          
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our telemedicine services.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 transition-opacity duration-500 ${
                openIndex === index ? 'opacity-100' : 'group-hover:opacity-50'
              }`}></div>
              
              {/* FAQ Card */}
              <div className={`relative bg-slate-900/50 backdrop-blur-xl border rounded-2xl transition-all duration-500 ${
                openIndex === index 
                  ? 'border-cyan-500/50 shadow-xl shadow-cyan-500/10' 
                  : 'border-slate-700/50 hover:border-slate-600/80'
              }`}>
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left group/btn"
                >
                  <span className={`font-semibold text-lg pr-8 transition-colors duration-300 ${
                    openIndex === index 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400' 
                      : 'text-white group-hover/btn:text-cyan-400'
                  }`}>
                    {faq.question}
                  </span>
                  
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    openIndex === index
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 rotate-180'
                      : 'bg-slate-800/50 group-hover/btn:bg-slate-700/50'
                  }`}>
                    <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${
                      openIndex === index ? 'text-white' : 'text-slate-400'
                    }`} />
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openIndex === index
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="w-12 h-px bg-gradient-to-r from-cyan-500 to-purple-500 mb-4"></div>
                    <p className="text-slate-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>

                {/* Bottom Accent Line (only when open) */}
                {/* {openIndex === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-b-2xl"></div>
                )} */}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-6">
            Still have questions? We're here to help!
          </p>
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Sparkles className="relative z-10 w-5 h-5 text-cyan-400" />
            <span className="relative z-10">Contact Support</span>
          </button>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
    </section>
  );
};

export default FAQSection;