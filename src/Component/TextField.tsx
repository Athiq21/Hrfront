// src/Component/TextField.tsx
import React from 'react';

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean; // Add the disabled prop
}

const TextField: React.FC<TextFieldProps> = ({ label, placeholder, value, onChange, disabled }) => {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 text-white">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled} // Use the disabled prop
        className={`w-full p-2 border-2 border-orange-500 rounded focus:outline-none focus:border-orange-700 transition ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`} // Style for disabled state
      />
    </div>
  );
};

export default TextField;
