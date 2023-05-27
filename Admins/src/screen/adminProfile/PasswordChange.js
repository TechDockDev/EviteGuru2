import { Box, FormControl, Stack, IconButton, InputAdornment, InputBase, InputLabel, Modal, Paper, Button, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PasswordInput from "./PasswordInput";
import axios from "axios";
import { DataContext } from "../../AppContext";

const PasswordChange = ({ togglePasswordChangeModal, openPasswordChangeModal }) => {
   const { snackbar } = useContext(DataContext);
   const [formData, setFormData] = useState({
      newPassword: "",
      currentPassword: "",
      confirmPassword: "",
   });

   const modalClose=()=>{
    setFormData({
      newPassword: "",
      currentPassword: "",
      confirmPassword: "",
   })
   togglePasswordChangeModal()
   }


   const onChangeHandler = (e) => {
      console.log(formData);

      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const updatePassword = async (e) => {
      e.preventDefault();
      try {
         if (formData.newPassword === formData.confirmPassword) {
            const { data } = await axios.post("/change-password", { oldPassword: formData.currentPassword, newPassword: formData.newPassword });
            snackbar(data.status, data.message);
            modalClose()
         } else {
            snackbar("error", "Password missmatch");
         }
      } catch (error) {
        snackbar("error", error.message);
      }
   };

   return (
      <Modal
         open={openPasswordChangeModal}
         // open={true}
         onClose={modalClose}
         aria-labelledby="login-modal"
         aria-describedby="login_modal"
         closeAfterTransition
         sx={{ bgcolor: "transparent", backdropFilter: "blur(2px)" }}>
         <Paper
            sx={{
               position: "absolute",
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               width: { xl: 400, lg: 400, md: 400, sm: 400, xs: "70%" },
               bgcolor: " rgba(133, 103, 157, 0.47)",
               border: "1px solid white",
               borderRadius: "20px",
               p: 5,
            }}>
            <Stack bgcolor={"transparent"} mt={6}>
               {/* 👇Cross icon to close the modal👇  */}
               <IconButton
                  onClick={modalClose}
                  sx={{
                     color: "white",
                     position: "absolute",
                     right: "35px",
                     top: "20px",
                  }}>
                  <CancelOutlinedIcon sx={{ bgcolor: "transparent" }} />
               </IconButton>
               {/*👆 Cross icon to close the modal👆  */}
               {/* 👇container for heading text and logo img's container👇  */}
               <Box bgcolor={"transparent"}>
                  {/* 👇container for logo img👇  */}
                  <Box
                     bgcolor={"transparent"}
                     sx={{
                        width: "150px",
                        position: "absolute",
                        top: "10px",
                        left: "30px",
                     }}>
                     <Box component={"img"} src="/assets/EviteGuruLogoWhite.svg" width="100%" height="100%" bgcolor="transparent" />
                  </Box>
                  {/*👆 container for logo img👆  */}
                  <Typography bgcolor={"transparent"} fontSize="25px" fontWeight="600" color="white" variant="h1" mb={2}>
                     Change Password
                  </Typography>
               </Box>
               {/*👆 container for heading text and logo img's container👆  */}

               <Box component={"form"} bgcolor={"transparent"} onSubmit={updatePassword}>
                  {/* ============================================= */}

                  {/* 👇 Current PASSWORD 👇 */}
                  <PasswordInput labelText={"Current Password"} labelID={"currentPassword"} name={"currentPassword"} value={formData.currentPassword} onChange={onChangeHandler} placeholder={"Your current password"} />
                  {/*👆 Current PASSWORD👆 */}
                  {/* ============================================= */}
                  {/* 👇 NEW PASSWORD 👇 */}
                  <PasswordInput labelText={"New Password"} labelID={"newPassword"} name={"newPassword"} value={formData.newPassword} onChange={onChangeHandler} placeholder={"Your new password"} />
                  {/*👆 NEW PASSWORD👆 */}
                  {/* ============================================= */}
                  {/* 👇 Confirm PASSWORD 👇 */}
                  <PasswordInput labelText={"Confirm Password"} labelID={"confirmPassword"} name={"confirmPassword"} value={formData.confirmPassword} onChange={onChangeHandler} placeholder={"Confirm new password"} />
                  {/*👆 Confirm PASSWORD👆 */}
                  {/* ============================================= */}

                  {/* 👇 Change Password button 👇 */}
                  <Button
                     disableElevation
                     variant="contained"
                     type="submit"
                     sx={{
                        width: "100%",
                        bgcolor: "#3B285B",
                        color: "white",
                        mt: 2,
                        "&:hover": {
                           bgcolor: "#3B285B",
                           scale: "1.01",
                        },
                        "&:active": {
                           scale: ".95",
                        },
                     }}>
                     {" "}
                     Change Password
                  </Button>
                  {/*👆 Chnage Password button👆 */}
               </Box>
            </Stack>
         </Paper>
      </Modal>
   );
};

export default PasswordChange;
