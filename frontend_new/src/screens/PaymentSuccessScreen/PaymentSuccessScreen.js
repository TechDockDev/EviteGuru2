import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const PaymentSuccessScreen = () => {
  return (
    <Grid
      container
      display={"flex"}
      justifyContent={"center"}
      //   bgcolor={"yellow"}
      alignContent={"center"}
      height={"100vh"}
    >
      <Grid
        item
        lg={7}
        md={8}
        sm={10}
        xs={12}
        //    bgcolor={"red"}
      >
        <Box
          minHeight={"450px"}
          width={"100%"}
          //   bgcolor={"blue"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            component={"img"}
            src="/assets/check.gif"
            // width={"100%"}
            height={{ md: "250px", xs: "200px" }}
          />
          <Typography textAlign={"center"} variant={"h4"}>
            Payment Successful
          </Typography>
          <Typography variant="caption" textAlign={"center"}>
            Thank you for choosing evite Guru. Your plan will be active shortly!
          </Typography>
          <Card
            sx={{
              mt: 2,
              width: 300,
              bgcolor: "rgba(250, 250, 250, 1)",
              borderRadius: "10px",
              //   py: 2,
            }}
            // elevation={2}
          >
            <CardContent sx={{ justifyContent: "space-between" }}>
              <>
                <Typography
                  variant="h5"
                  fontWeight={"600"}
                  textAlign={"center"}
                  color="text.secondary"
                  gutterBottom
                >
                  Plan Name
                </Typography>
                <Divider />

                <Stack alignItems={"center"} justifyContent={"center"}>
                  <Typography>Invitees - {"hhhh"}</Typography>
                  <Typography>Templates - {"kkk"}</Typography>
                  <Typography variant="h6">Amount Paid : {"256"} </Typography>
                </Stack>
              </>
            </CardContent>
          </Card>
          <Stack
            mt={2}
            spacing={1}
            direction={{ md: "row", lg: "row", xs: "column", sm: "column" }}
            // width={"100%"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Button
              variant="contained"
              sx={{ color: "white" }}
              component={NavLink}
              to="/dashboard/my-events"
            >
              Dashboard
            </Button>
            <Button
              variant="contained"
              sx={{ color: "white", bgcolor: "rgba(59, 40, 91, 1)" }}
              component={NavLink}
              to="/"
            >
              Homepage
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PaymentSuccessScreen;
