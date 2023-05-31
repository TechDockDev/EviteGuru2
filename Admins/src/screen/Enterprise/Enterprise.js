import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import EnterpriseTable from "./EnterpriseTable";
const Enterprise = () => {
    
   const [loading, setLoading] = useState(false);

    


   return (
      <Box padding={"0px 10px 30px 10px"}>
         <Box sx={{ width: "100%" }}>
            {/* title */}
            <Typography
               variant="h1"
               align="center"
               fontWeight="800"
               fontSize={"28px"}
               mb={2}
               sx={{
                  color: "#795da8",
                  width: "100%",
               }}>
               Enterprise
            </Typography>
    
         </Box>
         <EnterpriseTable/>
      </Box>
   );
};

export default Enterprise;