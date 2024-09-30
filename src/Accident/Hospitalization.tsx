// import React, { useState } from 'react';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import DocumentUploader from '../Component/DocumentUploader';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import FilePreviewModal from '../Component/FilePreviewModal';
// import ClearIcon from '@mui/icons-material/Clear';

// interface HospitalizationForm {
//   dateOfAdmission: string;
//   dateOfDischarge: string;
//   claimedAmount: string;
//   isICU: boolean;
//   icuAdmissionDate?: string;
//   icuDischargeDate?: string;
//   diagnosisCard?: File | null;
//   hospitalBill?: File | null;
//   paymentReceipt?: File | null;
//   medicalReports?: File | null;
//   additionalDocuments?: FileList | null;
// }

// interface HospitalizationProps {
//   isOpen: boolean;
//   onToggle: () => void;
//   formData: { hospitalization: HospitalizationForm };
//   setFormData: (data: any) => void;
// }

// const Hospitalization: React.FC<HospitalizationProps> = ({ isOpen, onToggle, formData, setFormData }) => {
//   const [filePreviews, setFilePreviews] = useState<(string | string[] | null)[]>(Array(5).fill(null));
//   const [modalOpen, setModalOpen] = useState(false);
//   const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(null); 

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, files } = e.target;

//     if (name === "additionalDocuments") {
//       setFormData((prev: any) => ({
//         ...prev,
//         hospitalization: { ...prev.hospitalization, [name]: files }
//       }));
//       if (files) {
//         const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
//         setFilePreviews(prev => {
//           const newFilePreviews = [...prev];
//           newFilePreviews[4] = newPreviews; 
//           return newFilePreviews;
//         });
//       }
//     } else {
//       setFormData((prev: any) => ({
//         ...prev,
//         hospitalization: { ...prev.hospitalization, [name]: files ? files[0] : value }
//       }));

//       if (files && files[0]) {
//         const newPreview = URL.createObjectURL(files[0]);
//         setFilePreviews(prev => {
//           const newFilePreviews = [...prev];
//           newFilePreviews[getFileInputIndex(name)] = newPreview;
//           return newFilePreviews;
//         });
//       }
//     }
//   };

//   const openModal = (fileUrl: string) => {
//     setCurrentFileUrl(fileUrl);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setCurrentFileUrl(null);
//   };

//   const handleICUChange = (isICU: boolean) => {
//     setFormData((prev: any) => ({
//       ...prev,
//       hospitalization: { ...prev.hospitalization, isICU }
//     }));
//   };

//   const handleRemoveFile = (index: number, fileIndex?: number) => {
//     const newPreviews = [...filePreviews];

//     if (index === 4 && fileIndex !== undefined) {
//       const updatedPreviews = (newPreviews[index] as string[]).filter((_, i) => i !== fileIndex);
//       newPreviews[index] = updatedPreviews.length > 0 ? updatedPreviews : null;
//     } else {
//       newPreviews[index] = null;
//     }

//     setFilePreviews(newPreviews);
//     setFormData((prev: any) => ({
//       ...prev,
//       hospitalization: { ...prev.hospitalization, [getFileInputName(index)]: null }
//     }));
//   };

//   const getFileInputIndex = (name: string) => {
//     switch (name) {
//       case 'diagnosisCard': return 0;
//       case 'hospitalBill': return 1;
//       case 'paymentReceipt': return 2;
//       case 'medicalReports': return 3;
//       case 'additionalDocuments': return 4;
//       default: return -1;
//     }
//   };

//   const getFileInputName = (index: number) => {
//     switch (index) {
//       case 0: return 'diagnosisCard';
//       case 1: return 'hospitalBill';
//       case 2: return 'paymentReceipt';
//       case 3: return 'medicalReports';
//       case 4: return 'additionalDocuments';
//       default: return '';
//     }
//   };

//   return (
//     <div className="mb-2">
//     <label className="w-full flex justify-between items-center border-2 border-orange-600 px-4 py-2 rounded-md bg-white text-black hover:bg-orange-200 transition duration-200">Hospitalization</label>
//     <div className="mt-1 p-2 border-2 bg-gray-100 rounded-md">
//       <div className="grid grid-cols-2 gap-4">
//         <label>Date of Admission:</label>
//         <div className="flex flex-col">
//           <input 
//             type="date" 
//             name="dateOfAdmission" 
//             value={formData.hospitalization.dateOfAdmission} 
//             onChange={handleChange} 
//             className="border rounded px-2 py-1 placeholder-gray-500"
//             placeholder="Required"
//           />
//           <span className="text-gray-500 text-sm mt-1">* Required</span>
//         </div>

//         <label>Date of Discharge:</label>
//         <div className="flex flex-col">
//           <input 
//             type="date" 
//             name="dateOfDischarge" 
//             value={formData.hospitalization.dateOfDischarge} 
//             onChange={handleChange} 
//             className="border rounded px-2 py-1 placeholder-gray-500"
//             placeholder="Required"
//           />
//           <span className="text-gray-500 text-sm mt-1">* Required</span>
//         </div>

//         <label>Claimed Amount:</label>
//         <div className="flex flex-col">
//           <div className="flex items-center border rounded px-2 py-1">
//             <span className="mr-1">Rs.</span>
//             <input
//               type="text"
//               name="claimedAmount"
//               value={formData.hospitalization.claimedAmount}
//               onChange={handleChange}
//               className="border rounded px-2 py-1 placeholder-gray-500"
//               placeholder="Required"
//             />
//           </div>
//           <span className="text-gray-500 text-sm mt-1">* Required</span>
//         </div>

//         <div className='mb-2'>
//           <label>ICU Treatment:</label>
//         </div>
//         <div>
//           <label>
//             <input
//               type="radio"
//               name="icu-treatment"
//               checked={formData.hospitalization.isICU}
//               onChange={() => handleICUChange(true)}
//             /> Yes
//           </label>
//           <label className="ml-4">
//             <input
//               type="radio"
//               name="icu-treatment"
//               checked={!formData.hospitalization.isICU}
//               onChange={() => handleICUChange(false)}
//             /> No
//           </label>
//         </div>

//         {formData.hospitalization.isICU && (
//           <>
//             <div className="col-span-2 ml-10 flex flex-col">
//               <label>Date Admission to ICU:</label>
//               <input 
//                 type="date" 
//                 name="icuAdmissionDate" 
//                 value={formData.hospitalization.icuAdmissionDate} 
//                 onChange={handleChange} 
//                 className="border rounded px-2 py-1 placeholder-gray-500 ml-20"
//                 placeholder="Required"
//               />
//               <span className="text-gray-500 text-sm mt-1">* Required</span>
//             </div>
//             <div className="col-span-2 ml-10 flex flex-col">
//               <label>Date Discharge from ICU:</label>
//               <input 
//                 type="date" 
//                 name="icuDischargeDate" 
//                 value={formData.hospitalization.icuDischargeDate} 
//                 onChange={handleChange} 
//                 className="border rounded px-2 py-1 placeholder-gray-500 ml-16 mb-4"
//                 placeholder="Required"
//               />
//               <span className="text-gray-500 text-sm mt-1">* Required</span>
//             </div>
//           </>
//         )}


//           <label className="mr-2">Diagnosis Card:</label>
//           <div className="flex items-center mb-2">
//             <input 
//               type="file" 
//               name="diagnosisCard" 
//               onChange={handleChange} 
//               className="border rounded px-2 py-1 w-48" 
//             />
//             {filePreviews[0] && (
//               <div className="flex items-center ml-2">
//                 <button className="text-blue-500 underline flex items-center" onClick={() => openModal(filePreviews[0] as string)}>
//                   <VisibilityIcon className="mr-1" />
//                 </button>
//                 <span className="text-red-500 cursor-pointer ml-2" onClick={() => handleRemoveFile(0)}>
//                   <ClearIcon />
//                 </span>
//               </div>
//             )}
//                 <span className="text-gray-500 text-sm mt-1">* Required</span>
//           </div>

//           <label className="mr-2">Hospital Bill:</label>
//           <div className="flex items-center mb-2">
//             <input 
//               type="file" 
//               name="hospitalBill" 
//               onChange={handleChange} 
//               className="border rounded px-2 py-1 w-48" 
//             />
//             {filePreviews[1] && (
//               <div className="flex items-center ml-2">
//                 <button className="text-blue-500 underline flex items-center" onClick={() => openModal(filePreviews[1] as string)}>
//                   <VisibilityIcon className="mr-1" />
//                 </button>
//                 <span className="text-red-500 cursor-pointer ml-2" onClick={() => handleRemoveFile(1)}>
//                   <ClearIcon />
//                 </span>
//               </div>
//             )}
//                 <span className="text-gray-500 text-sm mt-1">* Required</span>
//           </div>

//           <label className="mr-2">Payment Receipt:</label>
//           <div className="flex items-center mb-2">
//             <input 
//               type="file" 
//               name="paymentReceipt" 
//               onChange={handleChange} 
//               className="border rounded px-2 py-1 w-48" 
//             />
//             {filePreviews[2] && (
//               <div className="flex items-center ml-2">
//                 <button className="text-blue-500 underline flex items-center" onClick={() => openModal(filePreviews[2] as string)}>
//                   <VisibilityIcon className="mr-1" />
//                 </button>
//                 <span className="text-red-500 cursor-pointer ml-2" onClick={() => handleRemoveFile(2)}>
//                   <ClearIcon />
//                 </span>
//               </div>
//             )}
//                 <span className="text-gray-500 text-sm mt-1">* Required</span>
//           </div>

//           <label className="mr-2">Medical Reports:</label>
//           <div className="flex items-center mb-2">
//             <input 
//               type="file" 
//               name="medicalReports" 
//               onChange={handleChange} 
//               className="border rounded px-2 py-1 w-48" 
//             />
//             {filePreviews[3] && (
//               <div className="flex items-center ml-2">
//                 <button className="text-blue-500 underline flex items-center" onClick={() => openModal(filePreviews[3] as string)}>
//                   <VisibilityIcon className="mr-1" />
//                 </button>
//                 <span className="text-red-500 cursor-pointer ml-2" onClick={() => handleRemoveFile(3)}>
//                   <ClearIcon />
//                 </span>
//               </div>
//             )}
//           </div>

//           <label className="mr-2">Additional Documents:</label>
//           <div className="flex items-center mb-2">
//             <input 
//               type="file" 
//               name="additionalDocuments" 
//               onChange={handleChange} 
//               className="border rounded px-2 py-1 w-48" 
//               multiple
//             />
//             {filePreviews[4] && (
//               <div className="flex items-center ml-2">
//                 {Array.isArray(filePreviews[4]) && filePreviews[4].map((preview, index) => (
//                   <div key={index} className="flex items-center ml-2">
//                     <button className="text-blue-500 underline flex items-center" onClick={() => openModal(preview)}>
//                       <VisibilityIcon className="mr-1" />
//                     </button>
//                     <span className="text-red-500 cursor-pointer ml-2" onClick={() => handleRemoveFile(4, index)}>
//                       <ClearIcon />
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <FilePreviewModal isOpen={modalOpen} onClose={closeModal} fileUrl={currentFileUrl} />
//     </div>
//   );
// };

// export default Hospitalization;

import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DocumentUploader from '../Component/DocumentUploader';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilePreviewModal from '../Component/FilePreviewModal';
import ClearIcon from '@mui/icons-material/Clear';

interface HospitalizationForm {
  dateOfAdmission: string;
  dateOfDischarge: string;
  claimedAmount: string;
  isICU: boolean;
  icuAdmissionDate?: string;
  icuDischargeDate?: string;
  diagnosisCard?: File | null;
  hospitalBill?: File | null;
  paymentReceipt?: File | null;
  medicalReports?: File | null;
  additionalDocuments?: FileList | null;
}

interface HospitalizationProps {
  isOpen: boolean;
  onToggle: () => void;
  formData: { hospitalization: HospitalizationForm };
  setFormData: (data: any) => void;
}

const Hospitalization: React.FC<HospitalizationProps> = ({ isOpen, onToggle, formData, setFormData }) => {
  const [filePreviews, setFilePreviews] = useState<(string | string[] | null)[]>(Array(5).fill(null));
  const [modalOpen, setModalOpen] = useState(false);
  const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(null); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "additionalDocuments") {
      setFormData((prev: any) => ({
        ...prev,
        hospitalization: { ...prev.hospitalization, [name]: files }
      }));
      if (files) {
        const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
        setFilePreviews(prev => {
          const newFilePreviews = [...prev];
          newFilePreviews[4] = newPreviews; 
          return newFilePreviews;
        });
      }
    } else {
      setFormData((prev: any) => ({
        ...prev,
        hospitalization: { ...prev.hospitalization, [name]: files ? files[0] : value }
      }));

      if (files && files[0]) {
        const newPreview = URL.createObjectURL(files[0]);
        setFilePreviews(prev => {
          const newFilePreviews = [...prev];
          newFilePreviews[getFileInputIndex(name)] = newPreview;
          return newFilePreviews;
        });
      }
    }
  };

  const openModal = (fileUrl: string) => {
    setCurrentFileUrl(fileUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentFileUrl(null);
  };

  const handleICUChange = (isICU: boolean) => {
    setFormData((prev: any) => ({
      ...prev,
      hospitalization: { ...prev.hospitalization, isICU }
    }));
  };

  const handleRemoveFile = (index: number, fileIndex?: number) => {
    const newPreviews = [...filePreviews];

    if (index === 4 && fileIndex !== undefined) {
      const updatedPreviews = (newPreviews[index] as string[]).filter((_, i) => i !== fileIndex);
      newPreviews[index] = updatedPreviews.length > 0 ? updatedPreviews : null;
    } else {
      newPreviews[index] = null;
    }

    setFilePreviews(newPreviews);
    setFormData((prev: any) => ({
      ...prev,
      hospitalization: { ...prev.hospitalization, [getFileInputName(index)]: null }
    }));
  };

  const getFileInputIndex = (name: string) => {
    switch (name) {
      case 'diagnosisCard': return 0;
      case 'hospitalBill': return 1;
      case 'paymentReceipt': return 2;
      case 'medicalReports': return 3;
      case 'additionalDocuments': return 4;
      default: return -1;
    }
  };

  const getFileInputName = (index: number) => {
    switch (index) {
      case 0: return 'diagnosisCard';
      case 1: return 'hospitalBill';
      case 2: return 'paymentReceipt';
      case 3: return 'medicalReports';
      case 4: return 'additionalDocuments';
      default: return '';
    }
  };

  return (
    <div className="mb-2">
      <label className="w-full flex justify-between items-center border-2 border-orange-600 px-4 py-2 rounded-md bg-white text-black hover:bg-orange-200 transition duration-200">Hospitalization</label>
      <div className="mt-1 p-2 border-2 bg-gray-100 rounded-md">
        <div className="grid grid-cols-2 gap-4">
          <label>Date of Admission:</label>
          <div className="flex flex-col">
            <input 
              type="date" 
              name="dateOfAdmission" 
              value={formData.hospitalization.dateOfAdmission} 
              onChange={handleChange} 
              className="border rounded px-2 py-1 placeholder-gray-500"
              placeholder="Required"
            />
            <span className="text-gray-500 text-sm mt-1">* Required</span>
          </div>

          <label>Date of Discharge:</label>
          <div className="flex flex-col">
            <input 
              type="date" 
              name="dateOfDischarge" 
              value={formData.hospitalization.dateOfDischarge} 
              onChange={handleChange} 
              className="border rounded px-2 py-1 placeholder-gray-500"
              placeholder="Required"
            />
            <span className="text-gray-500 text-sm mt-1">* Required</span>
          </div>

          <label>Claimed Amount:</label>
          <div className="flex flex-col">
            <div className="flex items-center border rounded px-2 py-1">
              <span className="mr-1">Rs.</span>
              <input
                type="text"
                name="claimedAmount"
                value={formData.hospitalization.claimedAmount}
                onChange={handleChange}
                className="border rounded px-2 py-1 placeholder-gray-500"
                placeholder="Required"
              />
            </div>
            <span className="text-gray-500 text-sm mt-1">* Required</span>
          </div>

          <div className='mb-2'>
            <label>ICU Treatment:</label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="icu-treatment"
                checked={formData.hospitalization.isICU}
                onChange={() => handleICUChange(true)}
              /> Yes
            </label>
            <label className="ml-4">
              <input
                type="radio"
                name="icu-treatment"
                checked={!formData.hospitalization.isICU}
                onChange={() => handleICUChange(false)}
              /> No
            </label>
          </div>

          {formData.hospitalization.isICU && (
            <>
              <div className="col-span-2 ml-10 flex flex-col">
                <label>Date Admission to ICU:</label>
                <input 
                  type="date" 
                  name="icuAdmissionDate" 
                  value={formData.hospitalization.icuAdmissionDate} 
                  onChange={handleChange} 
                  className="border rounded px-2 py-1 placeholder-gray-500 ml-20"
                  placeholder="Required"
                />
                <span className="text-gray-500 text-sm mt-1">* Required</span>
              </div>
              <div className="col-span-2 ml-10 flex flex-col">
                <label>Date Discharge from ICU:</label>
                <input 
                  type="date" 
                  name="icuDischargeDate" 
                  value={formData.hospitalization.icuDischargeDate} 
                  onChange={handleChange} 
                  className="border rounded px-2 py-1 placeholder-gray-500 ml-16 mb-4"
                  placeholder="Required"
                />
                <span className="text-gray-500 text-sm mt-1">* Required</span>
              </div>
            </>
          )}

          <label className="mr-2">Diagnosis Card:</label>
          <div className="flex items-center mb-2">
            <input 
              type="file" 
              name="diagnosisCard" 
              onChange={handleChange} 
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
            )}
            {!filePreviews[0] && (
              <span className="text-gray-500 text-sm mt-1">* Required</span>
            )}
          </div>

          <label className="mr-2">Hospital Bill:</label>
          <div className="flex items-center mb-2">
            <input 
              type="file" 
              name="hospitalBill" 
              onChange={handleChange} 
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
            )}
            {!filePreviews[1] && (
              <span className="text-gray-500 text-sm mt-1">* Required</span>
            )}
          </div>

          <label className="mr-2">Payment Receipt:</label>
          <div className="flex items-center mb-2">
            <input 
              type="file" 
              name="paymentReceipt" 
              onChange={handleChange} 
              className="border rounded px-2 py-1 w-48" 
            />
            {filePreviews[2] && (
              <div className="flex items-center ml-2">
                <button className="text-blue-500 underline flex items-center" onClick={() => openModal(filePreviews[2] as string)}>
                  <VisibilityIcon className="mr-1" />
                </button>
                <span className="text-red-500 cursor-pointer ml-2" onClick={() => handleRemoveFile(2)}>
                  <ClearIcon />
                </span>
              </div>
            )}
            {!filePreviews[2] && (
              <span className="text-gray-500 text-sm mt-1">* Required</span>
            )}
          </div>

          <label className="mr-2">Medical Reports:</label>
          <div className="flex items-center mb-2">
            <input 
              type="file" 
              name="medicalReports" 
              onChange={handleChange} 
              className="border rounded px-2 py-1 w-48" 
            />
            {filePreviews[3] && (
              <div className="flex items-center ml-2">
                <button className="text-blue-500 underline flex items-center" onClick={() => openModal(filePreviews[3] as string)}>
                  <VisibilityIcon className="mr-1" />
                </button>
                <span className="text-red-500 cursor-pointer ml-2" onClick={() => handleRemoveFile(3)}>
                  <ClearIcon />
                </span>
              </div>
            )}
            {!filePreviews[3] && (
              <span className="text-gray-500 text-sm mt-1">* Required</span>
            )}
          </div>

          <label className="mr-2">Additional Documents:</label>
          <div className="flex items-center mb-2">
            <input 
              type="file" 
              name="additionalDocuments" 
              multiple 
              onChange={handleChange} 
              className="border rounded px-2 py-1 w-48" 
            />
            {filePreviews[4] && (
              <div className="flex items-center ml-2">
                <button className="text-blue-500 underline flex items-center" onClick={() => openModal(filePreviews[4] as string)}>
                  <VisibilityIcon className="mr-1" />
                </button>
                <span className="text-red-500 cursor-pointer ml-2" onClick={() => handleRemoveFile(4)}>
                  <ClearIcon />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <FilePreviewModal isOpen={modalOpen} onClose={closeModal} fileUrl={currentFileUrl} />
    </div>
  );
};

export default Hospitalization;

