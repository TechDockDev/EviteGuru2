import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Alert,
  AppBar,
  Backdrop,
  Box,
  Drawer,
  IconButton,
  List,
  Snackbar,
  Toolbar,
} from "@mui/material";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PaymentsIcon from "@mui/icons-material/Payments";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CollectionsIcon from "@mui/icons-material/Collections";
import SingleMenuNavLink from "./SingleMenuNavLink";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import AdminTemplateListScreen from "../../screen/AdminTemplateListScreen";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { CircularProgress } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const AdminDashboard = () => {
  //👇  state for open small screen left drawer  👇
  const navigate = useNavigate();
  const [openLeftDrawer, setOpenLeftDrawer] = useState();

  const handleDrawerToggle = () => {
    setOpenLeftDrawer(!openLeftDrawer);
  };
  const logout = () => {};
  return (
    <>
      <Box
        sx={{
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
                bgcolor: "#795DA8",
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
                  icon={<DashboardIcon />}
                  to={"#"}
                  linkText={"Dashboard"}
                />{" "}
                <SingleMenuNavLink
                  icon={<DashboardIcon />}
                  to={"/admin/events"}
                  linkText={"Events"}
                />{" "}
                <SingleMenuNavLink
                  icon={<CollectionsIcon />}
                  to={"/admin/template-list"}
                  linkText={"Template List"}
                />
                <SingleMenuNavLink
                  icon={<AddPhotoAlternateIcon />}
                  to={"/admin/template-create"}
                  linkText={"Add Template"}
                />
                <SingleMenuNavLink
                  icon={<PeopleIcon />}
                  to={"/admin/user-list"}
                  linkText={"Users"}
                />
                <SingleMenuNavLink
                  icon={<PeopleIcon />}
                  to={"/admin/admin_list"}
                  linkText={"Sub admin"}
                />
                <SingleMenuNavLink
                  icon={<SubscriptionsIcon />}
                  to={"/admin/pricing"}
                  linkText={"subscriptions"}
                />
                <SingleMenuNavLink
                  icon={<LocalOfferIcon />}
                  to={"/admin/promotions"}
                  linkText={"Coupons and Promotions"}
                />
                <SingleMenuNavLink
                  icon={<PaymentsIcon />}
                  to={"#"}
                  linkText={"Payments Details"}
                />
                <SingleMenuNavLink
                  icon={<ManageAccountsIcon />}
                  to={"/admin/profile"}
                  linkText={"Profile"}
                />
                <SingleMenuNavLink
                  icon={<MdLogout />}
                  clickFunction={logout}
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
                  borderBottom: "px solid white",
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
                    icon={<DashboardIcon />}
                    to={"#"}
                    linkText={"Dashboard"}
                  />{" "}
                  <SingleMenuNavLink
                    icon={<CollectionsIcon />}
                    to={"/admin/template-list"}
                    linkText={"Events"}
                  />
                  <SingleMenuNavLink
                    icon={<CollectionsIcon />}
                    to={"/admin/template-list"}
                    linkText={"Template List"}
                  />
                  <SingleMenuNavLink
                    icon={<AddPhotoAlternateIcon />}
                    to={"/admin/template-create"}
                    linkText={"Add Template"}
                  />
                  <SingleMenuNavLink
                    icon={<PeopleIcon />}
                    to={"/admin/user-list"}
                    linkText={"Users"}
                  />
                  <SingleMenuNavLink
                    icon={<PeopleIcon />}
                    to={"/admin/admin_list"}
                    linkText={"Sub admin"}
                  />
                  <SingleMenuNavLink
                    icon={<SubscriptionsIcon />}
                    to={"/admin/pricing"}
                    linkText={"subscriptions"}
                  />
                  <SingleMenuNavLink
                    icon={<PaymentsIcon />}
                    to={"/admin/"}
                    linkText={"Payments Details"}
                  />
                  <SingleMenuNavLink
                    icon={<ManageAccountsIcon />}
                    to={"/admin/profile"}
                    linkText={"Profile"}
                  />
                  <SingleMenuNavLink
                    icon={<MdLogout />}
                    clickFunction={logout}
                    to={"/"}
                    linkText={"Log out"}
                  />
                </List>
              </Box>
              {/* 👆 Left nav menu container  👆   */}
            </Toolbar>
          </Drawer>

          {/* ============  👆  left navigation drawer for small screens  👆============= */}

          {/* ================ 👇  container for appbar components👇👆👆    ==================== */}
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
              justifyContent: "end",
              borderBottom: "1px solid white",
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
            ></Box>
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
            flexWrap: "nowrap",
            //  display: "auto",
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
          {/* loader */}
          <Backdrop open={false} sx={{ zIndex: "10000" }}>
            <CircularProgress color="info" />
          </Backdrop>
          {/* loader */}
          {/* snackbar */}
          <Snackbar open={false} autoHideDuration={6000}>
            <Alert
              // severity={severity}
              severity={"success"}
              sx={{ width: "100%" }}
            >
              hi i am snackbar
              {/* {message} */}
            </Alert>
          </Snackbar>
          {/* snackbar */}
          <Outlet />
        </Box>
        {/* ============  👆container for all the screens (scenes)👆============= */}
      </Box>
    </>
  );
};

export default AdminDashboard;
