import { useState } from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiUserPlus, FiChevronDown } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { TbWorld } from "react-icons/tb";
import { FaHome, FaInfoCircle, FaTools, FaEnvelope } from "react-icons/fa";
import i18n from "../../i18n";

interface AboutMenuItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
  aboutMenuItems: AboutMenuItem[];
}

const MobileMenu = ({ isOpen, toggleMenu, aboutMenuItems }: MobileMenuProps) => {
  const { t } = useTranslation();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    toggleMenu();
  };

  const mainNavItems = [
    {
      path: "/",
      title: t("header.home"),
      icon: <FaHome className="text-secondary" size={18} />,
    },
    {
      path: "/services",
      title: t("header.services"),
      icon: <FaTools className="text-secondary" size={18} />,
    },
    {
      path: "/contact",
      title: t("header.contact"),
      icon: <FaEnvelope className="text-secondary" size={18} />,
    },
  ];

  return (
    <div
      className={`lg:hidden fixed left-0 top-[60px] w-full z-40 transition-all duration-300
      ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
      <div className="mx-4 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <nav className="pt-4 pb-2">
          <ul className="flex flex-col">
            {/* Main navigation items */}
            {mainNavItems.map((item) => (
              <li key={item.path} onClick={toggleMenu}>
                <Link to={item.path} className="flex items-center gap-3 px-4 py-3 text-primary hover:bg-hover hover:text-secondary transition-colors">
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}

            {/* About dropdown section */}
            <li>
              <button onClick={() => setAboutOpen(!aboutOpen)} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-primary hover:bg-hover hover:text-secondary transition-colors">
                <div className="flex items-center gap-3">
                  <FaInfoCircle className="text-secondary" size={18} />
                  <span>{t("header.about")}</span>
                </div>
                <FiChevronDown className={`transition-transform ${aboutOpen ? "rotate-180" : ""}`} />
              </button>

              {aboutOpen && (
                <div className="bg-gray-50 pl-4">
                  {aboutMenuItems.map((item, index) => (
                    <Link key={index} to={item.path} className="flex items-center gap-3 px-4 py-3 text-primary hover:bg-hover transition-colors" onClick={toggleMenu}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Language switcher dropdown */}
            <li>
              <button onClick={() => setLangOpen(!langOpen)} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-primary hover:bg-hover hover:text-secondary transition-colors">
                <div className="flex items-center gap-3">
                  <TbWorld className="text-secondary" size={18} />
                  <span>{i18n.language === "ar" ? "اللغة" : "Language"}</span>
                </div>
                <FiChevronDown className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>

              {langOpen && (
                <div className="bg-gray-50 pl-4">
                  <button onClick={() => changeLanguage("en")} className="w-full flex items-center gap-3 px-4 py-3 text-primary hover:bg-hover  transition-colors text-left">
                    English
                  </button>
                  <button onClick={() => changeLanguage("ar")} className="w-full flex items-center gap-3 px-4 py-3 text-primary hover:bg-hover  transition-colors text-left">
                    العربية
                  </button>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* Login/Register buttons */}
        <div className="p-4 border-t border-gray-200 grid grid-cols-2 gap-3">
          <Link to="/login" onClick={toggleMenu} className="flex items-center justify-center gap-2 text-primary border border-primary hover:bg-hover py-2 px-3 rounded-md transition-all">
            <FiLogIn />
            {t("header.login")}
          </Link>
          <Link to="/register" onClick={toggleMenu} className="flex items-center justify-center gap-2 text-white bg-secondary hover:bg-secondary-hover p-2 rounded-lg transition">
            <FiUserPlus />
            {t("header.register")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
