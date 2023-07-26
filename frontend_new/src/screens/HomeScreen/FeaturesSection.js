import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const FeaturesSection = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        margin: { xxmd: "100px auto 20px auto", xs: "30px auto 20px auto" },
        padding: "10px",
        // border: "1px solid purple",
      }}
    >
      <Typography
        variant={{ md: "h1", xs: "h4", sm: "h2" }}
        sx={{
          color: "#795DA8",
          fontWeight: "700",
          fontSize: { sm: "45px", xs: "32px" },
          textAlign: "center",
          fontFamily: "Montserrat,Comforter Brush,Abhaya Libre,Poppins",
        }}
      >
        Features to Make Invites Easy
      </Typography>
      {/* ===============👇 wrapper for list ======================= */}
      <Box
        sx={{
          display: "flex",
          // width: "100%",
          justifyContent: "space-around",
          // border:"1px solid green",
          marginTop: "20px",
          padding: { md: "0px", xs: "0px 20px" },
          flexDirection: { sm: "row", xs: "column" },
        }}
      >
        {/* ======  👇features left list 👇   ========= */}
        <List>
          {/* ========== */}
          <ListItem color={"#060606"}>
            <ListItemIcon>
              <Box
                component={"img"}
                src="./assets/rsvp_features_icon.svg"
                width={"40px"}
              />
            </ListItemIcon>
            <ListItemText sx={{ marginLeft: "10px" }}>
              RSVP Tracking
            </ListItemText>
          </ListItem>
          {/* ========= */}
          <ListItem>
            <ListItemIcon>
              <Box
                component={"img"}
                src="./assets/countdown_features_icon.svg"
                width={"40px"}
              />
            </ListItemIcon>
            <ListItemText sx={{ marginLeft: "10px" }}>Countdown</ListItemText>
          </ListItem>
          {/* ========= */}
          <ListItem>
            <ListItemIcon>
              <Box
                component={"img"}
                src="./assets/photo_album_features_icon.svg"
                width={"40px"}
              />
            </ListItemIcon>
            <ListItemText sx={{ marginLeft: "10px" }}>
              Photo Albums
            </ListItemText>
          </ListItem>
          {/* ========= */}
          <ListItem>
            <ListItemIcon>
              <Box
                component={"img"}
                src="./assets/dress_code_features_icon.svg"
                width={"40px"}
              />
            </ListItemIcon>
            <ListItemText sx={{ marginLeft: "10px" }}>Dress Codes</ListItemText>
          </ListItem>
          {/* ========= */}
          <ListItem>
            <ListItemIcon>
              <Box
                component={"img"}
                src="./assets/location_features_icon.svg"
                width={"40px"}
              />
            </ListItemIcon>
            <ListItemText sx={{ marginLeft: "10px" }}>
              Show Location
            </ListItemText>
          </ListItem>
        </List>
        {/* ======  👆features left list 👆   ========= */}
        {/* ===================================================== */}
        {/* ======  👇features right list 👇   ========= */}

        <List>
          {/* ========== */}
          <ListItem>
            <ListItemIcon>
              <Box
                component={"img"}
                src="./assets/customize_features_icon.svg"
                width={"40px"}
              />
            </ListItemIcon>
            <ListItemText sx={{ marginLeft: "10px" }}>
              Customize your Designs
            </ListItemText>
          </ListItem>
          {/* ========= */}
          <ListItem>
            <ListItemIcon>
              <Box
                component={"img"}
                src="./assets/animated_opening_features_icon.svg"
                width={"40px"}
              />
            </ListItemIcon>
            <ListItemText sx={{ marginLeft: "10px" }}>
              Animated Opening Experience
            </ListItemText>
          </ListItem>
          {/* ========= */}
          <ListItem>
            <ListItemIcon>
              <Box
                component={"img"}
                src="./assets/guest_meal_features_icon.svg"
                width={"40px"}
              />
            </ListItemIcon>
            <ListItemText sx={{ marginLeft: "10px" }}>
              Guests Meal Preferences
            </ListItemText>
          </ListItem>
          {/* ========= */}
          <ListItem>
            <ListItemIcon>
              <Box
                component={"img"}
                src="./assets/email_features_icon.svg"
                width={"40px"}
              />
            </ListItemIcon>
            <ListItemText sx={{ marginLeft: "10px" }}>
              Auto-send via email or SMS
            </ListItemText>
          </ListItem>
          {/* ========= */}
          <ListItem>
            <ListItemIcon>
              <Box
                component={"img"}
                src="./assets/personalized_card_features_icon.svg"
                width={"40px"}
              />
            </ListItemIcon>
            <ListItemText sx={{ marginLeft: "10px" }}>
              Personalized cards with Guest Names
            </ListItemText>
          </ListItem>
        </List>
        {/* ======  👆features right list 👆   ========= */}
      </Box>
    </Stack>
  );
};

export default FeaturesSection;
