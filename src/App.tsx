import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import AboutHala from "./pages/AboutHala";
import Careers from "./pages/Careers";
import News from "./pages/News";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Admin from "./pages/Admin";
import ResetPassword from "./pages/ResetPassword";
import LoadingScreen from "./components/utils/LoadingScreen";
import NotFound from "./pages/NotFound";
import Footer from "./components/layout/Footer";

function App() {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;

    // Add loading screen timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [i18n.language]);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      {!isLoading && (
        <>
          <Header />
          <main className="min-h-screen pt-[60px]">
            {" "}
            {/* Updated to match header height */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/about-hala" element={<AboutHala />} />
              <Route path="/about/careers" element={<Careers />} />
              <Route path="/about/news" element={<News />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/admin" element={<Admin />} />
              {/* add 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
