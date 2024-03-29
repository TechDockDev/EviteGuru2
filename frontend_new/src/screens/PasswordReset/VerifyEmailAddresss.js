import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PasswordReset from "../LoginModal/PasswordReset";
import axios from "axios";
import { Constants } from "../../redux/constants/action-types";
import { isLoading, openSnackbar } from "../../redux/action/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import { Authentication } from "../../firebaseAuth/firebase";
import { useNavigate } from "react-router";

const VerifyEmailAddresss = ({ toggleEmailVerifyModal, recaptchaRef }) => {
  const { loading } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    idToken: "",
  });
  const [modalContent, setModalContent] = useState("getOtp");
  const [verified, setVerified] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const handleClose = () => {
    // window.recaptchaVerifier.reset()
    toggleEmailVerifyModal();
  };

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const verifyEmail = async (e) => {
    dispatch(isLoading(true));
    e.preventDefault();
    try {
      const res = await axios.post(`${Constants.URL}/forget-password`, {
        email: formData?.email,
      });
      if (res.status === 200) {
        console.log("response=>", res);
        setUserPhone(`+${res?.data?.phone}`);
        dispatch(isLoading(false));
        await sendOtpVerificationCode(`+${res?.data?.phone}`);
      }
    } catch (error) {
      // console.log("error=>", error);
      if (error?.response?.data?.message) {
        dispatch(openSnackbar(error?.response?.data?.message, "error"));
      } else {
        dispatch(openSnackbar("error", "errsor"));
      }
    }
  };

  // ===============================
  // =====configure captcha =============
  const configureCaptcha = async () => {
    console.log("coming..........");
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
  const sendOtpVerificationCode = async (phone) => {
    // window.recaptchaVerifier.render();
    dispatch(isLoading(true));
    console.log("console is coming=>", phone);
    const auth = getAuth();
    if (!window.confirmationResult) {
      await configureCaptcha();
    }
    signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
      .then((confirmationResult) => {
        // setOtp(true);
        dispatch(isLoading(false));
        setModalContent("updatePassword");
        dispatch(
          openSnackbar("Otp has been sent to your mobile number", "success")
        );
        window.confirmationResult = confirmationResult;
        console.log("resp", window.confirmationResult);
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        dispatch(isLoading(false));
        console.log("error=>", error);
        // window.recaptchaVerifier.reset()

        dispatch(openSnackbar("error", "error"));
      });
  };
  // =====verify otp =====
  const verifyOtp = async (code) => {
    dispatch(isLoading(true));
    console.log(typeof code);
    await window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        const user = result.user;

        const idToken = await Authentication.currentUser.getIdToken();
        setFormData({ ...formData, idToken: idToken });
        // window.recaptchaVerifier.reset()
        setVerified(true);
        dispatch(isLoading(false));
        dispatch(
          openSnackbar(
            "Otp Verified Successfully! Now Proceed to Register Your account",
            "success"
          )
        );
      })
      .catch((error) => {
        // navigate("/");
        console.log(error);
        dispatch(isLoading(false));
        dispatch(openSnackbar("invalid otp , please try again", "error"));
        // setVerified(false);
        // setModalContent("getOtp");

        // User couldn't sign in (bad verification code?)

        // ...
      });
  };
  // ===============================

  const updatePassword = async (password) => {
    dispatch(isLoading(true));
    try {
      const res = await axios.post(`${Constants.URL}/change-forget-password`, {
        password: password,
        idToken: formData?.idToken,
      });
      if (res.status === 200) {
        console.log("res=>", res);
        dispatch(isLoading(false));
        dispatch(openSnackbar(res?.data?.message, "success"));
        toggleEmailVerifyModal();
      }
    } catch (error) {
      console.log("error=>", error);
      dispatch(openSnackbar("error", "error"));
      dispatch(isLoading(false));
    }
  };
  // ================================
  return (
    <Stack bgcolor={"transparent"} mt={6}>
      {/* 👇container for heading text and logo img's container👇  */}

      <Box bgcolor={"transparent"}>
        {/* 👇Cross icon to close the modal👇  */}
        <IconButton
          onClick={handleClose}
          sx={{
            color: "black",
            position: "absolute",
            right: "35px",
            top: "20px",
          }}
        >
          <CancelOutlinedIcon sx={{ bgcolor: "transparent", color: "white" }} />
        </IconButton>
        {/*👆 Cross icon to close the modal👆  */}

        {/* 👇container for logo img👇  */}
        <Box
          bgcolor={"transparent"}
          sx={{
            width: "150px",
            position: "absolute",
            top: "20px",
            left: "30px",
          }}
        >
          <Box
            component={"img"}
            src="/assets/EviteGuruLogoWhite.svg"
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
          Reset Password
        </Typography>
      </Box>
      {/*👆 container for heading text and logo img's container👆  */}
      {modalContent === "getOtp" ? (
        <Box
          component={"form"}
          bgcolor={"transparent"}
          onSubmit={(e) => verifyEmail(e)}
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
              Your registered E-mail
            </InputLabel>
            <InputBase
              type="email"
              required
              name="email"
              value={formData?.email || ""}
              onChange={onChangeHandler}
              sx={{
                padding: "2px 10px",
                borderRadius: "5px",
                fontWeight: "500",
                backgroundColor: "white",
              }}
              placeholder={"Your e-mail"}
            />
          </FormControl>
          {/*👆 E-MAIL👆 */}

          {/* 👇 Reset Password button 👇 */}
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
            Verify Email
          </Button>
          {/*👆 Reset Password button👆 */}
        </Box>
      ) : modalContent === "updatePassword" ? (
        <PasswordReset
          setVerified={setVerified}
          verified={verified}
          verifyOtp={verifyOtp}
          phone={userPhone}
          setFormData={setFormData}
          formData={formData}
          updatePassword={updatePassword}
          toggleEmailVerifyModal={toggleEmailVerifyModal}
        />
      ) : (
        ""
      )}
    </Stack>
  );
};

export default VerifyEmailAddresss;
