import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Opd: React.FC<{ isOpen: boolean; onToggle: () => void }> = ({ isOpen, onToggle }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const selectedFiles = Array.from(event.target.files || []);
    const newFiles = [...files];
    newFiles[index] = selectedFiles[0];
    setFiles(newFiles);

    const newPreviews = [...filePreviews];
    const reader = new FileReader();

    reader.onload = (e) => {
      newPreviews[index] = e.target?.result as string;
      setFilePreviews(newPreviews);
    };

    if (selectedFiles[0]) {
      reader.readAsDataURL(selectedFiles[0]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    const newPreviews = [...filePreviews];

    newFiles[index] = null; 
    newPreviews[index] = ''; 

    setFiles(newFiles);
    setFilePreviews(newPreviews);
  };

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="mb-2">
      <button
        className="w-full flex justify-between items-center border-2 border-white-500 px-4 py-2 rounded-md bg-white text-black hover:bg-orange-200 transition duration-200"
        onClick={onToggle}
      >
        <span className="flex items-center">OPD</span>
        <KeyboardArrowDownIcon className="ml-2" />
      </button>
      {isOpen && (
        <div className="mt-1 p-2 border-2 border-orange-500 bg-white rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <label>Date of Diagnosis:</label>
            <input type="date" className="border rounded px-2 py-1" />
            <label>Claimed Amount:</label>
            <input type="text" className="border rounded px-2 py-1" />

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
                  onClick={() => openModal(filePreviews[0])} // Open modal on click
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
                  onClick={() => openModal(filePreviews[1])} // Open modal on click
                >
                  View
                </button>
                <span className="absolute top-0 right-0 text-red-500 cursor-pointer" onClick={() => handleRemoveFile(1)}>
                  X
                </span>
              </div>
            )}

            <label>Additional Documents:</label>
            <input
              type="file"
              className="border rounded px-2 py-1"
              multiple
              onChange={(e) => handleFileChange(e, 2)}
              accept="image/*"
            />
            {filePreviews[2] && (
              <div className="relative mt-2 flex items-center">
                <button 
                  className="text-blue-500 underline"
                  onClick={() => openModal(filePreviews[2])} // Open modal on click
                >
                  View
                </button>
                <span className="absolute top-0 right-0 text-red-500 cursor-pointer" onClick={() => handleRemoveFile(2)}>
                  X
                </span>
              </div>
            )}
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

export default Opd;
