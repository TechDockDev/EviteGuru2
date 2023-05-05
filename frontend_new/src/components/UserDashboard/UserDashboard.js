import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  Toolbar,
} from "@mui/material";
import SingleMenuNavLink from "./SingleMenuNavLink";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { GrDocumentText } from "react-icons/gr";
import { GoMailRead } from "react-icons/go";
import { GoMail } from "react-icons/go";
import { TbAddressBook } from "react-icons/tb";
import { MdLogout } from "react-icons/md";

const UserDashboard = () => {
  //👇  state for open small screen left drawer  👇
  const [openLeftDrawer, setOpenLeftDrawer] = useState();

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
                xl: "70px",
                lg: "70px",
                md: "70px",
                sm: "60px",
                xs: "60px",
              },
              // border: "1px solid green",
              // margin: " 0 auto",
              // bgcolor: "#795DA8",
              bgcolor: "#white",
              width: "100%",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            <Box
              component={"img"}
              bgcolor="transparent"
              src={"/assets/EviteGuruLogoWhite.svg"}
              sx={{ height: "100%" }}
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
            <List
              sx={{
                // border:"1px solid blue",
                height: "fit-content",
                bgcolor: "transparent",
                "& .active": {
                  color: "#000",
                  borderLeft: "10px solid #795DA8",
                  bgcolor: "#CDB5EA",
                  borderRadius: "4px 0px 0px 4px",
                },
              }}
            >
              <SingleMenuNavLink
                icon={<GrDocumentText />}
                to={"/dashboard/edit/642bb01d64a71238dab88d9e"}
                linkText={"My Template"}
              />
              <SingleMenuNavLink
                icon={<GoMailRead />}
                to={"/dashboard/invitees"}
                linkText={"Invitees"}
              />
              <SingleMenuNavLink
                icon={<GoMail />}
                to={"/dashboard/mailing-responses"}
                linkText={"Mailing Response"}
              />
              <SingleMenuNavLink
                icon={<TbAddressBook />}
                to={"/"}
                linkText={"Address Book"}
              />
              <SingleMenuNavLink
                icon={<FiSettings />}
                to={"/dashboard/account-setting"}
                linkText={"Account settings"}
              />
              <SingleMenuNavLink
                icon={<MdLogout />}
                to={"/"}
                linkText={"Log out"}
              />
            </List>
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
            // border: "1px solid green",
            display: {
              xl: "none",
              lg: "none",
              md: "none",
              sm: "block",
              xs: "block",
            },

            // padding: "5px",
            // margin: " 0 20px",
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
            // top:"100px",
            // position: "fixed",
            // marginTop: "100px",
            // border:"1px solid pink",

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
              // justifyContent: "center",
              // alignItems: "start",
              // width: "248px",
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
                  src={"/assets/EviteGuruLogo.svg"}
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
              <List
                sx={{
                  // border:"1px solid blue",
                  height: "100%",
                }}
              >
                <SingleMenuNavLink
                  handleDrawerToggle={handleDrawerToggle}
                  icon={<FiSettings />}
                  to={"/dashboard/edit/642bb01d64a71238dab88d9e"}
                  linkText={"My Template"}
                />
                <SingleMenuNavLink
                  handleDrawerToggle={handleDrawerToggle}
                  icon={<GrDocumentText />}
                  to={"/dashboard/invitees"}
                  linkText={"Invitees"}
                />
                <SingleMenuNavLink
                  handleDrawerToggle={handleDrawerToggle}
                  icon={<GoMailRead />}
                  to={"/dashboard/mailing-responses"}
                  linkText={"Mailing Response"}
                />
                <SingleMenuNavLink
                  handleDrawerToggle={handleDrawerToggle}
                  icon={<GoMail />}
                  to={"/dashboard/subscription"}
                  linkText={"Subscription"}
                />
                <SingleMenuNavLink
                  handleDrawerToggle={handleDrawerToggle}
                  icon={<TbAddressBook />}
                  to={"/"}
                  linkText={"Address Book"}
                />
                <SingleMenuNavLink
                  handleDrawerToggle={handleDrawerToggle}
                  icon={<MdLogout />}
                  to={"/"}
                  linkText={"Log out"}
                />
              </List>
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
            // bgcolor: "rgba(245, 200, 145, 0.5)",
            // display: "flex",
            display: {
              xl: "flex",
              lg: "flex",
              md: "flex",
              sm: "none",
              xs: "none",
            },
            justifyContent: "end",
            borderBottom: "1px solid black",
          }}
        >
          <Box
            sx={{
              width: "180px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginRight: "20px",
              boxSizing: "border-box",
              //   border: "1px solid green",
            }}
          >
            <Button disableElevation variant="outlined">
              Cancel
            </Button>
            <Button disableElevation variant="contained" sx={{ color: "#fff" }}>
              Next
            </Button>
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
