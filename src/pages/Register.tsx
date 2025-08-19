import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthContainer, AuthCard, Button, FormInput, Checkbox, CountryCodeSelector } from "../components/Auth/FormElements";
import { HiMail, HiLockClosed, HiUser, HiPhone, HiCalendar, HiUserAdd } from "react-icons/hi";

const Register = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+1",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.firstName) newErrors.firstName = t("auth.validation.required");
    if (!formData.lastName) newErrors.lastName = t("auth.validation.required");
    if (!formData.email) newErrors.email = t("auth.validation.required");
    if (!formData.password) newErrors.password = t("auth.validation.required");
    if (!formData.confirmPassword) newErrors.confirmPassword = t("auth.validation.required");
    if (!formData.phoneNumber) newErrors.phoneNumber = t("auth.validation.required");
    if (!formData.dateOfBirth) newErrors.dateOfBirth = t("auth.validation.required");
    if (!formData.agreeTerms) newErrors.agreeTerms = t("auth.validation.termsRequired");

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("auth.validation.invalidEmail");
    }

    // Password validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = t("auth.validation.passwordLength");
    }

    // Confirm password
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("auth.validation.passwordMatch");
    }

    // Phone validation (basic)
    if (formData.phoneNumber && !/^\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = t("auth.validation.invalidPhone");
    }

    // Age validation (must be at least 13 years old)
    if (formData.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 13) {
        newErrors.dateOfBirth = "You must be at least 13 years old to register";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCountryCodeChange = (code: string) => {
    setFormData((prev) => ({
      ...prev,
      countryCode: code,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Here you would typically send the data to your API
      console.log("Form submitted:", { ...formData, fullPhoneNumber: formData.countryCode + formData.phoneNumber });
      setTimeout(() => {
        setIsSubmitting(false);
        // Handle successful registration, e.g., redirect or show success message
      }, 1500);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <HiUserAdd className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">{t("auth.register.title")}</h1>
          <p className="text-gray-500">{t("auth.register.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput type="text" id="firstName" value={formData.firstName} onChange={handleChange} label={t("auth.register.firstName")} error={errors.firstName} required leftElement={<HiUser className="w-5 h-5 text-gray-400" />} />

            <FormInput type="text" id="lastName" value={formData.lastName} onChange={handleChange} label={t("auth.register.lastName")} error={errors.lastName} required leftElement={<HiUser className="w-5 h-5 text-gray-400" />} />
          </div>

          <FormInput type="email" id="email" value={formData.email} onChange={handleChange} label={t("auth.register.email")} error={errors.email} required leftElement={<HiMail className="w-5 h-5 text-gray-400" />} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <CountryCodeSelector selectedCode={formData.countryCode} onCodeChange={handleCountryCodeChange} error={errors.countryCode} />
            </div>
            <div className="sm:col-span-2">
              <FormInput type="tel" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} label={t("auth.register.phone")} error={errors.phoneNumber} required leftElement={<HiPhone className="w-5 h-5 text-gray-400" />} />
            </div>
          </div>

          <FormInput type="date" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} label={t("auth.register.dateOfBirth")} error={errors.dateOfBirth} required leftElement={<HiCalendar className="w-5 h-5 text-gray-400" />} />

          <FormInput type="password" id="password" value={formData.password} onChange={handleChange} label={t("auth.register.password")} error={errors.password} required leftElement={<HiLockClosed className="w-5 h-5 text-gray-400" />} />

          <FormInput
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            label={t("auth.register.confirmPassword")}
            error={errors.confirmPassword}
            required
            leftElement={<HiLockClosed className="w-5 h-5 text-gray-400" />}
          />

          <Checkbox
            id="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            label={
              <span>
                I agree to the{" "}
                <Link to="/terms" className="text-secondary hover:text-secondary-hover font-medium">
                  Terms and Conditions
                </Link>
              </span>
            }
            error={errors.agreeTerms}
          />

          <Button type="submit" fullWidth disabled={isSubmitting} size="lg">
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-3"></div>
                {t("auth.register.registerButton")}
              </div>
            ) : (
              t("auth.register.registerButton")
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            {t("auth.register.haveAccount")}{" "}
            <Link to="/login" className="text-secondary hover:text-secondary-hover font-semibold transition-colors duration-200">
              {t("auth.register.signIn")}
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthContainer>
  );
};

export default Register;
