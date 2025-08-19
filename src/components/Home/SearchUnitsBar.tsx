import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HiUsers, HiSearch } from "react-icons/hi";
import DatePicker from "./DatePicker";
import DateRangeSelector from "./DateRangeSelector";

const SearchUnitsBar = () => {
  const { t } = useTranslation();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [useRangeSelector, setUseRangeSelector] = useState(true); // Toggle between date picker types

  const handleSearch = () => {
    const searchData = {
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guests,
    };
    console.log("Search data:", searchData);
    // Here you would typically filter units based on the search criteria
  };

  const incrementGuests = () => {
    setGuests((prev) => Math.min(prev + 1, 10));
  };

  const decrementGuests = () => {
    setGuests((prev) => Math.max(prev - 1, 1));
  };

  // Get today's date for minimum date validation
  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="relative -mt-20 z-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {/* Date Picker Mode Toggle */}
          <div className="flex justify-end mb-4">
            <button onClick={() => setUseRangeSelector(!useRangeSelector)} className="text-sm text-gray-500 hover:text-secondary transition-colors duration-200 flex items-center space-x-2">
              <span>{useRangeSelector ? "Use separate pickers" : "Use date range"}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            {/* Date Selection - Toggle between individual pickers and range selector */}
            {useRangeSelector ? (
              <DateRangeSelector
                checkInLabel={t("home.search.checkIn")}
                checkOutLabel={t("home.search.checkOut")}
                checkInValue={checkInDate}
                checkOutValue={checkOutDate}
                onCheckInChange={setCheckInDate}
                onCheckOutChange={setCheckOutDate}
                placeholder="Select your stay dates"
              />
            ) : (
              <>
                {/* Check-in Date */}
                <DatePicker label={t("home.search.checkIn")} value={checkInDate} onChange={setCheckInDate} placeholder="Select check-in date" minDate={today} />

                {/* Check-out Date */}
                <DatePicker label={t("home.search.checkOut")} value={checkOutDate} onChange={setCheckOutDate} placeholder="Select check-out date" minDate={checkInDate || today} />
              </>
            )}

            {/* Guests */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">{t("home.search.guestsLabel")}</label>
                <div className="relative">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-secondary transition-colors duration-200">
                  <div className="pl-3 pr-1 flex items-center">
                  <HiUsers className="w-5 h-5 text-gray-400" />
                  </div>
                  <button type="button" onClick={decrementGuests} className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                  </button>
                  <div className="flex-1 px-4 py-3 text-center font-semibold text-gray-700">
                  {guests} {t("home.search.guests")}
                  </div>
                  <button type="button" onClick={incrementGuests} className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  </button>
                </div>
                </div>
            </div>

            {/* Search Button */}
            <div>
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-secondary to-secondary-hover text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2">
                <HiSearch className="w-5 h-5" />
                <span>{t("home.search.searchButton")}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchUnitsBar;
