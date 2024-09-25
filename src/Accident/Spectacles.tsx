// Spectacles.tsx
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Spectacles: React.FC<{ isOpen: boolean; onToggle: () => void }> = ({ isOpen, onToggle }) => {
  return (
    <div className="mb-2">
      <button
        className="w-full flex justify-between items-center border-2 border-white-500 px-4 py-2 rounded-md bg-white text-black hover:bg-orange-200 transition duration-200"
        onClick={onToggle}
      >
        <span className="flex items-center">Spectacles</span>
        <KeyboardArrowDownIcon className="ml-2" />
      </button>
      {isOpen && (
        <div className="mt-1 p-2 border-2 border-orange-500 bg-white rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <label>Date of Diagnosis:</label>
            <input type="date" className="border rounded px-2 py-1" />
            <label>Claimed Amount:</label>
            <input type="text" className="border rounded px-2 py-1" />
            <label>Prescription(s):</label>
            <input type="file" className="border rounded px-2 py-1" />
            <label>Original Payment Receipt(s):</label>
            <input type="file" className="border rounded px-2 py-1" />
            <label>Additional Documents:</label>
            <input type="file" className="border rounded px-2 py-1" multiple />
          </div>
        </div>
      )}
    </div>
  );
};

export default Spectacles;
