import { useState, type ReactNode } from "react";

interface InputProps {
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  floatingLabel?: boolean;
  leftElement?: ReactNode;
}

export const FormInput = ({ type, id, value, onChange, placeholder, label, error, required = false, className = "", floatingLabel = true, leftElement }: InputProps) => {
  const hasValue = value && value.length > 0;
  const isActive = hasValue;

  if (floatingLabel) {
    return (
      <div className="relative mb-6">
        <div className="relative">
          {leftElement && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">{leftElement}</div>}
          <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder=" "
            className={`
              w-full h-14 px-4 pt-6 pb-2
              ${leftElement ? "pl-12" : "px-4"}
              border-2 rounded-xl
              bg-white
              transition-all duration-300 ease-in-out
              focus:outline-none focus:ring-0
              peer
              ${error ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-secondary hover:border-gray-300"}
              ${className}
            `}
          />
          <label
            htmlFor={id}
            className={`
              absolute left-4 transition-all duration-300 ease-in-out
              pointer-events-none select-none
              ${leftElement ? "left-12" : "left-4"}
              ${isActive || hasValue ? "top-2 text-xs font-medium bg-white px-1 -ml-1" : "top-1/2 -translate-y-1/2 text-base"}
              ${error ? "text-red-500" : isActive ? "text-secondary" : "text-gray-500"}
              peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium
              peer-focus:bg-white peer-focus:px-1 peer-focus:-ml-1
              ${error ? "peer-focus:text-red-500" : "peer-focus:text-secondary"}
              peer-[:not(:placeholder-shown)]:top-2
              peer-[:not(:placeholder-shown)]:text-xs
              peer-[:not(:placeholder-shown)]:font-medium
              peer-[:not(:placeholder-shown)]:bg-white
              peer-[:not(:placeholder-shown)]:px-1
              peer-[:not(:placeholder-shown)]:-ml-1
              ${error ? "peer-[:not(:placeholder-shown)]:text-red-500" : "peer-[:not(:placeholder-shown)]:text-secondary"}
            `}>
            {label} {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-500 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }

  // Fallback to original design
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-primary font-medium mb-2">
        {label} {required && <span className="text-red-500 text-sm">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-0 focus:border-secondary transition-all ${error ? "border-red-400" : "border-gray-200"} ${className}`}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Button = ({ children, type = "button", onClick, variant = "primary", className = "", disabled = false, fullWidth = false, size = "md" }: ButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-secondary hover:bg-secondary-hover text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5";
      case "secondary":
        return "bg-primary hover:bg-dark-primary text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5";
      case "outline":
        return "bg-white border-2 border-secondary text-secondary hover:bg-secondary hover:text-white shadow-md hover:shadow-lg";
      default:
        return "bg-secondary hover:bg-secondary-hover text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "py-2 px-4 text-sm";
      case "md":
        return "py-3 px-6 text-base";
      case "lg":
        return "py-4 px-8 text-lg";
      default:
        return "py-3 px-6 text-base";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${getSizeClasses()}
        rounded-xl font-semibold
        transition-all duration-300 ease-in-out
        ${getVariantClasses()}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-60 cursor-not-allowed transform-none shadow-none" : "cursor-pointer"}
        ${className}
      `}>
      {children}
    </button>
  );
};

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string | ReactNode;
  error?: string;
}

export const Checkbox = ({ id, checked, onChange, label, error }: CheckboxProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-start">
        <div className="relative flex items-center">
          <input type="checkbox" id={id} name={id} checked={checked} onChange={onChange} className="w-5 h-5 text-secondary border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200" />
          {checked && (
            <svg className="absolute w-3 h-3 text-white pointer-events-none" style={{ left: "4px", top: "4px" }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <label htmlFor={id} className="ml-3 text-gray-700 text-sm leading-relaxed cursor-pointer">
          {label}
        </label>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export const AuthCard = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-lg w-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden p-8 backdrop-blur-sm border border-gray-100">{children}</div>;
};

export const AuthContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5"></div>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export const Divider = ({ text }: { text: string }) => {
  return (
    <div className="relative flex items-center my-6">
      <div className="flex-grow border-t border-gray-200"></div>
      <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium bg-white px-2">{text}</span>
      <div className="flex-grow border-t border-gray-200"></div>
    </div>
  );
};

// Country codes data
const countryCodes = [
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+33", country: "FR" },
  { code: "+49", country: "DE" },
  { code: "+39", country: "IT" },
  { code: "+34", country: "ES" },
  { code: "+31", country: "NL" },
  { code: "+46", country: "SE" },
  { code: "+47", country: "NO" },
  { code: "+45", country: "DK" },
  { code: "+41", country: "CH" },
  { code: "+43", country: "AT" },
  { code: "+32", country: "BE" },
  { code: "+351", country: "PT" },
  { code: "+30", country: "GR" },
  { code: "+48", country: "PL" },
  { code: "+420", country: "CZ" },
  { code: "+36", country: "HU" },
  { code: "+40", country: "RO" },
  { code: "+359", country: "BG" },
  { code: "+385", country: "HR" },
  { code: "+386", country: "SI" },
  { code: "+421", country: "SK" },
  { code: "+370", country: "LT" },
  { code: "+371", country: "LV" },
  { code: "+372", country: "EE" },
  { code: "+358", country: "FI" },
  { code: "+353", country: "IE" },
  { code: "+356", country: "MT" },
  { code: "+357", country: "CY" },
  { code: "+377", country: "MC" },
  { code: "+378", country: "SM" },
  { code: "+379", country: "VA" },
  { code: "+380", country: "UA" },
  { code: "+381", country: "RS" },
  { code: "+382", country: "ME" },
  { code: "+383", country: "XK" },
  { code: "+389", country: "MK" },
  { code: "+355", country: "AL" },
  { code: "+387", country: "BA" },
  { code: "+7", country: "RU" },
  { code: "+90", country: "TR" },
  { code: "+20", country: "EG" },
  { code: "+27", country: "ZA" },
  { code: "+52", country: "MX" },
  { code: "+55", country: "BR" },
  { code: "+54", country: "AR" },
  { code: "+56", country: "CL" },
  { code: "+57", country: "CO" },
  { code: "+51", country: "PE" },
  { code: "+58", country: "VE" },
  { code: "+593", country: "EC" },
  { code: "+595", country: "PY" },
  { code: "+598", country: "UY" },
  { code: "+591", country: "BO" },
  { code: "+86", country: "CN" },
  { code: "+81", country: "JP" },
  { code: "+82", country: "KR" },
  { code: "+91", country: "IN" },
  { code: "+92", country: "PK" },
  { code: "+93", country: "AF" },
  { code: "+94", country: "LK" },
  { code: "+95", country: "MM" },
  { code: "+98", country: "IR" },
  { code: "+964", country: "IQ" },
  { code: "+965", country: "KW" },
  { code: "+966", country: "SA" },
  { code: "+967", country: "YE" },
  { code: "+968", country: "OM" },
  { code: "+971", country: "AE" },
  { code: "+972", country: "IL" },
  { code: "+973", country: "BH" },
  { code: "+974", country: "QA" },
  { code: "+975", country: "BT" },
  { code: "+976", country: "MN" },
  { code: "+977", country: "NP" },
  { code: "+60", country: "MY" },
  { code: "+65", country: "SG" },
  { code: "+66", country: "TH" },
  { code: "+84", country: "VN" },
  { code: "+62", country: "ID" },
  { code: "+63", country: "PH" },
  { code: "+61", country: "AU" },
  { code: "+64", country: "NZ" },
];

interface CountryCodeSelectorProps {
  selectedCode: string;
  onCodeChange: (code: string) => void;
  error?: string;
}

export const CountryCodeSelector = ({ selectedCode, onCodeChange, error }: CountryCodeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCodes = countryCodes.filter((country) => country.code.includes(searchTerm) || country.country.toLowerCase().includes(searchTerm.toLowerCase()));

  const selectedCountry = countryCodes.find((c) => c.code === selectedCode) || countryCodes[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-full h-14 px-4
          border-2 rounded-xl bg-white
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-0
          ${error ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-secondary hover:border-gray-300"}
        `}>
        <div className="flex items-center">
          <span className="font-medium text-gray-700">{selectedCountry.code}</span>
        </div>
        <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <input type="text" placeholder="Search country..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary" />
          </div>
          <div className="overflow-y-auto max-h-40">
            {filteredCodes.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onCodeChange(country.code);
                  setIsOpen(false);
                  setSearchTerm("");
                }}
                className="w-full flex items-center px-4 py-3 gap-2 hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-700 mr-2">{country.code}</span>
                <span className="text-sm text-gray-500">{country.country}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-500 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};
