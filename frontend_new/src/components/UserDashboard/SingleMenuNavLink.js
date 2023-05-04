import React from "react";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

const SingleMenuNavLink = ({ linkText, icon, to, handleDrawerToggle }) => {
   return (
      <ListItem
         onClick={handleDrawerToggle}
         component={NavLink}
         to={to}
         sx={{
            color: "black",
            fontSize: "18px",
            // border: "1px solid red",
            display: "block",
            margin: "12px 0px",
            padding:"5px 0px 5px 20px",
            bgcolor: "transparent",
            transition: "all 0.1s ease",

            "&:hover": {
               color: "#000",
               borderLeft:"10px solid #795DA8",
               bgcolor:"#CDB5EA",
               borderRadius: "4px 0px 0px 4px",
            },
            "& .active": {
               color: "#000",
               borderLeft: "10px solid #795DA8",
               bgcolor: "#CDB5EA",
               borderRadius: "4px 0px 0px 4px",
             },
         }}>
         <ListItemButton
            sx={{
               // border: "1px solid purple",
               cursor: "pointer",
               padding: "0px",
               fontWeight: "400",
               fontSize: "26px",

                "&:hover": {
                  bgcolor:"transparent"
            },
               "&:active": {
                  transform: "scale(0.95)",
               },
               "& svg":{
                  bgcolor:"transparent"
               }
            }}>
            {icon}

            <ListItemText
               primary={linkText}
               sx={{
                  marginLeft: "12px",
                  bgcolor: "transparent",

               }}
               primaryTypographyProps={{ sx: { bgcolor: "transparent", fontWeight:"bold", fontSize:"18px" } }}
            />
         </ListItemButton>
      </ListItem>
   );
};

export default SingleMenuNavLink;
