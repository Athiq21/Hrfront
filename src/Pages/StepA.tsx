// src/Pages/StepA.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Next from '../Component/Next';
import DropDown from '../Component/DropDown';
import { Card, CardContent, Typography, Box } from "@mui/material";
import ProgressBar from '../Component/Progress';

interface StepAProps {
  setTempData: React.Dispatch<React.SetStateAction<{ insured: string; claimType: string }>>;
}

const StepA: React.FC<StepAProps> = ({ setTempData }) => {
  const location = useLocation(); // Get the current location
  const [selectedInsured, setSelectedInsured] = useState<string>(''); // State for insured people selection
  const [selectedClaimType, setSelectedClaimType] = useState<string>(''); // State for claim type selection

  const insuredPeopleOptions = ['John Doe', 'Jane Smith', 'Alice Johnson']; // Example insured people options
  const claimTypeOptions = ['Accidental Damage', 'Theft', 'Fire', 'Natural Disaster']; // Example claim type options
  const navigate = useNavigate();

  const handleNext = () => {
    // Navigate to Step B and update tempData
    navigate('/step-b', { state: { tempData: { insured: selectedInsured, claimType: selectedClaimType } } });
  };

  useEffect(() => {
    const state = location.state as { tempData?: { insured: string; claimType: string } };
    if (state && state.tempData) {
      setSelectedInsured(state.tempData.insured);
      setSelectedClaimType(state.tempData.claimType);
      setTempData(state.tempData);
    }
  }, [location.state, setTempData]);

  const handleInsuredChange = (option: string) => {
    setSelectedInsured(option);
    setTempData({ insured: option, claimType: selectedClaimType }); // Update tempData with both values
  };

  const handleClaimTypeChange = (option: string) => {
    setSelectedClaimType(option);
    setTempData({ insured: selectedInsured, claimType: option }); // Update tempData with both values
  };

  // Determine if the Next button should be disabled
  const isNextDisabled = !selectedInsured || !selectedClaimType;

  return (
    <Card
      sx={{
        backgroundColor: "#f5f5f5",
        padding: 5,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 700,
        width: '100%',
        height: 700,
        margin: "0 auto",
        position: 'relative',
      }}
    >
      <CardContent sx={{ paddingBottom: '50px' }}> 
      <ProgressBar currentStep={1} totalSteps={4} />
        <Typography variant="h4" component="div" gutterBottom>
          Enter Claim Details
        </Typography>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Typography variant="body1" component="div" sx={{ marginRight: 5, whiteSpace: 'nowrap' }}>
            Select Insured
          </Typography>
          <DropDown
            label="Select Insured People"
            options={insuredPeopleOptions}
            selectedOption={selectedInsured}
            onOptionChange={handleInsuredChange}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Typography variant="body1" component="div" sx={{ marginRight: 8, whiteSpace: 'nowrap' }}>
            Claim Type
          </Typography>
          <DropDown 
            label="Select Claim Type"
            options={claimTypeOptions}
            selectedOption={selectedClaimType}
            onOptionChange={handleClaimTypeChange}
          />
        </div>

        {/* Positioned Next Button */}
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 16, 
            right: 16 
          }}
        >
          <Next 
            tempData={{ insured: selectedInsured, claimType: selectedClaimType }} 
            setTempData={setTempData} 
            currentStep={1} 
            totalSteps={4} 
            disabled={isNextDisabled} // Pass the disabled state
            onClick={handleNext} // Ensure to pass the click handler for navigation
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default StepA;
