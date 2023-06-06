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
import { Verified, Visibility, VisibilityOff } from "@mui/icons-material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { login, openSnackbar } from "../../redux/action/userActions";
import OtpScreen from "../LoginModal/OtpScreen";
import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";
import { Authentication } from "../../firebaseAuth/firebase";
import { Constants } from "../../redux/constants/action-types";
import { MuiTelInput } from "mui-tel-input";

const RegisterModal = ({ openRegisterModal, setOpenRegisterModal }) => {
  const tempvalues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    idToken: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const [verified, setverified] = useState(false);
  const [otp, setOtp] = useState(false);
  const [phone, setphone] = useState({ number: "", length: 0 });
  const [values, setValues] = useState(tempvalues);

  const { userDetail } = useSelector((state) => state);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //====== hhhhh ==================
  const handlePhoneChange = (v) => {
    let ch = "";
    v.split(" ").forEach((num, index) => {

      if (index !== 0) {
        ch = ch + num;
      }
    });
    setphone({ ...phone, number: v, length: ch.length });
  };

  const handleSendOtp = async () => {
    if (phone.length === 10) {
      // ===send otp and captcha verification =======
      sendOtpVerificationCode();
    }
  };

  // =====configure captcha =============
  const configureCaptcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "captcha-button",
      {
        size: "invisible",
        callback: (response) => {
          // console.log(response);
        },
      },
      auth
    );
  };

  // =====captcha configurarion =========

  // ========send otp ==============
  const sendOtpVerificationCode = () => {
    // window.recaptchaVerifier.render();
  
    const auth = getAuth();
    configureCaptcha();
    signInWithPhoneNumber(auth, phone?.number, window.recaptchaVerifier)
      .then((confirmationResult) => {
        setOtp(true);
        dispatch(
          openSnackbar("Otp has been sent to your mobile number", "success")
        );
        window.confirmationResult = confirmationResult;
        // console.log("resp", window.confirmationResult);
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
       
        dispatch(openSnackbar(error.message, "error"));
      });
  };
  // =====verify otp =====
  const verifyOtp = async (code) => {
    await window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        const user = result.user;
       
        const idToken = await Authentication.currentUser.getIdToken();
      
        setValues({
          ...values,
          idToken: idToken,
        });
        setverified(true);
        dispatch(
          openSnackbar(
            "Otp Verified Successfully! Now Proceed to Register Your account",
            "success"
          )
        );
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        dispatch(openSnackbar("invalid otp , please try again", "error"));
        // ...
      });
  };

  // ===function to close register modal along with clear data==
  const closeRegisterModal = () => {
    setOtp(false);
    setverified(false);
    setValues(tempvalues);
    setOpenRegisterModal(false);
    setphone({ number: "", length: 0 });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // ====handleChange ========
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  // ====end of handleChange==
  const submitHandler = async (e) => {
    const { name, email, phone, password, confirmPassword, idToken } = values;
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        dispatch(openSnackbar("password does not matched", "warning"));
      } else {
        const res = await axios.post(`${Constants.URL}/register`, {
          name,
          email,
          password,
          idToken,
        });
        if (res.status === 200) {
         
          dispatch(openSnackbar(res?.data?.message, "success"));
          dispatch(login(res?.data?.user));
          setValues(tempvalues);
          closeRegisterModal();
          // toggleRegisterModal();
        }
      }
    } catch (error) {
     
      dispatch(openSnackbar("something went wrong", "error"));
    }
  };

  const googleHandler = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(Authentication, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
    
        const idToken = await Authentication.currentUser.getIdToken();
  
        // The signed-in user info.
        const user = result.user;
   
        const res = await axios.post(`${Constants?.URL}/register/google`, {
          idToken: idToken,
        });
        // =====================
        if (res.status === 200) {
       
          dispatch(login(res?.data?.data?.user));
          closeRegisterModal();
          // toggleRegisterModal();
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
     
        dispatch(openSnackbar(error.message, "error"));
  
       
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  useEffect(() => {
    // configureCaptcha();
    return () => {
      setValues(tempvalues);
      setOtp(false);
      setverified(false);
    };
  }, []);

  return (
    <>
      <Modal
        open={openRegisterModal}
        // open={true}
        // onClose={toggleRegisterModal}
        // onClose={closeRegisterModal}
        aria-labelledby="login-modal"
        aria-describedby="login_modal"
        closeAfterTransition
        sx={{ bgcolor: "transparent", backdropFilter: "blur(3px)" }}
      >
        <>
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
                  // onClick={toggleRegisterModal}
                  onClick={closeRegisterModal}
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
                  <OtpScreen
                    setOtp={setOtp}
                    setverified={setverified}
                    verifyOtp={verifyOtp}
                  />
                ) : (
                  <FormControl
                    fullWidth
                    sx={{ bgcolor: "transparent", mt: 1, position: "relative" }}
                  >
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
                    <MuiTelInput
                      forceCallingCode
                      MenuProps={{ disableAutoFocusItem: true }}
                      disabled={verified ? true : false}
                      size="small"
                      value={phone?.number}
                      onChange={handlePhoneChange}
                      defaultCountry="US"
                      placeholder="Your number"
                      // disableFormatting
                      sx={{
                        bgcolor: "white",
                        borderRadius: "5px",
                        color: "black",
                        "& .MuiInputAdornment-root": {
                          color: "black",
                        },
                        "& .MuiTelInput-Menu": {
                          scrollbarWidth: "1px",
                        },
                      }}
                    />
                    <Button
                      position="end"
                      autoFocus
                      disabled={phone?.length >= 10 ? false : true}
                      sx={{
                        position: "absolute",
                        right: 10,
                        top: 26,
                        zIndex: 4,
                        // bgcolor: "red",
                      }}
                      onClick={verified ? () => {} : () => handleSendOtp()}
                    >
                      {verified ? <Verified /> : " GET OTP"}
                    </Button>
                  </FormControl>
                )}

                {/* 👇Otp Screen 👇*/}
                {verified ? (
                  <>
                    {/* 👇 PASSWORD 👇 */}
                    <FormControl
                      fullWidth
                      sx={{ bgcolor: "transparent", mt: 1 }}
                    >
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
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    {/*👆 PASSWORD👆 */}
                    {/* 👇 Confirm PASSWORD 👇 */}
                    <FormControl
                      fullWidth
                      sx={{ bgcolor: "transparent", mt: 1 }}
                    >
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
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
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
                <div id="captcha-button"></div>
              </Box>
              {/*👆 Form Container👆 */}
            </Stack>
          </Paper>
        </>
      </Modal>
    </>
  );
};

export default RegisterModal;
