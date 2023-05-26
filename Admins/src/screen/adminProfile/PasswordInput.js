import { FormControl, IconButton, InputAdornment, InputBase, InputLabel } from "@mui/material";
import React ,{useState} from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordInput = ({labelText,labelID, name, value, onChange,  placeholder}) => {
    const [showPassword, setShowPassword] = useState(false);
   const handleClickShowPassword = () => setShowPassword(!showPassword);

   return (
      <FormControl fullWidth sx={{ bgcolor: "transparent", mt: 1 }}>
         <InputLabel
            component={"label"}
            focused={true}
            sx={{
               transform: "none",
               position: "static",
               bgcolor: "transparent",
               color: "white",
               "&.Mui-focused": { color: "white" },
               "& span": { bgcolor: "transparent", color: "red" },
            }}
            required
            htmlFor={labelID}>
         {labelText}
         </InputLabel>
         <InputBase
            type={showPassword ? "text" : "password"}
            name={name}
            onChange={onChange}
            value={value}
            id={labelID}
            sx={{ padding: "2px 10px", borderRadius: "5px", fontWeight: "500", bgcolor: "white" }}
            placeholder={placeholder}
            required
            endAdornment={
               <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                     {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
               </InputAdornment>
            }
         />
      </FormControl>
   );
};

export default PasswordInput;
