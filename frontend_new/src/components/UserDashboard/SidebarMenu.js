import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import SingleMenuNavLink from "./SingleMenuNavLink";
import { FiSettings } from "react-icons/fi";
import { GrDocumentText } from "react-icons/gr";
import { GoMail, GoMailRead } from "react-icons/go";
import { TbAddressBook } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { useState } from "react";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
const SidebarMenu = (props) => {
  const { tempTemplate, viewEventDetails, pageTitle } = useSelector(
    (state) => state
  );
  // console.log("event=>", viewEventDetails);
  //👇  state for open small screen left drawer  👇
  const [openLeftDrawer, setOpenLeftDrawer] = useState();

  //👇 onClick function for hamburger menu to open left drawer on small screen  👇

  const handleDrawerToggle = () => {
    setOpenLeftDrawer(!openLeftDrawer);
  };
  return (
    <List
      component={"nav"}
      sx={{
        // border:"1px solid blue",
        height: "100%",
        "& .active": {
          color: "#000",
          borderLeft: "10px solid #795DA8",
          bgcolor: "#CDB5EA",
          borderRadius: "4px 0px 0px 4px",
        },
      }}
    >
      {tempTemplate?.active ? (
        <>
          <ListItem
            sx={{
              color: "#000",
              borderLeft: "10px solid #795DA8",
              bgcolor: "#CDB5EA",
              borderRadius: "4px 0px 0px 4px",
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: "rgba(121, 93, 168, 1)" }}>
                <ArchitectureIcon />
              </Avatar>
            </ListItemAvatar>
            <Tooltip
              title={
                pageTitle
                  ? pageTitle?.title
                  : `temp${tempTemplate?.template?.id}`
              }
              arrow={true}
              enterDelay={100}
              sx={{
                "& .MuiTooltip-tooltip": {
                  color: "red",
                },
              }}
            >
              <ListItemText
                primary={
                  pageTitle
                    ? pageTitle?.title
                    : `temp${tempTemplate?.template?.id.substring(0, 8)}...`
                }
                sx={{ fontWeight: "800" }}
                primaryTypographyProps={{
                  sx: {
                    bgcolor: "transparent",
                    fontWeight: "bold",
                    fontSize: "16px",
                  },
                }}
              />
            </Tooltip>
          </ListItem>
          <Divider />
        </>
      ) : (
        ""
      )}

      <SingleMenuNavLink
        handleDrawerToggle={props?.handleDrawerToggle}
        icon={<GrDocumentText />}
        to={"/dashboard/my-events/"}
        linkText={"My Events"}
      />
      {viewEventDetails?.open ? (
        <ListItem
          sx={{
            color: "#000",
            borderLeft: "10px solid #795DA8",
            bgcolor: "#CDB5EA",
            borderRadius: "4px 0px 0px 4px",
          }}
        >
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: "rgba(121, 93, 168, 1)" }}>
              <VisibilityIcon />
            </Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={`${viewEventDetails?.event?.name}`}
            sx={{ fontWeight: "800" }}
            primaryTypographyProps={{
              sx: {
                bgcolor: "transparent",
                fontWeight: "bold",
                fontSize: "16px",
              },
            }}
          />
        </ListItem>
      ) : (
        ""
      )}

      {/* <SingleMenuNavLink
        handleDrawerToggle={props?.handleDrawerToggle}
        icon={<GrDocumentText />}
        to={"/dashboard/invitees"}
        linkText={"Invitees"}
      /> */}
      <SingleMenuNavLink
        handleDrawerToggle={props?.handleDrawerToggle}
        icon={<GoMailRead />}
        to={"/dashboard/mailing-responses"}
        linkText={"Mailing Response"}
      />
      <SingleMenuNavLink
        handleDrawerToggle={props?.handleDrawerToggle}
        icon={<TbAddressBook />}
        to={"/"}
        linkText={"Address Book"}
      />
      <SingleMenuNavLink
        handleDrawerToggle={props?.handleDrawerToggle}
        icon={<GoMail />}
        to={"/dashboard/subscriptions"}
        linkText={"Subscription"}
      />
      <SingleMenuNavLink
        handleDrawerToggle={props?.handleDrawerToggle}
        icon={<FiSettings />}
        to={"/dashboard/account-setting"}
        linkText={"Account Settings"}
      />
      <SingleMenuNavLink
        handleDrawerToggle={props?.handleDrawerToggle}
        icon={<MdLogout />}
        to={"/"}
        linkText={"Log out"}
      />
    </List>
  );
};

export default SidebarMenu;
