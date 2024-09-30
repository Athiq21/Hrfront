import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
interface Uploader {
  id: string;
  file: File | null;
}

const DocumentUploader: React.FC = () => {
  const [uploaders, setUploaders] = useState<Uploader[]>([{ id: 'uploader-0', file: null }]); // Start with one uploader
  const [viewingFile, setViewingFile] = useState<File | null>(null); // Track the file being viewed
  const [showModal, setShowModal] = useState(false); // Control the modal visibility

  // Function to add a new uploader with a limit of 4
  const addUploader = () => {
    if (uploaders.length < 4) {
      setUploaders((prevUploaders) => [
        ...prevUploaders,
        { id: `uploader-${prevUploaders.length}`, file: null },
      ]);
    } else {
      alert('You can only add up to 4 documents.');
    }
  };

  // Function to remove an uploader based on index
  const removeUploader = (index: number) => {
    setUploaders((prevUploaders) => prevUploaders.filter((_, i) => i !== index));
  };

  // Function to handle file change for each uploader
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setUploaders((prevUploaders) =>
        prevUploaders.map((uploader, i) =>
          i === index ? { ...uploader, file } : uploader
        )
      );
    }
  };

  // Function to open the modal for viewing the image
  const viewImage = (file: File) => {
    setViewingFile(file);
    setShowModal(true); // Open the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setViewingFile(null);
  };

  return (
    <div className="mb-4">
      {uploaders.map((uploader, index) => (
        <div key={uploader.id} className="flex items-center mb-2">
          <input
            type="file"
            onChange={(e) => handleFileChange(e, index)}
            className="border rounded px-2 py-1 mr-2 w-48" // Adjust width with w-48 (12rem)
          />
          <button
            onClick={() => removeUploader(index)}
            className="text-red-500 font-semibold mr-2"
          >
            <ClearIcon/>
          </button>
          {uploader.file && (
            <button
              onClick={() => viewImage(uploader.file!)}
              className="text-blue-500 underline font-semibold"
            >
              <VisibilityIcon />
            </button>
          )}
        </div>
      ))}

      {uploaders.length < 4 && (
        <button
          onClick={addUploader}
          className="text-blue-500 underline flex items-center font-semibold"
        >
          + Add Document
        </button>
      )}

      {/* Modal for viewing image */}
      {showModal && viewingFile && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg max-w-lg">
            <h3 className="text-xl mb-4 font-semibold">View Document</h3>
            <img
              src={URL.createObjectURL(viewingFile)}
              alt="Selected document"
              className="mb-4 max-h-80 object-contain"
            />
            <button
              onClick={closeModal}
              className="text-red-500 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;
