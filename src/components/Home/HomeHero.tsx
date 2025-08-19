import { useTranslation } from "react-i18next";

const HomeHero = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-blue-100 py-16 pt-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{t("header.home")}</h1>
        <p className="text-xl">Welcome to Hala Events - Your Premier Event Planning Service</p>
      </div>
    </div>
  );
};

export default HomeHero;
