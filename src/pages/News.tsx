import { useTranslation } from "react-i18next";

const News = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-3xl font-bold mb-4">{t("header.news")}</h1>
      <p className="text-lg">News page content</p>
    </div>
  );
};

export default News;
