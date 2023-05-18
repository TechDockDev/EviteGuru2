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
import PasswordReset from "./PasswordReset";

const VerifyEmailAddresss = ({ toggleLogInModal }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [modalContent, setModalContent] = useState("getOtp");

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const resetPassword = (e) => {
    e.preventDefault();
    setModalContent("updatePassword");
  };
  return (
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
          <CancelOutlinedIcon sx={{ bgcolor: "transparent", color: "white" }} />
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
          Forgot Password
        </Typography>
      </Box>
      {/*👆 container for heading text and logo img's container👆  */}
      {modalContent === "getOtp" ? (
        <Box
          component={"form"}
          bgcolor={"transparent"}
          onSubmit={(e) => resetPassword(e)}
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
              value={formData.email}
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
        <PasswordReset />
      ) : (
        ""
      )}
    </Stack>
  );
};

export default VerifyEmailAddresss;
