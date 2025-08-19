import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 pt-20 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">{t("notFound.title", "Page Not Found")}</h2>
      <p className="text-gray-600 mb-8 max-w-md">{t("notFound.message", "We're sorry, the page you requested could not be found. Please check the URL or navigate back to the homepage.")}</p>
      <Link to="/" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
        {t("notFound.backHome", "Back to Homepage")}
      </Link>
    </div>
  );
};

export default NotFound;
