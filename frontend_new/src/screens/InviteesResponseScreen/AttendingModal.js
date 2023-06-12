import {
  Box,
  Button,
  FormControl,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Constants } from "../../redux/constants/action-types";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/action/userActions";

const AttendingModal = ({ open, toggleModal, eventId, guestId ,handleDeny}) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({ numberOfAdults: "", kids: "" });

  const inputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`${Constants.URL}/guest/response`, {
        singleGuestId: guestId,
        eventId: eventId,
        adult: values?.numberOfAdults,
        child: values?.kids,
      });
      if (res.status === 200) {
        console.log("response=>", res);
        dispatch(openSnackbar(res.data.message, "success"));
        toggleModal();
      }
    } catch (error) {
      console.log("error=>", error);
      toggleModal();
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "500px",
    bgcolor: "white",
    border: "2px solid #795DA8",
    borderRadius: "8px",
    boxShadow: "0px 0px 1px 2px white",
    padding: "20px 25px",
    outline: "none",
    boxSizing: "border-box",
  };
  return (
    <Modal open={open} onClose={toggleModal}>
      <Box sx={style}>
        <Typography
          component="h1"
          sx={{
            fontWeight: "600",
            fontSize: "25px",
            color: "#795DA8",
            width: "100%",
            textAlign: "center",
          }}
        >
          “How many people are coming?”
        </Typography>
        <Stack component={"form"} onSubmit={handleSubmit}>
          <Typography
            sx={{
              mt: 2,
              fontWeight: "600",
              fontSize: "16px",
              "& span": {
                color: "#795DA8",
              },
            }}
          >
            Members Allowed : &nbsp;
            <span>6</span>
          </Typography>
          <Typography
            component={"label"}
            htmlFor="numberOfGuests"
            sx={{
              mt: 2,
              fontWeight: "600",
              fontSize: "16px",
              "& span": {
                color: "#795DA8",
              },
            }}
          >
            Adults Coming :
          </Typography>
          <Box
            component={"input"}
            type="number"
            id="numberOfAdults"
            name="numberOfAdults"
            onChange={inputChange}
            value={values?.numberOfAdults}
            required
            placeholder="Guests coming"
            sx={{
              padding: "5px 10px",
              height: "40px",
              boxSizing: "border-box",
              borderRadius: "8px",
              border: "2px solid black",
              outline: "none",
              fontSize: "16px",
              mt: 1,
              "&:active": {
                borderColor: "#795DA8",
              },
            }}
          />
          <Typography
            component={"label"}
            htmlFor="kids"
            sx={{
              mt: 2,
              fontWeight: "600",
              fontSize: "16px",
              "& span": {
                color: "#795DA8",
              },
            }}
          >
            With Kids :
          </Typography>
          <Box
            component={"input"}
            type="number"
            id="kids"
            name="kids"
            onChange={inputChange}
            value={values?.kids}
            placeholder="Kids"
            required
            sx={{
              padding: "5px 10px",
              height: "40px",
              boxSizing: "border-box",
              borderRadius: "8px",
              border: "2px solid black",
              outline: "none",
              fontSize: "16px",
              mt: 1,
              "&:active,:active": {
                borderColor: "#795DA8",
              },
            }}
          />
          <Stack>
            <Button
              disableElevation
              variant={"contained"}
              sx={{ color: "white", mt: 2 }}
              type="submit"
            >
              Confirm
            </Button>
            <Button
              disableElevation
              variant={"outlined"}
              type="button"
              sx={{ mt: 2 }}
                onClick={() => {
                  toggleModal();
                }}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AttendingModal;
