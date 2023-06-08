import { Grid, Typography, Stack, Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Moment from "react-moment";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import AnimationEnvelope from "./AnimationEnvelope";

const InviteesResponseScreen = () => {
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const { eventId } = useParams();
  const dispatch = useDispatch();
  console.log("id=>", eventId);
  //   const { eventDetailsPreviewData, userEventTemplate } = useSelector(
  //     (state) => state
  //   );
  //   console.log("eventPreviewDetails=>", userEventTemplate);

  //

  // =========get Event Details =======
  const getEventDetails = async () => {
    console.log("working..");
    try {
      const res = await axios.get(`/api/v1/user/event/${eventId}`);
      if (res.status === 200) {
        console.log("response=>", res?.data?.event);
        setEvent(res?.data?.event);
      }
    } catch (error) {
      console.log("error=>", error);
    }
  };
  // ===========================
  useEffect(() => {
    //  console.log('This Is TEmplate',events)
    if (eventId) {
      getEventDetails(eventId);
    }
  }, []);
  return (
    <Box
      //   bgcolor={"black"}
      sx={{
        // backgroundImage:
        //   "linear-gradient(to right bottom, #a599e2, #7c72a7, #554e6f, #302c3c, #0c0b0e)",
        backgroundImage: "url(../assets/leaves2.png)",
      }}
      p={2}
    >
      <Stack
        // p={2}
        sx={{
          width: { md: "80%", xs: "100%", sm: "100%", lg: "80%" },
          marginX: "auto",
          //   backgroundImage:
          //   "linear-gradient(to right bottom, #a599e2, #7c72a7, #554e6f, #302c3c, #0c0b0e)",
          backgroundImage: "url(../assets/leaves2.png)",
        }}
        bgcolor={"white"}
      >
        <Typography
          variant="h1"
          fontSize="18px"
          textAlign="center"
          fontWeight="bold"
          mt={1}
          mb={1}
        >
          Hey,{" "}
          <span
            style={{
              color: "rgba(121, 93, 168, 1)",
              textDecoration: "underline",
            }}
          >
            {/* {event?.hostName} */}
          </span>{" "}
          You are invited to a celebration of the beginning of our new life as i
          am going to start new journey of my life
        </Typography>
        <Grid
          container
          sx={{
            // border: "1px solid black",
            borderRadius: "4px",
          }}
        >
          {/* == 👇 Preview header container | From & Sender Name👇  ==*/}
          {/* <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            p={1}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            // borderBottom="1px solid black"
          >
            <Typography fontSize="14px" fontWeight="bold">
              From :{" "}
              <Typography
                component="span"
                fontSize="14px"
                fontWeight="normal"
                p={1}
              >
                
                {event?.hostName}
              </Typography>
            </Typography>
            <Typography fontSize="14px" fontWeight="bold">
              Event Name :{" "}
              <Typography
                component="span"
                fontSize="14px"
                fontWeight="normal"
                p={1}
              >
               
                {event?.name}
              </Typography>
            </Typography>
          </Grid> */}
          {/* == 👆 Preview header container  | From & Sender Name👆   ==*/}
          {/* =================== */}
          {/* == 👇 Preview main section container |  Description and preview image 👇  ==*/}
          <Grid
            item
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            p={1}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {/* 👇 Description 👇 */}
            <Grid
              item
              xl={4}
              lg={4}
              md={5}
              sm={10}
              xs={10}
              p={1}
              // m={2}
              // border="1px solid green"
            >
              <Typography
                fontSize="14px"
                fontWeight="normal"
                textAlign={"center"}
              >
                {/* dynamic host name */}
                <Typography
                  component="span"
                  display="block"
                  fontSize="14px"
                  fontWeight="bold"
                >
                  {/* {event?.hostName} */}
                </Typography>
                {/* dynamic host name */}I am{" "}
                <span
                  style={{
                    color: "rgba(121, 93, 168, 1)",
                    // textDecoration: "underline",
                    fontWeight: "bold",
                  }}
                >
                  {event?.hostName}
                </span>{" "}
                sent you an invitation for marriage ceremony
                {/* dynamic event name */}
                <Typography
                  component="span"
                  display="block"
                  fontSize="14px"
                  fontWeight="bold"
                >
                  {/* {event?.name} */}
                </Typography>
                {/* dynamic event name */}
                on
                {/* dynamic event date and time */}
                <Typography
                  component="span"
                  display="block"
                  fontSize="14px"
                  fontWeight="bold"
                >
                  <Moment
                    date={event?.date}
                    format="hh:mm A, dddd, MMMM DD, YYYY"
                  />
                </Typography>
                {/* dynamic event date and time */}
              </Typography>
            </Grid>
            {/* 👆 Description 👆 */}

            {/* == 👇 Template preview button and image 👇  ==*/}
            <Grid
              item
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              // p={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <Box
                component={"img"}
                bgcolor={"red"}
                src={`/images/getImage?path=/${event?.variation?.previewImage}`}
                alt=""
                sx={{
                  width: "100%",

                  height: "100%",
                }}
              /> */}
              <AnimationEnvelope src={`/images/getImage?path=/${event?.variation?.previewImage}`}/>
            </Grid>

            {/* == 👆 Template preview button and image 👆   ==*/}
            {/* 👇 Bottom address details 👇 */}
            <Grid
              item
              xl={4}
              lg={4}
              md={5}
              sm={10}
              xs={10}
              p={1}
              m={2}
              container
              display={"flex"}
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              // border="1px solid green"
            >
              <Typography variant="h5" fontWeight="bold">
                {event?.name}
              </Typography>

              <Typography
                fontSize="14px"
                fontWeight="normal"
                textAlign={"center"}
              >
                {event?.venue}
              </Typography>

              <Typography
                fontSize="14px"
                fontWeight="normal"
                textAlign={"center"}
              >
                {event?.address}
              </Typography>
              <Typography
                fontSize="14px"
                fontWeight="normal"
                textAlign={"center"}
              >
                {event?.additionalInfo}
              </Typography>
              <Typography
                component="span"
                display="block"
                fontSize="14px"
                fontWeight="bold"
              >
                <Moment
                  date={event?.date}
                  format="hh:mm A, dddd, MMMM DD, YYYY"
                />
              </Typography>
              {/* dynamic venue address and date time */}
            </Grid>
            {/* 👆 Bottom address details  👆 */}
            {/* 👇 powered by text 👇 */}
            <Grid item xs={12}>
              <Stack
                direction={"row"}
                mt={1}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={2}
              >
                <Button variant="contained" color="success">
                  Will Attend
                </Button>
                <Button
                  variant="contained"
                  sx={{ color: "white" }}
                  //   onClick={saveAndContinue}
                >
                  Not Attending
                </Button>
              </Stack>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} m={2}>
              <Typography
                fontSize="14px"
                bgcolor="black"
                color="white"
                fontWeight="bold"
                width="60%"
                textAlign={"center"}
                margin="auto"
                p={1}
                borderRadius="4px"
              >
                Powered by Evite Guru
              </Typography>
            </Grid>
            {/* 👆 powered by text  👆 */}
          </Grid>
          {/* == 👆 Preview main section container  | Description and preview image 👆   ==*/}
        </Grid>
      </Stack>
    </Box>
  );
};

export default InviteesResponseScreen;
