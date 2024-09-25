import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <Box sx={{ width: '100%', mb: 2 }}>
            <Typography variant="h6" component="div" gutterBottom>
                Step {currentStep} of {totalSteps}
            </Typography>
            <LinearProgress variant="determinate" value={progress} />
        </Box>
    );
};

export default ProgressBar;
