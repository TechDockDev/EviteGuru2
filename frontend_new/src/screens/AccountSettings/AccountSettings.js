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

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../redux/action/defaultActions";
import { BiEdit } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import ActiveCardInfo from "./ActiveCardInfo";
import { openSnackbar } from "../../redux/action/userActions";
import PasswordChange from "../PasswordReset/PasswordChange";
const AccountSettings = () => {
  const temp = {
    name: "Example User",
    email: "example@gmail.com",
    mobile: "1234567890",
  };
  const [profileInfo, setProfileInfo] = useState(temp);
  const [editemode, seteditemode] = useState(false);
  const dispatch = useDispatch();
  const [openPasswordChangeModal, setOpenPasswordChangeModal] = useState(false);
  // ===== user detail ======================
  const { userDetail } = useSelector((state) => state);
  console.log("userDetail=>", userDetail);
  // ========================================
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
    dispatch(openSnackbar("submitted", "success"));
  };
  // ===================================
  const stringAvatar = (name) => {
    return {
      children: `${name[0][0]}`,
    };
  };
  // ==================================
  useEffect(() => {
    if (userDetail?.isUser) {
      console.log("user=>", userDetail);
      setProfileInfo({
        ...profileInfo,
        email: userDetail?.email,
        name: userDetail?.name,
      });
    }
    dispatch(setPageTitle("Account"));

    return () => {
      dispatch(setPageTitle(""));
    };
  }, []);

  // ======================================

  return (
    <Box
      p={{ xs: 2, md: 0, lg: 0 }}
      sx={{
        //  border: "2px solid red",
        // height: "100%",
        // width: {
        //   xl: "calc(100vw - 250px)",
        //   lg: "calc(100vw - 270px)",
        //   md: "calc(100vw - 270px)",
        //   sm: "100vw",
        //   xs: "100vw",
        // },

        boxSizing: "border-box",
        width: "100%",
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
        spacing={{ xs: 1 }}
        display={"flex"}
        flexDirection={{ md: "row", lg: "row", sm: "row", xs: "column" }}
        // alignItems={"center"}
        justifyContent={"space-between"}
        // p={1}
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
              {userDetail?.userType === "google" ? (
                ""
              ) : (
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
              )}
            </Stack>
            {userDetail?.userType === "google" ? (
              <Typography variant="caption" fontWeight={"400"}>
                This information is as per your google profile
              </Typography>
            ) : (
              <Typography variant="caption" fontWeight={"400"}>
                The information can be edited
              </Typography>
            )}

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
              {userDetail?.userType === "google" ? (
                ""
              ) : (
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
                      "-webkit-text-fill-color":
                        " rgba(0, 0, 0, 0.7) !important",
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
              )}
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
      {userDetail?.userType === "google" ? (
        ""
      ) : (
        <Stack mt={3} alignContent={"center"} direction={"row"} p={2}>
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
      )}

      <PasswordChange
        togglePasswordChangeModal={togglePasswordChangeModal}
        openPasswordChangeModal={openPasswordChangeModal}
      />
    </Box>
  );
};

export default AccountSettings;
