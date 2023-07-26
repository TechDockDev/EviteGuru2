import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
const FooterSection = () => {
  const navigate = useNavigate();
  const { userDetail } = useSelector((state) => state);
  return (
    <Box
      sx={{
        marginTop: "80px",
        display: { xl: "flex", lg: "flex", md: "flex", sm: "none", xs: "none" },
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        // border:"1px solid blue "
      }}
    >
      <Box
        bgcolor="transparent"
        sx={{ position: "absolute", left: "20px", top: "180px" }}
      >
        <Box
          bgcolor="transparent"
          width="250px"
          height={"100%"}
          component={"img"}
          src="./assets/footerDecoSir.png"
        />
      </Box>
      <Paper
        sx={{
          width: "90%",
          height: "300px",
          borderRadius: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        {/* footer decoration image */}

        <Box
          bgcolor="transparent"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            width: "80%",
          }}
        >
          {/* footer logo */}
          <Stack bgcolor="transparent" height={"100%"}>
            <Box
              bgcolor="transparent"
              width="250px"
              height={"100%"}
              component={"img"}
              src="./assets/EviteGuruLogo.svg"
              onClick={() => navigate("/")}
            />
          </Stack>
          {/* =================================== */}
          {/*====👇 get in touch section👇==== */}

          <Stack bgcolor="transparent" height={"60%"}>
            <Typography
              color={"#3B285B"}
              variant="h2"
              fontSize={"20px"}
              fontWeight="600"
              bgcolor="transparent"
              mb={2}
            >
              Get in Touch
            </Typography>
            {/* <Typography
              color={"#3B285B"}
              fontSize={"14px"}
              bgcolor="transparent"
            >
              27, Division St, New York
            </Typography>
            <Typography
              color={"#3B285B"}
              fontSize={"14px"}
              bgcolor="transparent"
            >
              +00083328736
            </Typography> */}
            <Typography
              color={"#3B285B"}
              fontSize={"14px"}
              bgcolor="transparent"
            >
              contact@eviteguru.com
            </Typography>
            {/* ========================== */}
            {/* icons row */}
            <Box bgcolor="transparent" mt={1}>
              {/* ========= */}
              {/* <IconButton sx={{ bgcolor: "transparent" }}>
                <Box
                  bgcolor="transparent"
                  component={"img"}
                  src="./assets/facebook.svg"
                />
              </IconButton> */}
              {/* ========= */}
              {/* <IconButton sx={{ bgcolor: "transparent" }}>
                <Box
                  bgcolor="transparent"
                  component={"img"}
                  src="./assets/twitter.svg"
                />
              </IconButton> */}
              {/* ========= */}
              {/* <IconButton sx={{ bgcolor: "transparent" }}>
                <Box
                  bgcolor="transparent"
                  component={"img"}
                  src="./assets/linkedin.svg"
                />
              </IconButton> */}
              {/* ========= */}
              <IconButton
                sx={{ bgcolor: "transparent" }}
                component="a"
                href="https://www.instagram.com/eviteguru/"
                target="_blank"
              >
                <Box
                  bgcolor="transparent"
                  component={"img"}
                  src="./assets/instagram.svg"
                />
              </IconButton>
            </Box>
          </Stack>

          {/* ================================= */}
          <Stack bgcolor="transparent" height={"60%"}>
            <Typography
              component={NavLink}
              sx={{ textDecoration: "none" }}
              fontSize="20px"
              fontWeight="600"
              color={"#3B285B"}
              bgcolor="transparent"
              mb={2}
            >
              Home
            </Typography>
            {/* ============ */}
            <Box
              display={"flex"}
              justifyContent="space-between"
              width={"300px"}
              bgcolor="transparent"
            >
              <Stack bgcolor="transparent">
                <Typography
                  component={NavLink}
                  to={"/pricing"}
                  sx={{ textDecoration: "none" }}
                  fontSize={"14px"}
                  color={"#3B285B"}
                  bgcolor="transparent"
                >
                  Pricing
                </Typography>
                <Typography
                  component={NavLink}
                  to={"/browse_template"}
                  sx={{ textDecoration: "none" }}
                  fontSize={"14px"}
                  color={"#3B285B"}
                  bgcolor="transparent"
                >
                  Templates
                </Typography>
                {userDetail?.isUser ? (
                  <Typography
                    component={NavLink}
                    to={"/dashboard/account-setting"}
                    sx={{ textDecoration: "none" }}
                    fontSize={"14px"}
                    color={"#3B285B"}
                    bgcolor="transparent"
                  >
                    Account
                  </Typography>
                ) : (
                  ""
                )}
              </Stack>
              <Stack bgcolor="transparent">
                <Typography
                  component={NavLink}
                  to={"/privacyPolicy"}
                  target="_blank"
                  sx={{ textDecoration: "none" }}
                  fontSize={"14px"}
                  color={"#3B285B"}
                  bgcolor="transparent"
                >
                  Privacy Policy
                </Typography>
                {/* <Typography
                  component={NavLink}
                  sx={{ textDecoration: "none" }}
                  fontSize={"14px"}
                  color={"#3B285B"}
                  bgcolor="transparent"
                >
                  Cookie Policy
                </Typography> */}
                <Typography
                  component={NavLink}
                  to={"/termsAndConditions"}
                  target="_blank"
                  sx={{ textDecoration: "none" }}
                  fontSize={"14px"}
                  color={"#3B285B"}
                  bgcolor="transparent"
                >
                  Terms and condition
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default FooterSection;
