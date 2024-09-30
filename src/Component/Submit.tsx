import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="bg-[#858585] text-white py-2 px-6 rounded-md hover:bg-gray-700 
      focus:outline-none focus:ring-4 focus:ring-gray-400 transition duration-300 font-poppins"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
