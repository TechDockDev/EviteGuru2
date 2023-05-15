import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
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
const SidebarMenu = (props) => {
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
      // subheader={
      //   <ListSubheader color="red" component={"div"}>
      //     jjjjj
      //   </ListSubheader>
      // }
    >
      {/* <Divider /> */}
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: "rgba(121, 93, 168, 1)" }}>
            <ArchitectureIcon />
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary="New Event(15/05/2023)"
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
      <Divider />
      <SingleMenuNavLink
        handleDrawerToggle={props?.handleDrawerToggle}
        icon={<GrDocumentText />}
        to={"/dashboard/edit/642bb01d64a71238dab88d9e"}
        linkText={"My Events"}
      />
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
        to={"/dashboard/subscription"}
        linkText={"Subscription"}
      />
      <SingleMenuNavLink
        handleDrawerToggle={props?.handleDrawerToggle}
        icon={<FiSettings />}
        to={"/"}
        linkText={"Account Setting"}
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
