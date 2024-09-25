import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Hospitalization from '../Accident/Hospitalization';
import Opd from '../Accident/Opd';
import Spectacles from '../Accident/Spectacles';
import ProgressBar from '../Component/Progress';
import Dental from '../Accident/Dental';
import PersonalAccident from '../Accident/PersonalAccident';
import CriticalIllness from '../Accident/CriticalIllness';
import FuneralExp from '../Accident/FuneralExp';
import Next from '../Component/Next';

const StepC: React.FC = () => {
  // State to track which card is expanded
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Function to toggle the expanded section
  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };
  

  return (
    <div className="bg-gray-100 p-5 rounded-lg shadow-md max-w-4xl mx-auto relative border-2 border-orange-600 mt-12 h-4/5">
       <ProgressBar currentStep={3} totalSteps={4} />
      <h4 className="text-xl font-bold mb-4">Enter Claim Details</h4>

      {/* Option 1: Hospitalization */}
      <div className="mb-2">
      <Hospitalization 
        isOpen={expandedSection === 'hospitalization'} 
        onToggle={() => toggleSection('hospitalization')} 
      />
      </div>

      {/* Option 2: OPD */}
      <div className="mb-2">
      <Opd isOpen={expandedSection === 'opd'} onToggle={() => toggleSection('opd')} />
      </div>

      {/* Option 4: Spectacles */}
      <div className="mb-2">
      <Spectacles isOpen={expandedSection === 'spectacles'} onToggle={() => toggleSection('spectacles')} />
      </div>

   <div className="mb-2">
   <Dental isOpen={expandedSection === 'dental'} onToggle={() => toggleSection('dental')} />

      </div>

      {/* Option 5: Personal Accident Cover */}
      <div className="mb-2">
      <PersonalAccident isOpen={expandedSection === 'personal-accident'} onToggle={() => toggleSection('personal-accident')} />
      </div>

      {/* Option 6: Critical Illness */}
      <div className="mb-2">
      <CriticalIllness isOpen={expandedSection === 'critical-illness'} onToggle={() => toggleSection('critical-illness')} />
      </div>

      {/* Option 7: Funeral Expenses */}
      <div className="mb-2">
      <FuneralExp isOpen={expandedSection === 'funeral-expenses'} onToggle={() => toggleSection('funeral-expenses')} />
      </div>

      <div className="absolute bottom-1 right-4">
      <Next 
                        tempData="" // Provide tempData if needed
                        setTempData={() => {}} // You can remove this if not used
                        currentStep={3} // Update with the correct step
                        totalSteps={4} // Update with the total number of steps
                    
                    />
      </div>
    </div>
  );
};

export default StepC;
