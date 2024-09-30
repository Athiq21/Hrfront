import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DocumentUploader from '../Component/DocumentUploader';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import FilePreviewModal from '../Component/FilePreviewModal';

interface OpdProps {
  isOpen: boolean;
  onToggle: () => void;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const Opd: React.FC<OpdProps> = ({ isOpen, onToggle, formData, setFormData }) => {
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
      opd: {
        ...prevFormData.opd,
        prescription: index === 0 ? (selectedFiles[0] || null) : prevFormData.opd.prescription,
        originalPaymentRec: index === 1 ? (selectedFiles[0] || null) : prevFormData.opd.originalPaymentRec
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
      opd: {
        ...prevFormData.opd,
        prescription: index === 0 ? null : prevFormData.opd.prescription,
        originalPaymentRec: index === 1 ? null : prevFormData.opd.originalPaymentRec
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
      opd: {
        ...prevFormData.opd,
        [name]: value
      }
    }));
  };

  return (
    <div className="mb-2">
      <label className="w-full flex justify-between items-center border-2 border-orange-600 px-4 py-2 rounded-md bg-white text-black hover:bg-orange-200 transition duration-200">OPD</label>
      
      <div className="mt-1 p-2 border-2 bg-gray-100 bg-white rounded-md">
        <div className="grid grid-cols-2 gap-4">
          <label>Date of Diagnosis:</label>
          <input 
            type="date" 
            name="dateOfDiagnosis"
            value={formData.opd.dateOfDiagnosis}
            onChange={handleChange}
            className="border rounded px-2 py-1" 
          />

          <label>Claimed Amount:</label>
          <input 
            type="text" 
            name="claimedAmountopd"
            value={formData.opd.claimedAmountopd}
            onChange={handleChange}
            className="border rounded px-2 py-1" 
          />

          <label>Prescription:</label>
          <div className="flex items-center mb-2">
            <input type="file" name="prescription" onChange={(e) => handleFileChange(e, 0)} className="border rounded px-2 py-1 w-48" />
            {filePreviews[0] && (
              <div className="flex items-center ml-2">
                <button className="text-blue-500 underline flex items-center" onClick={() => openModal(filePreviews[0] as string)}>
                  <VisibilityIcon className="mr-1" />
                </button>
                <span className="text-red-500 cursor-pointer ml-2" onClick={() => handleRemoveFile(0)}>
                  <ClearIcon />
                </span>
              </div>
            )}
          </div>

          <label>Original Payment Receipt:</label>
          <div className="flex items-center mb-2">
            <input type="file" name="originalPaymentRec" onChange={(e) => handleFileChange(e, 1)} className="border rounded px-2 py-1 w-48" />
            {filePreviews[1] && (
              <div className="flex items-center ml-2">
                <button className="text-blue-500 underline flex items-center" onClick={() => openModal(filePreviews[1] as string)}>
                  <VisibilityIcon className="mr-1" />
                </button>
                <span className="text-red-500 cursor-pointer ml-2" onClick={() => handleRemoveFile(1)}>
                  <ClearIcon />
                </span>
              </div>
            )}
          </div>

          <label>Additional Documents:</label>
          <DocumentUploader />
        </div>
      </div>

      <FilePreviewModal isOpen={isModalOpen} onClose={closeModal} fileUrl={selectedImage} />
    </div>
  );
};

export default Opd;