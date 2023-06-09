import React, { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Backdrop,
  Box,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
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
import axios from "axios";
import { DataContext } from "../../AppContext";
import ExtensionIcon from "@mui/icons-material/Extension";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import BusinessIcon from "@mui/icons-material/Business";
const AdminDashboard = () => {
  //👇  state for open small screen left drawer  👇
  const navigate = useNavigate();
  const [openLeftDrawer, setOpenLeftDrawer] = useState();
  const { snackbar, setIsLoggedIn, setAdminAuthData } = useContext(DataContext);

  const handleDrawerToggle = () => {
    setOpenLeftDrawer(!openLeftDrawer);
  };
  const logout = async () => {
    try {
      const { data } = await axios.get("/logout");
      setIsLoggedIn(false);
      setAdminAuthData("");
      snackbar(data.status, data.message);
      navigate("/admin/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
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
              component={NavLink}
              to={"/admin/template-list"}
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
                boxShadow: "3px 3px 8px grey",
              }}
            >
              <Box
                component={"img"}
                bgcolor="transparent"
                width={{ sm: "60%", xs: "30%" }}
                src={"/admin/assets/EviteGuruLogoWhite.svg"}
                sx={{ height: "100%" }}
              />
            </Box>
            <Box
              sx={{
                height: "30px",
                bgcolor: "#000",
                width: "100%",
                textAlign: "center",
                boxSizing: "border-box",
                boxShadow: "3px 3px 8px grey",
                paddingX: "8px",
              }}
            >
              <Typography color={"white"} fontWeight={"600"} sx={{}}>
                ADMIN
              </Typography>
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
                    borderLeft: "8px solid #795DA8",
                    bgcolor: "#CDB5EA",
                    borderRadius: "4px 0px 0px 4px",
                    boxShadow: "3px 3px 8px grey",
                  },
                }}
              >
                {/* <SingleMenuNavLink
                  icon={<DashboardIcon />}
                  to={"#"}
                  linkText={"Dashboard"}
                />{" "} */}
                {/* <SingleMenuNavLink
                  icon={<DashboardIcon />}
                  to={"/admin/events"}
                  linkText={"Events"}
                />{" "} */}
                <SingleMenuNavLink
                  icon={<CollectionsIcon />}
                  to={"/admin/template-list"}
                  linkText={"Template List"}
                />
                <SingleMenuNavLink
                  icon={<ExtensionIcon />}
                  to={"/admin/manage-stickers"}
                  linkText={"Manage Stickers"}
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
                  linkText={"Sub-Admins"}
                />
                <SingleMenuNavLink
                  icon={<SubscriptionsIcon />}
                  to={"/admin/pricing"}
                  linkText={"Subscriptions"}
                />
                <SingleMenuNavLink
                  icon={<LocalOfferIcon />}
                  to={"/admin/promotions"}
                  linkText={"Coupons and Promotions"}
                />
                <SingleMenuNavLink
                  icon={<PaymentsIcon />}
                  to={"/admin/accounts"}
                  linkText={"Accounts"}
                />
                <SingleMenuNavLink
                  icon={<ManageAccountsIcon />}
                  to={"/admin/profile"}
                  linkText={"Profile"}
                />
                <SingleMenuNavLink
                  icon={<BusinessIcon />}
                  to={"/admin/enterprise"}
                  linkText={"Enterprise"}
                />
                <SingleMenuNavLink
                  icon={<QuestionAnswerIcon />}
                  to={"/admin/faq"}
                  linkText={"FAQs"}
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
            borderBottom: "2px solid black",
            height: {
              xl: "70px",
              lg: "70px",
              md: "70px",
              sm: "60px",
              xs: "60px",
            },
            bgcolor: "white",
            zIndex: "10",
            display: { xs: "flex", md: "none" },
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
              src={"/admin/assets/EviteGuruLogo.svg"}
              sx={{ height: "100%" }}
              width={{ md: "25%", sm: "20%", xs: "30%" }}
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
                // borderBottom: "1px solid black",
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
                component={NavLink}
                to={"/admin/template-list"}
                onClick={handleDrawerToggle}
                sx={{
                  borderBottom: "px solid white",
                  width: "100%",
                  height: "80px",
                  display: "flex",
                  // flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "3px 3px 8px grey",
                  bgcolor: "#795DA8",
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
                    src={"/admin/assets/EviteGuruLogoWhite.svg"}
                    sx={{ height: "100%" }}
                    width={{ sm: "95%", xs: "70%", md: "60%" }}
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
                <List
                  sx={{
                    // border:"1px solid blue",
                    height: "fit-content",
                    bgcolor: "transparent",
                    "& .active": {
                      color: "#000",
                      borderLeft: "8px solid #795DA8",
                      bgcolor: "#CDB5EA",
                      borderRadius: "4px 0px 0px 4px",
                      boxShadow: "3px 3px 8px grey",
                    },
                  }}
                >
                  {/* <SingleMenuNavLink
                    icon={<DashboardIcon />}
                    to={"#"}
                    linkText={"Dashboard"}
                  />{" "} */}
                  {/* <SingleMenuNavLink
                    icon={<CollectionsIcon />}
                    to={"/admin/template-list"}
                    linkText={"Events"}
                  /> */}
                  <SingleMenuNavLink
                    icon={<CollectionsIcon />}
                    to={"/admin/template-list"}
                    linkText={"Template List"}
                    handleDrawerToggle={handleDrawerToggle}
                  />
                  <SingleMenuNavLink
                    icon={<ExtensionIcon />}
                    to={"/admin/manage-stickers"}
                    linkText={"Manage Stickers"}
                    handleDrawerToggle={handleDrawerToggle}
                  />
                  <SingleMenuNavLink
                    icon={<AddPhotoAlternateIcon />}
                    to={"/admin/template-create"}
                    linkText={"Add Template"}
                    handleDrawerToggle={handleDrawerToggle}
                  />
                  <SingleMenuNavLink
                    icon={<PeopleIcon />}
                    to={"/admin/user-list"}
                    linkText={"Users"}
                    handleDrawerToggle={handleDrawerToggle}
                  />
                  <SingleMenuNavLink
                    icon={<PeopleIcon />}
                    to={"/admin/admin_list"}
                    linkText={"Sub-Admins"}
                    handleDrawerToggle={handleDrawerToggle}
                  />
                  <SingleMenuNavLink
                    icon={<SubscriptionsIcon />}
                    to={"/admin/pricing"}
                    linkText={"Subscriptions"}
                    handleDrawerToggle={handleDrawerToggle}
                  />
                  <SingleMenuNavLink
                    icon={<LocalOfferIcon />}
                    to={"/admin/promotions"}
                    linkText={"Coupons and Promotions"}
                    handleDrawerToggle={handleDrawerToggle}
                  />
                  <SingleMenuNavLink
                    icon={<PaymentsIcon />}
                    to={"/admin/accounts"}
                    linkText={"Accounts"}
                    handleDrawerToggle={handleDrawerToggle}
                  />
                  <SingleMenuNavLink
                    icon={<ManageAccountsIcon />}
                    to={"/admin/profile"}
                    linkText={"Profile"}
                    handleDrawerToggle={handleDrawerToggle}
                  />
                  <SingleMenuNavLink
                    icon={<BusinessIcon />}
                    to={"/admin/enterprise"}
                    linkText={"Enterprise"}
                    handleDrawerToggle={handleDrawerToggle}
                  />
                  <SingleMenuNavLink
                    icon={<QuestionAnswerIcon />}
                    to={"/admin/faq"}
                    linkText={"FAQs"}
                    handleDrawerToggle={handleDrawerToggle}
                  />

                  <SingleMenuNavLink
                    icon={<MdLogout />}
                    clickFunction={logout}
                    linkText={"Log out"}
                    handleDrawerToggle={handleDrawerToggle}
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
              lg: "calc(100vw - 250px)",
              md: "calc(100vw - 250px)",
              sm: "100vw",
              xs: "100vw",
            },
            maxWidth: `calc(1440px - 250px)`,
            boxSizing: "border-box",
            flexWrap: "nowrap",
            //  display: "auto",
            alignItems: "end",
            marginTop: {
              md: "20px",
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

          <Outlet />
        </Box>
        {/* ============  👆container for all the screens (scenes)👆============= */}
      </Box>
    </>
  );
};

export default AdminDashboard;
