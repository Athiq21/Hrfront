import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DocumentUploader from '../Component/DocumentUploader';

interface SpectaclesProps {
  isOpen: boolean;
  onToggle: () => void;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const Spectacles: React.FC<SpectaclesProps> = ({ isOpen, onToggle, formData, setFormData }) => {
  const [files, setFiles] = useState<(File | File[] | null)[]>(Array(3).fill(null));
  const [filePreviews, setFilePreviews] = useState<(string | string[] | null)[]>(Array(3).fill(null));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const selectedFiles = Array.from(event.target.files || []);
    const newFiles = [...files];

    if (index === 2) { // For Additional Documents, allowing multiple files
      newFiles[index] = selectedFiles; // Store array of files
    } else {
      newFiles[index] = selectedFiles[0] || null; // Store single file or null
    }

    setFiles(newFiles);

    const newPreviews = [...filePreviews];
    if (index === 2) {
      newPreviews[index] = selectedFiles.map(file => URL.createObjectURL(file)); // Generate previews for multiple files
    } else if (selectedFiles[0]) {
      newPreviews[index] = URL.createObjectURL(selectedFiles[0]); // Generate preview for single file
    } else {
      newPreviews[index] = null;
    }

    setFilePreviews(newPreviews);

    // Update the formData state in the parent component for the file inputs
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      spectacles: {
        ...prevFormData.spectacles,
        prescription: index === 0 ? (selectedFiles[0] || null) : prevFormData.spectacles.prescription,
        originalPaymentRecspe: index === 1 ? (selectedFiles[0] || null) : prevFormData.spectacles.originalPaymentRecspe
      }
    }));
  };

  const handleRemoveFile = (index: number, fileIndex?: number) => {
    const newFiles = [...files];
    const newPreviews = [...filePreviews];

    if (index === 2 && fileIndex !== undefined) {
      // Remove specific file from Additional Documents
      const updatedFiles = (newFiles[index] as File[]).filter((_, i) => i !== fileIndex);
      newFiles[index] = updatedFiles.length > 0 ? updatedFiles : null; // If no files left, set to null
      newPreviews[index] = updatedFiles.length > 0 ? newPreviews[index]?.filter((_, i) => i !== fileIndex) : null; // Update previews
    } else {
      newFiles[index] = null;
      newPreviews[index] = null;
    }

    setFiles(newFiles);
    setFilePreviews(newPreviews);

    // Update the formData state in the parent component to remove the file
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      spectacles: {
        ...prevFormData.spectacles,
        prescription: index === 0 ? null : prevFormData.spectacles.prescription,
        originalPaymentRecspe: index === 1 ? null : prevFormData.spectacles.originalPaymentRecspe
      }
    }));
  };

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      spectacles: {
        ...prevFormData.spectacles,
        [name]: value
      }
    }));
  };

  return (
    <div className="mb-2">
        <label   className="w-full flex justify-between items-center border-2 border-orange-600 px-4 py-2 rounded-md bg-white text-black hover:bg-orange-200 transition duration-200">Spectacles</label>
      {/* <button
        className="w-full flex justify-between items-center border-2 border-orange-600 px-4 py-2 rounded-md bg-white text-black hover:bg-orange-200 transition duration-200"
        onClick={onToggle}
      >
        <span className="flex items-center">Spectacles</span>
        <KeyboardArrowDownIcon className="ml-2" />
      </button>
      {isOpen && ( */}
        <div className="mt-1 p-2 border-2 bg-gray-100 bg-white rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <label>Date of Diagnosis:</label>
            <input 
              type="date" 
              name="dateOfDiagnosisspe" 
              value={formData.spectacles.dateOfDiagnosis}
              onChange={handleChange}
              className="border rounded px-2 py-1" 
            />
            <label>Claimed Amount:</label>
            <input 
              type="text" 
              name="claimedAmountspe"
              value={formData.spectacles.claimedAmountspe}
              onChange={handleChange}
              className="border rounded px-2 py-1" 
            />

            <label>Prescription(s):</label>
            <input
              type="file"
              className="border rounded px-2 py-1"
              onChange={(e) => handleFileChange(e, 0)}
              accept="image/*"
            />
            {filePreviews[0] && (
              <div className="relative mt-2 flex items-center">
                <button 
                  className="text-blue-500 underline"
                  onClick={() => openModal(filePreviews[0] as string)} 
                >
                  View
                </button>
                <span className="absolute top-0 right-0 text-red-500 cursor-pointer" onClick={() => handleRemoveFile(0)}>
                  X
                </span>
              </div>
            )}

            <label>Original Payment Receipt(s):</label>
            <input
              type="file"
              className="border rounded px-2 py-1"
              onChange={(e) => handleFileChange(e, 1)}
              accept="image/*"
            />
            {filePreviews[1] && (
              <div className="relative mt-2 flex items-center">
                <button 
                  className="text-blue-500 underline"
                  onClick={() => openModal(filePreviews[1] as string)} 
                >
                  View
                </button>
                <span className="absolute top-0 right-0 text-red-500 cursor-pointer" onClick={() => handleRemoveFile(1)}>
                  X
                </span>
              </div>
            )}

            <label>Additional Documents:</label>
            <DocumentUploader />
            {/* Additional Documents input */}
          </div>
        </div>
      {/* )} */}

      {/* Modal for Image Enlargement */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg relative">
            <img src={selectedImage!} alt="Enlarged Preview" className="max-w-lg max-h-screen" />
            <button className="absolute top-2 right-2 text-red-500" onClick={closeModal}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Spectacles;
