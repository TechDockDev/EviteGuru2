import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import TextDescription from "./TextDescription";
import { useState } from "react";
import PasswordChange from "./PasswordChange";
import { useEffect } from "react";

const AccountSettings = () => {
  const [openPasswordChangeModal, setOpenPasswordChangeModal] = useState(false);
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo, error, loading } = adminLogin;
  const [adminDetailsById, setAdminDetailsById] = useState();

  const adminById = async (res, req) => {
    try {
      // console.log("admin details", adminInfo?._id);

      const { data } = await axios.get(`/get-admin`);
      // console.log("Inside the Admin", data);
      setAdminDetailsById(data.admin);
      console.log(data);

    } catch (error) {
    }
  };
  //   setShowDate(adminDetailsById?.adminLastLogin);
  const togglePasswordChangeModal = () => {
    setOpenPasswordChangeModal(!openPasswordChangeModal);
  };

  const stringAvatar = (name) => {
    console.log(name);
    let avtar;
    if (name === undefined) {
      avtar = "";
    } else {
      avtar = name;
    }
    return {
      children: `${avtar[0][0]}`,
    };
  };

  useEffect( () => {
    adminById(adminInfo?._id);
  }, []);

  return (
    <Box
      sx={{
        //  border: "2px solid red",
        height: "100%",
        width: {
          xl: "calc(100vw - 250px)",
          lg: "calc(100vw - 270px)",
          md: "calc(100vw - 270px)",
          sm: "100vw",
          xs: "100vw",
        },
        maxWidth: "1150px",
        padding: "0 20px 20px 20px",
        boxSizing: "border-box",
      }}
    >
      <Paper
        sx={{
          bgcolor: "white",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          padding: { xs: "20px 10px", sm: "20px 40px" },
          borderRadius: "20px",
        }}
        elevation={10}
      >
      <Typography
            variant="h1"
            align="center"
            fontWeight="800"
            fontSize={"28px"}
            mb={2}
            sx={{
               color: "#795da8",
               width: "100%",
            }}>
          Admin Profile
        </Typography>
        <Grid container justifyContent={"center"}>
          <Grid
            item
            xs={12}
            md={8}
           
            // border={"1px solid red"}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt={adminDetailsById?.name}
              sx={{
                width: "100px",
                height: "100px",
                fontSize: "35px",
                bgcolor: "#795DA8",
                textTransform:"uppercase"
              }}
              {...stringAvatar(`${adminDetailsById?.name}`)}
            />

            <Typography
              mt={1}
              textAlign="center"
              fontWeight="800"
              sx={{
                width: "100%",
                textTransform:"uppercase"

              }}
            >
              {adminDetailsById?.name}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={8}
            container
            m={2}
            sx={{
              border: "1px solid grey",
              p: 3,
              borderRadius: "20px",
            }}
          >
            <TextDescription
              title="User E-mail :"
              value={adminDetailsById?.email}
            />
            <TextDescription
              type="password"
              title="Password :"
              clickHandler={togglePasswordChangeModal}
            />
            <TextDescription
              title="Phone No :"
              value={adminDetailsById?.phone}
            />
            <TextDescription
              title="Admin:"
              value={`${adminDetailsById?.superAdmin}`}
            />

            <TextDescription
              title="Permission :"
              value={`${adminDetailsById?.permission}`}
            />

            <TextDescription
              title="Last Login :"
              value={`${adminDetailsById?.adminLastLogin}`}
            />
          </Grid>
        </Grid>
      </Paper>
      <PasswordChange
        togglePasswordChangeModal={togglePasswordChangeModal}
        openPasswordChangeModal={openPasswordChangeModal}
      />
    </Box>
  );
};

export default AccountSettings;
