// StepC.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hospitalization from '../Accident/Hospitalization';
import Opd from '../Accident/Opd';
import Spectacles from '../Accident/Spectacles';
import ProgressBar from '../Component/Progress';
import Dental from '../Accident/Dental';
import PersonalAccident from '../Accident/PersonalAccident';
import CriticalIllness from '../Accident/CriticalIllness';
import FuneralExp from '../Accident/FuneralExp';
import Next from '../Component/Next';
import ClearButton from '../Component/ClearButton';
import Previous from '../Component/Previous';

const StepC: React.FC = () => {
  const location = useLocation();
  const { tempData, claimType } = location.state as { tempData: any; claimType: string };
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hospitalization: {
      dateOfAdmission: '',
      dateOfDischarge: '',
      claimedAmount: '',
      icuAdmissionDate: '',
      icuDischargeDate: '',
      diagnosisCard: null,
      hospitalBill: null,
      paymentReceipt: null,
      medicalReports: null,
      additionalDocuments: null,
      isICU: false,
    },
    opd: { 
      dateOfDiagnosis: '', 
      claimedAmountopd: '',
      prescription: null,
      originalPaymentRec: null
    },
    spectacles: { 
      dateOfDiagnosisspe:'',
      claimedAmountspe:'',
      prescription:'',
      originalPaymentRecspe:''
     },



    dental: {
      dateOfDiagnosis:'',
      claimedAmount:'',
      prescription:null,
      originalPaymentReceipt:null
     },

    personalAccident: { 
      dateOfAccident:'',
      diagnosisCard:null,
      medicalAttendantCard:null,
      birthCertificate:null,
      policeReport:null
    },


    criticalIllness: { 
      dateOfDiagnosis:'',
      diagnosisCard:null,
      medicalAttendantCard:null,
     },
    funeralExp: {
      membersName:'',
      EpfNo:'',
      Relationship:'',
      DeceasedName:'',
      ageOfDate:'',
      ClaimCheque:'',

      DeathCert:null,
      NicCopy:null,
      Proof:null,
     },
  });

  const [isOpen, setIsOpen] = useState({
    opd: false,
    hospitalization: false,
    spectacles: false,
    dental: false,
    personalAccident: false,
    criticalIllness: false,
    funeralExp: false,
  });

  useEffect(() => {
    const savedData = localStorage.getItem('hospitalizationFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hospitalizationFormData', JSON.stringify(formData));
  }, [formData]);

  const handleToggle = (type: string) => {
    setIsOpen((prev) => ({ ...prev, 
      // [
        type
      // ]: !prev[type] 
    }));
  };
  

  console.log('Hospitalization:', formData.hospitalization);
  console.log('OPD:', formData.opd);
  console.log('Spectacles', formData.spectacles)
  console.log('Dental', formData.dental)
  console.log('personalAccident', formData.personalAccident)
  console.log('criticalIllness',formData.criticalIllness)
  console.log('funeralexp',formData.funeralExp)

  const isNextDisabled = () => {
    switch (claimType) {
      case 'Hospitalization':
        return !formData.hospitalization.dateOfAdmission || 
               !formData.hospitalization.dateOfDischarge ||
               !formData.hospitalization.claimedAmount ||
               !formData.hospitalization.diagnosisCard ||
               !formData.hospitalization.hospitalBill ||
               !formData.hospitalization.paymentReceipt;

      case 'OPD':
        return !formData.opd.claimedAmountopd || 
               !formData.opd.dateOfDiagnosis || 
               !formData.opd.prescription ||
               !formData.opd.originalPaymentRec;

      case 'Spectacles':
        return !formData.spectacles.claimedAmountspe ||
        !formData.spectacles.dateOfDiagnosisspe||
        !formData.spectacles.originalPaymentRecspe||
        !formData.spectacles.prescription;

      case 'Dental':
        return !formData.dental.dateOfDiagnosis||
        !formData.dental.claimedAmount ||
        !formData.dental.prescription||
        !formData.dental.originalPaymentReceipt;

      case 'Personal Accident Cover':
        return !formData.personalAccident.dateOfAccident||
        !formData.personalAccident.birthCertificate||
        !formData.personalAccident.diagnosisCard||
        !formData.personalAccident.medicalAttendantCard;

      case 'Critical Illness':
        return !formData.criticalIllness.dateOfDiagnosis||
        !formData.criticalIllness.diagnosisCard||
        !formData.criticalIllness.medicalAttendantCard;

      case 'Funeral Expenses':
        return !formData.funeralExp.membersName||
        !formData.funeralExp.EpfNo||
        !formData.funeralExp.Relationship||
        !formData.funeralExp.DeceasedName||
        !formData.funeralExp.ageOfDate||
        !formData.funeralExp.ClaimCheque||

        !formData.funeralExp.DeathCert||
        !formData.funeralExp.NicCopy||
        !formData.funeralExp.Proof;

      default:
        return true; 
    }
  };

  const handleNext = () => {
    navigate('/step-d'); 
  };

  const handleClear = () => {
    setFormData({
      hospitalization: {
        dateOfAdmission: '',
        dateOfDischarge: '',
        claimedAmount: '',
        icuAdmissionDate: '',
        icuDischargeDate: '',
        diagnosisCard: null,
        hospitalBill: null,
        paymentReceipt: null,
        medicalReports: null,
        additionalDocuments: null,
        isICU: false,
      },
      opd: { 
        dateOfDiagnosis: '',
        claimedAmountopd: '',
        prescription: null,
        originalPaymentRec: null
      },
      spectacles: { 
        dateOfDiagnosisspe: '',
        claimedAmountspe: '',
        prescription: '',
        originalPaymentRecspe: ''
      },
      dental: {
        dateOfDiagnosis: '',
        claimedAmount: '',
        prescription: null,
        originalPaymentReceipt: null
      },
      personalAccident: { 
        dateOfAccident: '',
        diagnosisCard: null,
        medicalAttendantCard: null,
        birthCertificate: null,
        policeReport: null
      },
      criticalIllness: { 
        dateOfDiagnosis: '',
        diagnosisCard: null,
        medicalAttendantCard: null,
      },
      funeralExp: {
        membersName: '',
        EpfNo: '',
        Relationship: '',
        DeceasedName: '',
        ageOfDate: '',
        ClaimCheque: '',
        DeathCert: null,
        NicCopy: null,
        Proof: null,
      },
    });
    setIsOpen({
      opd: false,
      hospitalization: false,
      spectacles: false,
      dental: false,
      personalAccident: false,
      criticalIllness: false,
      funeralExp: false,
    });
  };
  

  return (
    <div className="bg-gray-100 p-5 rounded-lg shadow-lg max-w-2xl mx-auto w-full h-[550px] overflow-y-auto mt-10">
      <ProgressBar currentStep={3} totalSteps={4} />
      <Previous/>
      <h4 className="text-xl font-bold mb-4">Enter Claim Details</h4>

      {claimType === 'Hospitalization' && (
        <Hospitalization 
          isOpen={isOpen.hospitalization}  
          onToggle={() => handleToggle('hospitalization')}  
          formData={formData} 
          setFormData={setFormData} 
        />
      )}
      {claimType === 'OPD' && (
        <Opd 
          isOpen={isOpen.opd} 
          onToggle={() => handleToggle('opd')} 
          formData={formData} 
          setFormData={setFormData} 
        />
      )}
      {claimType === 'Spectacles' && (
        <Spectacles 
          isOpen={isOpen.spectacles}  
          onToggle={() => handleToggle('spectacles')}  
          formData={formData} 
          setFormData={setFormData} 
        />
      )}
      {claimType === 'Dental' && (
        <Dental 
          isOpen={isOpen.dental} 
          onToggle={() => handleToggle('dental')} 
          formData={formData} 
          setFormData={setFormData} 
        />
      )}
      {claimType === 'Personal Accident Cover' && (
        <PersonalAccident
          isOpen={isOpen.personalAccident}
          onToggle={() => handleToggle('personalAccident')}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {claimType === 'Critical Illness' && (
        <CriticalIllness 
          isOpen={isOpen.criticalIllness}
          onToggle={() => handleToggle('criticalIllness')}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {claimType === 'Funeral Expenses' && (
        <FuneralExp
          isOpen={isOpen.funeralExp}
          onToggle={() => handleToggle('funeralExp')}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      <div className="flex justify-between mt-7 px-10">
        <div className="mr-2">
          <ClearButton onClear={handleClear} />
        </div>
        <div className="ml-2">
          <Next
            tempData=""
            setTempData={() => {}}
            currentStep={3}
            totalSteps={4}
            disabled={isNextDisabled()}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default StepC;
