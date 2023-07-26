import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Modal,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Constants } from "../../redux/constants/action-types";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/action/userActions";

const AttendingModal = ({
  open,
  toggleModal,
  eventId,
  guestId,
  handleDeny,
  guestDetails,
  type,
}) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({ numberOfAdults: 0, kids: 0 });

  const inputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (values?.numberOfAdults * 1 !== 0 && values?.kids * 1 !== 0) {
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
      } else {
        dispatch(
          openSnackbar("please select a number for individuals", "warning")
        );
      }
    } catch (error) {
      console.log("error=>", error);
      toggleModal();
    }
  };

  const setInviteesNumbers = (type, number) => {
    if (type === "adults") {
      setValues({ ...values, numberOfAdults: number });
    } else {
      setValues({ ...values, kids: number });
    }
  };

  function Members() {
    let element = [];
    if (type === "preview") {
      for (let index = 0; index < 10; index++) {
        element[index] = index;
      }
    } else {
      for (let index = 0; index < guestDetails?.membersAllowed * 1; index++) {
        element[index] = index;
      }
    }
    return element;
  }

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

  useEffect(() => {
    if (type === "preview") {
      setValues({ numberOfAdults: 5, kids: 5 });
    } else {
      setInviteesNumbers(
        "adults",
        Math.ceil((guestDetails?.membersAllowed * 1) / 2)
      );
      setInviteesNumbers(
        "kids",
        Math.floor((guestDetails?.membersAllowed * 1) / 2)
      );
    }
  }, []);

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
            <span>
              {type === "preview" ? 10 : guestDetails?.membersAllowed}
            </span>
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
          {/* <Box
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
          /> */}
          <ButtonGroup>
            <Button
              onClick={() => setInviteesNumbers("adults", 0)}
              variant={
                values.numberOfAdults * 1 === 0 ? "contained" : "outlined"
              }
              sx={{ color: values.numberOfAdults * 1 === 0 ? "white" : "" }}
            >
              0
            </Button>
            {Members()?.map((member, index) => {
              if (type === "preview") {
                return (
                  <Button
                    key={index}
                    onClick={() => setInviteesNumbers("adults", member + 1)}
                    disabled={
                      member +
                        (values.numberOfAdults * 1 + values.kids * 1 - 10) >
                      values.numberOfAdults * 1 - 1
                        ? true
                        : false
                    }
                    variant={
                      member + 1 === values.numberOfAdults * 1
                        ? "contained"
                        : "outlined"
                    }
                    sx={{
                      color:
                        member + 1 === values.numberOfAdults * 1 ? "white" : "",
                    }}
                  >
                    {index + 1}
                  </Button>
                );
              } else {
                return (
                  <Button
                    key={index}
                    onClick={() => setInviteesNumbers("adults", member + 1)}
                    disabled={
                      member +
                        (values.numberOfAdults * 1 +
                          values.kids * 1 -
                          guestDetails?.membersAllowed * 1) >
                      values.numberOfAdults * 1 - 1
                        ? true
                        : false
                    }
                    variant={
                      member + 1 === values.numberOfAdults * 1
                        ? "contained"
                        : "outlined"
                    }
                    sx={{
                      color:
                        member + 1 === values.numberOfAdults * 1 ? "white" : "",
                    }}
                  >
                    {index + 1}
                  </Button>
                );
              }
            })}
          </ButtonGroup>
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
          //  sx={{ width: 300 }}
          >
            <ButtonGroup>
              <Button
                onClick={() => setInviteesNumbers("kids", 0)}
                variant={values.kids * 1 === 0 ? "contained" : "outlined"}
                sx={{ color: values.kids * 1 === 0 ? "white" : "" }}
              >
                0
              </Button>
              {Members()?.map((member, index) => {
                if (type === "preview") {
                  return (
                    <Button
                      key={index}
                      onClick={() => setInviteesNumbers("kids", member + 1)}
                      disabled={
                        member +
                          (values.numberOfAdults * 1 + values.kids * 1 - 10) >
                        values.kids * 1 - 1
                          ? true
                          : false
                      }
                      variant={
                        member + 1 === values.kids * 1
                          ? "contained"
                          : "outlined"
                      }
                      sx={{
                        color: member + 1 === values.kids * 1 ? "white" : "",
                      }}
                    >
                      {index + 1}
                    </Button>
                  );
                } else {
                  return (
                    <Button
                      key={index}
                      onClick={() => setInviteesNumbers("kids", member + 1)}
                      disabled={
                        member +
                          (values.numberOfAdults * 1 +
                            values.kids * 1 -
                            guestDetails?.membersAllowed * 1) >
                        values.kids * 1 - 1
                          ? true
                          : false
                      }
                      variant={
                        member + 1 === values.kids * 1
                          ? "contained"
                          : "outlined"
                      }
                      sx={{
                        color: member + 1 === values.kids * 1 ? "white" : "",
                      }}
                    >
                      {index + 1}
                    </Button>
                  );
                }
              })}
            </ButtonGroup>
          </Box>

          <Stack>
            <Button
              disableElevation
              variant={"contained"}
              disabled={type === "preview" ? true : false}
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
