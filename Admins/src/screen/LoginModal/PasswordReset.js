import React, { useEffect, useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordReset = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(59);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onChangeHandler = (e) => {
    console.log(formData);

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangeOtp = (newValue) => {
    setOtp(newValue);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <>
      <Box
        component={"form"}
        bgcolor={"transparent"}
        onSubmit={() => console.log("hi, i'm on submit")}
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
            sx={{ bgcolor: "transparent", color: "white", fontWeight: "bold" }}
          >
            Time Remaining.. {seconds}
          </FormHelperText>
          <Button
            disabled={seconds !== 0}
            sx={{
              color: "white",
              textTransform: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Resend OTP
          </Button>
        </Box>

        {/* 👆Otp input👆  */}
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
            onChange={onChangeHandler}
            value={formData.password}
            id="password"
            sx={{ padding: "2px 10px", borderRadius: "5px", fontWeight: "500" }}
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
                  {showPassword ? <VisibilityOff /> : <Visibility />}
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
            onChange={onChangeHandler}
            value={formData.confirmPassword}
            id="confirmPassword"
            sx={{ padding: "2px 10px", borderRadius: "5px", fontWeight: "500" }}
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
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {/*👆 Confirm PASSWORD👆 */}

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
          Reset Password
        </Button>
        {/*👆 Reset Password button👆 */}
      </Box>
    </>
  );
};

export default PasswordReset;
