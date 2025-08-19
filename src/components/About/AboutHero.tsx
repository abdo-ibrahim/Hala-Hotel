import { useTranslation } from "react-i18next";

const AboutHero = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-100 py-12 pt-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">{t("header.about")}</h1>
      </div>
    </div>
  );
};

export default AboutHero;
