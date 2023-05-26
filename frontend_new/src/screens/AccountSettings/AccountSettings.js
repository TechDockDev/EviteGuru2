import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import TextDescription from "./TextDescription";
import { useState } from "react";
import PasswordChange from "./PasswordChange";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../redux/action/defaultActions";
import { BiEdit } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import ActiveCardInfo from "./ActiveCardInfo";
const AccountSettings = () => {
  const temp = {
    name: "Terry Johnson Modric",
    email: "terryjohn@gmail.com",
    mobile: "8255678902",
  };
  const [profileInfo, setProfileInfo] = useState(temp);
  const [editemode, seteditemode] = useState(false);
  const dispatch = useDispatch();
  const [openPasswordChangeModal, setOpenPasswordChangeModal] = useState(false);

  // handlechange to update input values
  const handleChange = (e) => {
    setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
  };

  const togglePasswordChangeModal = () => {
    setOpenPasswordChangeModal(!openPasswordChangeModal);
  };
  // =====handle submit ================
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("submitted");
  };
  // ===================================
  const stringAvatar = (name) => {
    return {
      children: `${name[0][0]}`,
    };
  };
  // ==================================
  useEffect(() => {
    dispatch(setPageTitle("Account"));

    return () => {
      dispatch(setPageTitle(""));
    };
  }, []);
  //   ============temp card data =========
  const tempCardDetails = {
    question: "Where can I watch?",
    description:
      "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis. Fermentum sulla craspor ttitore  ismod nulla.",
  };
  // ======================================

  return (
    <Box
      sx={{
        //  border: "2px solid red",
        height: "100%",
        width: {
          xl: "calc(100vw - 250px)",
          lg: "calc(100vw - 270px)",
          md: "calc(100vw - 270px)",
          sm: "100vw",
          xs: "100vw",
        },
        maxWidth: "1150px",
        padding: "0 20px 20px 20px",
        boxSizing: "border-box",
      }}
    >
      <Stack mt={1} mb={4} alignItems={"center"}>
        <Typography variant="h5" fontWeight={"800"}>
          Account Info
        </Typography>
      </Stack>
      <Grid
        mt={4}
        container
        spacing={{ xs: 2 }}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Grid item lg={7.5} md={7.5} sm={5.5} xs={12}>
          <Paper
            sx={{
              bgcolor: "white",
              display: "flex",
              //   justifyContent: "center",
              flexDirection: "column",
              //   alignItems: "center",
              padding: { xs: "20px 10px", sm: "20px 40px", md: "41px 40px" },
              borderRadius: "20px",
            }}
            elevation={10}
            component={"form"}
            onSubmit={handleSubmit}
          >
            <Stack direction={"row"} alignItems={"center"}>
              <Typography variant="h6" fontWeight={"800"}>
                Profile
              </Typography>
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={() => seteditemode(!editemode)}
                sx={{ fontSize: "20px", color: "black", cursor: "pointer" }}
              >
                {editemode ? (
                  <MdLogout style={{ color: "rgba(85, 85, 85, 1)" }} />
                ) : (
                  <BiEdit style={{ color: "rgba(85, 85, 85, 1)" }} />
                )}
              </IconButton>
            </Stack>
            <Typography variant="caption" fontWeight={"400"}>
              The information can be edited
            </Typography>

            <TextField
              label="Name *"
              size="small"
              variant="filled"
              name="name"
              value={profileInfo?.name}
              onChange={handleChange}
              focused
              disabled={!editemode}
              InputProps={{ disableUnderline: true }}
              sx={{
                mt: 2,
                mr: 1,
                color: "black",
                "& .Mui-disabled ": {
                  "-webkit-text-fill-color": " rgba(0, 0, 0, 0.7) !important",
                  color: "black !important",
                },
                "& .MuiFilledInput-root": {
                  backgroundColor: "transparent !important",
                  border: "1px solid rgba(183, 172, 172, 1)",
                  borderRadius: "6px !important",
                },
                "& .MuiFormLabel-root": {
                  //   color: "rgba(250, 250, 250, 1) !important",
                  // backgroundColor: "rgba(56, 73, 141, 1) !important",
                },
              }}
            />
            <Stack
              direction={{ md: "row", xs: "column", lg: "row", sm: "row" }}
              alignItems={"center"}
            >
              <TextField
                label="Email Address *"
                size="small"
                variant="filled"
                fullWidth
                name="email"
                value={profileInfo?.email}
                onChange={handleChange}
                focused
                disabled={!editemode}
                InputProps={{ disableUnderline: true }}
                sx={{
                  mt: 2,
                  mr: 1,
                  color: "black",
                  "& .Mui-disabled ": {
                    "-webkit-text-fill-color": " rgba(0, 0, 0, 0.7) !important",
                    color: "black !important",
                  },
                  "& .MuiFilledInput-root": {
                    backgroundColor: "transparent !important",
                    border: "1px solid rgba(183, 172, 172, 1)",
                    borderRadius: "6px !important",
                  },
                  "& .MuiFormLabel-root": {
                    //   color: "rgba(250, 250, 250, 1) !important",
                    // backgroundColor: "rgba(56, 73, 141, 1) !important",
                  },
                }}
              />
              <TextField
                label="Mobile Number *"
                size="small"
                variant="filled"
                fullWidth
                name="mobile"
                value={profileInfo?.mobile}
                onChange={handleChange}
                focused
                disabled={!editemode}
                InputProps={{ disableUnderline: true }}
                sx={{
                  mt: 2,
                  mr: 1,
                  color: "black",
                  "& .Mui-disabled ": {
                    "-webkit-text-fill-color": " rgba(0, 0, 0, 0.7) !important",
                    color: "black !important",
                  },
                  "& .MuiFilledInput-root": {
                    backgroundColor: "transparent !important",
                    border: "1px solid rgba(183, 172, 172, 1)",
                    borderRadius: "6px !important",
                  },
                  "& .MuiFormLabel-root": {
                    //   color: "rgba(250, 250, 250, 1) !important",
                    // backgroundColor: "rgba(56, 73, 141, 1) !important",
                  },
                }}
              />
            </Stack>
            {editemode ? (
              <Stack
                mt={2}
                alignContent={"center"}
                direction={"row"}
                justifyContent={"center"}
              >
                <Button
                  variant="contained"
                  size="small"
                  type="submit"
                  sx={{ color: "white", py: 1 }}
                >
                  Save Changes
                </Button>
              </Stack>
            ) : (
              ""
            )}
          </Paper>
        </Grid>
        <Grid item lg={3.5} md={3.5} sm={5.5} xs={12}>
          <ActiveCardInfo />
        </Grid>
      </Grid>
      <Stack mt={3} alignContent={"center"} direction={"row"}>
        <Button
          variant="contained"
          size="small"
          type="submit"
          sx={{ color: "white", py: 1 }}
          onClick={togglePasswordChangeModal}
        >
          Update Password
        </Button>
      </Stack>
      <PasswordChange
        togglePasswordChangeModal={togglePasswordChangeModal}
        openPasswordChangeModal={openPasswordChangeModal}
      />
    </Box>
  );
};

export default AccountSettings;
