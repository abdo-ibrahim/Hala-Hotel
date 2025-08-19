import { useTranslation } from "react-i18next";

const Admin = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-3xl font-bold mb-4">{t("header.admin")}</h1>
      <p className="text-lg">Admin Panel content</p>
    </div>
  );
};

export default Admin;
