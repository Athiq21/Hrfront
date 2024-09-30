import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Next from '../Component/Next';
import TextField from '../Component/TextField';
import DropDown from '../Component/DropDown';
import ProgressBar from '../Component/Progress';
import ClearButton from '../Component/ClearButton';
import Previous from '../Component/Previous';

const StepB: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const savedData = JSON.parse(localStorage.getItem('stepBData') || '{}');
  const { tempData } = location.state as { tempData?: any } || {};
  const [policyNumber, setPolicyNumber] = useState<string>(tempData?.policyNumber || savedData.policyNumber || '');
  const [insuredNumber, setInsuredNumber] = useState<string>(tempData?.insuredNumber || savedData.insuredNumber || '');
  const [telephoneNumber, setTelephoneNumber] = useState<string>(tempData?.telephoneNumber || savedData.telephoneNumber || '');
  const [email, setEmail] = useState<string>(tempData?.email || savedData.email || '');
  const [patientName, setPatientName] = useState<string>(tempData?.patientName || savedData.patientName || '');
  const [selectedInsured, setSelectedInsured] = useState<string>(tempData?.insured || savedData.insured || '');
  const [selectedClaimType, setSelectedClaimType] = useState<string>(tempData?.claimType || savedData.claimType || '');
  const [bank, setBank] = useState<string>(tempData?.bank || savedData.bank || '');
  const [branch, setBranch] = useState<string>(tempData?.branch || savedData.branch || '');
  const [accNumber, setAccNumber] = useState<string>(tempData?.accNumber || savedData.accNumber || '');
  const [accHolder, setAccHolder] = useState<string>(tempData?.accHolder || savedData.accHolder || '');
  const { claimType } = location.state as { claimType: string }; 

  const insuredPeopleOptions = ['Self', 'Spouse', 'Child',
    'Father', 'Mother', 'Father-in-law', 'Mother-in-law','Sister', 'Brother'
  ];

  const handleInsuredChange = (option: string) => {
    setSelectedInsured(option);
  };
  useEffect(() => {
    const stepBData = {
      policyNumber,
      insuredNumber,
      telephoneNumber,
      email,
      patientName,
      insured: selectedInsured,
      claimType: selectedClaimType,
      bank,
      branch,
      accNumber,
      accHolder,
    };
    localStorage.setItem('stepBData', JSON.stringify(stepBData));
  }, [policyNumber, insuredNumber, telephoneNumber, email, patientName, selectedInsured, selectedClaimType, bank, branch, accNumber, accHolder]);

  const handleNext = () => {
    const newTempData = {
      insured: selectedInsured,
      claimType,
      policyNumber,
      insuredNumber,
      telephoneNumber,
      email,
      patientName,
      bank,
      branch,
      accNumber,
      accHolder,
    };

    localStorage.setItem('formData', JSON.stringify(newTempData));
    navigate('/step-c', { state: { tempData: newTempData, claimType } });
  };

  // Clear all fields and localStorage data
  const handleClear = () => {
    setPolicyNumber('');
    setInsuredNumber('');
    setTelephoneNumber('');
    setEmail('');
    setPatientName('');
    setBank('');
    setBranch('');
    setAccNumber('');
    setAccHolder('');
    setSelectedInsured('');
    setSelectedClaimType('');
    localStorage.removeItem('stepBData');
  };

  const isNextDisabled = !policyNumber || !insuredNumber || !telephoneNumber || !email || !patientName || !bank || !branch || !accNumber || !accHolder;
  console.log('Claim Type:', claimType);

  return (
    <div className="bg-gray-100 p-5 rounded-lg shadow-lg max-w-2xl mx-auto w-full h-[550px] overflow-y-auto mt-10">
      <ProgressBar currentStep={2} totalSteps={4} />
      <Previous />
      <h1 className="text-2xl font-semibold mb-4">Primary Details</h1>

      {[{ label: 'Policy Number', 
        value: policyNumber,
         setter: setPolicyNumber },
        { label: 'Insured Number',
             value: insuredNumber, setter: setInsuredNumber },
        { label: 'Telephone Number', value: telephoneNumber,
           setter: setTelephoneNumber },
        { label: 'Email',
             value: email, setter: setEmail },
        { label: 'Name of Patient',
             value: patientName, setter: setPatientName },
        { label: 'Bank', 
            value: bank, setter: setBank },
        { label: 'Branch',
             value: branch, setter: setBranch },
        { label: 'Account Number',
             value: accNumber, setter: setAccNumber },
        { label: 'Account Holder',
             value: accHolder, setter: setAccHolder },
     
       ].map((field, index) => (
        <div key={index} className="flex items-center mb-5">
          <label className="text-base mr-3 ml-11 whitespace-nowrap w-1/3">{field.label}</label>
          <TextField value={field.value} onChange={(e) => field.setter(e.target.value)} />
        </div>
        
      ))}

      <div className="flex items-center mb-4">
        <label className="text-base mr-3  ml-12 whitespace-nowrap w-1/3">Claim request for</label>
        <DropDown
          label="Select Insured People" 
          options={insuredPeopleOptions}
          selectedOption={selectedInsured}
          onOptionChange={handleInsuredChange}
        />
      </div>

      <div className="flex justify-between mt-7 px-10"> 
  <div className="mr-2">
    <ClearButton onClear={handleClear} />
  </div>
  <div className="ml-2"> 
    <Next
      tempData=""
      setTempData={() => {}}
      currentStep={2}
      totalSteps={4}
      disabled={isNextDisabled}
      onClick={handleNext}
    />
  </div>
</div>

    </div>
  );
};

export default StepB;
