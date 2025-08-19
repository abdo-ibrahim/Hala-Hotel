import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthContainer, AuthCard, Button, FormInput } from "../components/Auth/FormElements";
import { HiLockClosed, HiKey } from "react-icons/hi";

const ResetPassword = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!password) newErrors.password = t("auth.validation.required");
    if (!confirmPassword) newErrors.confirmPassword = t("auth.validation.required");

    if (password && password.length < 8) {
      newErrors.password = t("auth.validation.passwordLength");
    }

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = t("auth.validation.passwordMatch");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      console.log("Reset password attempt", { password, confirmPassword });
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        {isSuccess ? (
          <div className="text-center">
            <div className="mx-auto w-20 h-20 mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">{t("auth.resetPassword.successTitle")}</h2>
            <p className="text-gray-500 mb-8 text-lg">{t("auth.resetPassword.successMessage")}</p>
            <Link to="/login">
              <Button variant="secondary" fullWidth size="lg">
                {t("auth.resetPassword.backToLogin")}
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <HiKey className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-primary mb-2">{t("auth.resetPassword.title")}</h1>
              <p className="text-gray-500">{t("auth.resetPassword.subtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label={t("auth.resetPassword.newPassword")}
                error={errors.password}
                required
                leftElement={<HiLockClosed className="w-5 h-5 text-gray-400" />}
              />

              <FormInput
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label={t("auth.resetPassword.confirmPassword")}
                error={errors.confirmPassword}
                required
                leftElement={<HiLockClosed className="w-5 h-5 text-gray-400" />}
              />

              <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl">
                <p className="text-sm">Your password must be at least 8 characters long and contain a mix of letters, numbers, and special characters.</p>
              </div>

              <Button type="submit" fullWidth disabled={isSubmitting} size="lg">
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-3"></div>
                    {t("auth.resetPassword.resetButton")}
                  </div>
                ) : (
                  t("auth.resetPassword.resetButton")
                )}
              </Button>

              <div className="mt-6 text-center">
                <Link to="/login" className="text-secondary hover:text-secondary-hover font-medium transition-colors duration-200">
                  {t("auth.resetPassword.backToLogin")}
                </Link>
              </div>
            </form>
          </>
        )}
      </AuthCard>
    </AuthContainer>
  );
};

export default ResetPassword;
