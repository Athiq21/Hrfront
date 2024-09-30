import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StepA from './Pages/StepA';
import StepB from './Pages/StepB';
import StepC from './Pages/StepC'; // Assuming you have a StepC component
import StepD from './Pages/StepD'; 

function App() {
    const [tempData, setTempData] = useState<string>('');
    const [currentStep, setCurrentStep] = useState(1); // State to track the current step
    const totalSteps = 3; // Total number of steps

    const nextStep = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps));
    };

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<StepA setTempData={setTempData} onNext={nextStep} />} />
                    <Route path="/step-b" element={<StepB tempData={tempData} setTempData={setTempData} onNext={nextStep} />} />
                    <Route path="/step-c" element={<StepC tempData={tempData} setTempData={setTempData} onNext={nextStep} />} />
                    <Route path="/step-d" element={<StepD tempData={tempData} setTempData={setTempData} onNext={nextStep} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
