// // // src/Component/Next.tsx
// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// // interface NextProps {
// //   tempData: string; // or any other type you're using
// //   setTempData: React.Dispatch<React.SetStateAction<string>>;
// //   currentStep: number; // New prop for the current step
// //   totalSteps: number; // New prop for total steps
// //   disabled: boolean; // New prop for disabled state
// // }

// // const Next: React.FC<NextProps> = ({ tempData, setTempData, currentStep, totalSteps, disabled }) => {
// //   const navigate = useNavigate();

// //   const handleSaveAndNavigate = () => {
// //     console.log("Data saved:", tempData);
// //     navigate('/another-page', { state: { tempData } });
// //   };

// //   return (
// //     <button
// //       onClick={handleSaveAndNavigate}
// //       disabled={disabled}
// //       className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-lg flex items-center justify-center w-28 h-28 transition-all duration-300 transform ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
// //       style={{
// //         marginBottom: '20px', // Space between the button and the steps
// //       }}
// //     >
// //       <span className="flex items-center text-sm md:text-base">
// //         <span className="font-medium">{`Next (${currentStep}/${totalSteps})`}</span>
// //         <ArrowForwardIosIcon className="ml-3" style={{ fontSize: '1rem' }} />
// //       </span>
// //     </button>
// //   );
// // };

// // export default Next;

// // src/Component/Next.tsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// interface NextProps {
//   tempData: string; // or any other type you're using
//   setTempData: React.Dispatch<React.SetStateAction<string>>;
//   currentStep: number; // New prop for the current step
//   totalSteps: number; // New prop for total steps
//   disabled: boolean; // New prop for disabled state
// }

// const Next: React.FC<NextProps> = ({ tempData, setTempData, currentStep, totalSteps, disabled }) => {
//   const navigate = useNavigate();

//   const handleSaveAndNavigate = () => {
//     console.log("Data saved:", tempData);
//     // Navigate to Step C
//     navigate('/step-c', { state: { tempData } }); // Change '/step-c' to the actual path for Step C
//   };

//   return (
//     <button
//       onClick={handleSaveAndNavigate}
//       disabled={disabled}
//       className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-lg flex items-center justify-center w-28 h-28 transition-all duration-300 transform ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
//       style={{
//         marginBottom: '20px', // Space between the button and the steps
//       }}
//     >
//       <span className="flex items-center text-sm md:text-base">
//         <span className="font-medium">{`Next (${currentStep}/${totalSteps})`}</span>
//         <ArrowForwardIosIcon className="ml-3" style={{ fontSize: '1rem' }} />
//       </span>
//     </button>
//   );
// };

// export default Next;


// src/Component/Next.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface NextProps {
  tempData: string;
  setTempData: React.Dispatch<React.SetStateAction<string>>;
  currentStep: number;
  totalSteps: number;
  disabled: boolean;
  onClick: () => void; // New prop for custom onClick handler
}

const Next: React.FC<NextProps> = ({ tempData, setTempData, currentStep, totalSteps, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-lg flex items-center justify-center w-28 h-28 transition-all duration-300 transform ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
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
