import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../redux/action/defaultActions";
import SearchIcon from "@mui/icons-material/Search";
import { GrDocumentText } from "react-icons/gr";
import AddIcon from "@mui/icons-material/Add";
const MyEvents = () => {
  const dispatch = useDispatch();
  const events = [
    {
      name: "Phla",
      src: "",
    },
    {
      name: "dusra Event",
      src: "",
    },
    {
      name: "aik naya event",
      src: "",
    },
    {
      name: "bilkul naya event",
      src: "",
    },
    {
      name: "latest event",
      src: "",
    },
  ];
  const handleSearch = () => {
    console.log("seaching...");
  };
  const [page, setPage] = React.useState(10);

  const handleChange = (event) => {
    setPage(event.target.value);
  };

  //  ================
  useEffect(() => {
    dispatch(setPageTitle("My Events"));
  }, []);

  return (
    <Box>
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
        <Grid container spacing={1} display={"flex"} justifyContent={"center"}>
          {events &&
            events?.map((event, index) => {
              return (
                <Grid
                  item
                  container
                  key={index}
                  sm={5.5}
                  xs={10}
                  md={3.5}
                  lg={3}
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
                    transition: "all 300ms ease",
                    "&:hover img": {
                      transition: "all 300ms ease",
                      scale: "1.1",
                    },
                    "&:hover .MuiBox-root": {
                      transition: "all 300ms ease",
                      opacity: "1",
                    },
                    "&:hover .MuiButton-root": {
                      transition: "all 300ms ease",
                      opacity: "1",
                    },
                  }}
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
                    }}
                  >
                    <Button
                      variant="text"
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
                    src="https://img.freepik.com/free-vector/minimal-floral-wedding-card_23-2148830817.jpg"
                    borderRadius={"10px"}
                  />
                  <Typography>{event?.name}</Typography>
                </Grid>
              );
            })}
        </Grid>
      </Stack>
    </Box>
  );
};

export default MyEvents;
