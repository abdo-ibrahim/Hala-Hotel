import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthContainer, AuthCard, Button, FormInput, Divider } from "../components/Auth/FormElements";
import { FcGoogle } from "react-icons/fc";
import { HiMail, HiLockClosed } from "react-icons/hi";

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) newErrors.email = t("auth.validation.required");
    if (!password) newErrors.password = t("auth.validation.required");

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("auth.validation.invalidEmail");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      console.log("Login attempt", { email, password });
      setTimeout(() => {
        setIsSubmitting(false);
        // Handle successful login, e.g., redirect or show success message
      }, 1500);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <HiLockClosed className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">{t("auth.login.title")}</h1>
          <p className="text-gray-500">{t("auth.login.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} label={t("auth.login.email")} error={errors.email} required leftElement={<HiMail className="w-5 h-5 text-gray-400" />} />

          <FormInput type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} label={t("auth.login.password")} error={errors.password} required leftElement={<HiLockClosed className="w-5 h-5 text-gray-400" />} />

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-secondary hover:text-secondary-hover text-sm font-medium transition-colors duration-200">
              {t("auth.login.forgotPassword")}
            </Link>
          </div>

          <Button type="submit" fullWidth disabled={isSubmitting} size="lg">
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-3"></div>
                {t("auth.login.loginButton")}
              </div>
            ) : (
              t("auth.login.loginButton")
            )}
          </Button>
        </form>

        <Divider text={t("auth.login.or")} />

        <Button variant="outline" fullWidth size="lg" className="flex items-center justify-center gap-3" onClick={() => console.log("Google login clicked")}>
          <FcGoogle size={24} />
          {t("auth.login.googleLogin")}
        </Button>

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            {t("auth.login.noAccount")}{" "}
            <Link to="/register" className="text-secondary hover:text-secondary-hover font-semibold transition-colors duration-200">
              {t("auth.login.signUp")}
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthContainer>
  );
};

export default Login;
