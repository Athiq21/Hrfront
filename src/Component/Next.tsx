import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface NextProps {
  tempData: string;
  setTempData: React.Dispatch<React.SetStateAction<string>>;
  currentStep: number;
  totalSteps: number;
  disabled: boolean;
  onClick: () => void;
}

const Next: React.FC<NextProps> = ({ tempData, setTempData, currentStep, totalSteps, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#858585] hover:bg-gray-700 text-white font-semibold rounded-md shadow-lg
        flex items-center justify-center w-40 h-12 transition-all duration-300 
        transform ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} font-poppins`}
      style={{
        marginBottom: '20px',
      }}
    >
      <span className="flex items-center text-sm md:text-base">
        <span className="font-medium">{`Next (${currentStep}/${totalSteps})`}</span>
        <ArrowForwardIosIcon className="ml-3" style={{ fontSize: '1rem' }} />
      </span>
    </button>
  );
};

export default Next;
