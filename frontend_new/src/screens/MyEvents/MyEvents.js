import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../redux/action/defaultActions";
import SearchIcon from "@mui/icons-material/Search";
import { GrDocumentText } from "react-icons/gr";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
import TemplatePreview from "../TemplatePreview/TemplatePreview";
import { Constants } from "../../redux/constants/action-types";
import { openSnackbar } from "../../redux/action/userActions";
import { TbTypography } from "react-icons/tb";
const MyEvents = () => {
  const dispatch = useDispatch();

  // to work with template preview modal =====
  const [openTemplatePreviewModal, seTopenTemplatePreviewModal] =
    useState(false);
  const [singleTemplateId, setSingleTemplateId] = useState("");
  // ============================================
  const navigate = useNavigate();
  const [allEvents, setAllEvents] = useState([]);
  const [left, setLeft] = useState({ events: 0, invitees: 0 });
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [counts, setCounts] = useState(1);
  const [search, setSearch] = useState("");
  const [activeSearch, setactiveSearch] = useState(false);

  const handleChangePage = (event, newPage) => {
    console.log("pages=>", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("event =>", event.target.value);
    setRowsPerPage(Number(event.target.value) * 1, 10);
    setPage(0);
  };
  // toggler for template selection modal ====
  const toggleTemplatePreviewModal = (e, templateId) => {
    if (!openTemplatePreviewModal) {
      setSingleTemplateId(templateId);
      seTopenTemplatePreviewModal(!openTemplatePreviewModal);
    } else {
      setSingleTemplateId("");
      seTopenTemplatePreviewModal(!openTemplatePreviewModal);
    }
  };
  //  this function is passed to carousel to handle onclick👇
  const carouselClick = (e, id) => {
    setSingleTemplateId(id);
  };
  //  this function is passed to carousel to handle onclic👆
  // =========================================

  const handleSearch = () => {
    if (search) {
      setLoading(true);
      setactiveSearch(true);
      // console.log("seaching...");
      const temp = allEvents.filter((event) => {
        if (event.name.toLowerCase().includes(search.toLowerCase())) {
          return event;
        }
      });
      setFilteredEvents(temp);
      setLoading(false);
      // console.log("temp event", temp);
    } else {
      dispatch(openSnackbar("Please Enter A Name to Search", "warning"));
    }
  };

  const cancelSearch = () => {
    setSearch("");
    setactiveSearch(false);
    setFilteredEvents(allEvents);
  };

  // =============================
  // === to all events ========
  const getAllEvents = async (page, limit) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${Constants.URL}/event/user/?page=${page}&limit=${limit}`
      );
      if (res.status === 200) {
        // console.log("response=>", res);

        setAllEvents(res?.data?.events);
        setFilteredEvents(res?.data?.events);
        setCounts(res?.data?.totalEvents);
        setLoading(false);
      }
    } catch (error) {
      console.log("error=>", error);
      dispatch(openSnackbar("something went wrong", "error"));
      setLoading(false);
    }
  };
  // ====end of get all events=

  // =====get number of events =====
  const noOfEvents = async () => {
    try {
      const res = await axios.get(`${Constants.URL}/variation/left-variation`);
      if (res.status === 200) {
        console.log("events=>", res);
        setLeft({ ...left, events: res?.data?.leftVariations });
      }
    } catch (error) {}
  };
  // ====endof func ================
  // =====get number of invitess =====
  const noOfInvitees = async () => {
    try {
      const res = await axios.get(`${Constants.URL}/guest/left-invitee`);
      if (res.status === 200) {
        console.log("invitees=>", res);
        setLeft({ ...left, invitees: res?.data?.remainingInvitees });
      }
    } catch (error) {}
  };
  // ====endof func ================
  useEffect(() => {
    getAllEvents(page + 1, rowsPerPage);
  }, [page, rowsPerPage]);

  //  ================
  useEffect(() => {
    noOfEvents();
    noOfInvitees();
    dispatch(setPageTitle("My Events"));

    return () => {
      dispatch(setPageTitle(""));
    };
  }, []);

  return (
    <Box width={"100%"} component={Container}>
      <Stack mb={1}>
        <Typography variant="h5" fontWeight={"800"} textAlign={"center"}>
          All Events
        </Typography>
      </Stack>
      <Stack direction={"row"} spacing={1}>
        <Button
          variant="text"
          size="small"
          startIcon={
            <Typography
              sx={{
                fontSize: { xs: "5px", sm: "11px", md: "12px", lg: "13px" },
                display: { xs: "none", sm: "block", md: "block", lg: "block" },
              }}
            >
              <GrDocumentText />
            </Typography>
          }
          endIcon={
            <Typography
              // component={"span"}
              variant="caption"
              sx={
                {
                  // fontSize: { sm: "14px", xs: "10px", md: "14px" },
                }
              }
            >
              {left?.events}
            </Typography>
          }
          sx={{
            color: "rgba(119, 119, 119, 1)",
            "& .css-jcxoq4-MuiButton-endIcon": {
              color: "rgba(121, 93, 168, 1)",
              // fontSize: "15px",
              fontWeight: "800",
            },
            fontSize: { sm: "12px", xs: "10px", md: "13px", lg: "15px" },
            cursor: "text",
          }}
        >
          EVENTS LEFT
        </Button>
        <Button
          variant="text"
          size="small"
          startIcon={
            <Typography
              sx={{
                fontSize: { xs: "5px", sm: "11px", md: "12px", lg: "13px" },
                display: { xs: "none", sm: "block", md: "block", lg: "block" },
              }}
            >
              <GrDocumentText />
            </Typography>
          }
          endIcon={
            <Typography
              // component={"span"}
              variant="caption"
              sx={
                {
                  // fontSize: { sm: "14px", xs: "10px", md: "14px" },
                }
              }
            >
              {left?.invitees}
            </Typography>
          }
          sx={{
            color: "rgba(119, 119, 119, 1)",
            "& .css-jcxoq4-MuiButton-endIcon": {
              color: "rgba(121, 93, 168, 1)",
              // fontSize: "15px",
              fontWeight: "800",
            },
            fontSize: { sm: "12px", xs: "10px", md: "13px", lg: "15px" },
            cursor: "text",
          }}
        >
          Invitees Left
        </Button>
      </Stack>
      <Stack
        direction={{ md: "row", lg: "row", xs: "column" }}
        justifyContent={"space-between"}
        alignContent={"center"}
        width={"100%"}
      >
        <Box width={{ md: "50%", sm: "100%", xs: "100%", lg: "50%" }}>
          <FormControl
            sx={{
              m: 1,
              width: { md: "90%", xs: "100%" },
              // width: { md: "30ch", lg: "25ch", sm: "50ch", xs: "30ch" },
            }}
            variant="outlined"
            size="small"
            fullWidth
          >
            <OutlinedInput
              sx={{
                "& legend": {
                  display: "none",
                },
                height: "30px",
              }}
              size="small"
              fullWidth
              disabled={activeSearch ? true : false}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Event Name"
              type={"text"}
              endAdornment={
                <InputAdornment position="end">
                  {activeSearch ? (
                    <IconButton
                      onClick={cancelSearch}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      <ClearIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={handleSearch}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Box>
        <Stack
          // display={"flex"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          px={1}
          spacing={1}
        >
          {/* &nbsp;&nbsp; */}
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            sx={{
              color: "white",
              fontSize: { sm: "14px", xs: "10px", md: "14px" },
            }}
            onClick={toggleTemplatePreviewModal}
          >
            Add New
          </Button>
        </Stack>
      </Stack>

      <Stack
        overflow={"auto"}
        // bgcolor={"red"}
        mt={1}
        maxHeight={"450px"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "5px",
            bgcolor: "rgba(206, 197, 220, 1)",
            borderRadius: "6px",
            display: { xs: "none", sm: "none", md: "block" },
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "rgba(121, 93, 168, 1)",
            height: "40px",
            borderRadius: "6px",
          },
        }}
      >
        <Grid
          container
          display={"flex"}
          justifyContent={"space-around"}
          // maxHeight={"450px"}
        >
          {loading ? (
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <CircularProgress
                color="primary"
                sx={{
                  bgcolor: "transparent !important",
                  "& svg": {
                    bgcolor: "transparent !important",
                  },
                }}
              />{" "}
            </Grid>
          ) : (
            ""
          )}
          {filteredEvents && filteredEvents.length != 0 ? (
            filteredEvents?.map((event, index) => {
              return (
                <Grid
                  item
                  container
                  key={index}
                  sm={3.1}
                  xs={10}
                  display={"flex"}
                  direction={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  sx={{
                    position: "relative",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "10px",
                    boxSizing: "border-box",
                    overflow: "hidden",
                    marginY: "10px",
                    // border:"1px solid green"
                  }}
                >
                  <Typography
                    sx={{
                      "&:hover": { fontWeight: "600" },
                      boxSizing: "border-box",
                    }}
                    width={"100%"}
                    padding={"5px"}
                    onClick={() =>
                      navigate("/dashboard/view-event", { state: { event } })
                    }
                  >
                    {event?.name}
                  </Typography>
                  <Box borderRadius={"8px"} position={"relative"}>
                    <Box
                      sx={{
                        opacity: "0",
                        display: "flex",
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        bgcolor: "rgba(0, 0, 0, 0.36)",
                        zIndex: "1000",
                        justifyContent: "center",
                        alignItems: "center",

                        "&:hover": {
                          transition: "all 300ms ease",
                          opacity: "1",
                        },
                        "&:hover .MuiButton-root": {
                          transition: "all 300ms ease",
                          opacity: "1",
                        },
                      }}
                    >
                      <Button
                        variant="text"
                        onClick={() =>
                          navigate("/dashboard/view-event", {
                            state: { event },
                          })
                        }
                        sx={{
                          color: "white",
                          border: "1px solid white",
                          opacity: "0",
                        }}
                      >
                        View
                      </Button>
                    </Box>

                    <Box
                      component={"img"}
                      width={"100%"}
                      alt="template preview"
                      src={`${Constants.IMG_PATH}/${event?.variation?.previewImage}`}
                      borderRadius={"8px"}
                      display={"block"}
                      sx={{
                        cursor: "pointer",
                      }}
                    />
                  </Box>

                  {/* <Button
                    disableElevation
                    variant="contained"
                    sx={{ color: "white", mt: 1 }}
                  >
                    Customize
                  </Button> */}
                </Grid>
              );
            })
          ) : (
            <Typography mt={2} variant="body2">
              There are no Record found
            </Typography>
          )}
        </Grid>
        {/* {console.log("filtered evet=>", filteredEvents?.length)} */}
      </Stack>
      {activeSearch ? (
        ""
      ) : (
        <Stack>
          <TablePagination
            component="div"
            count={counts}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>
      )}

      <TemplatePreview
        carouselClick={carouselClick}
        toggleTemplatePreviewModal={toggleTemplatePreviewModal}
        singleTemplateId={singleTemplateId}
        // data={templateData}
        openTemplatePreviewModal={openTemplatePreviewModal}
      />
    </Box>
  );
};

export default MyEvents;
