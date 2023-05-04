import {
  Alert,
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
import { Alogin } from "../../redux/action/adminAction";

import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LogInModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  let [searchParam] = useSearchParams();
  let redirect = searchParam.get("redirect") || "/admin/template-list";

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo, error, loading } = adminLogin;
  // console.log(adminLogin);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(Alogin(email, password));
  };
  useEffect(() => {
    if (adminInfo) {
      navigate(redirect);

      // {
      //   alert(`logged in successfully ${adminInfo.name}`);
      // }

      // props.showAlertBar("logged in successfully", "success");
    }
  }, []);
  return (
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
            {/* <IconButton
              onClick={toggleLogInModal}
              sx={{
                color: "black",
                position: "absolute",
                right: "35px",
                top: "20px",
              }}
            >
              <CancelOutlinedIcon sx={{ bgcolor: "transparent" }} />
            </IconButton> */}
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
                src="./assets/EviteGuruLogo.svg"
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
              Admin
            </Typography>
          </Box>
          {/*👆 container for heading text and logo img's container👆  */}
          {/* 👇 Form container 👇 */}
          <Box
            component={"form"}
            bgcolor={"transparent"}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  padding: "2px 10px",
                  borderRadius: "5px",
                  fontWeight: "500",
                }}
                placeholder={"Your e-mail"}
              />
            </FormControl>
            {/*👆 E-MAIL👆 */}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                sx={{
                  padding: "2px 10px",
                  borderRadius: "5px",
                  fontWeight: "500",
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
          {/* <Typography
              variant="p"
              fontFamily="Montserrat"
              fontSize="14px"
              bgcolor="transparent"
              color="white"
              sx={{ margin: "20px auto" }}
            >
              or continue with
            </Typography> */}
          {/* <Stack
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
            ></Button>
          </Stack> */}
        </Stack>
      </Paper>
    </>
  );
};

export default LogInModal;
