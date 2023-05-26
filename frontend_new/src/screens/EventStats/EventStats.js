import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import RSVPSummaryCard from "./RSVPSummaryCard";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import {
  resetEventDetails,
  setEventDetails,
  setPageTitle,
} from "../../redux/action/defaultActions";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Moment from "react-moment";
//=============================
const EventStats = () => {
  const { state } = useLocation();
  const { pageTitle } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useDispatch();
  const [guestList, setGuestList] = useState([]);
  console.log("state=>", state);
  function CustomeToolBar() {
    return (
      <Grid container>
        <Grid
          item
          md={5}
          sm={12}
          xs={12}
          sx={{ alignItems: "center", display: "flex" }}
        >
          <GridToolbar />
        </Grid>
        <Grid
          item
          md={7}
          sm={12}
          xs={12}
          sx={{ alignItems: "center", display: "flex" }}
        >
          <Stack width={"100%"}>
            <GridToolbarQuickFilter
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "rgba(158, 158, 158, 1)",
                  borderRadius: "10px",
                  borderColor: "rgba(158, 158, 158, 1)",
                },
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    );
  }
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email id",
      width: 200,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      type: "number",
      width: 150,
    },
    {
      field: "membersAllowed",
      headerName: "Members Allowed",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        // console.log("params=>", params);
        return (
          <Stack
            direction={"row"}
            alignItems={"center"}
            alignContent={"center"}
            spacing={1}
          >
            <FiberManualRecordIcon
              fontSize="8px"
              color={
                params.value === true
                  ? "success"
                  : params.value === false
                  ? "disabled"
                  : "error"
              }
            />

            <Typography variant="body2" fontSize={"16px"} component={"span"}>
              sent
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "attending",
      headerName: "Attending",
      width: 100,
      renderCell: (params) => {
        return `${params?.value ? "Attending" : "Not Attending"}`;
      },
    },
    // {
    //    field: "notAttending",
    //    headerName: "Not Attending",
    //    width: 100,
    // },
    // {
    //    field: "pending",
    //    headerName: "Pending",
    //    width: 80,
    // },
  ];

  // ===get event guestList =====
  const getGuestList = async (eventId) => {
    try {
      const res = await axios.get(`/api/v1/user/guest/event/${eventId}`);
      if (res.status === 200) {
        console.log("response=>", res);
        setGuestList(res?.data?.guestList?.guests);
      }
    } catch (error) {
      console.log("error=>", error);
    }
  };
  // ===end of guest list =======
  // ============================
  useEffect(() => {
    if (state) {
      dispatch(setEventDetails(state));
      dispatch(setPageTitle(state?.event?.name));
      getGuestList(state?.event?._id);
    }
    return () => {
      dispatch(resetEventDetails({}));
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
      {/* ============ 👇container for RSVP  summary and pie chart👇  ============= */}
      <Grid
        container
        mt={3}
        spacing={1}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {/* ============ 👇 design card👇  ============= */}

        <Grid
          item
          xl={5}
          lg={5}
          md={5}
          sm={11}
          xs={11}
          sx={{
            display: { md: "flex", xs: "flex" },
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "transparent",
            m: 2,
          }}
        >
          <Box
            component={"img"}
            alt="template design"
            width={"100%"}
            maxHeight={"290px"}
            src={`/images/getImage?path=/${state?.event?.variation?.previewImage}`}
          />
        </Grid>
        {/* ============ 👇 RSVP  summary card👇  ============= */}

        <Grid
          item
          xl={6}
          lg={6}
          md={5}
          sm={12}
          xs={12}
          // border={"1px solid green"}
          sx={{
            boxSizing: "border-box",
          }}
        >
          <RSVPSummaryCard />
        </Grid>
        {/* ============  👆 RSVP  summary card👆============= */}

        {/* ============  👆 PieChart card👆============= */}
      </Grid>
      {/* ============  👆container for RSVP  summary and pie chart👆============= */}
      {/* title */}
      <Stack component={Paper} border={"1px solid"}>
        <Typography>
          event Date :{" "}
          <Moment
            date={state?.event?.date}
            format="hh:mm A, dddd, MMMM DD, YYYY"
          />
        </Typography>
      </Stack>
      <Stack
        mt={1}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Typography variant="h1" sx={{ fontSize: "25px", fontWeight: "800" }}>
            Invitees
          </Typography>

          <Typography>{pageTitle?.title}</Typography>
        </Box>
        <Box>
          <Button
            component={NavLink}
            variant="contained"
            sx={{ color: "white" }}
            to={`/dashboard/${state?.event?._id}/send`}
            // onClick={() => navigate("/dashboard/:id/send")}
          >
            + SEND MORE
          </Button>
        </Box>
      </Stack>
      {/* title */}
      {/* ============ 👇 Guests list table👇  ============= */}
      <Stack mt={2}>
        <DataGrid
          components={{ Toolbar: CustomeToolBar }}
          //   slots={{ toolbar: QuickSearchToolbar }}
          rows={guestList ? guestList : []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          getRowId={(row) => row?._id}
          autoHeight={true}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          getRowClassName={(params) =>
            params?.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          sx={{
            bgcolor: "none",
            border: "none",
            "& .odd": { bgcolor: "#F7F7F7 !important" },
            "& .MuiCheckbox-root": {
              color: "black",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "800",
            },
          }}
        />
      </Stack>

      {/* ============  👆 Guests list table👆============= */}
    </Box>
  );
};

export default EventStats;
