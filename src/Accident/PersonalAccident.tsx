import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import DocumentUploader from '../Component/DocumentUploader';
import FilePreviewModal from '../Component/FilePreviewModal';

interface PersonalAccidentProps {
  isOpen: boolean;
  onToggle: () => void;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const PersonalAccident: React.FC<PersonalAccidentProps> = ({ isOpen, onToggle, formData, setFormData }) => {
  const [files, setFiles] = useState<(File | null)[]>(Array(4).fill(null));
  const [filePreviews, setFilePreviews] = useState<(string | null)[]>(Array(4).fill(null));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const selectedFiles = Array.from(event.target.files || []);
    const newFiles = [...files];
    newFiles[index] = selectedFiles[0] || null; 
    setFiles(newFiles);

    const newPreviews = [...filePreviews];
    newPreviews[index] = selectedFiles[0] ? URL.createObjectURL(selectedFiles[0]) : null; 
    setFilePreviews(newPreviews);
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      personalAccident: {
        ...prevFormData.personalAccident,
        diagnosisCard: index === 0 ? (selectedFiles[0] || null) : prevFormData.personalAccident.diagnosisCard,
        medicalAttendantCard: index === 1 ? (selectedFiles[0] || null) : prevFormData.personalAccident.medicalAttendantCard,
        birthCertificate: index === 2 ? (selectedFiles[0] || null) : prevFormData.personalAccident.birthCertificate,
        policeReport: index === 3 ? (selectedFiles[0] || null) : prevFormData.personalAccident.policeReport
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
      personalAccident: {
        ...prevFormData.personalAccident,
        diagnosisCard: index === 0 ? null : prevFormData.personalAccident.diagnosisCard,
        medicalAttendantCard: index === 1 ? null : prevFormData.personalAccident.medicalAttendantCard,
        birthCertificate: index === 2 ? null : prevFormData.personalAccident.birthCertificate,
        policeReport: index === 3 ? null : prevFormData.personalAccident.policeReport
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
      personalAccident: {
        ...prevFormData.personalAccident,
        [name]: value
      }
    }));
  };

  return (
    <div className="mb-2">
        <label className="w-full flex justify-between items-center border-2 border-orange-600 px-4 py-2 rounded-md bg-white text-black hover:bg-orange-200 transition duration-200">Personal Accident Cover</label>
      
      {/* <button
        className="w-full flex justify-between items-center border-2 border-orange-600 px-4 py-2 rounded-md bg-white text-black hover:bg-orange-200 transition duration-200"
        onClick={onToggle}
      >
        <span className="flex items-center">Personal Accident Cover</span>
        <KeyboardArrowDownIcon className="ml-2" />
      </button>
      {isOpen && ( */}
        <div className="mt-1 p-2 border-2 bg-gray-100 rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <label>Date of Accident:</label>
            <div className='flex flex-col'>
            <input 
              type="date" 
              name="dateOfAccident" 
              value={formData.personalAccident.dateOfAccident}
              onChange={handleChange}
              className="border rounded px-2 py-1" 
            />
    <span className="text-gray-500 text-sm mt-1">* Required</span>
    </div>



            <label>Diagnosis Card:</label>
            <div className="relative">
              <input
                type="file"
                className="border rounded px-2 py-1 w-48"
                onChange={(e) => handleFileChange(e, 0)}
                accept="image/*"
              />
              {filePreviews[0] && (
                <div className="absolute top-1 right-1 flex items-center">
                  <button 
                    className="text-blue-500 flex items-center mr-1"
                    onClick={() => openModal(filePreviews[0] as string)} 
                  >
                    <VisibilityIcon /> 
                  </button>
                  <span className="text-red-500 cursor-pointer" onClick={() => handleRemoveFile(0)}>
                    <ClearIcon fontSize="small" />
                  </span>
                </div>
              )}

               {!filePreviews[0] && (
              <span className="text-gray-500 text-sm mt-1">* Required</span>
            )}
            </div>
            <label>Medical Attendant's Report:</label>
            <div className="relative">
              <input
                type="file"
                className="border rounded px-2 py-1 w-48"
                onChange={(e) => handleFileChange(e, 1)}
                accept="image/*"
              />
              {filePreviews[1] && (
                <div className="absolute top-1 right-1 flex items-center">
                  <button 
                    className="text-blue-500 flex items-center mr-1"
                    onClick={() => openModal(filePreviews[1] as string)} 
                  >
                    <VisibilityIcon/> 
                  </button>
                  <span className="text-red-500 cursor-pointer" onClick={() => handleRemoveFile(1)}>
                    <ClearIcon fontSize="small" />
                  </span>
                </div>
              )}
               {!filePreviews[1] && (
              <span className="text-gray-500 text-sm mt-1">* Required</span>
            )}
            </div>
            <label>Birth Certificate of the Insured:</label>
            <div className="relative">
              <input
                type="file"
                className="border rounded px-2 py-1 w-48"
                onChange={(e) => handleFileChange(e, 2)}
                accept="image/*"
              />
              {filePreviews[2] && (
                <div className="absolute top-1 right-1 flex items-center">
                  <button 
                    className="text-blue-500 flex items-center mr-1"
                    onClick={() => openModal(filePreviews[2] as string)} 
                  >
                    <VisibilityIcon/> 
                  </button>
                  <span className="text-red-500 cursor-pointer" onClick={() => handleRemoveFile(2)}>
                    <ClearIcon fontSize="small" />
                  </span>
                </div>
              )}
               {!filePreviews[2] && (
              <span className="text-gray-500 text-sm mt-1">* Required</span>
            )}
            </div>
            <label>Police Report/JMO Report:</label>
            <div className="relative">
              <input
                type="file"
                className="border rounded px-2 py-1 w-48"
                onChange={(e) => handleFileChange(e, 3)}
                accept="image/*"
              />
              {filePreviews[3] && (
                <div className="absolute top-1 right-1 flex items-center">
                  <button 
                    className="text-blue-500 flex items-center mr-1"
                    onClick={() => openModal(filePreviews[3] as string)} 
                  >
                    <VisibilityIcon  /> 
                  </button>
                  <span className="text-red-500 cursor-pointer" onClick={() => handleRemoveFile(3)}>
                    <ClearIcon fontSize="small" />
                  </span>
                </div>
              )}
            </div>
            <label className="mr-2">Additional Documents:</label>
            <DocumentUploader />
          </div>
        </div>
      {/* )} */}
      
      <FilePreviewModal isOpen={isModalOpen} onClose={closeModal} fileUrl={selectedImage} />
    </div>
  );
};

export default PersonalAccident;
