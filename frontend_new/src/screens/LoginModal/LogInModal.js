import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  Link,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
// import React, { useState } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../oldredux/action/userAction";
import { GoogleFacebookLogin } from "../../oldredux/action/userAction";
// import { Authentication } from '../firebaseAuth/firebase';
import { Authentication } from "../../firebaseAuth/firebase";
import {
  signInWithPopup,
  getRedirectResult,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { login } from "../../redux/action/userActions";

const LogInModal = ({
  openLoginModal,
  toggleLogInModal,
  toggleRegisterModal,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // let [searchParam] = useSearchParams();
  // let redirect = searchParam.get("redirect") || "/";
  const tempValues = {
    email: "",
    password: "",
  };
  const [userValues, setUserValues] = useState(tempValues);

  const { userDetail } = useSelector((state) => state);

  // const usergooglefacebookLogin = useSelector(
  //   (state) => state.usergooglefacebookLogin
  // );
  // const { googlefacebookInfo } = usergooglefacebookLogin;

  // useEffect(() => {
  //   if (googlefacebookInfo) {
  //     // navigate(redirect);

  //   }else if (userInfo){
  //     // navigate(redirect)
  //   }
  // }, [googlefacebookInfo,userInfo,navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("cred->", userValues);
    const res = await axios.post("/api/user/login", userValues);
    if (res.status === 200) {
      toggleLogInModal();
      dispatch(login(res?.data?.data?.user));
      setUserValues(tempValues);
    } else {
      toggleLogInModal();
    }
  };

  const googleHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(Authentication, provider)
      .then((data) => {
        dispatch(
          GoogleFacebookLogin(
            data.user.email,
            data.user.uid,
            data.user.emailVerified,
            data.user.displayName
          )
        );
        toggleLogInModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const facebookHandler = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(Authentication, provider)
      .then((data) => {
        dispatch(
          GoogleFacebookLogin(
            data.user.email,
            data.user.uid,
            data.user.emailVerified,
            data.user.displayName
          )
        );
        toggleLogInModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal
        open={openLoginModal}
        // open={true}
        onClose={toggleLogInModal}
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
                onClick={toggleLogInModal}
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
                  // placeholder={"Your e-mail"}
                  required
                  // onBlur="this.placeholder='enter your text'"
                  // onBlur={() => {
                  //   this.placeholder = "enter your text";
                  // }}
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
                  // onBlur={() => {
                  //   this.placeholder = "enter your text";
                  // }}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
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
            </Box>
            {/*👆 Form Container👆 */}
            <Typography
              variant="p"
              fontFamily="Montserrat"
              fontSize="14px"
              bgcolor="transparent"
              color="white"
              sx={{ margin: "20px auto" }}
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
                sx={{
                  bgcolor: "white",
                  width: "40%",
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
              <Button
                variant="contained"
                sx={{
                  bgcolor: "white",
                  width: "40%",
                  "&:hover": {
                    bgcolor: "white",
                    scale: "1.05",
                  },
                }}
              >
                <Box
                  component="img"
                  bgcolor={"transparent"}
                  onClick={facebookHandler}
                  src="./assets/fb_icon.svg"
                />
              </Button>
            </Stack>
            <Typography
              variant="p"
              fontFamily="Montserrat"
              bgcolor="transparent"
              fontSize="14px"
              color="white"
              sx={{ margin: "20px auto" }}
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
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Register for free
              </Button>
            </Typography>
          </Stack>
        </Paper>
      </Modal>
    </>
  );
};

export default LogInModal;
