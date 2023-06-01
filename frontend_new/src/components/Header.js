import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
// import { Dis } from '@headlessui/react';

import SmallScreenDrawerMenu from "./SmallScreenDrawerMenu";
import LogInModal from "../screens/LoginModal/LogInModal";
import RegisterModal from "../screens/RegisterModal/RegisterModal";
import FooterSection from "../screens/HomeScreen/FooterSection";
import axios from "axios";
import { logout, openSnackbar } from "../redux/action/userActions";
import { Constants } from "../redux/constants/action-types";

const Header = () => {
  // =====================================
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const toggleLogInModal = () => {
    setOpenLoginModal(!openLoginModal);
  };
  const toggleRegisterModal = () => {
    setOpenRegisterModal(!openRegisterModal);
  };
  // ===================================
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // ==================
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userDetail } = useSelector((state) => state);
  console.log("User Login:->", userDetail);

  // ====== logout handler =======

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${Constants.URL}/logout`);
      if (res.status === 200) {
        console.log("response=>", res);
        dispatch(openSnackbar(res?.data?.message, "success"));
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.log("error=>", error);
      dispatch(openSnackbar("please try again", "error"));
    }
  };
  // ===== endof logout handler===

  return (
    <>
      <Stack
        sx={{ maxWidth: "1440px", margin: "auto" }}
        justifyContent="center"
        // border='10px solid red'
      >
        <AppBar
          elevation={1}
          sx={{
            bgcolor: "white",
            display: {
              xl: "block",
              lg: "block",
              md: "block",
              sm: "block",
              xs: "none",
            },
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              width: "100%",
              maxWidth: "1440px",
              height: "80px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxSizing: "border-box",
              padding: "0px 20px",
              margin: "auto",
            }}
          >
            <Stack direction={"row"}>
              {/* ==== 👇 EVITEGURU topbar logo👇   ===== */}
              <Box
                component={NavLink}
                sx={{
                  width: "150px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Box
                  component={"img"}
                  src="./assets/EviteGuruLogo.svg"
                  sx={{ width: "100%" }}
                />

                {/* <Typography variant="h1" fontFamily={'Comforter Brush'}  fontSize="40px">EviteGuru</Typography> */}
              </Box>
              {/* ==== 👆 EVITEGURU topbar logo 👆   ===== */}

              {/*👇 topbar left menu list 👇 */}
              <List
                disablePadding={true}
                dense
                component={"nav"}
                sx={{
                  display: "flex",
                  "& .MuiListItemButton-root": {
                    color: "black",
                  },
                  "& : hover	.MuiListItemButton-root": {
                    borderBottom: "4px solid rgba(121, 93, 168, 1)",
                    transition: "all .5s ease-in",
                  },
                  "& .active 	.MuiListItemButton-root": {
                    // scale: ".95",
                    borderBottom: "4px solid rgba(121, 93, 168, 1)",
                    // color: "black !important",
                  },
                }}
              >
                <ListItem
                  // onClick={() => navigate("/")}
                  component={NavLink}
                  to="/"
                >
                  <ListItemButton
                    disableGutters
                    sx={{ "&:hover": { bgcolor: "white" } }}
                  >
                    <ListItemText>Home</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem
                  // onClick={() => navigate("/browse_template")}
                  component={NavLink}
                  to="/browse_template"
                >
                  <ListItemButton
                    disableGutters
                    sx={{ "&:hover": { bgcolor: "white" } }}
                  >
                    <ListItemText>Template</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem
                  // onClick={() => navigate("/pricing")}
                  component={NavLink}
                  to="/pricing"
                >
                  <ListItemButton
                    disableGutters
                    sx={{ "&:hover": { bgcolor: "white" } }}
                  >
                    <ListItemText>Pricing</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem component={NavLink} to="/enterprise">
                  <ListItemButton
                    disableGutters
                    sx={{ "&:hover": { bgcolor: "white" } }}
                  >
                    <ListItemText>Enteprise</ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
              {/*👆 topbar left menu list👆 */}
            </Stack>
            {/* ============================================ */}
            {/*👇 topbar right buttons 👇 */}
            {/* {isLoggedInd ? ( */}
            {userDetail ? (
              <Box
                sx={{
                  // width: "150px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  //   border: "1px solid green",
                }}
              >
                {!userDetail.isUser ? (
                  <Stack spacing={1} direction={"row"}>
                    <Button
                      variant="contained"
                      onClick={toggleLogInModal}
                      sx={{ color: "white" }}
                    >
                      LOGIN
                    </Button>
                    <Button variant="outlined" onClick={toggleRegisterModal}>
                      SIGN UP
                    </Button>
                  </Stack>
                ) : (
                  <>
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar src="./assets/avatarDefault.svg" />
                    </IconButton>
                  </>
                )}

                {/* =========================================== */}
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  // open={true}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      // bgcolor: "#CEC5DC",

                      filter: "drop-shadow(0px 2px 8px rgba(206, 197, 220, 1))",
                      borderRadius: "16px",
                      mt: 1.5,
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 24,
                        width: 20,
                        height: 20,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        borderTop: "1px solid #3B285B",
                        borderLeft: "1px solid #3B285B",
                        zIndex: 0,
                      },
                    },
                  }}
                  sx={{
                    bgcolor: "transparent",
                    "& ul": {
                      p: 2,
                      bgcolor: "rgba(206, 197, 220, 0.46)",
                    },
                    "& .MuiPaper-root": {
                      bgcolor: "transparent",
                      border: "1px solid #3B285B",
                      borderRadius: "8px",
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {" "}
                  {!userDetail.isUser ? (
                    <div>
                      <MenuItem onClick={toggleLogInModal}>Login</MenuItem>
                    </div>
                  ) : (
                    <div>
                      <MenuItem
                        onClick={handleClose}
                        sx={{
                          color: "#3B285B",
                          fontWeight: "800",
                          padding: "10px",
                          borderBottom: "2px solid grey",
                        }}
                      >
                        {userDetail?.email}
                      </MenuItem>
                      <MenuItem
                        component={NavLink}
                        to="/dashboard/my-events/"
                        onClick={() => handleClose}
                      >
                        My Events
                      </MenuItem>
                      <MenuItem
                        component={NavLink}
                        to="/dashboard/account-setting"
                        onClick={() => handleClose}
                      >
                        My account
                      </MenuItem>
                      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </div>
                  )}
                </Menu>
                {/* ==================================================== */}
              </Box>
            ) : (
              ""
            )}
            {/*👆 topbar right buttons👆 */}
          </Toolbar>
        </AppBar>
        <SmallScreenDrawerMenu
          toggleLogInModal={toggleLogInModal}
          toggleRegisterModal={toggleRegisterModal}
          logoutHandler={logoutHandler}
        />
        {/* ======================================================================== */}
        <LogInModal
          openLoginModal={openLoginModal}
          toggleLogInModal={toggleLogInModal}
          toggleRegisterModal={toggleRegisterModal}
        />
        <RegisterModal
          openRegisterModal={openRegisterModal}
          toggleRegisterModal={toggleRegisterModal}
        />
        {/* ======================================================================== */}

        {/*👇 All the scenes will be rendered  here 👇 */}

        <Outlet />
        {/*👆 All the scenes will be rendered here 👆 */}

        <FooterSection />
      </Stack>
    </>
  );
};

export default Header;
