import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import OtpScreen from "./OtpScreen";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/action/userActions";

const PasswordReset = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(false);
  console.log("phone=>", props?.phone);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const handleVerifyOtp = async (otp) => {
    await props?.verifyOtp(otp);
    props?.setVerified(true);
  };

  // ===============================
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      console.log("formData=>", formData, " prospData=>", props?.formData);
      // props?.setFormData({ ...props?.formData, password: formData?.password });
      await props?.updatePassword(formData?.password);
    } else {
      dispatch(openSnackbar("Password Mismatch", "warning"));
    }
    try {
    } catch (error) {
      dispatch(openSnackbar("something went wrong", "error"));
    }
  };
  // ===============================

  return (
    <>
      <Box
        component={"form"}
        bgcolor={"transparent"}
        onSubmit={(e) => handleSubmitPassword(e)}
      >
        {/* 👇 Reset Password button 👇 */}

        {/* 👇Otp input👇 */}
        {props?.verified ? (
          ""
        ) : (
          <>
            <OtpScreen
              setOtp={setOtp}
              verifyOtp={handleVerifyOtp}
              verified={props?.verified}
            />
            <Typography variant="body" sx={{ color: "white" }}>
              Your Otp has been sent to this number{" "}
              {props?.phone.slice(-props?.phone.length, -10) +
                " XXXXXXXX" +
                props?.phone.slice(-3, -1)}
              . Please Enter Otp to verify.
            </Typography>
          </>
        )}

        {/* 👆Otp input👆  */}
        {/* 👇 PASSWORD 👇 */}
        {props?.verified ? (
          <>
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
                value={formData?.password || ""}
                id="password"
                sx={{
                  padding: "2px 10px",
                  borderRadius: "5px",
                  fontWeight: "500",
                  backgroundColor: "white",
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
                value={formData?.confirmPassword || ""}
                id="confirmPassword"
                sx={{
                  padding: "2px 10px",
                  borderRadius: "5px",
                  fontWeight: "500",
                  backgroundColor: "white",
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
          </>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default PasswordReset;
