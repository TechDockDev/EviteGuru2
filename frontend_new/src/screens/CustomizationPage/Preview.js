import { Grid, Typography, Stack, Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Moment from "react-moment";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  isLoading,
  openSnackbar,
  setCreatedEventDetail,
} from "../../redux/action/userActions";
import { Constants } from "../../redux/constants/action-types";
import AnimationEnvelope from "../InviteesResponseScreen/AnimationEnvelope";
import AttendingModal from "../InviteesResponseScreen/AttendingModal";
import { useState } from "react";

const Preview = (props) => {
  const [openAttendingModal, setOpenAttendingModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { eventDetailsPreviewData, userEventTemplate, userDetail } =
    useSelector((state) => state);
  console.log("eventPreviewDetails=>", userEventTemplate);
  //=============================
  const toggleAttendingModal = () => {
    setOpenAttendingModal(!openAttendingModal);
  };
  const handleDeny = () => {
    console.log("handleDeny");
    dispatch(openSnackbar("Your response has been submitted", "success"));
  };
  console.log("userEventImage======>", userEventTemplate?.previewImage);
  //=============================
  //   save and continue =====
  const saveAndContinue = async () => {
    // if (userDetail?.subscription) {
    dispatch(isLoading(true));
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
        dispatch(isLoading(false));
      } else {
      }
    } catch (error) {
      console.log("error=>", error);
      if (error?.response?.data?.message) {
        dispatch(openSnackbar(error?.response?.data?.message, "error"));
        dispatch(isLoading(false));
      } else {
        dispatch(openSnackbar("something went wrong", "error"));
        dispatch(isLoading(false));
      }
    }
    // } else {
    //   dispatch(
    //     openSnackbar(
    //       "This required subscription , you don't have any active plan! please subscribe to get this feature.",
    //       "warning"
    //     )
    //   );
    // }
  };
  // =========================
  const handleOpenAnimation = () => {
    alert("working");
  };
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
        dispatch(openSnackbar("Yous created succesfully", "success"));
        navigate(`/dashboard/${res?.data?.eventDetails?._id}/send/`);
      } else {
        dispatch(openSnackbar(res?.data?.message, "error"));
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        dispatch(openSnackbar(error?.response?.data?.message, "error"));
      } else {
        dispatch(openSnackbar("something went wrong.", "error"));
      }
    }
  };
  // ===========================
  useEffect(() => {
    //  console.log('This Is TEmplate',events)
  }, []);
  return (
    <>
      <Stack
        width={"100%"}
        // display={"flex"}
        marginBottom={"auto"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"columns"}
      >
        <Stack width={"100%"}>
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
            width={"100%"}
            // bgcolor={"red"}s
            sx={{
              border: "1px solid black",
              borderRadius: "4px",
            }}
          >
            <Grid
              item
              container
              justifyContent={"center"}
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              p={1}
            >
              {/* 👇 Bottom address details 👇 */}
              <Grid
                container
                item
                // xl={6}
                // lg={6}
                // md={6}
                sm={12}
                xs={12}
                p={1}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={1}
              >
                {/* <Typography variant="h5">Venue</Typography> */}
                <Stack p={1} mt={1} mb={1}>
                  <Typography
                    fontSize="20px"
                    fontWeight="normal"
                    textAlign={"center"}
                  >
                    <Typography
                      component="span"
                      display="block"
                      fontSize="20px"
                      // fontWeight="bold"
                    >
                      <span style={{ fontWeight: "bold" }}>
                        {userEventTemplate?.eventDetails?.hostName}{" "}
                      </span>
                      sent you an invitation for
                    </Typography>
                    <Typography
                      mt={1}
                      component="span"
                      display="block"
                      fontSize="20px"
                      fontWeight="bold"
                    >
                      {userEventTemplate?.eventDetails?.name}
                    </Typography>
                    on
                    <Typography
                      component="span"
                      display="block"
                      fontSize="18px"
                      // fontWeight="bold"
                    >
                      <Moment
                        date={userEventTemplate?.eventDetails?.dt}
                        format="hh:mm A, dddd, MMMM DD, YYYY"
                      />
                    </Typography>
                  </Typography>
                </Stack>

                <Typography variant="h5">At</Typography>
                <Stack>
                  <Typography
                    fontSize="20px"
                    fontWeight="normal"
                    textAlign={"center"}
                  >
                    {userEventTemplate?.eventDetails?.venue}
                  </Typography>

                  <Typography
                    fontSize="20px"
                    fontWeight="normal"
                    textAlign={"center"}
                  >
                    {userEventTemplate?.eventDetails?.address}
                  </Typography>
                  <Typography
                    fontSize="20px"
                    fontWeight="normal"
                    textAlign={"center"}
                  >
                    {userEventTemplate?.eventDetails?.additionalInfo}
                  </Typography>
                  {/* <Typography
                  component="span"
                  display="block"
                  fontSize="20px"
                  fontWeight="bold"
                >
                  <Moment
                    date={userEventTemplate?.eventDetails?.dt}
                    format="hh:mm A, dddd, MMMM DD, YYYY"
                  />
                </Typography> */}
                </Stack>
              </Grid>
              {/* 👆 Bottom address details  👆 */}
              <Grid
                item
                p={1}
                // xl={6}
                // lg={6}
                // md={6}
                // sm={10}
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  // width: { md: "550px", xs: "70%" },
                }}
              >
                {/* <Box
                mt={1}
                onClick={handleOpenAnimation}
                sx={{
                  transition: "0.3s",
                  cursor: "pointer",
                  "&:hover": {
                    img: {
                      transition: "0.3s ease",
                      scale: "1.04",
                    },
                  },
                }}
              >
                <Box
                  component={"img"}
                  src={"/assets/envelope.png"}
                  borderRadius={"5px"}
                  maxHeight={"330px"}
                  maxWidth={"520px"}
                  // bgcolor={"rgba(121, 93, 168, 1)"}
                  alt=""
                  sx={{
                    width: "100%",
                    // border: "1px solid green",
                    height: "100%",
                    // bgcolor:"red"
                  }}
                />
              </Box> */}
                <AnimationEnvelope
                  guestDetails={{
                    name: userEventTemplate?.eventDetails?.hostName,
                  }}
                  toggleAttendingModal={toggleAttendingModal}
                  src={userEventTemplate?.tempPreviewImage}
                  handleDeny={handleDeny}
                />
                <Stack
                  direction={"row"}
                  mt={2}
                  alignItems={"center"}
                  justifyContent={"center"}
                  spacing={2}
                >
                  <Button
                    // onClick={() => {
                    //   toggleAttendingModal();
                    // }}
                    disabled={true}
                    variant="contained"
                    color="success"
                  >
                    Will Attend
                  </Button>
                  <Button
                    disabled={true}
                    variant="contained"
                    sx={{ color: "white" }}
                    // onClick={handleDeny}
                  >
                    Not Attend
                  </Button>
                </Stack>
              </Grid>
            </Grid>
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
                Powered by EviteGuru
              </Typography>
            </Grid>
            {/* 👆 powered by text  👆 */}
            {/* == 👆 Preview main section container  | Description and preview image 👆   ==*/}
          </Grid>
        </Stack>
        <Typography
          fontSize="12px"
          fontWeight="bold"
          textAlign={"center"}
          mt={2}
        >
          This email is personalized for you. Please do not forward
        </Typography>
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
      </Stack>
      {/* === 👇 attending modal  👇   ===*/}
      <AttendingModal
        toggleModal={toggleAttendingModal}
        open={openAttendingModal}
        type={"preview"}
        // eventId={eventId}
        // guestId={guestId}
        handleDeny={handleDeny}
      />
    </>
  );
};

export default Preview;
