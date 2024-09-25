// src/Pages/StepB.tsx
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Next from '../Component/Next';
import TextField from '../Component/TextField';
import DropDown from '../Component/DropDown';
import { useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from '../Component/Progress';

const StepB: React.FC = () => {
    const location = useLocation(); // Get the current location
    const navigate = useNavigate(); // For navigation
    const { tempData } = location.state as { tempData: { insured: string; claimType: string } }; // Extract tempData

    // Local state to hold form data
    const [policyNumber, setPolicyNumber] = useState<string>('');
    const [insuredNumber, setInsuredNumber] = useState<string>('');
    const [telephoneNumber, setTelephoneNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [patientName, setPatientName] = useState<string>('');
    const [selectedInsured, setSelectedInsured] = useState<string>(tempData.insured);
    const [selectedClaimType, setSelectedClaimType] = useState<string>(tempData.claimType);
    const [Bank, setBank] = useState<string>('');
    const [Branch, setBranch] = useState<string>('');
    const [Accnumber, setAccnumber] = useState<string>('');
    const [Accholder, setAccholder] = useState<string>('');
  
    const insuredPeopleOptions = ['John Doe', 'Jane Smith', 'Alice Johnson']; // Example insured people options

    // Update insured selection
    const handleInsuredChange = (option: string) => {
        setSelectedInsured(option);
    };

    // Handle Next navigation
    const handleNext = () => {
        const newTempData = {
            insured: selectedInsured,
            claimType: selectedClaimType,
            policyNumber,
            insuredNumber,
            telephoneNumber,
            email,
            patientName,
            Bank,
            Branch,
            Accnumber,
            Accholder
        };

        // Log the data being sent to Step C
        console.log('Data sent to Step C:', newTempData);
        
        navigate('/step-c', { state: { tempData: newTempData } }); // Navigate to Step C
    };

    const isNextDisabled = !policyNumber || !insuredNumber || !telephoneNumber || !email || !patientName
    || !Bank || !Branch || !Accnumber || !Accholder;

    return (
        <Card
            sx={{
                backgroundColor: "#f5f5f5",
                padding: 5,
                borderRadius: 2,
                boxShadow: 3,
                maxWidth: 700,
                width: '100%',
                height: 'auto',
                margin: "0 auto",
                position: 'relative',
                overflowY: 'auto'
            }}
        >
            <CardContent>
            <ProgressBar currentStep={2} totalSteps={4} />
                <Typography variant="h4" component="h1" gutterBottom>
                    Step 2
                </Typography>

                {/* Input Fields */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1px' }}>
                    <Typography variant="body1" component="div" sx={{ marginRight: 5 }}>
                        Policy Number
                    </Typography>
                    <TextField value={policyNumber} onChange={(e) => setPolicyNumber(e.target.value)} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1px' }}>
                    <Typography variant="body1" component="div" sx={{ marginRight: 5 }}>
                        Insured Number
                    </Typography>
                    <TextField value={insuredNumber} onChange={(e) => setInsuredNumber(e.target.value)} />
                </div>
             
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1px' }}>
                    <Typography variant="body1" component="div" sx={{ marginRight: 5 }}>
                        Telephone Number
                    </Typography>
                    <TextField value={telephoneNumber} onChange={(e) => setTelephoneNumber(e.target.value)} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1px' }}>
                    <Typography variant="body1" component="div" sx={{ marginRight: 5 }}>
                        Email
                    </Typography>
                    <TextField value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1px' }}>
                    <Typography variant="body1" component="div" sx={{ marginRight: 5 }}>
                        Name of Patient
                    </Typography>
                    <TextField value={patientName} onChange={(e) => setPatientName(e.target.value)} />
                </div>
             
                <div className="flex items-center mb-4">
                    <Typography variant="body1" component="div" className="mr-3">
                        Claim request for
                    </Typography>
                    <DropDown
                        label="Select Insured People"
                        options={insuredPeopleOptions}
                        selectedOption={selectedInsured}
                        onOptionChange={handleInsuredChange}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1px' }}>
                    <Typography variant="body1" component="div" sx={{ marginRight: 5 }}>
                        Bank
                    </Typography>
                    <TextField value={Bank} onChange={(e) => setBank(e.target.value)} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1px' }}>
                    <Typography variant="body1" component="div" sx={{ marginRight: 5 }}>
                        Branch
                    </Typography>
                    <TextField value={Branch} onChange={(e) => setBranch(e.target.value)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1px' }}>
                    <Typography variant="body1" component="div" sx={{ marginRight: 5 }}>
                        Account Number
                    </Typography>
                    <TextField value={Accnumber} onChange={(e) => setAccnumber(e.target.value)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1px' }}>
                    <Typography variant="body1" component="div" sx={{ marginRight: 5 }}>
                        Account Holder
                    </Typography>
                    <TextField value={Accholder} onChange={(e) => setAccholder(e.target.value)} />
                </div>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <Next 
                        tempData="" // Provide tempData if needed
                        setTempData={() => {}} // You can remove this if not used
                        currentStep={2} // Update with the correct step
                        totalSteps={4} // Update with the total number of steps
                        disabled={isNextDisabled} // Disable if any required fields are empty
                        onClick={handleNext} // Add onClick handler to navigate to Step C
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default StepB;






// // src/Pages/StepB.tsx
// import React, { useState } from 'react';
// import { Card, CardContent, Typography } from '@mui/material';
// import Next from '../Component/Next';
// import TextField from '../Component/TextField';
// import DropDown from '../Component/DropDown';
// import { useLocation } from 'react-router-dom';
  
// interface StepBProps {
//   setTempData: React.Dispatch<React.SetStateAction<string>>;
//   policyNumber: string; // Prop to hold the policy number
//   insuredName: string; // Prop to hold the insured name
//   claimType: string;
// }

// const StepB: React.FC<StepBProps> = ({ setTempData, policyNumber, insuredName, claimType }) => {
//   const location = useLocation(); // Get the current location
//   const [selectedInsured, setSelectedInsured] = useState<string>(''); // State for insured people selection

//   const insuredPeopleOptions = ['John Doe', 'Jane Smith', 'Alice Johnson']; // Example insured people options

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setTempData(event.target.value);
//   };

//   const handleInsuredChange = (option: string) => {
//     setSelectedInsured(option);
//     setTempData(option);
//   };

//   return (
//     <Card className="bg-gray-100 p-5 rounded-lg shadow-md max-w-lg mx-auto h-auto overflow-y-auto">
//       <CardContent>
//         <Typography variant="h4" component="h1" className="mb-4">
//           Step 2
//         </Typography>

//         {/* Auto-filled Policy Number */}
//         <div className="flex items-center mb-4">
//           <Typography variant="body1" component="div" className="mr-3 whitespace-nowrap">
//             Policy Number
//           </Typography>
//           <TextField
//             value={policyNumber} // Set value from props
//             onChange={handleChange} // Handle change, but this will be read-only
//             placeholder="Auto-filled"
//             disabled // Make it read-only
//           />
//         </div>

//         {/* Auto-filled Insured Name */}
//         <div className="flex items-center mb-4">
//           <Typography variant="body1" component="div" className="mr-3 whitespace-nowrap">
//             Insured Name
//           </Typography>
//           <TextField
//             value={insuredName} // Set value from props
//             onChange={handleChange} // Handle change, but this will be read-only
//             placeholder="Auto-filled"
//             disabled 
//           />
//         </div>

//         {/* Remaining Form Fields */}
//         {[
//           { label: "Telephone Number", placeholder: "Enter telephone number" },
//           { label: "Email", placeholder: "Enter email" },
//           { label: "Name of Patient", placeholder: "Enter patient's name" },
//           { label: "Bank", placeholder: "Enter bank name" },
//           { label: "Branch", placeholder: "Enter branch" },
//           { label: "Account Number", placeholder: "Enter account number" },
//           { label: "Account Holder", placeholder: "Enter account holder's name" },
//         ].map((field, index) => (
//           <div key={index} className="flex items-center mb-4">
//             <Typography variant="body1" component="div" className="mr-3 whitespace-nowrap">
//               {field.label}
//             </Typography>
//             <TextField
//               placeholder={field.placeholder}
//               value="" // Add state management for the TextField value if needed
//               onChange={handleChange} // Handle change for each TextField
//             />
//           </div>
//         ))}

//         {/* Claim request for Dropdown */}
//         <div className="flex items-center mb-4">
//           <Typography variant="body1" component="div" className="mr-3 whitespace-nowrap">
//             Claim request for
//           </Typography>
//           <DropDown
//             label="Select Insured People"
//             options={insuredPeopleOptions}
//             selectedOption={selectedInsured}
//             onOptionChange={handleInsuredChange}
//           />
//         </div>

//         <Next 
//           tempData="" // Provide tempData if needed
//           setTempData={setTempData}
//           currentStep={2} // Update with the correct step
//           totalSteps={4} // Update with the total number of steps
//           disabled={true}
//         />
//       </CardContent>
//     </Card>
//   );
// };

// export default StepB;
