import { Grid, Typography, Stack, Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Moment from "react-moment";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  openSnackbar,
  setCreatedEventDetail,
} from "../../redux/action/userActions";
import { Constants } from "../../redux/constants/action-types";

const Preview = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { eventDetailsPreviewData, userEventTemplate, userDetail } =
    useSelector((state) => state);
  // console.log("eventPreviewDetails=>", userEventTemplate);

  //   save and continue =====
  const saveAndContinue = async () => {
    if (userDetail?.subscription) {
      try {
        const form = new FormData();
        form.append("variationJson", userEventTemplate?.jsonData);
        form.append("preview", userEventTemplate?.previewImage);
        form.append("templateId", id);
        const response = await axios.post(
          `${Constants.URL}/variation/create`,
          form
        );
        if (response.status === 200) {
          // console.log("response=>", response?.data?.variation?._id);
          await createEvent(response?.data?.variation?._id);
        } else {
        }
      } catch (error) {
        console.log("error=>", error);
        dispatch(openSnackbar("something went wrong", "error"));
      }
    } else {
      dispatch(
        openSnackbar(
          "This required subscription , you don't have any active plan! please subscribe to get this feature.",
          "warning"
        )
      );
    }
  };
  // =========================

  // =========save event =======
  const createEvent = async (variationId) => {
    // console.log("control is comming => variationId=>", variationId);
    try {
      const res = await axios.post(`${Constants.URL}/event/create`, {
        ...userEventTemplate?.eventDetails,
        date: userEventTemplate?.eventDetails?.dateFormat,
        variationId: variationId,
      });
      if (res.status === 200) {
        // console.log("res=>", res);
        dispatch(setCreatedEventDetail(res?.data?.eventDetails));
        // props.tabChange({}, 3);
        dispatch(openSnackbar("Your created succesfully", "success"));
        navigate(`/dashboard/${res?.data?.eventDetails?._id}/send/`);
      } else {
        dispatch(openSnackbar(res?.data?.message, "error"));
      }
    } catch (error) {
      dispatch(openSnackbar("something went wrong.", "error"));
    }
  };
  // ===========================
  useEffect(() => {
    //  console.log('This Is TEmplate',events)
  }, []);
  return (
    <>
      <Stack>
        <Typography
          variant="h1"
          fontSize="18px"
          textAlign="center"
          fontWeight="bold"
          mt={1}
          mb={1}
        >
          Here is a sample of how your email will appear in your recipient's
          inbox.
        </Typography>
        <Grid
          container
          sx={{
            border: "1px solid black",
            borderRadius: "4px",
          }}
        >
          {/* == 👇 Preview header container | From & Sender Name👇  ==*/}
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            p={1}
            borderBottom="1px solid black"
          >
            <Typography fontSize="14px" fontWeight="bold">
              From :{" "}
              <Typography
                component="span"
                fontSize="14px"
                fontWeight="normal"
                p={1}
              >
                {/* Sunder Bandar */}
                {userEventTemplate?.eventDetails?.hostName}
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
                {/* Sunder ki shadi */}
                {userEventTemplate?.eventDetails?.name}
              </Typography>
            </Typography>
          </Grid>
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
              m={2}
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
                  {userEventTemplate?.eventDetails?.hostName}
                </Typography>
                {/* dynamic host name */}
                sent you an invitation for
                {/* dynamic event name */}
                <Typography
                  component="span"
                  display="block"
                  fontSize="14px"
                  fontWeight="bold"
                >
                  {userEventTemplate?.eventDetails?.name}
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
                    date={userEventTemplate?.eventDetails?.dt}
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
              p={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <Button
                variant="contained"
                sx={{ color: "white", mb: 3 }}
                disableElevation={true}
              >
                Open Preview
              </Button> */}
              <Box
                component={"img"}
                src={userEventTemplate?.tempPreviewImage}
                alt=""
                sx={{
                  width: "70%",
                  border: "1px solid green",
                  height: "400px",
                }}
              />
              <Typography fontSize="12px" fontWeight="bold" mt={2}>
                This email is personalized for you. Please do not forward
              </Typography>
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
              {/* dynamic venue address and date time */}

              <Typography
                fontSize="14px"
                fontWeight="normal"
                textAlign={"center"}
              >
                {userEventTemplate?.eventDetails?.venue}
              </Typography>

              <Typography
                fontSize="14px"
                fontWeight="normal"
                textAlign={"center"}
              >
                {userEventTemplate?.eventDetails?.address}
              </Typography>
              <Typography
                fontSize="14px"
                fontWeight="normal"
                textAlign={"center"}
              >
                {userEventTemplate?.eventDetails?.additionalInfo}
              </Typography>
              <Typography
                component="span"
                display="block"
                fontSize="14px"
                fontWeight="bold"
              >
                <Moment
                  date={userEventTemplate?.eventDetails?.dt}
                  format="hh:mm A, dddd, MMMM DD, YYYY"
                />
              </Typography>
              {/* dynamic venue address and date time */}
            </Grid>
            {/* 👆 Bottom address details  👆 */}
            {/* 👇 powered by text 👇 */}

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
      <Stack
        direction={"row"}
        mt={1}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={1}
      >
        <Button
          variant="contained"
          color="inherit"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ color: "white" }}
          onClick={saveAndContinue}
        >
          Save & continue
        </Button>
      </Stack>
    </>
  );
};

export default Preview;
