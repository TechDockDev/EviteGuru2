import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from "@mui/material";
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
const MyEvents = () => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(10);
  const [allEvents, setAllEvents] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setPage(event.target.value);
  };
  const handleSearch = () => {
    console.log("seaching...");
  };
  // === to all events ========
  const getAllEvents = async () => {
    try {
      const res = await axios.get("/api/v1/user/event/user");
      if (res.status === 200) {
        console.log("response=>", res);
        setAllEvents(res?.data?.events);
      }
    } catch (error) {
      console.log("error=>", error);
    }
  };
  // ====end of get all events=
  //  ================
  useEffect(() => {
    dispatch(setPageTitle("My Events"));
    getAllEvents();
    return () => {
      dispatch(setPageTitle(""));
    };
  }, []);

  return (
    <Box>
      <Stack mt={1} mb={1}>
        <Typography variant="h5" fontWeight={"800"} textAlign={"center"}>
          Created Events
        </Typography>
      </Stack>

      <Stack
        direction={{ md: "row", lg: "row", sm: "column", xs: "column" }}
        justifyContent={"space-between"}
        alignContent={"center"}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDirection={{ md: "row", lg: "row", sm: "column", xs: "column" }}
        >
          <FormControl
            size="small"
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography>Show</Typography>
            <Select
              value={page}
              size="small"
              onChange={handleChange}
              sx={{
                "& legend": {
                  display: "none",
                },
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{
              m: 1,
              width: { md: "30ch", lg: "25ch", sm: "50ch", xs: "30ch" },
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
              }}
              size="small"
              fullWidth
              placeholder="search"
              type={"text"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleSearch}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          px={1}
        >
          <Button
            variant="outlined"
            size="small"
            startIcon={<GrDocumentText />}
            endIcon={"10"}
            sx={{
              color: "rgba(119, 119, 119, 1)",
              "& .css-jcxoq4-MuiButton-endIcon": {
                color: "rgba(121, 93, 168, 1)",
                fontSize: "15px",
                fontWeight: "800",
              },
              cursor: "text",
            }}
          >
            LEFT
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            sx={{ color: "white" }}
          >
            Add New
          </Button>
        </Box>
      </Stack>
      <Stack maxHeight={"550px"} overflow={"auto"} mt={1}>
        <Grid container display={"flex"} justifyContent={"space-around"}>
          {allEvents &&
            allEvents?.map((event, index) => {
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
                  <Box
                    overflow={"hidden"}
                    borderRadius={"8px"}
                    position={"relative"}
                  >
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
                      src={`/images/getImage?path=/${event?.variation?.previewImage}`}
                      borderRadius={"8px"}
                      display={"block"}
                      sx={{
                        cursor: "pointer",
                      }}
                    />
                  </Box>

                  <Button
                    disableElevation
                    variant="contained"
                    sx={{ color: "white", mt: 1 }}
                  >
                    Customize
                  </Button>
                </Grid>
              );
            })}
        </Grid>
      </Stack>
    </Box>
  );
};

export default MyEvents;
