// // src/Component/DropDown.tsx
// import React from "react";
// import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// interface DropDownProps {
//   label: string;
//   options: string[];
//   selectedOption: string;
//   onOptionChange: (option: string) => void;
// }

// const DropDown: React.FC<DropDownProps> = ({
//   label,
//   options,
//   selectedOption,
//   onOptionChange,
// }) => {
//   return (
//     <FormControl fullWidth variant="outlined" className="mb-4">
//       <InputLabel id={`${label}-label`} sx={{ color: "gray" }}>
//         {label}
//       </InputLabel>
//       <Select
//         labelId={`${label}-label`}
//         value={selectedOption}
//         onChange={(e) => onOptionChange(e.target.value)}
//         className="text-black bg-white"
//         IconComponent={KeyboardArrowDownIcon}
//         sx={{
//           borderRadius: "8px",
//           border: "1px solid #ccc",
//           "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//             borderColor: "orange",
//           },
//           "&:hover .MuiOutlinedInput-notchedOutline": {
//             borderColor: "orange",
//           },
//           "& .MuiSelect-icon": {
//             color: "orange",
//           },
//         }}
//       >
//         {options.map((option, index) => (
//           <MenuItem key={index} value={option}>
//             {option}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// };

// export default DropDown;
// src/Component/DropDown.tsx
import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface DropDownProps {
  label: string;
  options: string[];
  selectedOption: string;
  onOptionChange: (option: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  label,
  options,
  selectedOption,
  onOptionChange,
}) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id={`${label}-label`} sx={{ color: "gray" }}>
        {label}
      </InputLabel>
      <Select
        labelId={`${label}-label`}
        value={selectedOption}
        onChange={(e) => onOptionChange(e.target.value)}
        className="text-black bg-white"
        IconComponent={KeyboardArrowDownIcon}
        sx={{
          borderRadius: "8px",
          border: "1px solid #ccc",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "orange",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "orange",
          },
          "& .MuiSelect-icon": {
            color: "orange",
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDown;
