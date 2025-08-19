import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt", { email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2">{t("login.email")}</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block mb-2">{t("login.password")}</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <Link to="/forgot-password" className="text-blue-500">
          Forgot Password?
        </Link>
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        {t("login.loginButton")}
      </button>

      <p className="mt-4 text-center">
        {t("login.noAccount")}{" "}
        <Link to="/register" className="text-blue-500">
          {t("login.signUp")}
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
