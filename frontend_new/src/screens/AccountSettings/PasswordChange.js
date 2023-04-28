import { Modal, Paper } from "@mui/material";
import React from "react";
import VerifyEmailAddresss from "../LoginModal/VerifyEmailAddresss";

const PasswordChange = ({togglePasswordChangeModal, openPasswordChangeModal}) => {
   return (
      <Modal
         open={openPasswordChangeModal}
         // open={true}
         onClose={togglePasswordChangeModal}
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
            <VerifyEmailAddresss toggleLogInModal={togglePasswordChangeModal}/>
            </Paper>
      </Modal>
   );
};

export default PasswordChange;
