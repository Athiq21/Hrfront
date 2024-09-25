import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const FuneralExp: React.FC<{ isOpen: boolean; onToggle: () => void }> = ({ isOpen, onToggle }) => {
  return (
    <div className="mb-2">
      <button
        className="w-full flex justify-between items-center border-2 border-gray-500 px-4 py-2 rounded-md bg-white text-black hover:bg-orange-200 transition duration-200"
        onClick={onToggle}
      >
        <span className="flex items-center">Funeral Expenses</span>
        <KeyboardArrowDownIcon className="ml-2" />
      </button>
      {isOpen && (
        <div className="mt-1 p-2 border-2 border-orange-500 bg-white rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <label>Member's Name in Full:</label>
            <input type="text" className="border rounded px-2 py-1" />
            <label>EPF No:</label>
            <input type="text" className="border rounded px-2 py-1" />
            <label>Relationship to the Deceased:</label>
            <input type="text" className="border rounded px-2 py-1" />
            <label>Deceased’s Name:</label>
            <input type="text" className="border rounded px-2 py-1" />
            <label>Age at Death:</label>
            <input type="text" className="border rounded px-2 py-1" />
            <label>Claim Cheque should be drawn in favour of below name:</label>
            <input type="text" className="border rounded px-2 py-1" />
            <label>Claim Form:</label>
            <input type="file" className="border rounded px-2 py-1" />
            <label>Death Certificate:</label>
            <input type="file" className="border rounded px-2 py-1" />
            <label>NIC Copy of the Deceased Person:</label>
            <input type="file" className="border rounded px-2 py-1" />
            <label>Proof of Relationship to the Deceased:</label>
            <input type="file" className="border rounded px-2 py-1" multiple />
            <label>Additional Documents:</label>
            <input type="file" className="border rounded px-2 py-1" multiple />
          </div>
        </div>
      )}
    </div>
  );
};

export default FuneralExp;
