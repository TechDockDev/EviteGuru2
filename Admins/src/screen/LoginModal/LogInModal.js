import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

const LogInModal = (props) => {
  const navigate = useNavigate();
  const [value, setValue] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("/login", value);
      if (res.status === 200) {
        navigate("/admin/template-list");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, []);
  return (
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xl: 400, lg: 400, md: 400, sm: 400, xs: "70%" },
          bgcolor: " rgba(133, 103, 157, 0.47)",
          border: "1px solid #3B285B",
          borderRadius: "20px",
          p: 5,
        }}
      >
        <Stack bgcolor={"transparent"} mt={6}>
          {/* 👇container for heading text and logo img's container👇  */}
          <Box bgcolor={"transparent"}>
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
              color="#3B285B"
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
                  "&.Mui-focused": { color: "#3B285B", fontWeight:"600" },
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
                value={value.email}
                onChange={handleChange}
                sx={{
                  padding: "2px 10px",
                  borderRadius: "5px",
                  fontWeight: "500",
                  bgcolor:"white"
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
                  "&.Mui-focused": { color: "#3B285B", fontWeight:"600" },

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
                value={value.password}
                onChange={handleChange}
                id="password"
                sx={{
                  padding: "2px 10px",
                  borderRadius: "5px",
                  fontWeight: "500",
                  bgcolor:"white"
                }}
                placeholder="Your password"
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
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
        </Stack>
      </Paper>
  );
};

export default LogInModal;
