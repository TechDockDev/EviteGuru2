import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import LogInModal from "../LoginModal/LogInModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../RegisterModal/RegisterModal";

const HeroSection = () => {
  const { userDetail } = useSelector((state) => state);
  const navigate = useNavigate();
  const isUser = userDetail?.isUser;
  //   console.log("isuser=>", isUser);
  // =====================================
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const toggleLogInModal = () => {
    setOpenLoginModal(!openLoginModal);
  };
  const toggleRegisterModal = () => {
    setOpenRegisterModal(!openRegisterModal);
  };
  // ===================================
  return (
    <Box
      sx={{
        marginTop: "85px",
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        // border:"1px solid blue "
      }}
    >
      <Paper
        sx={{
          width: "90%",
          height: "400px",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
        elevation={0}
      >
        {/*👇 hero section left text content 👇 */}
        <Stack
          bgcolor="transparent"
          height={"100%"}
          justifyContent="center"
          sx={{ width: { xxmd: "50%", md: "100%", xs: "100%" } }}
        >
          <Stack
            bgcolor={"transparent"}
            sx={{ padding: { sm: "0px 0px 0px 50px", xs: "0 20px" } }}
          >
            <Typography
              bgcolor="transparent"
              variant="h6"
              sx={{
                fontSize: { sm: "22px", xs: "18px" },
                fontWeight: "800",
                color: "#49516F",
                fontFamily: "Abhaya Libre ExtraBold",
              }}
            >
              Make it yours{" "}
            </Typography>
            <Typography
              bgcolor="transparent"
              variant="h1"
              sx={{
                fontSize: { sm: "45px", xs: "32px" },
                fontWeight: "800",
                color: "#49516F",
                fontFamily: "Abhaya Libre ExtraBold",
              }}
            >
              Design wedding invites,{" "}
            </Typography>
            <Typography
              bgcolor="transparent"
              variant="h1"
              sx={{
                fontSize: { sm: "45px", xs: "32px" },
                fontWeight: "800",
                color: "#49516F",
                fontFamily: "Abhaya Libre ExtraBold",
              }}
            >
              send and track RSVPs
            </Typography>
            {/* buttons container */}
            <Box
              sx={{
                display: "flex",
                bgcolor: "transparent",
                marginTop: "20px",
                flexDirection: { sm: "row", xs: "column" },
              }}
            >
              <Button
                disableElevation
                variant="contained"
                sx={{
                  color: "#fff",
                  marginRight: { sm: "20px", xs: "0px" },
                  marginBottom: { sm: "0px", xs: "10px" },
                }}
                onClick={
                  !isUser
                    ? () => toggleLogInModal()
                    : () => {
                        navigate("/browse_template");
                      }
                }
              >
                Create Now
              </Button>
              {/* <Button disableElevation variant="outlined">
                View a sample
              </Button> */}
            </Box>
          </Stack>
        </Stack>
        {/*👆 hero section left text content👆 */}
        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
        {/*👇 hero section right images content 👇 */}
        <Box
          bgcolor="transparent"
          width="50%"
          height="100%"
          sx={{
            display: { xxmd: "block", md: "none", xs: "none" },
          }}
        >
          <Box
            component="img"
            src="./assets/heroImage2.png"
            sx={{
              width: {
                xl: "90%",
                xlg: "97%",
                lg: "96%",
                xmd: "107%",
                xxmd: "115%",
              },
              bgcolor: "transparent",
              position: "relative",
              top: "-40px",
              right: {
                xl: "60px",
                lg: "60px",
                md: "40px",
                sm: "60px",
                xs: "60px",
              },
              right: {
                xl: "60px",
                xlg: "60px",
                lg: "40px",
                xmd: "60px",
                xxmd: "60px",
              },
            }}
          />
        </Box>
        {/*👆 hero section right images content👆 */}
      </Paper>
      <LogInModal
        openLoginModal={openLoginModal}
        toggleLogInModal={toggleLogInModal}
        toggleRegisterModal={toggleRegisterModal}
        setOpenLoginModal={setOpenLoginModal}
      />
      <RegisterModal
        openRegisterModal={openRegisterModal}
        setOpenRegisterModal={setOpenRegisterModal}
      />
    </Box>
  );
};

export default HeroSection;
