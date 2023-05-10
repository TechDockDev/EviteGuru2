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
// import { NavLink } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../oldredux/action/userAction";
// '../redux/action/userAction';
const RegisterModal = ({ openRegisterModal, toggleRegisterModal }) => {
  // const [formData, setFormData] = useState({ username:"",email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const onChangeHandler = (e) => {
  //    setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userDetail } = useSelector((state) => state);

  // useEffect(() => {
  //   if(userInfo){
  //       navigate(redirect)
  //   }
  // }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    console.log("Values:->", name, email, phone, password);
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
    } else {
      dispatch(register(name, email, phone, password));
      toggleRegisterModal();
    }
  };

  // const registerHandler = (e) => {
  //    e.preventDefault();
  //    alert(formData);
  // };

  return (
    <>
      <Modal
        open={openRegisterModal}
        // open={true}
        onClose={toggleRegisterModal}
        aria-labelledby="login-modal"
        aria-describedby="login_modal"
        closeAfterTransition
        sx={{ bgcolor: "transparent", backdropFilter: "blur(3px)" }}
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
          <Stack bgcolor={"transparent"} mt={6}>
            {/* 👇container for heading text and logo img's container👇  */}

            <Box bgcolor={"transparent"}>
              {/* 👇Cross icon to close the modal👇  */}
              <IconButton
                onClick={toggleRegisterModal}
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
                  name="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    padding: "2px 10px",
                    borderRadius: "5px",
                    fontWeight: "500",
                    bgcolor: "white",
                  }}
                  placeholder={"Your full name"}
                  id="username"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  htmlFor="phone"
                >
                  Phone
                </InputLabel>
                <InputBase
                  type="number"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{
                    padding: "2px 10px",
                    borderRadius: "5px",
                    fontWeight: "500",
                    bgcolor: "white",
                  }}
                  placeholder={"Your Number"}
                  id="phone"
                />
              </FormControl>
              {/*👆 Phone👆 */}
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
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
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
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                        {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
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
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
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
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                        {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {/*👆 Confirm PASSWORD👆 */}
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
                Register
              </Button>
              {/*👆 LogIn button👆 */}
            </Box>
            {/*👆 Form Container👆 */}
          </Stack>
        </Paper>
      </Modal>
    </>
  );
};

export default RegisterModal;
