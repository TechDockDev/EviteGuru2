import { Avatar, Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import TextDescription from "./TextDescription";
import { useState } from "react";
import PasswordChange from "./PasswordChange";

const AccountSettings = () => {
   const [openPasswordChangeModal, setOpenPasswordChangeModal] = useState(false);

   const togglePasswordChangeModal = () => {
      setOpenPasswordChangeModal(!openPasswordChangeModal);
   };

   const stringAvatar = (name) => {
      return {
         children: `${name[0][0]}`,
      };
   };
   
   return (
      <Box
         sx={{
            //  border: "2px solid red",
            height: "100%",
            width: { xl: "calc(100vw - 250px)", lg: "calc(100vw - 270px)", md: "calc(100vw - 270px)", sm: "100vw", xs: "100vw" },
            maxWidth: "1150px",
            padding: "0 20px 20px 20px",
            boxSizing: "border-box",
         }}>
         <Paper
            sx={{
               bgcolor: "white",
               display: "flex",
               justifyContent: "center",
               flexDirection: "column",
               alignItems: "center",
               padding: { xs: "20px 10px", sm: "20px 40px" },
               borderRadius: "20px",
            }}
            elevation={10}>
            <Typography
               variant="h4"
               align="center"
               fontWeight="800"
               mb={2}
               sx={{
                  color: "#795DA8",
                  width: "100%",
               }}>
               User Profile
            </Typography>
            <Grid container>
               <Grid
                  item
                  xs={12}
                  sm={12}
                  md={3}
                  lg={4}
                  xl={4}
                  // border={"1px solid red"}
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     flexDirection: "column",
                     alignItems: "center",
                  }}>
                  <Avatar
                     alt="Sunder G"
                     sx={{
                        width: "100px",
                        height: "100px",
                        fontSize: "35px",
                        bgcolor: "#795DA8",
                     }}
                     {...stringAvatar("Sunder G")}
                  />

                  <Typography
                     mt={2}
                     textAlign="center"
                     fontWeight="800"
                     mb={2}
                     sx={{
                        width: "100%",
                     }}>
                     Sunder G
                  </Typography>
               </Grid>

               <Grid
                  item
                  xs={12}
                  sm={12}
                  md={8}
                  lg={7}
                  xl={7}
                  container
                  m={2}
                  sx={{
                     border: "1px solid grey",
                     p: 3,
                     borderRadius: "20px",
                  }}>
                  <TextDescription title="User E-mail :" value="user@gmail.com" />
                  <TextDescription type="password" title="Password :"  clickHandler={togglePasswordChangeModal} />
                  <TextDescription title="Subsciption Plan :" value="Basic" />
                  <TextDescription title="Template Limit :" value="10" />
                  <TextDescription title="Event Created :" value="3" />
                  <TextDescription title="Guest Limit :" value="50" />
               </Grid>
            </Grid>
         </Paper>
         <PasswordChange togglePasswordChangeModal={togglePasswordChangeModal} openPasswordChangeModal={openPasswordChangeModal} />
      </Box>
   );
};

export default AccountSettings;
