import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Constants } from "../../redux/constants/action-types";
import { useEffect } from "react";
import { isLoading, openSnackbar } from "../../redux/action/userActions";

const CreateContact = (props) => {
  const dispatch = useDispatch();
  console.log("props=>", props?.guestId);
  const [guests, setGuests] = useState([{}]);
  const { userDetail, createdEventDetails, loading } = useSelector(
    (state) => state
  );

  // console.log("eventDetails", createdEventDetails);

  //   const id = temp._id;

  const handleChange = (e, index) => {
    const tempValues = [...guests];
    tempValues[index][e.target.name] = e.target.value;
    setGuests(tempValues);
    // setSingle_guest(tempValues)
    console.log(tempValues);
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(isLoading(true));
    try {
      if (props?.modalType === "edit" && props?.contactDetails) {
        console.log("console is coming=>");
        const res = await axios.patch(
          `${Constants.URL}/guest/edit-guest-from-addressBook`,
          {
            name: `${guests[0].first_name} ${guests[0].last_name}`,
            email: guests[0].email,
            phone: guests[0].phone,
            singleGuestId: props?.contactDetails?._id,
          }
        );
        if (res.status === 200) {
          console.log("updated=>", res);
          props?.getAddressBook();
          dispatch(isLoading(false));
          // props?.getContactList();
          setGuests([{}]);
          props.toggleAddUserModal();
          dispatch(openSnackbar("updated", "success"));
        }
      } else {
        const guestDetails = guests.map((guest, index) => {
          return {
            name: `${guest.first_name} ${guest.last_name}`,
            // membersAllowed: guest.membersAllowed,
            phone: guest.phone,
            email: guest.email,
          };
        });
        const res = await axios.patch(`${Constants.URL}/guest/add-guest`, {
          guestDetails: [...guestDetails],
          guestId: props?.guestId,
        });
        if (res.status === 200) {
          dispatch(isLoading(false));
          setGuests([{}]);
          console.log("response=>", res);
          //   await props?.getGuestListDetails(createdEventDetails?.guestListId);
          props?.getAddressBook();
          props.toggleAddUserModal();
        }
      }
    } catch (error) {
      props.toggleAddUserModal();
      dispatch(isLoading(false));
      console.log("error=>", error);
    }
  };

  const addMoreContact = () => {
    setGuests([...guests, {}]);
  };

  // =======end of useEffect ====
  useEffect(() => {
    if (props?.modalType === "edit" && props.contactDetails) {
      console.log("contactDetails=>", props.contactDetails);
      setGuests([
        {
          ...props?.contactDetails,
          first_name: props?.contactDetails?.name?.split(" ")[0],
          last_name: props?.contactDetails?.name.split(" ")[1]
            ? props?.contactDetails?.name.split(" ")[1]
            : "",
        },
      ]);
    }

    return () => {
      setGuests([{}]);
    };
  }, []);

  return (
    <Stack
      component="form"
      onSubmit={SubmitHandler}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        //  bgcolor: " rgba(133, 103, 157, 0.47)",
        bgcolor: "white",
        border: "1px solid white",
        borderRadius: "3px",
        p: 3,
      }}
    >
      {/* 👇Cross icon to close the modal👇  */}
      <IconButton
        onClick={props?.toggleAddUserModal}
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

      <Typography variant="h1" fontSize={"20px"} fontWeight="bold" mb={1}>
        Add New Contact{" "}
        <span style={{ color: "red", fontSize: "14px" }}>
          (Add country code before mobile number)
        </span>
      </Typography>

      <Grid container sx={{ maxHeight: "70vh", overflow: "auto" }}>
        {guests.map((guest, index) => {
          return (
            <Grid
              key={index}
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              display="flex"
              sx={{
                flexDirection: { xl: "row", sm: "row", xs: "column" },
                border: { xl: "none", sm: "none", xs: "1px solid grey" },
                padding: { sm: "0", xs: "8px" },
                borderRadius: { sm: "0", xs: "10px" },
                mb: { sm: 0, xs: 1 },
              }}
            >
              {/* First Name */}
              <TextField
                type={"text"}
                mt={1}
                sx={{
                  marginX: "5px",
                  "& .MuiInput-root:before": {
                    borderBottom: "2px dashed #1A73E8",
                  },
                  "& .Mui-focused": { borderColor: "yellow" },
                }}
                fullWidth
                id="`first_name`"
                name="first_name"
                value={guests[index].first_name || ""}
                label={`First Name`}
                variant="standard"
                size="small"
                onChange={(e) => handleChange(e, index)}
              />

              {/* Last Name */}
              <TextField
                type={"text"}
                mt={1}
                sx={{
                  marginX: "5px",
                  "& .MuiInput-root:before": {
                    borderBottom: "2px dashed #1A73E8",
                  },
                  "& .Mui-focused": { borderColor: "yellow" },
                }}
                fullWidth
                id="`last_name`"
                name="last_name"
                value={guests[index].last_name || ""}
                label={`Last Name`}
                variant="standard"
                size="small"
                onChange={(e) => handleChange(e, index)}
              />

              {/* Mobile Number*/}
              <TextField
                mt={1}
                type="number"
                sx={{
                  marginX: "5px",
                  "& .MuiInput-root:before": {
                    borderBottom: "2px dashed #DB4437",
                  },
                }}
                fullWidth
                id="`phone`"
                name="phone"
                value={guests[index].phone || ""}
                label={`Mobile Number`}
                variant="standard"
                size="small"
                onChange={(e) => handleChange(e, index)}
              />

              {/* Email ID*/}
              <TextField
                type={"text"}
                mt={1}
                sx={{
                  marginX: "5px",
                  "& .MuiInput-root:before": {
                    borderBottom: "2px dashed #0F9D58",
                  },
                  "& .Mui-focused": { borderColor: "yellow" },
                }}
                fullWidth
                id="`email`"
                name="email"
                value={guests[index].email || ""}
                label={`Email`}
                variant="standard"
                size="small"
                onChange={(e) => handleChange(e, index)}
              />
              {/* Members Allowed*/}
              {/* <TextField
                  type={"number"}
                  mt={1}
                  sx={{
                    marginX: "5px",
                    "& .MuiInput-root:before": {
                      borderBottom: "2px dashed #0F9D58",
                    },
                    "& .Mui-focused": { borderColor: "yellow" },
                  }}
                  fullWidth
                  id="`members`"
                  name="membersAllowed"
                  value={guests[index].membersAllowed || ""}
                  label={`Members Allowed`}
                  variant="standard"
                  size="small"
                  onChange={(e) => handleChange(e, index)}
                /> */}
            </Grid>
          );
        })}
        {props?.modalType === "edit" ? (
          ""
        ) : (
          <Box mt={2} textAlign="right" width="100%">
            <Button variant="text" onClick={addMoreContact}>
              Add More
            </Button>
          </Box>
        )}
      </Grid>
      <Box
        mt={props?.modalType === "edit" ? 2 : 0}
        width="100%"
        textAlign="center"
      >
        <Button
          variant="contained"
          disabled={loading.open ? true : false}
          type="submit"
          sx={{ color: "white", width: "150px" }}
        >
          {props?.modalType === "edit" ? "Update" : "Submit"}
        </Button>
      </Box>
    </Stack>
  );
};

export default CreateContact;
