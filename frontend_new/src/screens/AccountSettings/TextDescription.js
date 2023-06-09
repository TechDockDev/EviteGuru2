import { Button, Grid, Typography } from "@mui/material";
import React from "react";

const TextDescription = ({ type, title, value,clickHandler }) => {
   return (
      <Grid container item xs={12} display={"flex"} flexDirection={{ xs: "column", sm: "row" }}>
         <Typography
            fontWeight="800"
            mb={2}
            sx={{
               width: "100%",
            }}>
            {title}
         </Typography>
         <Typography
            color="#795DA8"
            fontWeight="800"
            mb={2}
            sx={{
               width: "100%",
            }}>
            {value}
            {type === "password" ? <Button variant="contained" size="small" sx={{
               color:"white"
            }} onClick={clickHandler}>Change Password</Button> : ""}
         </Typography>
      </Grid>
   );
};

export default TextDescription;
