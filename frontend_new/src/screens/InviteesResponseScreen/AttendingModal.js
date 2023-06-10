import { Box, Button, FormControl, Modal, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

const AttendingModal = ({ open, toggleModal }) => {
    const [values, setValues] = useState({numberOfGuests:"", kids:""})


    const inputChange = (e)=>{
        setValues({...values, [e.target.name]:e.target.value})
    }

    const handleSubmit = ()=>{
        alert("Form Submitted")
    }


   const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      maxWidth: "500px",
      bgcolor: "white",
      border: "2px solid #795DA8",
      borderRadius: "8px",
      boxShadow: "0px 0px 1px 2px white",
      padding: "20px 25px",
      outline: "none",
      boxSizing: "border-box",
   };
   return (
      <Modal open={open} onClose={toggleModal}>
         <Box sx={style}>
            <Typography
               component="h1"
               sx={{
                  fontWeight: "600",
                  fontSize: "25px",
                  color: "#795DA8",
                  width: "100%",
                  textAlign: "center",
               }}>
               Confirm Details
            </Typography>
            <Stack component={"form"} onSubmit={handleSubmit}>
               <Typography
                  sx={{
                     mt: 2,
                     fontWeight: "600",
                     fontSize: "16px",
                     "& span": {
                        color: "#795DA8",
                     },
                  }}>
                  Guest Allowed : &nbsp;
                  <span>6</span>
               </Typography>
               <Typography
                component={"label"}
                htmlFor="numberOfGuests"
                  sx={{
                     mt: 2,
                     fontWeight: "600",
                     fontSize: "16px",
                     "& span": {
                        color: "#795DA8",
                     },
                  }}>
                  Guests Coming : 
               </Typography>
               <Box component={"input"} type="number" id="numberOfGuests"
               name="numberOfGuests" onChange={inputChange} value={values.numberOfGuests} required placeholder="Guests coming"
               sx={{
                padding:"5px 10px", height:"40px", boxSizing:"border-box", borderRadius:"8px",
                border:"2px solid black",outline:"none", fontSize:"16px", mt:1, "&:active":{
                    borderColor:"#795DA8"
                }
               }}/>
               <Typography
                component={"label"}
                htmlFor="kids"
                  sx={{
                     mt: 2,
                     fontWeight: "600",
                     fontSize: "16px",
                     "& span": {
                        color: "#795DA8",
                     },
                  }}>
                  Kids : 
               </Typography>
               <Box component={"input"} type="number" id="kids" name="kids" onChange={inputChange} value={values.kids} placeholder="Kids" required sx={{
                padding:"5px 10px", height:"40px", boxSizing:"border-box", borderRadius:"8px",
                border:"2px solid black",outline:"none", fontSize:"16px", mt:1, "&:active,:active":{
                    borderColor:"#795DA8"
                }
               }}/>
               <Stack>
                <Button disableElevation variant={"contained"} sx={{color:"white", mt:2}} type="submit">Confirm</Button>
                <Button disableElevation variant={"outlined"} sx={{mt:2}} onClick={()=>{
                    toggleModal()}} >Cancel</Button>
               </Stack>
            </Stack>
         </Box>
      </Modal>
   );
};

export default AttendingModal;
