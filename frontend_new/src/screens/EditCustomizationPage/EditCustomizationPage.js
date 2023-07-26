import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useState } from "react";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import FormatAlignLeftOutlinedIcon from "@mui/icons-material/FormatAlignLeftOutlined";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  resetTempTemplateData,
  setPageTitle,
  setTempTemplateData,
} from "../../redux/action/defaultActions";
import {
  getSingleTemplate,
  isLoading,
  reSetEventTemplate,
} from "../../redux/action/userActions";
import EditDesign from "./EditDesign";
import EditDetails from "./EditDetails";
import EditPreview from "./EditPreview";
import PreventNavigation from "../../reusableComponents/preventNavigation";
import axios from "axios";
import { Constants } from "../../redux/constants/action-types";

const EditCustomizationPage = () => {
  const [changesSaved, setChangesSaved] = useState(false);
  // ====dialogue state =========
  const [openDialogue, setopenDialogue] = useState(false);
  // ============================
  const { id } = useParams();
  // use selector
  const { userEventTemplate, unsaved } = useSelector((state) => state);
  // dispatch
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();
  // const id = temp._id

  // handleopenDialogue box ====
  const handleOpenDialogue = () => {
    setopenDialogue(!openDialogue);
  };
  // =============================
  const handleSkip = () => {
    setValue(0);
    handleOpenDialogue();
  };
  // =============================
  // const handleUserResponse = (response) => {
  //   if (response === "yes") {
  //     setValue(1);
  //     handleOpenDialogue();
  //   } else if (response === "no") {
  //     setValue(0);
  //     handleOpenDialogue();
  //   }
  // };
  // =============================
  const getTemplate = async () => {
    dispatch(isLoading(true));
    const res = await axios.get(`${Constants.URL}/event/${id}`);
    console.log("editRes=>", res);

    dispatch(setPageTitle(`Edit ${res?.data?.event?.name}`));

    dispatch(isLoading(false));
  };
  // =============================
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (id) {
      // to set the temp name fot the event
      dispatch(setPageTitle(`Edit Event`));
      getTemplate();
      // will create temp route for new event along with temp data
      dispatch(setTempTemplateData({ id: id }));
    }
    return () => {
      // dispatch(setPageTitle(""));
      dispatch(resetTempTemplateData({}));
      dispatch(reSetEventTemplate({}));
    };
  }, []);
  // ===========================================
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      console.log("event=>", event);
      if (!changesSaved) {
        event.preventDefault();
        event.returnValue = ""; // Required for Chrome
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [changesSaved]);
  // ==========================================
  return (
    <Box
      sx={{
        // border: "2px solid red",
        height: "100%",
        // width: {
        //   xl: "calc(100vw - 250px)",
        //   lg: "calc(100vw - 270px)",
        //   md: "calc(100vw - 270px)",
        //   sm: "100vw",
        //   xs: "100vw",
        // },
        width: "100%",
        maxWidth: "1150px",
        padding: "0 20px 20px 20px",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            // border: "2px solid green",
            MaxWidth: "680px",
            boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.25)",
            mt: 4,
            mb: 2,
            borderRadius: "4px",
            height: "46px",
            "& .Mui-selected": {
              color: "#B9B5BE",
              bgcolor: "#E7E2ED",
              border: "none",
            },
            "& .MuiTabs-flexContainer": { height: "100%" },
          }}
          TabIndicatorProps={{ hidden: true }}
        >
          {/* === 👇Design tab button👇  ===*/}
          <Tab
            component={Button}
            label="Edit"
            id={`design-tab-0`}
            aria-controls={`design-tabpanel-0`}
            icon={<DesignServicesOutlinedIcon />}
            disabled={value === 3 || unsaved ? true : false}
            iconPosition="start"
            sx={{
              color: "black",
              minHeight: "0",
              textTransform: "none",
              "& svg": { fontSize: "20px", bgcolor: "transparent" },
              "&:hover": { border: "none", bgcolor: "#E7E2ED" },
              width: "150px",
            }}
          />
          {/* === 👆Design tab button👆  ===*/}

          {/* === 👇Details tab button👇  ===*/}

          <Tab
            component={Button}
            label="Edit Details"
            id={`details-tab-1`}
            aria-controls={`details-tabpanel-1`}
            // disabled={value === 3 || value === 0 ? true : false}
            disabled={value === 3 || unsaved ? true : false}
            icon={<FormatAlignLeftOutlinedIcon />}
            // onClick={() => handleSkip()}
            iconPosition="start"
            sx={{
              color: "black",
              minHeight: "0",
              textTransform: "none",
              "& svg": { fontSize: "20px", bgcolor: "transparent" },
              "&:hover": { border: "none", bgcolor: "#E7E2ED" },
              width: "150px",
            }}
          />
          {/* === 👆Details tab button👆  ===*/}
          {/* === 👇Preview tab button👇  ===*/}

          <Tab
            component={Button}
            label="Preview"
            id={`preview-tab-2`}
            aria-controls={`preview-tabpanel-2`}
            icon={<AiOutlineFileSearch />}
            iconPosition="start"
            disabled={
              !value === 3 &&
              userEventTemplate &&
              userEventTemplate?.eventDetails
                ? false
                : true
            }
            sx={{
              color: "black",
              minHeight: "0",
              textTransform: "none",
              "& svg": { fontSize: "20px", bgcolor: "transparent" },
              "&:hover": { border: "none", bgcolor: "#E7E2ED" },
              width: "150px",
            }}
          />
          {/* === 👆Preview tab button👆  ===*/}
        </Tabs>
        {/* ======================================================================= */}

        {/* ======================================================================= */}
      </Box>
      {/* === 👇 tab-0 Design tab button👇  ===*/}
      <div
        role="tabpanel"
        hidden={value !== 0}
        id={`design-tabpanel-${0}`}
        aria-labelledby={`design-tab-${0}`}
      >
        {value === 0 && <EditDesign tabChange={handleChange} />}
      </div>
      {/* === 👆 tab-0 Design tab button👆  ===*/}

      {/* === 👇 tab-1 Details tab button👇  ===*/}
      <div
        role="tabpanel"
        hidden={value !== 1}
        id={`details-tabpanel-${1}`}
        aria-labelledby={`details-tab-${1}`}
      >
        {value === 1 && <EditDetails tabChange={handleChange} />}
      </div>
      {/* === 👆 tab-1 Details tab button👆  ===*/}

      {/* === 👇 tab-2 Preview tab button👇  ===*/}
      <div
        role="tabpanel"
        hidden={value !== 2}
        id={`preview-tabpanel-${2}`}
        aria-labelledby={`preview-tab-${2}`}
      >
        {value === 2 && (
          <EditPreview
            tabChange={handleChange}
            setChangesSaved={setChangesSaved}
          />
        )}
      </div>
      {/* === 👆 tab-2 Preview tab button👆  ===*/}

      {/* === 👆 tab-4 send tab button👆  ===*/}

      {/* === dialoage box for persisit use tab change without saving */}
      <Dialog
        open={openDialogue}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleOpenDialogue}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ bgcolor: "white" }}>
          <DialogTitle fontWeight={"900"}>
            {"Are you sure you want to leave this page?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              fontWeight={"800"}
              color={"black"}
            >
              Your changes will be erased once you left this page, before
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
            // onClick={() => handleUserResponse("no")}
            >
              Stay
            </Button>
            <Button
            // onClick={() => handleUserResponse("yes")}
            >
              Leave
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      {/* <PreventNavigation /> */}
      {/* ====endof dialoues box ==================================== */}
    </Box>
  );
};

export default EditCustomizationPage;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
