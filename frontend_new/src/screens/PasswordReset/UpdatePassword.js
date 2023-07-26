import { Visibility, VisibilityOff } from "@mui/icons-material";
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
import React from "react";
import { useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/action/userActions";
import axios from "axios";
import { Constants } from "../../redux/constants/action-types";
const UpdatePassword = ({ togglePasswordChangeModal, open, onClose }) => {
  const temp = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [formData, setFormData] = useState(temp);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onChangeHandler = (e) => {
    // console.log(formData);

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData?.password === formData?.confirmPassword) {
        console.log("formData=>", formData);
        const res = await axios.post(`${Constants.URL}/change-password`, {
          newPassword: formData?.password,
          oldPassword: formData?.oldPassword,
        });
        if (res.status === 200) {
          console.log("res=>", res);
          dispatch(openSnackbar(res?.data?.message, "success"));
          setFormData(temp)
          togglePasswordChangeModal();
        } 
      } else {
        setFormData(temp)
        dispatch(openSnackbar("Password Mismatch", "error"));
        togglePasswordChangeModal();
      }
    } catch (error) {
      console.log("error=>", error);
      if (error?.response?.data?.message) {
        setFormData(temp)
        dispatch(openSnackbar(error?.response?.data?.message, "error"));
        togglePasswordChangeModal();
      } else {
        setFormData(temp)
        dispatch(openSnackbar("error", "error"));
        togglePasswordChangeModal();
      }
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
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
        <Stack bgcolor={"transparent"} mt={6}></Stack>
        <Box bgcolor={"transparent"}>
          {/* 👇Cross icon to close the modal👇  */}
          <IconButton
            onClick={onClose}
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
          <Typography
            bgcolor={"transparent"}
            fontSize="30px"
            fontWeight="600"
            color="white"
            variant="h1"
            mb={2}
          >
            Update Password
          </Typography>
        </Box>
        {/*👆 container for heading text and logo img's container👆  */}
        <Box component={"form"} onSubmit={handleSubmit}>
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
              htmlFor="oldPassword"
            >
              Old Password
            </InputLabel>
            <InputBase
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              onChange={onChangeHandler}
              value={formData?.oldPassword || ""}
              id="oldPassword"
              sx={{
                padding: "2px 10px",
                borderRadius: "5px",
                fontWeight: "500",
                backgroundColor: "white",
              }}
              placeholder="Old password"
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowOldPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
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
              htmlFor="newPassword"
            >
              New Password
            </InputLabel>
            <InputBase
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={onChangeHandler}
              value={formData?.password || ""}
              id="newPassword"
              sx={{
                padding: "2px 10px",
                borderRadius: "5px",
                fontWeight: "500",
                backgroundColor: "white",
              }}
              placeholder="New password"
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
              Confirm New Password
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
              placeholder="Confirm New password"
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
            Update Password
          </Button>
          {/*👆 Reset Password button👆 */}
        </Box>
        {/*👆 container for logo img👆  */}
      </Paper>
    </Modal>
  );
};

export default UpdatePassword;
