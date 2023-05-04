import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import RSVPSummaryCard from "./RSVPSummaryCard";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import PieChart2 from "./PieChart2";

//=============================
const Invitees = () => {
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
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "email",
      headerName: "Email id",
      width: 200,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      type: "number",
      width: 150,
    },
    {
      field: "date",
      headerName: "Date",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    // {
    //    field: "attending",
    //    headerName: "Attending",
    //    width: 100,
    // },
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

  const rows = [
    {
      id: 1,
      email: "xyz@gmail.com",
      firstName: "Jon",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "pending",
    },
    {
      id: 2,
      email: "qwerty@gmail.com",
      firstName: "Cersei",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "attending",
    },
    {
      id: 3,
      email: "pokl@gmail.com",
      firstName: "Jaime",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "pending",
    },
    {
      id: 4,
      email: "lmp@gmail.com",
      firstName: "Arya",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "pending",
    },
    {
      id: 5,
      email: "xyz@gmail.com",
      firstName: "Daenerys",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "not attending",
    },
    {
      id: 6,
      email: "xyz@gmail.com",
      firstName: "Name Kuch Bhi",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "pending",
    },
    {
      id: 7,
      email: "xyz@gmail.com",
      firstName: "Ferrara",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "attending",
    },
    {
      id: 8,
      email: "xyz@gmail.com",
      firstName: "Rossini",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "pending",
    },
    {
      id: 9,
      email: "xyz@gmail.com",
      firstName: "Harvey",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "pending",
    },
  ];

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
      {/* title */}
      <Box
        sx={{
          //  border: "1px solid green",
          m: 1,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "25px", fontWeight: "800" }}>
          Invitees
        </Typography>
        <Typography>Sunder ki shadi</Typography>
      </Box>
      {/* title */}
      {/* ============ 👇container for RSVP  summary and pie chart👇  ============= */}
      <Grid
        container
        mt={3}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
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
        {/* ============ 👇 PieChart card👇  ============= */}

        <Grid
          item
          xl={5}
          lg={5}
          md={5}
          sm={11}
          xs={11}
          sx={{
            display: { md: "flex", xs: "none" },
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "transparent",
            m: 2,
          }}
        >
          <PieChart2 />
        </Grid>
        {/* ============  👆 PieChart card👆============= */}
      </Grid>
      {/* ============  👆container for RSVP  summary and pie chart👆============= */}
      {/* ============ 👇 Guests list table👇  ============= */}
      <Stack mt={2}>
        <DataGrid
          components={{ Toolbar: CustomeToolBar }}
          //   slots={{ toolbar: QuickSearchToolbar }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
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

export default Invitees;
