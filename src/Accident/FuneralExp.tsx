import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DocumentUploader from '../Component/DocumentUploader';


interface FuneralExpProps {
  isOpen: boolean;
  onToggle: () => void;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const FuneralExp: React.FC<FuneralExpProps> = ({ isOpen, onToggle, formData, setFormData }) => {
  const [files, setFiles] = useState<(File | null)[]>(Array(3).fill(null)); // Adjust based on how many file inputs you have

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
      newFiles[index] = selectedFiles[0] || null; // Store single file or null
      setFiles(newFiles);

      // Update the formData state in the parent component for the file inputs
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
    newFiles[index] = null; // Remove the file
    setFiles(newFiles);

    // Update the formData state in the parent component to remove the file
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      funeralExp: {
        ...prevFormData.funeralExp,
        [index === 0 ? 'DeathCert' : index === 1 ? 'NicCopy' : 'Proof']: null,
      },
    }));
  };

  return (
    <div className="mb-2">
      <button
        className="w-full flex justify-between items-center border-2 border-orange-600 px-4 py-2 rounded-md bg-white text-black hover:bg-orange-200 transition duration-200"
        onClick={onToggle}
      >
        <span className="flex items-center">Funeral Expenses</span>
        <KeyboardArrowDownIcon className="ml-2" />
      </button>
      {isOpen && (
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
            <input
              type="file"
              className="border rounded px-2 py-1"
              onChange={(e) => handleFileChange(e, 0)}
            />
            {files[0] && (
              <div className="relative mt-2 flex items-center">
                <span className="absolute top-0 right-0 text-red-500 cursor-pointer" onClick={() => handleRemoveFile(0)}>
                  X
                </span>
              </div>
            )}
            <label>NIC Copy of the Deceased Person:</label>
            <input
              type="file"
              className="border rounded px-2 py-1"
              onChange={(e) => handleFileChange(e, 1)}
            />
            {files[1] && (
              <div className="relative mt-2 flex items-center">
                <span className="absolute top-0 right-0 text-red-500 cursor-pointer" onClick={() => handleRemoveFile(1)}>
                  X
                </span>
              </div>
            )}
            <label>Proof of Relationship to the Deceased (Birth/Marriage Certificate etc):</label>
            <input
              type="file"
              className="border rounded px-2 py-1"
              onChange={(e) => handleFileChange(e, 2)}
              multiple
            />
            {files[2] && (
              <div className="relative mt-2 flex items-center">
                <span className="absolute top-0 right-0 text-red-500 cursor-pointer" onClick={() => handleRemoveFile(2)}>
                  X
                </span>
              </div>
            )}
            <label className="mr-2">Additional Documents:</label>
            <DocumentUploader />
          </div>
        </div>
      )}
    </div>
  );
};

export default FuneralExp;