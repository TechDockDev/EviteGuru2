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
import {
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";

const PaymentSuccessScreen = () => {
  const search = useLocation().search;

  const amount = new URLSearchParams(search).get("amount");
  const plan = new URLSearchParams(search).get("plan");
  console.log("search=>", search, " amount => ", amount, " plan=>", plan);

  return (
    <Grid
      container
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
      height={"100vh"}
      sx={{
        backgroundImage: "url(/assets/newTest2.gif)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Grid
        item
        lg={7}
        md={8}
        sm={10}
        xs={12}
        //  bgcolor={"red"}
      >
        <Box
          minHeight={"450px"}
          width={"100%"}
          // bgcolor={"white"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          p={2}
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
            }}
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
                  {plan ? plan : ""}
                </Typography>
                <Divider />

                <Stack alignItems={"center"} justifyContent={"center"}>
                  {/* <Typography>Invitees - {"1000"}</Typography>
                  <Typography>Templates - {"100"}</Typography> */}
                  <Typography variant="h6">
                    Amount Paid : {amount ? amount : ""}{" "}
                  </Typography>
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
