import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import SidebarMenu from "./SidebarMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  openSnackbar,
  setDialogueBoxOpen,
  setNavigate,
} from "../../redux/action/userActions";

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //👇  state for open small screen left drawer  👇
  const [openLeftDrawer, setOpenLeftDrawer] = useState();
  // useSelector to use Title
  const { pageTitle, userDetail, unsaved } = useSelector((state) => state);
  //👇 onClick function for hamburger menu to open left drawer on small screen  👇

  const handleDrawerToggle = () => {
    setOpenLeftDrawer(!openLeftDrawer);
  };
  // =====to get user name letters for avatar====
  function stringAvatar(name) {
    const fName = name.split(" ")[0] ? name.split(" ")[0] : "" || " ";
    const sName = name.split(" ")[1] ? name.split(" ")[1] : "" || " ";
    return {
      children: `${fName[0]}${sName[0]}`,
    };
  }

  const handleNavigate = (path) => {
    console.log("unsaved=>", unsaved);
    console.log("navigateConsole is coming");
    if (unsaved) {
      dispatch(setNavigate(true, path));
      dispatch(setDialogueBoxOpen(true));
    } else {
      navigate(path);
    }
  };
  // ============================================
  if (userDetail?.isUser) {
    return (
      <Box
        sx={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "flex",
          // overflow:"hidden",
          // bgcolor:"yellow",
          justifyContent: {
            xl: "end",
            lg: "end",
            md: "end",
            sm: "center",
            xs: "center",
          },
          boxSizing: "border-box",
        }}
      >
        {/* ============ 👇left navigation drawer for bigger screens👇  ============= */}
        <Drawer
          open={false}
          sx={{
            width: "250px",
            // height: "100vh",

            zIndex: "100",
            display: {
              xl: "flex",
              lg: "flex",
              md: "flex",
              sm: "none",
              xs: "none",
            },
          }}
          PaperProps={{
            sx: {
              border: "none",
            },
          }}
          variant="permanent"
        >
          {/* ============ 👇left nav panel container👇  ============= */}
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: "column",

              alignItems: "center",
              width: "250px",
              // height: "100vh",
              bgcolor: "transparent",
            }}
            disableGutters={true}
          >
            {/* == left eviteguru logo ==*/}
            <Box
              // component={NavLink}
              // to="/"
              onClick={() => handleNavigate("/")}
              sx={{
                height: {
                  md: "70px",
                  lg: "70px",
                  xl: "70px",
                  sm: "60px",
                  xs: "60px",
                },
                cursor: "pointer",
                bgcolor: "rgba(121, 93, 168, 1)",
                width: "100%",
                textAlign: "center",
                boxSizing: "border-box",
                p: 2,
              }}
            >
              <Box
                component={"img"}
                bgcolor="transparent"
                src={"/assets/EviteGuruLogoWhite.svg"}
                sx={{
                  height: "100%",
                  width: "100%",
                }}
              />
            </Box>
            {/* == left eviteguru logo ==*/}
            {/* =============================================================================== */}
            {/*  👇 Left nav menu container 👇    */}
            <Box
              sx={{
                width: "100%",
                height: "100%",

                paddingTop: "10px",
                overflow: "auto",
                bgcolor: "transparent",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none",
              }}
            >
              <SidebarMenu />
            </Box>
            {/* 👆 Left nav menu container  👆   */}
          </Toolbar>
          {/* ============  👆  left nav panel container  👆============= */}
        </Drawer>
        {/* ============  👆  left navigation drawer for bigger screens  👆============= */}

        {/* ========================================================================================= */}
        {/* ============ 👇top app bar 👇  ============= */}

        <AppBar
          elevation={0}
          sx={{
            padding: "0",
            margin: "0",
            maxWidth: "1440px",
            left: "auto",
            right: "auto",
            width: "100%",
            height: {
              xl: "70px",
              lg: "70px",
              md: "70px",
              sm: "60px",
              xs: "60px",
            },
            bgcolor: "white",
            zIndex: "10",
            display: "flex",
            flexDirection: "row",
            justifyContent: {
              xl: "end",
              lg: "end",
              md: "end",
              sm: "space-between",
              xs: "space-between",
            },
            alignItems: "center",
            borderBottom: "1px solid black",
          }}
        >
          {/* hamburger icon for opening menu on small screens */}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: "absolute",
              margin: "0 20px",
              fontSize: "25px",
              transition: "all .2s ease",
              display: {
                xl: "none",
                lg: "none",
                md: "none",
                sm: "block",
                xs: "block",
              },
            }}
          >
            <RxHamburgerMenu />
          </IconButton>

          {/* hamburger icon for opening menu on small screens */}
          {/* == topbar right eviteguru logo |vsisible on small screen ==*/}
          <Box
            sx={{
              height: "100%",
              width: "100%",
              textAlign: "center",
              display: "flex",
              direction: "row",
              display: {
                xl: "none",
                lg: "none",
                md: "none",
                sm: "block",
                xs: "block",
              },
            }}
          >
            <Box
              component={"img"}
              src={"/assets/EviteGuruLogo.svg"}
              sx={{ height: "100%", width: { sm: "20%", xs: "30%" } }}
            />
          </Box>

          {/* == tobar right eviteguru logo | vsisible on small screen==*/}

          {/* ============ 👇left navigation drawer for small screens👇  ============= */}

          <Drawer
            variant="temporary"
            open={openLeftDrawer}
            onClose={handleDrawerToggle}
            PaperProps={{
              sx: {
                borderRight: " 1px solid #795DA8",
                borderWidth: { sm: "1px", xs: "3px" },
                width: {
                  xl: "250px",
                  lg: "250px",
                  md: "250px",
                  sm: "250px",
                  xs: "100%",
                },
              },
            }}
            hideBackdrop={false}
            transitionDuration={400}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: {
                xl: "none",
                lg: "none",
                md: "none",
                sm: "block",
                xs: "block",
              },
            }}
          >
            <Toolbar
              sx={{
                display: "flex",
                flexDirection: "column",

                width: {
                  xl: "250px",
                  lg: "250px",
                  md: "250px",
                  sm: "250px",
                  xs: "100%",
                },

                // height: "100vh",
              }}
              disableGutters={true}
            >
              {/* left aerrow icon for opening menu on small screens */}
              <Box
                sx={{
                  borderBottom: "1px solid white",
                  width: "100%",
                  height: "80px",
                  display: "flex",

                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "rgba(121, 93, 168, 1)",
                }}
              >
                <Box
                  // component={NavLink}
                  // to="/"
                  onClick={() => handleNavigate("/")}
                  sx={{
                    height: "60px",
                    cursor: "pointer",
                    textAlign: "center",
                    padding: "2px",
                    margin: " 0 20px",
                  }}
                >
                  <Box
                    component={"img"}
                    src={"/assets/EviteGuruLogoWhite.svg"}
                    sx={{ height: "100%", width: "100%" }}
                    onClick={() => {
                      navigate("/");
                      handleDrawerToggle();
                    }}
                  />
                </Box>

                <IconButton
                  onClick={handleDrawerToggle}
                  sx={{
                    margin: "0 20px",
                    fontSize: "22px",
                    transition: "all .2s ease",
                    display: {
                      xl: "none",
                      lg: "none",
                      md: "none",
                      sm: "block",
                      xs: "block",
                    },
                    color: "white",
                  }}
                >
                  <AiOutlineClose />
                </IconButton>
              </Box>

              {/* left aerrow icon for closing menu on small screens */}

              {/* =============================================================================== */}
              {/*  👇 Left nav menu container 👇    */}
              <Box
                sx={{
                  // border: "1px solid blue",
                  width: "100%",
                  padding: "10px 20px",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  scrollbarWidth: "none",
                }}
              >
                <SidebarMenu handleDrawerToggle={handleDrawerToggle} />
              </Box>
              {/* 👆 Left nav menu container  👆   */}
            </Toolbar>
          </Drawer>

          {/* ============  👆  left navigation drawer for small screens  👆============= */}

          {/* ================ 👇  container for appbar components👇    ==================== */}
          <Box
            sx={{
              // height: "100%",
              width: `calc(100% - 250px)`,

              display: {
                xl: "flex",
                lg: "flex",
                md: "flex",
                sm: "none",
                xs: "none",
              },
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                minWidth: "180px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                boxSizing: "border-box",
              }}
              pl={2.8}
            >
              <Typography
                sx={{
                  bgcolor: "transparent",
                  fontWeight: "bolder",
                  textTransform: "uppercase",
                  marginLeft: "2vw",
                  // textShadow: "2px 2px rgba(205, 181, 234, 1)",
                }}
                variant="h5"
              >
                {pageTitle?.title}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "180px",
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                marginRight: "20px",
                boxSizing: "border-box",
              }}
            >
              <Avatar
                // sx={{ bgcolor: "rgba(121, 93, 168, 1)" }}
                // {...stringAvatar(`${userDetail?.name}`)}
                alt={userDetail?.name}
                src={`data:image/jpeg;base64,${userDetail?.profilePhoto}`}
              />
            </Box>
          </Box>
          {/* ================ 👆 container for appbar components👆    ==================== */}
        </AppBar>
        {/* ============  👆  top app bar 👆============= */}

        {/* ========================================================================================== */}

        {/* ============ 👇container for all the screens (scenes)👇  ============= */}
        <Box
          component={Container}
          sx={{
            // border:"1px solid blue",
            height: "100%",
            // minHeight: `calc(100vh - 100px)`,
            // bgcolor: "red",
            width: {
              xl: "calc(100vw - 250px)",
              lg: "calc(100vw - 270px)",
              md: "calc(100vw - 270px)",
              sm: "100vw",
              xs: "100vw",
            },
            maxWidth: `calc(1440px - 250px)`,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "end",
            // bgcolor: "transparent",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            marginTop: {
              xl: "50px",
              lg: "50px",
              md: "50px",
              sm: "40px",
              xs: "30px",
            },
            flexDirection: "column",
          }}
        >
          <Outlet />
        </Box>
        {/* ============  👆container for all the screens (scenes)👆============= */}
      </Box>
    );
  } else {
    console.log("not logged in");
    openSnackbar("You are not logged in", "error");
    navigate("/");
  }
};

export default UserDashboard;
