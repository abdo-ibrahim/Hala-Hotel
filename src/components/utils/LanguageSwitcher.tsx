import i18n from "../../i18n";
import { TbWorld } from "react-icons/tb";
const LanguageSwitcher = () => {
  const changeLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  return (
    <button className="flex items-center gap-2 cursor-pointer  hover:bg-hover py-2 px-3 rounded-md transition-all">
      <TbWorld />
      <span onClick={changeLanguage} className="text-primary  transition-colors duration-300 font-medium focus:outline-none " aria-label="Change language">
        {i18n.language === "ar" ? "English" : "العربية"}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
