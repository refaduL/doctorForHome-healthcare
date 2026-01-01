/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // deep blue
        secondary: "#38BDF8", // sky blue
        accent: "#F59E0B", // amber
        dark: "#0F172A", // near-black
        light: "#F8FAFC", // off-white
        muted: "#94A3B8", // text gray
      },
      backgroundImage: {
        'soft-light': 'linear-gradient(to bottom right, #f7fafc, #eef3f8)',
        'subtle-glow': 'linear-gradient(to bottom right, #f8fafc, #eef3f8)',
      },
      boxShadow: {
        soft: "0 4px 14px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        diag: "32px 0 32px 0",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(0)", opacity: 1 },
          "100%": { transform: "translateY(-20px)", opacity: 0 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out forwards",
        slideDown: "slideDown 0.35s ease-out forwards",
        slideUp: "slideUp 0.3s ease-in forwards",
      },
    },
  },
  plugins: [],
};
