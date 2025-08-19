import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HiPlay, HiX } from "react-icons/hi";

const PromoSection = () => {
  const { t } = useTranslation();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const features = t("home.promo.features", { returnObjects: true }) as string[];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                {t("home.promo.title")}
              </h2>
              <h3 className="text-2xl md:text-3xl font-semibold text-secondary mb-6">
                {t("home.promo.subtitle")}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("home.promo.description")}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Video Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              onClick={() => setIsVideoOpen(true)}
              className="group inline-flex items-center space-x-3 bg-gradient-to-r from-primary to-dark-primary text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <HiPlay className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">{t("home.promo.watchVideo")}</span>
            </motion.button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Luxury Hotel Room"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="group w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
                >
                  <HiPlay className="w-8 h-8 text-primary ml-1 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
            >
              <HiX className="w-6 h-6" />
            </button>
            
            {/* Video Placeholder - Replace with actual video */}
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <HiPlay className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg opacity-75">Video Player Placeholder</p>
                <p className="text-sm opacity-50 mt-2">Replace with actual video component</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default PromoSection;
