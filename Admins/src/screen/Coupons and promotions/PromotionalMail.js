import { Box, Button, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";

const PromotionalMail = () => {
   const navigate = useNavigate();
   const [type, setType] = React.useState(() => "mail");
   const [value, setValue] = useState({});
   const handleDevices = (event, newDevices) => {
      if (newDevices?.length) {
         setType(newDevices);
      }
   };
   const handleChange = (e) => {
      setValue({ ...value, [e.target.name]: e.target.value });
   };
   const saveEmail = (e) => {
      e.preventDefault()
      sessionStorage.clear();
      sessionStorage.setItem("email", JSON.stringify(value));
      navigate("/admin/send-promotion-message");
   };

   const saveMessage = (e) => {
      e.preventDefault()
      sessionStorage.clear();
      sessionStorage.setItem("message", JSON.stringify(value));
      navigate("/admin/send-promotion-message");
   };
   return (
      <Stack direction={"column"} spacing={1} paddingX={"20px"}>
         <Typography
            variant="h1"
            align="center"
            fontWeight="800"
            fontSize={"28px"}
            mb={1}
            sx={{
               color: "#795da8",
               width: "100%",
            }}>
            Send Promotions
         </Typography>
         <Stack spacing={1} component={"form"}  onSubmit={type === "mail" ? saveEmail : saveMessage}>
            <ToggleButtonGroup value={type} onChange={handleDevices} aria-label="device" exclusive>
               <ToggleButton
                  value="mail"
                  aria-label="mail"
                  sx={{
                     "&.MuiToggleButton-root": {
                        color: "black",
                     },
                     "&.Mui-selected": {
                        backgroundColor: "#795DA8",
                        color: "white",
                     },
                  }}>
                  <EmailIcon />
               </ToggleButton>
               <ToggleButton
                  value="sms"
                  aria-label="sms"
                  sx={{
                     "&.MuiToggleButton-root": {
                        color: "black",
                     },
                     "&.Mui-selected": {
                        backgroundColor: "#795DA8",
                        color: "white",
                     },
                  }}>
                  <SmsIcon />
               </ToggleButton>
            </ToggleButtonGroup>
            {type === "mail" ? (
               <>
                  <TextField size="small" placeholder="Subject" name="subject" onChange={handleChange} required />
                  <TextField size="small" multiline rows={10} name="body" placeholder="Body" onChange={handleChange} required />
               </>
            ) : (
               <TextField size="small" multiline rows={10} name="message" placeholder="Message" onChange={handleChange} required/>
            )}
            <Button disableElevation variant="contained" sx={{ color: "white" }} type="submit" >
               Next
            </Button>
            <Button
               variant="outlined"
               onClick={() => {
                  navigate("/admin/promotions");
               }}>
               Cancel
            </Button>
         </Stack>
      </Stack>
   );
};

export default PromotionalMail;
