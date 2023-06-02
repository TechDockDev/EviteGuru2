import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, FormHelperText, InputLabel } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/action/userActions";

const OtpScreen = (props) => {
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(59);
  const dispatch = useDispatch();
  const handleChangeOtp = (newValue) => {
    console.log(
      "new=>",
      newValue,
      " typeof=>",
      typeof newValue,
      "sizeOf",
      newValue.length
    );

    setOtp(newValue);
  };

  const handleVerify = () => {
    props?.setverified(true);
    dispatch(
      openSnackbar(
        "Otp Verified Successfully! Now Proceed to Register Your account",
        "success"
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        props.setOtp(false);
        dispatch(openSnackbar("otp expired resend otp", "warning"));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  return (
    <>
      <Box
        // component={"form"}
        bgcolor={"transparent"}
        // onSubmit={() => console.log("hi, i'm on submit")}
      >
        {/* 👇 Reset Password button 👇 */}

        {/* 👇Otp input👇 */}
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
          htmlFor="otp"
        >
          OTP
        </InputLabel>
        <MuiOtpInput
          value={otp}
          id="otp"
          onChange={handleChangeOtp}
          sx={{
            bgcolor: "transparent",
            height: "50px",
            boxSizing: "border-box",

            "& .MuiOtpInput-Box,.MuiInputBase-root,.MuiFormControl-root, fieldset":
              {
                bgcolor: "transparent",
                color: "white",
                fontWeight: "bold",
              },
            "& input": {
              padding: "5px",
            },
            "& fieldset": {
              borderColor: "white",
            },
            "& .Mui-focused": {
              border: "2px solid white",
            },
          }}
        />
        <Box
          display={"flex"}
          bgcolor="transparent"
          justifyContent="space-between"
        >
          <FormHelperText
            disabled={seconds === 0}
            sx={{
              bgcolor: "transparent",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Time Remaining.. {seconds}
          </FormHelperText>
          <Button
            // variant="outlined"
            disabled={otp.length === 4 ? false : true}
            onClick={handleVerify}
            size="small"
            sx={{
              color: "white",
              textTransform: "none",
              // "&:hover": { textDecoration: "underline" },
            }}
          >
            Verify
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default OtpScreen;
//
