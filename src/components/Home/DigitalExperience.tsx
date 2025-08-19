import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
  HiCalendar, 
  HiLogin, 
  HiEye, 
  HiSupport,
  HiDeviceMobile,
  HiClock,
  HiShieldCheck,
  HiStar
} from "react-icons/hi";

const DigitalExperience = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: HiCalendar,
      titleKey: "booking.title",
      descriptionKey: "booking.description",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: HiLogin,
      titleKey: "checkin.title", 
      descriptionKey: "checkin.description",
      color: "from-green-500 to-green-600"
    },
    {
      icon: HiEye,
      titleKey: "trips.title",
      descriptionKey: "trips.description", 
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: HiSupport,
      titleKey: "support.title",
      descriptionKey: "support.description",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const benefits = [
    { icon: HiDeviceMobile, text: "Mobile-First Design" },
    { icon: HiClock, text: "24/7 Availability" },
    { icon: HiShieldCheck, text: "Secure & Reliable" },
    { icon: HiStar, text: "Premium Experience" }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {t("home.digital.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t("home.digital.subtitle")}
          </p>
          <p className="text-lg text-gray-500 max-w-4xl mx-auto">
            {t("home.digital.description")}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-primary mb-4">
                    {t(`home.digital.features.${feature.titleKey}`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`home.digital.features.${feature.descriptionKey}`)}
                  </p>

                  {/* Hover Arrow */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center text-secondary font-medium">
                      <span className="text-sm">Learn more</span>
                      <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h3 className="text-3xl font-bold text-primary mb-6">
                Why Choose Our Digital Platform?
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Experience the future of hospitality with our cutting-edge digital platform designed to make your stay seamless and memorable.
              </p>

              {/* Benefits List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-secondary to-secondary-hover rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-gray-700">{benefit.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Image/Illustration */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Digital Experience"
                  className="w-full h-80 lg:h-96 object-cover"
                />
                
                {/* Overlay with App Icons */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-8">
                  <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <HiDeviceMobile className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <HiCalendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <HiSupport className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalExperience;
