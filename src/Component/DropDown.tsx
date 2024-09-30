import React, { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface DropDownProps {
  label: string;
  options: string[];
  selectedOption: string;
  onOptionChange: (option: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  label,
  options,
  selectedOption,
  onOptionChange,
}) => {
  const [isFocused, setIsFocused] = useState(false); // State to track if the dropdown is focused

  return (
    <div className="relative w-full md:w-60 font-poppins">
      {/* Floating Label */}
      <label className={`font-poppins absolute left-3 transition-all duration-200 ${isFocused || selectedOption ? 'text-orange-500 text-xs -top-2' : 'text-gray-500 text-sm top-3'}`}>
        {label}
      </label>
      <select
        value={selectedOption}
        onChange={(e) => onOptionChange(e.target.value)}
        onFocus={() => setIsFocused(true)} // Set focused to true when the dropdown is focused
        onBlur={() => setIsFocused(false)} // Set focused to false when the dropdown loses focus
        className={`font-poppins block appearance-none w-full bg-white border border-gray-300 rounded-lg py-3 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none transition duration-150 ease-in-out ${isFocused || selectedOption ? 'focus:border-orange-500' : 'focus:border-gray-300'}`}
      >
        <option value="" disabled>
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        {/* Keyboard Arrow Down Icon with orange color */}
        <KeyboardArrowDownIcon className="h-5 w-5 text-orange-500" />
      </div>
    </div>
  );
};

export default DropDown;
