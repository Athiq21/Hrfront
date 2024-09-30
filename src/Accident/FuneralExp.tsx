import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DocumentUploader from '../Component/DocumentUploader';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';

interface FuneralExpProps {
  isOpen: boolean;
  onToggle: () => void;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const FuneralExp: React.FC<FuneralExpProps> = ({ isOpen, onToggle, formData, setFormData }) => {
  const [files, setFiles] = useState<(File | null)[]>(Array(3).fill(null));
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      funeralExp: {
        ...prevFormData.funeralExp,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const selectedFiles = Array.from(event.target.files || []);
    const newFiles = [...files];

    if (index < files.length) {
      newFiles[index] = selectedFiles[0] || null;
      setFiles(newFiles);

      setFormData((prevFormData: any) => ({
        ...prevFormData,
        funeralExp: {
          ...prevFormData.funeralExp,
          [index === 0 ? 'DeathCert' : index === 1 ? 'NicCopy' : 'Proof']: selectedFiles[0] || null,
        },
      }));
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles[index] = null;
    setFiles(newFiles);

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      funeralExp: {
        ...prevFormData.funeralExp,
        [index === 0 ? 'DeathCert' : index === 1 ? 'NicCopy' : 'Proof']: null,
      },
    }));
  };

  const handleViewFile = (index: number) => {
    if (files[index]) {
      const fileUrl = URL.createObjectURL(files[index] as File);
      setCurrentImage(fileUrl);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentImage(null);
  };

  return (
    <div className="mb-2">
        <label className="w-full flex justify-between items-center border-2 border-orange-600 px-4 py-2 rounded-md bg-white text-black hover:bg-orange-200 transition duration-200">Funeral Expenses</label>
      
      {/* <button
        className="w-full flex justify-between items-center border-2 border-orange-600 px-4 py-2 rounded-md bg-white text-black hover:bg-orange-200 transition duration-200"
        onClick={onToggle}
      >
        <span className="flex items-center">Funeral Expenses</span>
        <KeyboardArrowDownIcon className="ml-2" />
      </button>
      {isOpen && ( */}
        <div className="mt-1 p-2 border-2 bg-gray-100 bg-white rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <label>Member's Name in Full:</label>
            <input
              type="text"
              name="membersName"
              value={formData.funeralExp.membersName}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            />
            <label>EPF No:</label>
            <input
              type="text"
              name="EpfNo"
              value={formData.funeralExp.EpfNo}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            />
            <label>Relationship to the Deceased:</label>
            <input
              type="text"
              name="Relationship"
              value={formData.funeralExp.Relationship}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            />
            <label>Deceased’s Name:</label>
            <input
              type="text"
              name="DeceasedName"
              value={formData.funeralExp.DeceasedName}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            />
            <label>Age at Death:</label>
            <input
              type="text"
              name="ageOfDate"
              value={formData.funeralExp.ageOfDate}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            />
            <label>Claim Cheque should be drawn in favour of below name:</label>
            <input
              type="text"
              name="ClaimCheque"
              value={formData.funeralExp.ClaimCheque}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            />
            <div className="col-span-2 text-center border-b-2 border-black my-1 w-24">
              <span className="font-semibold">Claim Form</span>
            </div>

            <label>Death Certificate:</label>
            <div className="relative">
              <input
                type="file"
                className="border rounded px-2 py-1 w-48"
                onChange={(e) => handleFileChange(e, 0)}
              />
              {files[0] && (
                <div className="absolute top-0 right-0 flex items-center">
                  <span className="flex items-center text-blue-500 cursor-pointer" onClick={() => handleViewFile(0)}>
                    <VisibilityIcon className="mr-1" />
                  </span>
                  <ClearIcon
                    className="text-red-500 cursor-pointer ml-2"
                    onClick={() => handleRemoveFile(0)}
                  />
                </div>
              )}
            </div>

            <label>NIC Copy of the Deceased Person:</label>
            <div className="relative">
              <input
                type="file"
                className="border rounded px-2 py-1 w-48"
                onChange={(e) => handleFileChange(e, 1)}
              />
              {files[1] && (
                <div className="absolute top-0 right-0 flex items-center">
                  <span className="flex items-center text-blue-500 cursor-pointer" onClick={() => handleViewFile(1)}>
                    <VisibilityIcon className="mr-1" />
                  </span>
                  <ClearIcon
                    className="text-red-500 cursor-pointer ml-2"
                    onClick={() => handleRemoveFile(1)}
                  />
                </div>
              )}
            </div>

            <label>Proof of Relationship to the Deceased (Birth/Marriage Certificate etc):</label>
            <div className="relative">
              <input
                type="file"
                className="border rounded px-2 py-1 w-48"
                onChange={(e) => handleFileChange(e, 2)}
                multiple
              />
              {files[2] && (
                <div className="absolute top-0 right-0 flex items-center">
                  <span className="flex items-center text-blue-500 cursor-pointer" onClick={() => handleViewFile(2)}>
                    <VisibilityIcon className="mr-1" />
                  </span>
                  <ClearIcon
                    className="text-red-500 cursor-pointer ml-2"
                    onClick={() => handleRemoveFile(2)}
                  />
                </div>
              )}
            </div>

            <label className="mr-2">Additional Documents:</label>
            <DocumentUploader />
          </div>
        </div>
      {/* )} */}

      {/* Modal for viewing images */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <button onClick={handleCloseModal} className="absolute top-2 right-2">
              <ClearIcon />
            </button>
            {currentImage && (
              <img src={currentImage} alt="Preview" className="max-w-full max-h-full" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FuneralExp;
