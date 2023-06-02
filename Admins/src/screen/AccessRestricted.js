import { Box, Typography } from "@mui/material";
import React from "react";

const AccessRestricted = () => {
   return <Box
   sx={{padding:"20px", boxSizing:"border-box", width:"100%"}}
   >
    <Typography variant="h1" fontSize={"30px"} color={"#795DA8"} fontWeight={"800"} textAlign={"center"}> Access Denied</Typography>
    <Typography fontFamily={"Montserrat"} textAlign={"center"} mt={1}> Sorry! You are not authorized for this section</Typography>
   </Box>;
};

export default AccessRestricted;
