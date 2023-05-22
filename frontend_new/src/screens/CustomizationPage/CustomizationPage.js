import { Box, Button, Tab, Tabs } from "@mui/material";
import React from "react";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import FormatAlignLeftOutlinedIcon from "@mui/icons-material/FormatAlignLeftOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Design from "./Design";
import Preview from "./Preview";
import Details from "./Details";
import Send from "./Send";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  resetTempTemplateData,
  setPageTitle,
  setTempTemplateData,
} from "../../redux/action/defaultActions";
import { reSetEventTemplate } from "../../redux/action/userActions";

const CustomizationPage = () => {
  const { id } = useParams();
  // use selector
  const { userEventTemplate } = useSelector((state) => state);
  // dispatch
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();
  // const id = temp._id

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (id) {
      // to set the temp name fot the event
      dispatch(setPageTitle(`temp${id}`));
      // will create temp route for new event along with temp data
      dispatch(setTempTemplateData({ id: id }));
    }
    return () => {
      dispatch(resetTempTemplateData({}));
      dispatch(reSetEventTemplate({}));
    };
  }, []);

  return (
    <Box
      sx={{
        // border: "2px solid red",
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
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
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
            label="Design"
            id={`design-tab-0`}
            aria-controls={`design-tabpanel-0`}
            icon={<DesignServicesOutlinedIcon />}
            disabled={value === 3 ? true : false}
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
            label="Details"
            id={`details-tab-1`}
            aria-controls={`details-tabpanel-1`}
            disabled={value === 3 ? true : false}
            icon={<FormatAlignLeftOutlinedIcon />}
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
              userEventTemplate && userEventTemplate?.eventDetails ? false : true
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
          {/* === 👇Send tab button👇  ===*/}

          <Tab
            component={Button}
            label="Send"
            id={`send-tab-3`}
            aria-controls={`send-tabpanel-3`}
            icon={<MailOutlinedIcon />}
            disabled={
              userEventTemplate && userEventTemplate?.eventDetails ? false : true
            }
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
          {/* === 👆Send tab button👆  ===*/}
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
        {value === 0 && <Design tabChange={handleChange} />}
      </div>
      {/* === 👆 tab-0 Design tab button👆  ===*/}

      {/* === 👇 tab-1 Details tab button👇  ===*/}
      <div
        role="tabpanel"
        hidden={value !== 1}
        id={`details-tabpanel-${1}`}
        aria-labelledby={`details-tab-${1}`}
      >
        {value === 1 && <Details tabChange={handleChange} />}
      </div>
      {/* === 👆 tab-1 Details tab button👆  ===*/}

      {/* === 👇 tab-2 Preview tab button👇  ===*/}
      <div
        role="tabpanel"
        hidden={value !== 2}
        id={`preview-tabpanel-${2}`}
        aria-labelledby={`preview-tab-${2}`}
      >
        {value === 2 && <Preview tabChange={handleChange} />}
      </div>
      {/* === 👆 tab-2 Preview tab button👆  ===*/}

      {/* === 👇 tab-3 Send tab button👇  ===*/}
      <div
        role="tabpanel"
        hidden={value !== 3}
        id={`send-tabpanel-${3}`}
        aria-labelledby={`send-tab-${3}`}
      >
        {value === 3 && <Send tabChange={handleChange} />}
      </div>
      {/* === 👆 tab-4 send tab button👆  ===*/}
    </Box>
  );
};

export default CustomizationPage;
