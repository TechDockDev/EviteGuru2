import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import SidebarMenu from "./SidebarMenu";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  //👇  state for open small screen left drawer  👇
  const [openLeftDrawer, setOpenLeftDrawer] = useState();
  // useSelector to use Title
  const pageTitle = useSelector((state) => state.pageTitle);
  //👇 onClick function for hamburger menu to open left drawer on small screen  👇

  const handleDrawerToggle = () => {
    setOpenLeftDrawer(!openLeftDrawer);
  };

  return (
    <Box
      sx={{
        // border: "1px solid green",
        // bgcolor: "#1e1e1e",
        // position: "static",
        maxWidth: "1440px",
        margin: "0 auto",
        display: "flex",
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
          height: "100vh",
          // border: "5px solid red",
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
            // justifyContent:"center",
            alignItems: "center",
            width: "250px",
            height: "100vh",
            bgcolor: "transparent",
          }}
          disableGutters={true}
        >
          {/* == left eviteguru logo ==*/}
          <Box
            sx={{
              height: {
                md: "70px",
                lg: "70px",
                xl: "70px",
                sm: "60px",
                xs: "60px",
              },
              // border: "1px solid green",
              // margin: " 0 auto",
              // bgcolor: "#795DA8",

              bgcolor: "rgba(121, 93, 168, 1)",
              width: "100%",
              textAlign: "center",
              boxSizing: "border-box",
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
              // border:"1px solid blue",
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
          // borderBottom:{
          //   xl: "none",
          //   lg: "none",
          //   md: "none",
          //   sm: "1px solid black",
          //   xs: "1px solid black",
          // }
          //
          // boxShadow: "black 0px 05px 5px",
          // display: {
          //   xl: "none",
          //   lg: "none",
          //   md: "none",
          //   sm: "block",
          //   xs: "block",
          // },
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
            // border: "1px solid green",
            // backgroundColor: "rgba(121, 93, 168, 1)",
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
            sx={{ height: "100%" }}
          />
        </Box>

        {/* == tobar right eviteguru logo | vsisible on small screen==*/}

        {/* ============ 👇left navigation drawer for small screens👇  ============= */}

        <Drawer
          variant="temporary"
          // open={true}
          open={openLeftDrawer}
          onClose={handleDrawerToggle}
          PaperProps={{
            sx: {
              // position: "static",
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
              // marginTop:"100px",
              // borderBottom: "1px solid white",
              display: "flex",
              flexDirection: "column",

              width: {
                xl: "250px",
                lg: "250px",
                md: "250px",
                sm: "250px",
                xs: "100%",
              },

              height: "100vh",
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
                // flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgba(121, 93, 168, 1)",
              }}
            >
              <Box
                sx={{
                  height: "60px",
                  // width: "",
                  textAlign: "center",
                  // border: "1px solid green",
                  // display: { xl: "none", lg: "none", md: "none", sm: "block", xs: "block" },

                  padding: "2px",
                  margin: " 0 20px",
                }}
              >
                <Box
                  component={"img"}
                  src={"/assets/EviteGuruLogoWhite.svg"}
                  sx={{ height: "100%" }}
                />
              </Box>

              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  // border: "1px solid green",
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
            height: "100%",
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
              // marginRight: "20px",
              boxSizing: "border-box",
            }}
            pl={2.8}
          >
            <Typography
              sx={{
                bgcolor: "transparent",
                fontWeight: "bold",
                // fontSize: "16px",
                marginLeft: "2vw",
                textShadow: "2px 2px rgba(205, 181, 234, 1)",
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
            {/* <Button disableElevation variant="outlined">
              Cancel
            </Button>
            <Button disableElevation variant="contained" sx={{ color: "#fff" }}>
              Next
            </Button> */}

            <Avatar sx={{ bgcolor: "rgba(121, 93, 168, 1)" }}>N</Avatar>
          </Box>
        </Box>
        {/* ================ 👆 container for appbar components👆    ==================== */}
      </AppBar>
      {/* ============  👆  top app bar 👆============= */}

      {/* ========================================================================================== */}

      {/* ============ 👇container for all the screens (scenes)👇  ============= */}
      <Box
        sx={{
          // border:"1px solid blue",
          minHeight: `calc(100vh - 100px)`,
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
          marginTop: {
            xl: "80px",
            lg: "80px",
            md: "80px",
            sm: "70px",
            xs: "70px",
          },
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Box>
      {/* ============  👆container for all the screens (scenes)👆============= */}
    </Box>
  );
};

export default UserDashboard;
