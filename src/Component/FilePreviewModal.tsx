// FilePreviewModal.tsx
import React from 'react';

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string | null;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ isOpen, onClose, fileUrl }) => {
  if (!isOpen || !fileUrl) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full"> {/* Reduced width */}
        <button onClick={onClose} className="text-red-500 mb-2">X</button>
        <div className="flex justify-center items-center mt-4"> {/* Centering the image */}
          <img 
            src={fileUrl} 
            alt="File Preview" 
            className="w-auto h-auto max-w-full max-h-[80vh] rounded" // Ensures image maintains aspect ratio
          />
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal;
