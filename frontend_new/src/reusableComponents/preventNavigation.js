import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDialogueBoxOpen,
  setNavigate,
  setUnsavedStatus,
} from "../redux/action/userActions";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const PreventNavigation = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isNavigate } = useSelector((state) => state);
  const handleNavigate = () => {
    dispatch(setDialogueBoxOpen(false));
    dispatch(setUnsavedStatus(false));
    dispatch(setNavigate(true, null, false));
    navigate(isNavigate.path);
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={isNavigate.open}
      //   onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"You have unsaved data. Do you want to leave this page?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you leave this page without saving you will be lost your changes.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            dispatch(setNavigate(true, null, false));
            dispatch(setUnsavedStatus(false));
          }}
        >
          Disagree
        </Button>
        {/* <Button autoFocus onClick={() => console.log("not")}>
          Disagree
        </Button> */}
        <Button onClick={handleNavigate} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreventNavigation;
