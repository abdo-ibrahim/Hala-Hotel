import { useState, useRef, useEffect } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { HiCalendar, HiChevronDown } from "react-icons/hi";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styles from "./DatePicker.module.css";

interface DateRangeSelectorProps {
  checkInLabel: string;
  checkOutLabel: string;
  checkInValue: string;
  checkOutValue: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
  placeholder?: string;
}

interface DateRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

const DateRangeSelector = ({
  checkInLabel,
  checkOutLabel,
  checkInValue,
  checkOutValue,
  onCheckInChange,
  onCheckOutChange,
  placeholder = "Select dates"
}: DateRangeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange[]>([
    {
      startDate: checkInValue ? new Date(checkInValue) : new Date(),
      endDate: checkOutValue ? new Date(checkOutValue) : new Date(),
      key: "selection",
    },
  ]);
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

  // Update dateRange when props change
  useEffect(() => {
    setDateRange([
      {
        startDate: checkInValue ? new Date(checkInValue) : new Date(),
        endDate: checkOutValue ? new Date(checkOutValue) : new Date(),
        key: "selection",
      },
    ]);
  }, [checkInValue, checkOutValue]);

  const formatDate = (dateString: string) => {
    if (!dateString) return placeholder;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDateChange = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    if (selection && selection.startDate && selection.endDate) {
      const newRange = selection as DateRange;
      setDateRange([newRange]);
      
      const checkInFormatted = newRange.startDate.toISOString().split("T")[0];
      const checkOutFormatted = newRange.endDate.toISOString().split("T")[0];
      
      onCheckInChange(checkInFormatted);
      onCheckOutChange(checkOutFormatted);
      
      // Close dropdown after both dates are selected
      if (newRange.startDate.getTime() !== newRange.endDate.getTime()) {
        setTimeout(() => setIsOpen(false), 300);
      }
    }
  };

  const getDisplayText = () => {
    if (checkInValue && checkOutValue) {
      return `${formatDate(checkInValue)} - ${formatDate(checkOutValue)}`;
    } else if (checkInValue) {
      return `${formatDate(checkInValue)} - Select checkout`;
    }
    return placeholder;
  };

  return (
    <div className="relative col-span-2" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {checkInLabel} - {checkOutLabel}
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 pl-12 pr-10 border-2 border-gray-200 rounded-xl focus:border-secondary focus:outline-none transition-colors duration-200 text-left bg-white hover:border-gray-300"
        >
          <span className={checkInValue && checkOutValue ? "text-gray-900" : "text-gray-500"}>
            {getDisplayText()}
          </span>
        </button>
        
        <HiCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <HiChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        
        {/* Date Range Picker Dropdown */}
        {isOpen && (
          <div className={`absolute top-full left-0 mt-2 z-50 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden ${styles.datePickerDropdown}`}>
            <DateRangePicker
              ranges={dateRange}
              onChange={handleDateChange}
              moveRangeOnFirstSelection={false}
              months={2}
              direction="horizontal"
              minDate={new Date()}
              maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)} // 1 year from now
              rangeColors={["#40e0d0"]} // Using secondary color
              showDateDisplay={false}
              showMonthAndYearPickers={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangeSelector;
