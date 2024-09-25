import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Hospitalization: React.FC<{ isOpen: boolean; onToggle: () => void }> = ({ isOpen, onToggle }) => {
  const [isICU, setIsICU] = useState<boolean>(false);

  return (
    <div className="mb-2">
      <button
        className="w-full flex justify-between items-center border-2 border-white-500 px-4 py-2 rounded-md bg-white text-black hover:bg-orange-200 transition duration-200"
        onClick={onToggle}
      >
        <span className="flex items-center">
          Hospitalization
        </span>
        <KeyboardArrowDownIcon className="ml-2" />
      </button>
      {isOpen && (
        <div className="mt-1 p-2 border-2 border-orange-500 bg-white rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <label>Date of Admission:</label>
            <input type="date" className="border rounded px-2 py-1" />
            <label>Date of Discharge:</label>
            <input type="date" className="border rounded px-2 py-1" />
            <label>Claimed Amount:</label>
            <input type="text" className="border rounded px-2 py-1" />

            <label>Have you received treatment in the Intensive Care Unit (ICU)?</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="icu-treatment"
                  value="yes"
                  onChange={() => setIsICU(true)}
                />{' '}
                Yes
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="icu-treatment"
                  value="no"
                  onChange={() => setIsICU(false)}
                />{' '}
                No
              </label>
            </div>

            {isICU && (
              <>
                <div className="col-span-2 ml-4">
                  <label>Date Admission to ICU:</label>
                  <input type="date" className="border rounded px-2 py-1" />
                </div>
                <div className="col-span-2 ml-4">
                  <label>Date Discharge from ICU:</label>
                  <input type="date" className="border rounded px-2 py-1" />
                </div>
              </>
            )}

            <label>Diagnosis Card:</label>
            <input type="file" className="border rounded px-2 py-1" />
            <label>Original Hospital Bill(s):</label>
            <input type="file" className="border rounded px-2 py-1" />
            <label>Original Payment Receipt(s):</label>
            <input type="file" className="border rounded px-2 py-1" />
            <label>Medical Reports:</label>
            <input type="file" className="border rounded px-2 py-1" />
            <label>Additional Documents:</label>
            <input type="file" className="border rounded px-2 py-1" multiple />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hospitalization;
