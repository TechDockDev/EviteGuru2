import { Box, Button, FormHelperText, InputLabel } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/action/userActions";

const OtpScreen = (props) => {
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(59);
  const dispatch = useDispatch();
  const handleChangeCode = (newValue) => {
    setCode(newValue);
  };

  const handleVerify = () => {
    props?.verifyOtp(code);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        props.setOtp(false);
        dispatch(openSnackbar("otp expired", "warning"));
        props?.toggleEmailVerifyModal();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  return (
    <>
      <Box bgcolor={"transparent"}>
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
          value={code}
          length={6}
          id="otp"
          onChange={handleChangeCode}
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
            disabled={code.length === 6 ? false : true}
            onClick={handleVerify}
            variant="contained"
            size="small"
            sx={{
              color: "white",
              textTransform: "none",
              // borderColor:"red"
              // bgcolor:"red"
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
