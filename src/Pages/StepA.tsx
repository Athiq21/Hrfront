import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Next from '../Component/Next';
import DropDown from '../Component/DropDown';
import ProgressBar from '../Component/Progress';

interface StepAProps {
  setTempData: React.Dispatch<React.SetStateAction<{ insured: string; claimType: string }>>;
} 

const StepA: React.FC<StepAProps> = ({ setTempData }) => {
  const location = useLocation(); // Get the current location
  const [selectedInsured, setSelectedInsured] = useState<string>(''); // State for insured people selection
  const [selectedClaimType, setSelectedClaimType] = useState<string>(''); // State for claim type selection
  const [tempdata,settempdata] = useState<string>(''); 
  const insuredPeopleOptions = ['Self', 'Wife', 'Child1', 'Child2']; // Example insured people options
  const claimTypeOptions = ['Hospitalization', 'OPD', 'Spectacles', 'Dental', 'Personal Accident Cover', 'Critical Illness','Funeral Expenses']; // Example claim type options
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/step-b', {
      state: {
        insured: selectedInsured,
        claimType: selectedClaimType,
      },
    });
  };  
  
  useEffect(() => {
    const state = location.state as { insured?: string; claimType?: string };
    if (state) {
      setSelectedInsured(state.insured || '');
      setSelectedClaimType(state.claimType || '');
      setTempData({ insured: state.insured || '', claimType: state.claimType || '' });
    }
  }, [location.state, setTempData]);

  const handleInsuredChange = (option: string) => {
    setSelectedInsured(option);
    setTempData({ insured: option, claimType: selectedClaimType });
  };

  const handleClaimTypeChange = (option: string) => {
    setSelectedClaimType(option);
    setTempData({ insured: selectedInsured, claimType: option }); // This should be checked
  };
  

  // Determine if the Next button should be disabled
  const isNextDisabled = !selectedInsured || !selectedClaimType;

  return (
    <div className="bg-gray-100 p-5 rounded-lg shadow-lg max-w-2xl w-full h-[550px] mx-auto relative mt-10">
      <div className="pb-12">
        <ProgressBar currentStep={1} totalSteps={4} />
        <h2 className="text-2xl font-semibold mb-4 font-poppins">Select a Claim</h2>

        <div className="flex items-center mb-4">
          <span className="text-base mr-3 whitespace-nowrap  ml-10">Select Insured</span>
          <DropDown
            label="Select Insured People"
            options={insuredPeopleOptions}
            selectedOption={selectedInsured}
            onOptionChange={handleInsuredChange}
          />
        </div>

        <div className="flex items-center mb-4">
          <span className="text-base mr-8 whitespace-nowrap ml-10">Claim Type</span>
          <DropDown
            label="Select Claim Type"
            options={claimTypeOptions}
            selectedOption={selectedClaimType}
            onOptionChange={handleClaimTypeChange}
          />
        </div>

        <div className="absolute bottom-4 right-4">
          <Next 
            tempData={{ insured: selectedInsured, claimType: selectedClaimType }} 
            setTempData={setTempData} 
            currentStep={1} 
            totalSteps={4} 
            disabled={isNextDisabled}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default StepA;
