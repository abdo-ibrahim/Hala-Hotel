import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthContainer, AuthCard, Button, FormInput } from "../components/Auth/FormElements";
import { HiMail, HiQuestionMarkCircle } from "react-icons/hi";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) newErrors.email = t("auth.validation.required");

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
      console.log("Forgot password request for:", email);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <HiQuestionMarkCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">{t("auth.forgotPassword.title")}</h1>
          <p className="text-gray-500">{t("auth.forgotPassword.subtitle")}</p>
        </div>

        {isSubmitted ? (
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-primary mb-4">Check your email</h2>
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl mb-6">
              <p className="text-sm">{t("auth.forgotPassword.instructions")}</p>
            </div>
            <p className="mb-6 text-gray-600">
              We've sent a reset link to: <br />
              <span className="font-semibold text-primary">{email}</span>
            </p>
            <Link to="/login">
              <Button variant="secondary" fullWidth size="lg">
                {t("auth.forgotPassword.backToLogin")}
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} label={t("auth.forgotPassword.email")} error={errors.email} required leftElement={<HiMail className="w-5 h-5 text-gray-400" />} />

            <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl">
              <p className="text-sm">{t("auth.forgotPassword.instructions")}</p>
            </div>

            <Button type="submit" fullWidth disabled={isSubmitting} size="lg">
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-3"></div>
                  {t("auth.forgotPassword.sendButton")}
                </div>
              ) : (
                t("auth.forgotPassword.sendButton")
              )}
            </Button>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-secondary hover:text-secondary-hover font-medium transition-colors duration-200">
                {t("auth.forgotPassword.backToLogin")}
              </Link>
            </div>
          </form>
        )}
      </AuthCard>
    </AuthContainer>
  );
};

export default ForgotPassword;
