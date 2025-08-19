import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMail } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { useAdminSettings } from "../../hooks/useAdminSettings";
import { navLinks } from "../../data/navigation";

interface FooterProps {
  // Optional props to override admin settings
  hasTermsAndConditions?: boolean;
  hasPrivacyPolicy?: boolean;
}

const Footer = ({ hasTermsAndConditions, hasPrivacyPolicy }: FooterProps) => {
  const { t, i18n } = useTranslation();
  const { settings, loading } = useAdminSettings();
  const isRTL = i18n.language === "ar";
  const currentYear = new Date().getFullYear();

  // Use admin settings or fallback to props
  const showTerms = hasTermsAndConditions ?? settings.hasTermsAndConditions;
  const showPrivacy = hasPrivacyPolicy ?? settings.hasPrivacyPolicy;

  // Don't render footer if still loading
  if (loading) {
    return (
      <footer className="bg-primary py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-white/20 rounded w-1/4 mx-auto"></div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Contact Column */}
          <motion.div initial={{ opacity: 0, x: isRTL ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }} className={`${isRTL ? "md:order-3" : "md:order-1"}`}>
            {/* Logo */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-4">Halla</h2>
              <p className="text-gray-300 leading-relaxed">{t("footer.logo.description")}</p>
            </div>

            {/* Contact Links */}
            <div className="flex !space-x-4 !rtl:space-x-reverse">
              <motion.a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
                title={t("footer.social.whatsapp")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <FaWhatsapp className="w-6 h-6 text-white group-hover:text-green-400 transition-colors duration-300" />
              </motion.a>

              <motion.a
                href={`mailto:${settings.contactEmail}`}
                className="group p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
                title={t("footer.social.email")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <HiMail className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors duration-300" />
              </motion.a>
            </div>
          </motion.div>

          {/* Navigation Links Column */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="md:order-2">
            <h3 className="text-xl font-semibold text-white mb-6">{t("footer.navigation.title")}</h3>
            <div className="space-y-3">
              {navLinks.map((link, index) => (
                <motion.div key={link.path} initial={{ opacity: 0, x: isRTL ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }} viewport={{ once: true }}>
                  <Link to={link.path} className="group inline-block text-gray-300 hover:text-white transition-colors duration-300">
                    <span className="relative">
                      {t(link.translationKey)}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Legal Links Column */}
          <motion.div initial={{ opacity: 0, x: isRTL ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} className={`${isRTL ? "md:order-1" : "md:order-3"}`}>
            <h3 className="text-xl font-semibold text-white mb-6">{t("footer.legal.title")}</h3>
            <div className="space-y-3">
              {/* Terms and Conditions Link */}
              {showTerms && (
                <motion.div initial={{ opacity: 0, x: isRTL ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }}>
                  <Link to="/terms" className="group inline-block text-gray-300 hover:text-white transition-colors duration-300">
                    <span className="relative">
                      {t("footer.legal.terms")}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </motion.div>
              )}

              {/* Privacy Policy Link */}
              {showPrivacy && (
                <motion.div initial={{ opacity: 0, x: isRTL ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }} viewport={{ once: true }}>
                  <Link to="/privacy" className="group inline-block text-gray-300 hover:text-white transition-colors duration-300">
                    <span className="relative">
                      {t("footer.legal.privacy")}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom Row */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} viewport={{ once: true }} className="mt-12 pt-8 border-t border-white/20">
          <div className="text-center">
            <p className="text-gray-300">
              &copy; {currentYear} Hala {t("footer.copyright")}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
