import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import DocumentUploader from '../Component/DocumentUploader';

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
            <input 
              type="date" 
              name="dateOfAccident" 
              value={formData.personalAccident.dateOfAccident}
              onChange={handleChange}
              className="border rounded px-2 py-1" 
            />
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

export default PersonalAccident;
