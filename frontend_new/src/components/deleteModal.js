import { Button, IconButton, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
const DeleteModal = (props) => {
  const confirmDelete = () => {
    props.handleConfirmDelete();
    props.toggleModal();
  };
  return (
    <Modal
      open={props?.open}
      closeAfterTransition
      sx={{ bgcolor: "transparent", backdropFilter: "blur(2px)" }}
    >
      <>
        <Stack
          //   component="form"
          //   onSubmit={SubmitHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // width: { lg: "35%", md: "50%", xs: "80%" },
            width: { xs: "80%", sm: "50%", md: "35%" },
            //  bgcolor: " rgba(133, 103, 157, 0.47)",
            bgcolor: "white",
            border: "1px solid white",
            borderRadius: "3px",
            p: 3,
          }}
        >
          {/* 👇Cross icon to close the modal👇  */}
          <IconButton
            onClick={props?.toggleModal}
            sx={{
              color: "black",
              position: "absolute",
              right: "15px",
              top: "10px",
            }}
          >
            <CancelOutlinedIcon sx={{ bgcolor: "transparent" }} />
          </IconButton>
          {/*👆 Cross icon to close the modal👆  */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure to delete?
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <Stack mt={1} direction={"row"} spacing={1}>
            <Button variant="outlined" onClick={props?.toggleModal}>
              Cancel
            </Button>
            <Button variant="outlined" color="error" onClick={confirmDelete}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </>
    </Modal>
  );
};

export default DeleteModal;
