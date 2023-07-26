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
import { setEventDetails } from "../../redux/action/defaultActions";

const EditPreview = (props) => {
  const [openAttendingModal, setOpenAttendingModal] = useState(false);
  const [editedEventDetails, setEditedEventDetails] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { eventDetailsPreviewData, userEventTemplate, userDetail } =
    useSelector((state) => state);
  console.log(
    "eventPreviewDetails=>",
    userEventTemplate,
    eventDetailsPreviewData
  );
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
        dispatch(openSnackbar("Your created succesfully", "success"));
        // navigate(`/dashboard/${res?.data?.eventDetails?._id}/send/`);
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

  // ==================
  const getTemplate = async () => {
    dispatch(isLoading(true));
    const res = await axios.get(`${Constants.URL}/event/${id}`);
    console.log("editRes=>", res);
    setEditedEventDetails(res.data.event);

    dispatch(isLoading(false));
  };
  //  ============================
  // ===========================
  useEffect(() => {
    getTemplate();
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
                        {editedEventDetails?.hostName}{" "}
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
                      {editedEventDetails?.name}
                    </Typography>
                    on
                    <Typography
                      component="span"
                      display="block"
                      fontSize="18px"
                      // fontWeight="bold"
                    >
                      <Moment
                        date={editedEventDetails?.date}
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
                    {editedEventDetails?.venue}
                  </Typography>

                  <Typography
                    fontSize="20px"
                    fontWeight="normal"
                    textAlign={"center"}
                  >
                    {editedEventDetails?.address}
                  </Typography>
                  <Typography
                    fontSize="20px"
                    fontWeight="normal"
                    textAlign={"center"}
                  >
                    {editedEventDetails?.additionalInfo}
                  </Typography>
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
                <AnimationEnvelope
                  guestDetails={{
                    name: editedEventDetails?.hostName,
                  }}
                  toggleAttendingModal={toggleAttendingModal}
                  // src={`/images/getImage?path=/${event?.variation?.previewImage}`}
                  // src={
                  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSshrGc3H1tmJPwlIDts0DaK67hMU45v6NH6y_5txdY&s"
                  // }
                  src={`/images/getImage?path=/${editedEventDetails?.variation?.previewImage}`}
                  // src={`/images/getImage?path=/uploads/variations/previewImages/previewImage1688821028156.png`}
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
            onClick={() => navigate("/dashboard/my-events")}
          >
            Exit
          </Button>
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => navigate(`/dashboard/${id}/send/`)}
          >
            Next
          </Button>
        </Stack>
      </Stack>
      {/* === 👇 attending modal  👇   ===*/}
      <AttendingModal
        toggleModal={toggleAttendingModal}
        open={openAttendingModal}
        // eventId={eventId}
        // guestId={guestId}
        handleDeny={handleDeny}
        type={"preview"}
      />
    </>
  );
};

export default EditPreview;
