import React, { useState } from 'react';
import ProgressBar from '../Component/Progress';
import Submit from '../Component/Submit'; 
import Previous from '../Component/Previous';

const StepD: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(''); 

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
    setError(''); 
  };

  const handleSubmit = () => {
    if (isChecked) {

      console.log("Form submitted successfully!");
    } else {
      setError("You must agree to the declaration before submitting.");
    }
  };

  return (
    <div className="bg-gray-100 p-5 rounded-lg shadow-md max-w-4xl mx-auto relative border-2 border-orange-600 mt-12 h-auto lg:h-4/5">
      <ProgressBar currentStep={4} totalSteps={4} />
      <Previous/>
      <h4 className="text-4xl font-bold mb-10">Almost Done!!</h4>
      <div className="w-full border-2 border-orange-600 px-4 py-4 rounded-md bg-white text-black hover:bg-orange-200 transition duration-200">
        <h5 className="text-lg font-bold">
          I do hereby declare that the answers given by me are true and complete. I hereby authorize Janashakthi Insurance Co. Ltd. to obtain information
          regarding the state of my health or any other information or any report that may be required from my employer or from any hospital/s or medical 
          attendants who treated me, or any other institution.
        </h5>
      </div>
      <div className="flex justify-start items-center mt-6">
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={handleCheckboxChange} 
          className="mr-2 w-5 h-5 accent-orange-600"
        />
        <label className="text-sm font-medium">I agree to the above declaration.</label>
      </div>
      {error && (
        <div className="mt-4 text-red-600 text-sm font-semibold">
          {error}
        </div>
      )}
      <div className="mt-8 flex justify-end">
        <Submit 
          label="Submit" 
          onClick={handleSubmit} 
        />
      </div>
    </div>
  );
};

export default StepD;
