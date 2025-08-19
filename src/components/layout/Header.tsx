import { Link } from "react-router-dom";
import { FiLogIn, FiUserPlus, FiChevronDown } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import MobileMenu from "./MobileMenu";
import { TbMenu2, TbWorld } from "react-icons/tb";
import { FaBook, FaBriefcase, FaNewspaper } from "react-icons/fa";
import i18n from "../../i18n";
import "./header.css";

const Header = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const aboutRef = useRef<HTMLLIElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Toggle mobile menu
  const toggleMenu = () => setOpen(!open);

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutDropdown(false);
      }

      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Change language handler
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLangDropdown(false);
  };

  // About menu items with icons
  const aboutMenuItems = [
    {
      title: t("header.aboutHala", "Our Story"),
      icon: <FaBook className="text-secondary" size={16} />,
      path: "/about/about-hala",
    },
    {
      title: t("header.careers", "Careers"),
      icon: <FaBriefcase className="text-secondary" size={16} />,
      path: "/about/careers",
    },
    {
      title: t("header.news", "News"),
      icon: <FaNewspaper className="text-secondary" size={16} />,
      path: "/about/news",
    },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white ${scrolled ? "shadow-md" : ""}`}>
      <div className=" text-white">
        <div className="container mx-auto flex items-center justify-between min-h-[70px] px-4">
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl text-primary">
            Hala
          </Link>

          {/* Mobile Menu Controls */}
          <div className="flex items-center lg:hidden gap-3">
            <button className="text-3xl text-primary" onClick={toggleMenu}>
              {open ? <CgClose /> : <TbMenu2 />}
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center justify-between flex-1">
            {/* Main Navigation */}
            <nav className="flex-1 flex justify-center">
              <ul className="flex gap-2 text-md font-medium">
                <li className="hover:bg-hover py-2 px-3 rounded-md transition-all">
                  <Link to="/" className="text-primary">
                    {t("header.home")}
                  </Link>
                </li>

                {/* About dropdown menu */}
                <li className="relative" ref={aboutRef}>
                  <button onClick={() => setAboutDropdown(!aboutDropdown)} className="flex items-center gap-1 hover:bg-hover py-2 px-3 rounded-md transition-all text-primary cursor-pointer">
                    {t("header.about")}
                    <FiChevronDown className={`ml-1 transition-transform ${aboutDropdown ? "rotate-180" : ""}`} />
                  </button>

                  {aboutDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-52 text-primary rounded-xl shadow-lg overflow-hidden z-50 transition-all cursor-pointer bg-white">
                      {aboutMenuItems.map((item, index) => (
                        <Link key={index} to={item.path} className="flex items-center gap-3 px-4 py-3 hover:bg-hover transition-colors" onClick={() => setAboutDropdown(false)}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </li>

                <li className="hover:bg-hover py-2 px-3 rounded-md transition-all">
                  <Link to="/services" className="text-primary">
                    {t("header.services")}
                  </Link>
                </li>

                <li className="hover:bg-hover py-2 px-3 rounded-md transition-all">
                  <Link to="/contact" className="text-primary">
                    {t("header.contact")}
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Right aligned controls */}
            <div className="flex items-center justify-end gap-3">
              {/* Language Switcher dropdown */}
              <div className="relative" ref={langRef}>
                <button onClick={() => setLangDropdown(!langDropdown)} className="flex items-center gap-1 hover:bg-hover py-2 px-3 rounded-md transition-all text-primary cursor-pointer">
                  <TbWorld size={18} />
                  <span className="mr-1">{i18n.language === "ar" ? "اللغة" : "Language"}</span>
                  <FiChevronDown className={`transition-transform ${langDropdown ? "rotate-180" : ""}`} />
                </button>

                {langDropdown && (
                  <div className="absolute top-full right-0 mt-1 w-36 bg-white text-primary rounded-xl shadow-lg overflow-hidden z-50 cursor-pointer">
                    <button onClick={() => changeLanguage("en")} className="flex items-center w-full px-4 py-3 text-left hover:bg-hover transition-colors primary cursor-pointer">
                      English
                    </button>
                    <button onClick={() => changeLanguage("ar")} className="flex items-center w-full px-4 py-3 text-left hover:bg-hover transition-colors cursor-pointer">
                      العربية
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Link to="/login" className="flex items-center gap-1 hover:bg-hover py-2 px-3 rounded-md transition-all text-primary">
                  <FiLogIn />
                  {t("header.login")}
                </Link>
                <Link to="/register" className="flex items-center gap-1 text-white bg-secondary hover:bg-secondary-hover px-4 py-2 rounded-lg transition">
                  <FiUserPlus />
                  {t("header.register")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={open} toggleMenu={toggleMenu} aboutMenuItems={aboutMenuItems} />
    </header>
  );
};

export default Header;
