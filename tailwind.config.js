/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true, // هذا سيجعل جميع فئات Tailwind تستخدم !important
  theme: {
    extend: {
      colors: {
        primary: "#1e3a5f",
        "dark-primary": "#0a2540",
        background: "#f9fafb",
        highlight: "#d4af37",
        secondary: "#40e0d0",
        "secondary-hover": "#30b8ac",
      },
    },
  },
  corePlugins: {
    preflight: true, // يضمن تطبيق إعادة ضبط CSS الأساسي لـ Tailwind
  },
  plugins: [],
};
