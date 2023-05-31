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
// import { NavLink } from "react-router-dom";
import { Verified, Visibility, VisibilityOff } from "@mui/icons-material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { login } from "../../redux/action/userActions";
import OtpScreen from "../LoginModal/OtpScreen";
import { AiFillCheckCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Authentication } from "../../firebaseAuth/firebase";
import { Constants } from "../../redux/constants/action-types";

const RegisterModal = ({ openRegisterModal, toggleRegisterModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [verified, setverified] = useState(false);
  const [otp, setOtp] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSendOtp = () => {
    if (values?.phone && values?.phone?.length === 10) {
      setOtp(true);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const onChangeHandler = (e) => {
  //    setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const tempvalues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const [values, setValues] = useState(tempvalues);

  const { userDetail } = useSelector((state) => state);

  // ====handleChange ========
  const handleChange = (e) => {
    setValues({ ...values?.phone?.length, [e.target.name]: e.target.value });
  };
  // ====end of handleChange==
  const submitHandler = async (e) => {
    const { name, email, phone, password, confirmPassword } = values;
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        alert("password do not match");
      } else {
        // dispatch(register(name, email, phone, password));
        const res = await axios.post("/api/v1/user/register", {
          name,
          email,
          phone,
          password,
        });
        if (res.status === 200) {
          console.log("res=>", res);
          dispatch(login(res?.data?.user));
          toggleRegisterModal();
        }
      }
    } catch (error) {
      console.log("error=>", error);
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
        const res = await axios.post(`${Constants?.URL}/register/google`, {
          idToken: idToken,
        });
        if (res.status === 200) {
          console.log("response=>", res?.data?.data?.user);
          dispatch(login(res?.data?.data?.user));
          toggleRegisterModal();
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <>
      <Modal
        open={openRegisterModal}
        // open={true}
        // onClose={toggleRegisterModal}
        aria-labelledby="login-modal"
        aria-describedby="login_modal"
        closeAfterTransition
        sx={{ bgcolor: "transparent", backdropFilter: "blur(3px)" }}
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
                onClick={toggleRegisterModal}
                sx={{
                  color: "black",
                  position: "absolute",
                  right: "35px",
                  top: "20px",
                  color: "white",
                }}
              >
                <CancelOutlinedIcon sx={{ bgcolor: "transparent" }} />
              </IconButton>
              {/* 👆 Cross icon to close the modal👆  */}

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
                mb={{ md: 2, xs: 1 }}
              >
                User Sign-up
              </Typography>
            </Box>
            {/*👆 container for heading text and logo img's container👆  */}

            {/* 👇 Form container 👇 */}
            <Box
              component={"form"}
              bgcolor={"transparent"}
              onSubmit={submitHandler}
            >
              {/* 👇 Full Name 👇 */}
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
                  htmlFor="username"
                >
                  Full Name
                </InputLabel>
                <InputBase
                  type="text"
                  name="name"
                  value={values?.name || ""}
                  onChange={handleChange}
                  sx={{
                    padding: "2px 10px",
                    borderRadius: "5px",
                    fontWeight: "500",
                    bgcolor: "white",
                  }}
                  placeholder={"Your full name"}
                  id="name"
                />
              </FormControl>
              {/*👆 Full Name👆 */}
              {/* 👇 E-MAIL 👇 */}
              <FormControl fullWidth sx={{ bgcolor: "transparent", mt: 1 }}>
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
                  value={values?.email || ""}
                  onChange={handleChange}
                  sx={{
                    padding: "2px 10px",
                    borderRadius: "5px",
                    fontWeight: "500",
                    bgcolor: "white",
                  }}
                  placeholder={"Your e-mail"}
                  id="email"
                />
              </FormControl>
              {/*👆 E-MAIL👆 */}
              {/*👆 PHONE👆 */}

              {/*👆 Phone👆 */}
              {/* 👆 Otp Screen 👆*/}
              {otp && !verified ? (
                <OtpScreen setOtp={setOtp} setverified={setverified} />
              ) : (
                <FormControl fullWidth sx={{ bgcolor: "transparent", mt: 1 }}>
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
                    htmlFor="phone"
                  >
                    Phone
                  </InputLabel>
                  <InputBase
                    type="number"
                    name="phone"
                    value={values?.phone || ""}
                    onChange={handleChange}
                    disabled={verified ? true : false}
                    sx={{
                      padding: "2px 10px",
                      borderRadius: "5px",
                      fontWeight: "500",
                      bgcolor: "white",

                      "& input::-webkit-outer-spin-button,input::-webkit-inner-spin-button":
                        {
                          " -webkit-appearance": "none",
                          margin: 0,
                        },
                    }}
                    placeholder={"Your Number"}
                    id="phone"
                    endAdornment={
                      <InputAdornment position="end" autoFocus>
                        <IconButton
                          // color={"blueviolet"}
                          disabled={values?.phone?.length === 10 ? false : true}
                          color="primary"
                          sx={{
                            cursor: "pointer",
                            textDecoration: "underline",
                            fontSize: "10px",
                          }}
                          onClick={handleSendOtp}
                        >
                          {verified ? <Verified /> : "GET OTP"}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              )}

              {/* 👇Otp Screen 👇*/}
              {verified ? (
                <>
                  {/* 👇 PASSWORD 👇 */}
                  <FormControl fullWidth sx={{ bgcolor: "transparent", mt: 1 }}>
                    <InputLabel
                      component={"label"}
                      focused={true}
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
                      onChange={handleChange}
                      value={values?.password || ""}
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
                  {/* 👇 Confirm PASSWORD 👇 */}
                  <FormControl fullWidth sx={{ bgcolor: "transparent", mt: 1 }}>
                    <InputLabel
                      component={"label"}
                      focused={true}
                      sx={{
                        transform: "none",
                        position: "static",
                        bgcolor: "transparent",
                        color: "white",
                        "&.Mui-focused": { color: "white" },
                        "& span": { bgcolor: "transparent", color: "red" },
                      }}
                      required
                      htmlFor="confirmPassword"
                    >
                      Confirm Password
                    </InputLabel>
                    <InputBase
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      onChange={handleChange}
                      value={values?.confirmPassword || ""}
                      id="confirmPassword"
                      sx={{
                        padding: "2px 10px",
                        borderRadius: "5px",
                        fontWeight: "500",
                        bgcolor: "white",
                      }}
                      placeholder="Confirm password"
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
                  {/*👆 Confirm PASSWORD👆 */}
                </>
              ) : (
                ""
              )}

              {/* 👇 LogIn button 👇 */}

              <Button
                variant="contained"
                type="submit"
                disabled={verified ? false : true}
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
                Register
              </Button>

              {/*👆 LogIn button👆 */}
              {/*👆 Form Container👆 */}

              <Stack
                // direction="row"
                justifyContent="space-around"
                bgcolor={"transparent"}
                mt={1}
              >
                <Typography
                  variant="p"
                  fontFamily="Montserrat"
                  fontSize="14px"
                  bgcolor="transparent"
                  color="white"
                  sx={{ textShadow: "3px 3px 13px #000000" }}
                >
                  or Register with
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "white",

                    "&:hover": {
                      bgcolor: "white",
                      scale: "1.05",
                    },
                    mt: 1,
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
            </Box>
            {/*👆 Form Container👆 */}
          </Stack>
        </Paper>
      </Modal>
    </>
  );
};

export default RegisterModal;
