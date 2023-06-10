import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

// import React, { useState } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Authentication } from "../../firebaseAuth/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { login, openSnackbar } from "../../redux/action/userActions";

import { Constants } from "../../redux/constants/action-types";
import PasswordChange from "../PasswordReset/PasswordChange";

const LogInModal = ({
  openLoginModal,
  toggleLogInModal,
  toggleRegisterModal,
  setOpenLoginModal,
}) => {
  const tempValues = {
    email: "",
    password: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [openPasswordChangeModal, setOpenPasswordChangeModal] = useState(false);
  const [userValues, setUserValues] = useState(tempValues);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const togglePasswordChangeModal = () => {
    // alert("kkk")
    // toggleLoginModalInside();
    setOpenPasswordChangeModal(!openPasswordChangeModal);
  };

  const toggleLoginModalInside = () => {
    setUserValues(tempValues);
    setOpenLoginModal(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userDetail } = useSelector((state) => state);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("cred->", userValues);
      const res = await axios.post("/api/v1/user/login", userValues);
      if (res.status === 200) {
        dispatch(openSnackbar(res?.data?.message, "success"));
        toggleLogInModal();
        dispatch(login(res?.data?.data?.user));
        setUserValues(tempValues);
      } else {
        toggleLogInModal();
      }
    } catch (error) {
      console.log("error=>", error);
      if (error?.response?.data?.message) {
        dispatch(openSnackbar(error?.response?.data?.message, "error"));
      } else {
        dispatch(openSnackbar(error?.reponse?.statusText, "error"));
      }
    }
  };

  const googleHandler = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(Authentication, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log(result);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(await Authentication.currentUser.getIdToken());
        const idToken = await Authentication.currentUser.getIdToken();
        console.log("idToken", idToken);
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        const res = await axios.post(`${Constants.URL}/login/google`, {
          idToken: idToken,
        });
        if (res.status === 200) {
          console.log("response=>", res?.data);
          dispatch(openSnackbar(res?.data?.message, "success"));
          dispatch(login(res?.data?.data?.user));
          toggleLogInModal();
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);

        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <>
      <Modal
        open={openLoginModal}
        // open={true}
        onClose={toggleLoginModalInside}
        aria-labelledby="login-modal"
        aria-describedby="login_modal"
        closeAfterTransition
        sx={{ bgcolor: "transparent", backdropFilter: "blur(2px)" }}
      >
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
          }}
        >
          <Stack bgcolor={"transparent"} mt={6}>
            {/* 👇container for heading text and logo img's container👇  */}

            <Box bgcolor={"transparent"}>
              {/* 👇Cross icon to close the modal👇  */}
              <IconButton
                onClick={toggleLoginModalInside}
                sx={{
                  color: "black",
                  position: "absolute",
                  right: "35px",
                  top: "20px",
                }}
              >
                <CancelOutlinedIcon
                  sx={{ bgcolor: "transparent", color: "white" }}
                />
              </IconButton>
              {/*👆 Cross icon to close the modal👆  */}

              {/* 👇container for logo img👇  */}
              <Box
                bgcolor={"transparent"}
                sx={{
                  width: "150px",
                  position: "absolute",
                  top: "10px",
                  left: "30px",
                }}
              >
                {/* EviteGuruLogoWhite */}
                <Box
                  component={"img"}
                  src="./assets/EviteGuruLogoWhite.svg"
                  width="100%"
                  height="100%"
                  bgcolor="transparent"
                />
              </Box>
              {/*👆 container for logo img👆  */}

              <Typography
                bgcolor={"transparent"}
                fontSize="30px"
                fontWeight="600"
                color="white"
                variant="h1"
                mb={2}
              >
                Login
              </Typography>
            </Box>
            {/*👆 container for heading text and logo img's container👆  */}

            {/* 👇 Form container 👇 */}
            <Box
              component={"form"}
              // bgcolor={"transparent"}
              onSubmit={submitHandler}
            >
              {/* 👇 E-MAIL 👇 */}
              <FormControl fullWidth sx={{ bgcolor: "transparent" }}>
                <InputLabel
                  focused={true}
                  sx={{
                    transform: "none",
                    position: "static",
                    bgcolor: "transparent",
                    color: "red",
                    "&.Mui-focused": { color: "white" },
                    "& span": { bgcolor: "transparent", color: "red" },
                  }}
                  required
                  htmlFor="email"
                >
                  E-mail
                </InputLabel>
                <InputBase
                  type="email"
                  name="email"
                  focused="true"
                  value={userValues?.email || ""}
                  onChange={(e) =>
                    setUserValues({ ...userValues, email: e.target.value })
                  }
                  sx={{
                    padding: "2px 10px",
                    borderRadius: "5px",
                    fontWeight: "500",
                    bgcolor: "white",
                  }}
                  placeholder={"Your e-mail"}
                  required
                />
              </FormControl>
              {/*👆 E-MAIL👆 */}
              {/* 👇 PASSWORD 👇 */}
              <FormControl fullWidth sx={{ bgcolor: "transparent", mt: 1 }}>
                <InputLabel
                  component={"label"}
                  // focused
                  sx={{
                    transform: "none",
                    position: "static",
                    bgcolor: "transparent",
                    color: "white",
                    "&.Mui-focused": { color: "white" },
                    "& span": { bgcolor: "transparent", color: "red" },
                  }}
                  required
                  htmlFor="password"
                >
                  Password
                </InputLabel>
                <InputBase
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userValues?.password || ""}
                  onChange={(e) =>
                    setUserValues({ ...userValues, password: e.target.value })
                  }
                  id="password"
                  sx={{
                    padding: "2px 10px",
                    borderRadius: "5px",
                    fontWeight: "500",
                    bgcolor: "white",
                  }}
                  placeholder="Your password"
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {/*👆 PASSWORD👆 */}
              {/* 👇 LogIn button 👇 */}
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "100%",
                  bgcolor: "#3B285B",
                  color: "white",
                  mt: 2,
                  "&:hover": {
                    bgcolor: "#3B285B",
                    scale: "1.01",
                  },
                  "&:active": {
                    scale: ".95",
                  },
                }}
              >
                {" "}
                Login
              </Button>
              {/*👆 LogIn button👆 */}
              <Button
                mt={1}
                variant="text"
                fontWeight={"900"}
                sx={{
                  color: "white",
                  cursor: "pointer",
                  textShadow: "3px 3px 13px #000000",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={togglePasswordChangeModal}
                // onClick={() => alert("working")}
              >
                Forget Password
              </Button>
            </Box>
            {/*👆 Form Container👆 */}
            <Typography
              variant="p"
              fontFamily="Montserrat"
              fontSize="14px"
              bgcolor="transparent"
              color="white"
              sx={{ margin: "20px auto", textShadow: "3px 3px 13px #000000" }}
            >
              or continue with
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-around"
              bgcolor={"transparent"}
            >
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "white",
                  // width: "40%",
                  "&:hover": {
                    bgcolor: "white",
                    scale: "1.05",
                  },
                }}
              >
                <Stack
                // onChange={submit}
                // onClick={submit}
                >
                  <Box
                    component="img"
                    bgcolor={"transparent"}
                    onClick={googleHandler}
                    src="./assets/google_color_icon.svg"
                  />
                </Stack>
              </Button>
            </Stack>
            <Typography
              variant="p"
              fontFamily="Montserrat"
              bgcolor="transparent"
              fontSize="14px"
              color="white"
              sx={{ margin: "20px auto", textShadow: "3px 3px 13px #000000" }}
            >
              Don’t have an account yet?{" "}
              <Button
                onClick={() => {
                  toggleLogInModal();
                  toggleRegisterModal();
                }}
                disableElevation={true}
                disableRipple={true}
                disableFocusRipple={true}
                variant="text"
                bgcolor="transparent"
                sx={{
                  color: "white",
                  fontWeight: "600",
                  textTransform: "capitalize",
                  padding: "0",
                  textShadow: "3px 3px 13px #000000",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Register Now
              </Button>
            </Typography>
            <div id="captcha-button"></div>
          </Stack>
        </Paper>
      </Modal>
      <PasswordChange
        open={openPasswordChangeModal}
        onClose={togglePasswordChangeModal}
        togglePasswordChangeModal={togglePasswordChangeModal}
      />
    </>
  );
};

export default LogInModal;
