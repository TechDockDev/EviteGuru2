import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const RSVPSummaryCard = () => {
   return (
      <Paper
         sx={{
            width: { md: "100%", xs: "100%" },
            bgcolor: "white",
            padding: "40px",
            // border: "2px solid red",
            boxSizing: "border-box",
         }}
         elevation={10}>
         <Typography variant="h1" sx={{ fontSize: "18px", fontWeight: "700" }}>
            RSVP Summary
         </Typography>
         <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mt: 2 }}>
            <Typography width="100%" sx={{ fontSize: "16px", fontWeight: "" }}>Attending</Typography>
            <Typography textAlign={"right"} width="100%">0</Typography>
         </Box>
         <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mt: 2 }}>
            <Typography sx={{ fontSize: "16px", fontWeight: "" }}>Not Attending</Typography>
            <Typography>0</Typography>
         </Box>
         <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mt: 2 }}>
            <Typography sx={{ fontSize: "16px", fontWeight: "" }}>Pending</Typography>
            <Typography>0</Typography>
         </Box>
      </Paper>
   );
};

export default RSVPSummaryCard;
