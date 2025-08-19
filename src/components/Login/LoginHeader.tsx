import { useTranslation } from "react-i18next";

const LoginHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-6 mt-16">
      <h1 className="text-3xl font-bold mb-2">{t("login.welcomeBack")}</h1>
      <p className="text-lg">{t("login.signInPrompt")}</p>
    </div>
  );
};

export default LoginHeader;
