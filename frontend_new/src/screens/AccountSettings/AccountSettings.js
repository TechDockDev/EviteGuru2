import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

import { useState } from "react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../redux/action/defaultActions";
import { BiCloudUpload, BiEdit } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import ActiveCardInfo from "./ActiveCardInfo";
import {
  isLoading,
  openSnackbar,
  userAuth,
} from "../../redux/action/userActions";
import UpdatePassword from "../PasswordReset/UpdatePassword";
// GrEdit MdEditOff
import { MdEditOff } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { ImPencil } from "react-icons/im";
import { Constants } from "../../redux/constants/action-types";
import axios from "axios";
import { upload } from "@testing-library/user-event/dist/upload";
const AccountSettings = () => {
  const temp = {
    name: "",
    email: "",
    phone: "",
  };
  const [profileInfo, setProfileInfo] = useState(temp);
  const [fileUrl, setfileUrl] = useState("");
  const [editemode, seteditemode] = useState(false);
  // =================
  const [changeProfile, setChangeProfile] = useState(false);
  const [file, setfile] = useState(null);
  const dispatch = useDispatch();
  const [openPasswordChangeModal, setOpenPasswordChangeModal] = useState(false);
  // ===== user detail ======================
  const { userDetail } = useSelector((state) => state);
  // console.log("userDetail=>", userDetail);
  // ========================================
  // handlechange to update input values
  const handleChange = (e) => {
    // console.log("e=>", e.target.value);
    setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
  };

  // console.log("profileInfo=>", profileInfo);
  const togglePasswordChangeModal = () => {
    setOpenPasswordChangeModal(!openPasswordChangeModal);
  };

  // =========handlefilechange =======
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setfile(e.target.files[0]);
      setfileUrl(URL.createObjectURL(file));
      setChangeProfile(true);
    }
  };
  // =================================
  const profilePictureUpload = async () => {
    dispatch(isLoading(true));
    if (file) {
      const formData = new FormData();
      formData.append("profile", file);
      // formData.append("name")
      const res = await axios.patch(
        `${Constants?.URL}/update-profile-photo`,
        formData
      );
      if (res.status === 200) {
        // console.log("res=>", res);
        dispatch(userAuth(res?.data?.user));
        seteditemode(false);
        dispatch(isLoading(false));
        dispatch(openSnackbar(res?.data?.message, "success"));
      }
    } else {
      dispatch(isLoading(false));
      dispatch(openSnackbar("You did not selected any image!", "warning"));
    }
  };
  // =====handle submit ================
  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert("submitted");
    dispatch(isLoading(true));
    try {
      if (
        (profileInfo && profileInfo?.name != "") ||
        profileInfo?.email != "" ||
        profileInfo?.phone != ""
      ) {
        if (profileInfo.phone.length < 10) {
          dispatch(openSnackbar("Check Mobile Number!", "warning"));
        } else {
          console.log("melong=>", profileInfo);
          const res = await axios.patch(`${Constants.URL}/update`, {
            ...profileInfo,
          });
          if (res.status === 200) {
            seteditemode(false);
            console.log("response=>", res);
            dispatch(userAuth(res?.data?.user));
            dispatch(isLoading(false));
            dispatch(openSnackbar(res.data.message, "success"));
          }
        }
      } else {
        dispatch(isLoading(false));
        dispatch(openSnackbar("Please Fill all required values", "error"));
      }
    } catch (error) {
      if (error.response.data.message) {
        console.log("error=>", error);
        dispatch(openSnackbar(error.response.data.message, "error"));
        dispatch(isLoading(false));
      } else {
        dispatch(isLoading(false));
        console.log("error=>", error);
      }
    }
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
      // console.log("user=>", userDetail);
      setProfileInfo({
        ...profileInfo,
        email: userDetail?.email,
        name: userDetail?.name,
        phone: userDetail?.phone,
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
        boxSizing: "border-box",
        width: "100%",
        mt: 4,
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
        justifyContent={"center"}
        // p={1}
      >
        <Grid item lg={7.5} md={7.5} sm={5.5} xs={12} p={1}>
          <Paper
            sx={{
             
              bgcolor: "white",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              boxShadow: "0px 2px 24px -1px rgb(0 0 0 / 10%)",
              //   alignItems: "center",
              padding: { xs: "20px 15px", sm: "20px 40px", md: "41px 40px" },
              borderRadius: "20px",
              minWidth:"241px"
            }}
            // elevation={10}
            component={"form"}
            onSubmit={handleSubmit}
          >
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack direction={"row"} alignItems={"center"}>
                <Typography variant="h6" fontWeight={"800"}>
                  Profile
                </Typography>
                {/* {userDetail?.userType === "google" ? (
                  ""
                ) : ( */}
                <IconButton
                  aria-label="delete"
                  color="primary"
                  // onClick={() => seteditemode(!editemode)}
                  onClick={() => setChangeProfile(!changeProfile)}
                  sx={{ fontSize: "20px", color: "black", cursor: "pointer" }}
                >
                  {changeProfile ? (
                    <MdLogout style={{ color: "rgba(85, 85, 85, 1)" }} />
                  ) : (
                    <BiEdit style={{ color: "rgba(85, 85, 85, 1)" }} />
                  )}
                </IconButton>
                {changeProfile ? (
                  <Button onClick={profilePictureUpload} variant="text">
                    UPLOAD
                  </Button>
                ) : (
                  ""
                )}

                {/* )} */}
              </Stack>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                // variant="dot"
                badgeContent={
                  changeProfile ? (
                    <Box
                      width={"20px"}
                      height={"20px"}
                      bgcolor={"rgba(59, 40, 91, 1)"}
                      borderRadius={"100%"}
                      color={"white"}
                      display={"flex"}
                      justifyContent={"center"}
                      // alignContent={"center"}
                      alignItems={"center"}
                      textAlign={"center"}
                      fontSize={"10px"}
                      htmlFor="icon-button-photo"
                      component={"label"}
                    >
                      <ImPencil />
                    </Box>
                  ) : (
                    ""
                  )
                }
              >
                <input
                  accept="image/*"
                  id="icon-button-photo"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  type="file"
                />
                <Avatar
                  sx={{
                    "&.MuiAvatar-root": {
                      height: "100px",
                      width: "100px",
                    },
                  }}
                  alt={profileInfo?.name}
                  src={
                    fileUrl
                      ? fileUrl
                      : `data:image/jpeg;base64,${userDetail?.profilePhoto}`
                  }
                />
              </Badge>
            </Stack>
            {userDetail?.userType === "google" ? (
              <Typography variant="caption" fontWeight={"400"}>
                This information can not be edited
              </Typography>
            ) : (
              <Typography variant="caption" fontWeight={"400"}>
                This Information can be edited
                <Typography
                  onClick={() => seteditemode(!editemode)}
                  ml={1}
                  component={"span"}
                  sx={{ cursor: "pointer" }}
                >
                  {editemode ? <MdEditOff /> : <GrEdit />}
                </Typography>
              </Typography>
            )}

            <TextField
              label="Name"
              size="small"
              variant="filled"
              name="name"
              value={profileInfo?.name}
              onChange={handleChange}
              focused
              disabled={
                editemode && userDetail?.userType !== "google" ? false : true
              }
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
                label="Email Address"
                size="small"
                variant="filled"
                fullWidth
                name="email"
                value={profileInfo?.email}
                onChange={handleChange}
                focused
                disabled={
                  editemode && !userDetail?.userType !== "google" ? false : true
                }
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
                  name="phone"
                  value={profileInfo?.phone}
                  onChange={handleChange}
                  focused
                  disabled={
                    editemode && userDetail?.userType !== "google"
                      ? false
                      : true
                  }
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

      <UpdatePassword
        togglePasswordChangeModal={togglePasswordChangeModal}
        openPasswordChangeModal={openPasswordChangeModal}
        open={openPasswordChangeModal}
        onClose={togglePasswordChangeModal}
      />
    </Box>
  );
};

export default AccountSettings;
