// import React from 'react';
// import { Box, LinearProgress, Typography } from '@mui/material';

// interface ProgressBarProps {
//   currentStep: number;
//   totalSteps: number;
// }

// const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
//   const progress = (currentStep / totalSteps) * 100;

//   return (
//     <div className="w-full flex flex-col items-center mb-4">
//       {/* Progress Bar */}
//       <Box sx={{ width: '100%', mt: 2 }}>
//         <LinearProgress variant="determinate" value={progress} />
//       </Box>
//       <p className="text-lg font-semibold text-gray-800 mt-4">
//         Step {currentStep} of {totalSteps}
//       </p>
//       {/* Step Indicator with Lamp */}
//       <div className="flex items-center mb-2 mt-2">
//         {/* Oil Lamp Icon */}
//         <div className="relative w-10 h-10">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-full h-full"
//             viewBox="0 24 24"
//             fill="orange"
//             stroke="orange"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M12 2C10.5 4 10 6 10 8c0 2 2 3 2 3s2-1 2-3c0-2-0.5-4-2-6z" />
//             <path d="M12 22c0-2-3-4-3-7.5s3-6 3-6 3 3 3 6-3 5.5-3 7.5z" />
//           </svg>

//           {/* Gray Div (Lamp Base) */}
//           <div
//             className="absolute w-7 h-7 bg-gray-500"
//             style={{
//               top: '20px', /* Move the gray div to join the flame */
//               borderRadius: '100% 0% 100% 0%',
//               transform: 'rotate(44deg)',
//             }}
//           >
//             {/* This is a gray div (lamp base) with custom border radius */}
//           </div>
//         </div>
//       </div>

//       {/* Progress Text */}
//     </div>
//   );
// };

// export default ProgressBar;


import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full flex flex-col items-center mb-4">
      <p className="text-lg font-semibold text-gray-800 mt-4">
        Step {currentStep} of {totalSteps}
      </p>

      {/* Progress Bar Container */}
      <div className="w-full h-2 bg-gray-300 rounded mt-2">
        {/* Actual Progress */}
        <div className="h-full bg-orange-400 rounded" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Optional Lamp Icon or Additional Elements */}
      <div className="flex items-center mb-2 mt-2">
        {/* You can add the lamp icon here if needed */}
      </div>
    </div>
  );
};

export default ProgressBar;
