import { useState, useRef, useEffect } from "react";
import { Calendar } from "react-date-range";
import { HiCalendar, HiChevronDown } from "react-icons/hi";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styles from "./DatePicker.module.css";

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  minDate?: string;
}

const DatePicker = ({ label, value, onChange, placeholder, minDate }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(value ? new Date(value) : new Date());
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update selectedDate when value prop changes
  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
    }
  }, [value]);

  const formatDate = (dateString: string) => {
    if (!dateString) return placeholder || "Select date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split("T")[0];
    onChange(formattedDate);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 pl-12 pr-10 border-2 border-gray-200 rounded-xl focus:border-secondary focus:outline-none transition-colors duration-200 text-left bg-white hover:border-gray-300">
          <span className={value ? "text-gray-900" : "text-gray-500"}>{formatDate(value)}</span>
        </button>

        <HiCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <HiChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />

        {/* Calendar Dropdown */}
        {isOpen && (
          <div className={`absolute top-full left-0 mt-2 z-50 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden ${styles.datePickerDropdown}`}>
            <Calendar
              date={selectedDate}
              onChange={handleDateChange}
              minDate={minDate ? new Date(minDate) : new Date()}
              maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)} // 1 year from now
              color="#40e0d0" // Using secondary color
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
