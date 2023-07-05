import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ScreenRotationIcon from "@mui/icons-material/ScreenRotation";
const Dialogue = (props) => {
  return (
    <Dialog
      open={props?.open}
      onClose={props?.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          {/* <Typography> {"Rotate Screen"}</Typography> */}
          This device is incompatible to Create Template
          {/* <ScreenRotationIcon /> */}
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {/* Let device to be in landscape mode , just to experience better template
          design interface, */}
          You will not able to edit templates in small screen devices, use
          bigger screen device to edit
        </DialogContentText>
      </DialogContent>
      {/* <DialogActions>
        
        <Button onClick={props?.handleClose} autoFocus>
          ok
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default Dialogue;
