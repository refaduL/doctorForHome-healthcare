import Button from "../customized/Button";

const BookDiagnosticTestForm = () => {
  return (
    <section className="bg-gradient-to-br from-[#f8fafc] to-[#eef3f8] rounded-3xl">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        {/* Title */}
        <h3 className="text-md uppercase font-semibold tracking-wider text-muted mb-2 text-center">
          [Booking]
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
          Book a Diagnostic Test
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Fill out the form below and our team will get back to you to confirm
          your booking.
        </p>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+880 1234 567890"
              className="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition"
            />
          </div>

          {/* Test Type */}
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-medium">Test Type</label>
            <select className="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition">
              <option>Select a test</option>
              <option>Blood Test</option>
              <option>COVID-19 Test</option>
              <option>Full Body Checkup</option>
              <option>Other</option>
            </select>
          </div>

          {/* Preferred Date */}
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-medium">
              Preferred Date
            </label>
            <input
              type="date"
              className="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 text-gray-700 font-medium">
              Additional Notes
            </label>
            <textarea
              placeholder="Any specific requirements..."
              className="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition resize-none"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center mt-4">
            <Button
              variant="outline"
              className="px-16 text-xl md:text-2xl"
            >
              Book Test
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookDiagnosticTestForm;
