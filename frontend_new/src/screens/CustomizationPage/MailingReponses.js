import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import React from "react";

const MailingReponses = () => {
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
      field: "mailingTitle",
      headerName: "Mailing Title",
      width: 220,

      renderCell: (params) => {
        return (
          <>
            <Stack direction={"row"} alignItems={"center"} spacing={1} p={1}>
              <Box
                component={"img"}
                src="/assets/templateIcon.png"
                alt="template image"
                width={"50px"}
                height={"50px"}
              />
              <Typography>{`${params?.row?.mailingTitle}`}</Typography>
            </Stack>
          </>
        );
      },
    },
    {
      field: "eventDate",
      headerName: "Event Date",
      width: 120,
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
      field: "lastSent",
      headerName: "Last Sent",
      width: 100,
    },
    {
      field: "openRate",
      headerName: "Open Rate",
      type: "number",
      width: 100,
    },
    {
      field: "responseRate",
      headerName: "Response Rate",
      width: 120,
    },
  ];

  const rows = [
    {
      id: 1,
      email: "xyz@gmail.com",
      mailingTitle: "Jon",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      lastSent: "01-01-2023",
      eventDate: "05-05-2023",

      openRate: 5,
      responseRate: 10,
    },
    {
      id: 2,
      email: "qwerty@gmail.com",
      mailingTitle: "Cersei",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      lastSent: "21-02-2023",
      eventDate: "05-05-2023",
      openRate: 5,
      responseRate: 10,
    },
    {
      id: 3,
      email: "pokl@gmail.com",
      mailingTitle: "Jaime",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      lastSent: "01-01-2023",
      eventDate: "05-05-2023",
      openRate: 5,
      responseRate: 10,
    },
    {
      id: 4,
      email: "lmp@gmail.com",
      mailingTitle: "Arya",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      lastSent: "01-01-2023",
      eventDate: "05-05-2023",
      openRate: 5,
      responseRate: 10,
    },
    {
      id: 5,
      email: "xyz@gmail.com",
      mailingTitle: "Daenerys",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      lastSent: "01-01-2023",
      eventDate: "05-05-2023",
      openRate: 5,
      responseRate: 10,
    },
    {
      id: 6,
      email: "xyz@gmail.com",
      mailingTitle: "Name Kuch Bhi",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      lastSent: "01-01-2023",
      eventDate: "05-05-2023",
      openRate: 5,
      responseRate: 10,
    },
    {
      id: 7,
      email: "xyz@gmail.com",
      mailingTitle: "Ferrara",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      lastSent: "21-02-2023",
      eventDate: "05-05-2023",
      openRate: 5,
      responseRate: 10,
    },
    {
      id: 8,
      email: "xyz@gmail.com",
      mailingTitle: "Rossini",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      lastSent: "01-01-2023",
      eventDate: "05-05-2023",
      openRate: 5,
      responseRate: 10,
    },
    {
      id: 9,
      email: "xyz@gmail.com",
      mailingTitle: "Harvey",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      lastSent: "01-01-2023",
      eventDate: "05-05-2023",
      openRate: 5,
      responseRate: 10,
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
          Mailing Responses
        </Typography>
        {/* <Typography>Sunder ki shadi</Typography> */}
      </Box>
      {/* title */}

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

export default MailingReponses;
