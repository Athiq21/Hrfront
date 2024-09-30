import React, { useState } from 'react';
import DocumentUploader from '../Component/DocumentUploader';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import FilePreviewModal from '../Component/FilePreviewModal';

interface SpectaclesProps {
  isOpen: boolean;
  onToggle: () => void;

  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const Spectacles: React.FC<SpectaclesProps> = ({ formData, setFormData }) => {
  const [files, setFiles] = useState<(File | File[] | null)[]>([null, null, null]);
  const [filePreviews, setFilePreviews] = useState<(string | string[] | null)[]>([null, null, null]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const selectedFiles = Array.from(event.target.files || []);
    const newFiles = [...files];

    if (index === 2) { 
      newFiles[index] = selectedFiles; 
    } else {
      newFiles[index] = selectedFiles[0] || null; 
    }

    setFiles(newFiles);

    const newPreviews = [...filePreviews];
    if (index === 2) {
      newPreviews[index] = selectedFiles.map(file => URL.createObjectURL(file)); 
    } else if (selectedFiles[0]) {
      newPreviews[index] = URL.createObjectURL(selectedFiles[0]); 
    } else {
      newPreviews[index] = null;
    }

    setFilePreviews(newPreviews);
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      spectacles: {
        ...prevFormData.spectacles,
        prescription: index === 0 ? (selectedFiles[0] || null) : prevFormData.spectacles.prescription,
        originalPaymentRecspe: index === 1 ? (selectedFiles[0] || null) : prevFormData.spectacles.originalPaymentRecspe
      }
    }));
  };


  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    const newPreviews = [...filePreviews];

    newFiles[index] = null;
    newPreviews[index] = null;

    setFiles(newFiles);
    setFilePreviews(newPreviews);
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      criticalIllness: {
        ...prevFormData.criticalIllness,
        diagnosisCard: index === 0 ? null : prevFormData.criticalIllness.diagnosisCard,
        medicalAttendantCard: index === 1 ? null : prevFormData.criticalIllness.medicalAttendantCard,
      }
    }));
  };

//   const handleRemoveFile = (index: number, fileIndex?: number) => {
//     const newFiles = [...files];
//     const newPreviews = [...filePreviews];

//     if (index === 2 && fileIndex !== undefined) {
//       // If there are multiple files in index 2 (additional documents)
//       if (Array.isArray(newFiles[index])) {
//         const updatedFiles = (newFiles[index] as File[]).filter((_, i) => i !== fileIndex);
//         newFiles[index] = updatedFiles.length > 0 ? updatedFiles : null; 
//         newPreviews[index] = updatedFiles.length > 0 ? newPreviews[index]?.filter((_, i) => i !== fileIndex) : null; 
//       }
//     } else {
//       newFiles[index] = null; // Clear the selected file
//       newPreviews[index] = null; // Clear the preview
//     }

//     setFiles(newFiles);
//     setFilePreviews(newPreviews);

//     setFormData((prevFormData: any) => ({
//       ...prevFormData,
//       spectacles: {
//         ...prevFormData.spectacles,
//         prescription: index === 0 ? null : prevFormData.spectacles.prescription,
//         originalPaymentRecspe: index === 1 ? null : prevFormData.spectacles.originalPaymentRecspe
//       }
//     }));
// };


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
      <label className="w-full flex justify-between items-center border-2 border-orange-600 px-4 py-2 rounded-md bg-white text-black hover:bg-orange-200 transition duration-200">Spectacles</label>
      
      <div className="mt-1 p-2 border-2 bg-gray-100 bg-white rounded-md">
        <div className="grid grid-cols-2 gap-4">
          <label>Date of Diagnosis:</label>
          <div className="flex flex-col">
          <input 
            type="date" 
            name="dateOfDiagnosisspe" 
            value={formData.spectacles.dateOfDiagnosisspe}
            onChange={handleChange}
            className="border rounded px-2 py-1" 
          />
 <span className="text-gray-500 text-sm mt-1">* Required</span>
 </div>
          <label>Claimed Amount:</label>
          <div className="flex items-center border rounded px-2 py-1">
          <span className="mr-1">Rs.</span>
          <div className="flex flex-col">
          <input 
            type="text" 
            name="claimedAmountspe"
            value={formData.spectacles.claimedAmountspe}
            onChange={handleChange}
            className="border rounded px-2 py-1" 
          />
           <span className="text-gray-500 text-sm mt-1">* Required</span>
           </div>
</div>
          <label>Prescription:</label>
          <div className="flex items-center mb-2">
            <input
              type="file"
              name="prescription"
              onChange={(e) => handleFileChange(e, 0)}
              className="border rounded px-2 py-1 w-48"
            />
            {filePreviews[0] && (
              <div className="flex items-center ml-2">
                <button className="text-blue-500 underline flex items-center" onClick={() => openModal(filePreviews[0] as string)}>
                  <VisibilityIcon className="mr-1" />
                </button>
                <span className="text-red-500 cursor-pointer ml-2" onClick={() => handleRemoveFile(0)}>
                  <ClearIcon />
                </span>
              </div>
            )}{!filePreviews[0] && (
              <span className="text-gray-500 text-sm mt-1">* Required</span>
            )}
          </div>

          <label>Original Payment Receipt:</label>
          <div className="flex items-center mb-2">
            <input
              type="file"
              name="originalPaymentRecspe"
              onChange={(e) => handleFileChange(e, 1)}
              className="border rounded px-2 py-1 w-48"
            />
            {filePreviews[1] && (
              <div className="flex items-center ml-2">
                <button className="text-blue-500 underline flex items-center" onClick={() => openModal(filePreviews[1] as string)}>
                  <VisibilityIcon className="mr-1" />
                </button>
                <span className="text-red-500 cursor-pointer ml-2" onClick={() => handleRemoveFile(1)}>
                  <ClearIcon />
                </span>
              </div>
            )}{!filePreviews[1] && (
              <span className="text-gray-500 text-sm mt-1">* Required</span>
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

export default Spectacles;
