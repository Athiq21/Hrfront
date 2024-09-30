import React from 'react';

interface ClearButtonProps {
  onClear: () => void; // Function to handle the clear action
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClear }) => {
  return (
    <button
      onClick={onClear}
      className={`bg-[#858585] hover:bg-gray-700 text-white font-semibold rounded-md shadow-lg
        flex items-center justify-center w-40 h-12 transition-all duration-300 
        transform font-poppins`}
      style={{
        marginBottom: '20px',
      }}
    >
      Clear All
    </button>
  );
};

export default ClearButton;



// import React from 'react';

// interface ClearButtonProps {
//   onClear: () => void; // Function to handle the clear action
// }

// const ClearButton: React.FC<ClearButtonProps> = ({ onClear }) => {
//   return (
//     <button
//       onClick={onClear}
//       className={`bg-[#858585] hover:bg-gray-700 text-white font-semibold rounded-md shadow-lg
//         flex items-center justify-center w-32 h-7 transition-all duration-300 
//         transform font-poppins`}
//       style={{
//         marginBottom: '20px',
//         marginLeft: 'auto',
//       }}
//     >
//       Clear All
//     </button>
//   );
// };

// export default ClearButton;
