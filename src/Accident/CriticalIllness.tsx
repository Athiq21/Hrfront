import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DocumentUploader from '../Component/DocumentUploader';

interface CriticalIllnessProps {
  isOpen: boolean;
  onToggle: () => void;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const CriticalIllness: React.FC<CriticalIllnessProps> = ({ isOpen, onToggle, formData, setFormData }) => {
  const [files, setFiles] = useState<(File | null)[]>(Array(2).fill(null));
  const [filePreviews, setFilePreviews] = useState<(string | null)[]>(Array(2).fill(null));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const selectedFiles = Array.from(event.target.files || []);
    const newFiles = [...files];

    newFiles[index] = selectedFiles[0] || null; // Store single file or null
    setFiles(newFiles);

    const newPreviews = [...filePreviews];
    newPreviews[index] = selectedFiles[0] ? URL.createObjectURL(selectedFiles[0]) : null; // Generate preview for single file
    setFilePreviews(newPreviews);

    // Update the formData state in the parent component for the file inputs
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      criticalIllness: {
        ...prevFormData.criticalIllness,
        diagnosisCard: index === 0 ? (selectedFiles[0] || null) : prevFormData.criticalIllness.diagnosisCard,
        medicalAttendantCard: index === 1 ? (selectedFiles[0] || null) : prevFormData.criticalIllness.medicalAttendantCard,
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

    // Update the formData state in the parent component to remove the file
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      criticalIllness: {
        ...prevFormData.criticalIllness,
        diagnosisCard: index === 0 ? null : prevFormData.criticalIllness.diagnosisCard,
        medicalAttendantCard: index === 1 ? null : prevFormData.criticalIllness.medicalAttendantCard,
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
      criticalIllness: {
        ...prevFormData.criticalIllness,
        [name]: value
      }
    }));
  };

  return (
    <div className="mb-2">
      <button
        className="w-full flex justify-between items-center border-2 border-orange-600 px-4 py-2 rounded-md bg-white text-black hover:bg-orange-200 transition duration-200"
        onClick={onToggle}
      >
        <span className="flex items-center">Critical Illness</span>
        <KeyboardArrowDownIcon className="ml-2" />
      </button>
      {isOpen && (
        <div className="mt-1 p-2 border-2 bg-gray-100 bg-white rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <label>Date of Diagnosis:</label>
            <input 
              type="date" 
              name="dateOfDiagnosis" 
              value={formData.criticalIllness.dateOfDiagnosis}
              onChange={handleChange}
              className="border rounded px-2 py-1" 
            />
            <label>Diagnosis Card:</label>
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
            <label>Medical Attendant's Report:</label>
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
            <label className="mr-2">Additional Documents:</label>
            <DocumentUploader />
          </div>
        </div>
      )}

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

export default CriticalIllness;
