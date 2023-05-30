import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tooltip,
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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/action/userActions";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Constants } from "../../redux/constants/action-types";
const SidebarMenu = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tempTemplate, viewEventDetails, createdEventDetails, pageTitle } =
    useSelector((state) => state);

  //👇  state for open small screen left drawer  👇
  const [openLeftDrawer, setOpenLeftDrawer] = useState();

  //👇 onClick function for hamburger menu to open left drawer on small screen  👇

  const handleDrawerToggle = () => {
    setOpenLeftDrawer(!openLeftDrawer);
  };
  // ===logout handler =========
  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${Constants.URL}/logout`);
      if (res.status === 200) {
        console.log("response=>", res);
        // props?.handleDrawerToggle();
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.log("error=>", error);
    }
  };
  // ===endof logout handler====
  return (
    <List
      component={"nav"}
      sx={{
        // border:"1px solid blue",
        fontSize: "8px",
        height: "100%",

        "& .active": {
          color: "#000",
          borderLeft: "10px solid #795DA8",
          bgcolor: "#CDB5EA",
          borderRadius: "4px 0px 0px 4px",
          boxShadow: "#443e3e78 0px 7px 12px 0px",
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
                pageTitle ? pageTitle?.title : `${tempTemplate?.template?.id}`
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
                    ? `${pageTitle?.title.substring(0, 8)}...`
                    : `${tempTemplate?.template?.id.substring(0, 8)}...`
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
            boxShadow: "#443e3e78 0px 7px 12px 0px",
          }}
        >
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: "rgba(121, 93, 168, 1)" }}>
              <VisibilityIcon />
            </Avatar>
          </ListItemAvatar>
          <Tooltip
            title={
              viewEventDetails?.event?.name
                ? `${viewEventDetails?.event?.name}`
                : ""
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
              primary={`${viewEventDetails?.event?.name.substring(0, 12)}...`}
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
      ) : (
        ""
      )}

      {createdEventDetails?.name ? (
        <ListItem
          sx={{
            color: "#000",
            borderLeft: "10px solid #795DA8",
            bgcolor: "#CDB5EA",
            borderRadius: "4px 0px 0px 4px",
            boxShadow: "#443e3e78 0px 7px 12px 0px",
          }}
        >
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: "rgba(121, 93, 168, 1)" }}>
              <GoMailRead />
            </Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={`Invitees`}
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

      <SingleMenuNavLink
        handleDrawerToggle={props?.handleDrawerToggle}
        icon={<TbAddressBook />}
        to={"/dashboard/address-book"}
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
      <ListItem
        onClick={logoutHandler}
        sx={{
          color: "black",
          fontSize: "18px",
          // border: "1px solid red",
          display: "block",
          margin: "12px 0px",
          padding: "5px 0px 5px 20px",
          bgcolor: "transparent",
          transition: "all 0.1s ease",

          "&:hover": {
            color: "#000",
            borderLeft: "10px solid #795DA8",
            bgcolor: "#CDB5EA",
            borderRadius: "4px 0px 0px 4px",
            boxShadow: "#443e3e78 0px 7px 12px 0px",
          },
          "& .active": {
            color: "#000",
            borderLeft: "10px solid #795DA8",
            bgcolor: "#CDB5EA",
            borderRadius: "4px 0px 0px 4px",
          },
        }}
      >
        <ListItemButton
          sx={{
            // border: "1px solid purple",
            cursor: "pointer",
            padding: "0px",
            fontWeight: "400",
            fontSize: "26px",

            "&:hover": {
              bgcolor: "transparent",
            },
            "&:active": {
              transform: "scale(0.95)",
            },
            "& svg": {
              bgcolor: "transparent",
            },
          }}
        >
          <MdLogout />

          <ListItemText
            primary={"Log out"}
            sx={{
              marginLeft: "12px",
              bgcolor: "transparent",
            }}
            primaryTypographyProps={{
              sx: {
                bgcolor: "transparent",
                fontWeight: "bold",
                fontSize: "18px",
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default SidebarMenu;
