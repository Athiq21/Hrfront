

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Previous: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      className="flex items-center text-orange-600 hover:text-orange-800 focus:outline-none"
      onClick={() => navigate(-1)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
    
          <path d="M10 18l-6-6 6-6v4h6v4h-6v4z" />

      </svg>
      Back
    </button>
  );
};

export default Previous;
