import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import RSVPSummaryCard from "./RSVPSummaryCard";
import { DataGrid } from "@mui/x-data-grid";
import PieChart2 from "./PieChart2";

//=============================
const Invitees = () => {
   const columns = [
      {
         field: "name",
         headerName: "Name",
         width: 150,
         valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
      },
      {
         field: "email",
         headerName: "Email id",
         width: 150,
      },
      {
         field: "phoneNumber",
         headerName: "Phone Number",
         type: "number",
         width: 110,
      },
      {
         field: "date",
         headerName: "Date",
         width: 100,
      },
      {
         field: "status",
         headerName: "Status",
         width: 100,
      },
      {
         field: "attending",
         headerName: "Attending",
         width: 100,
      },
      {
         field: "notAttending",
         headerName: "Not Attending",
         width: 100,
      },
      {
         field: "pending",
         headerName: "Pending",
         width: 80,
      },
   ];

   const rows = [
      { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
      { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
      { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
      { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
      { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
      { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
      { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
      { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
      { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
   ];

   return (
      <Box
         sx={{
            // border: "2px solid red",
            height: "100%",
            width: { xl: "calc(100vw - 250px)", lg: "calc(100vw - 270px)", md: "calc(100vw - 270px)", sm: "100vw", xs: "100vw" },
            maxWidth: "1150px",
            padding: "0 20px 20px 20px",
            boxSizing: "border-box",
         }}>
         {/* title */}
         <Box
            sx={{
               //  border: "1px solid green",
               m: 1,
            }}>
            <Typography variant="h1" sx={{ fontSize: "25px", fontWeight: "800" }}>
               Invitees
            </Typography>
            <Typography>Sunder ki shadi</Typography>
         </Box>
         {/* title */}
         {/* ============ 👇container for RSVP  summary and pie chart👇  ============= */}
         <Grid container mt={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
               }}>
               <RSVPSummaryCard />
            </Grid>
            {/* ============  👆 RSVP  summary card👆============= */}
            {/* ============ 👇 PieChart card👇  ============= */}

            <Grid item xl={5} lg={5} md={5} sm={11} xs={11} sx={{ display: { md: "flex", xs: "none" }, justifyContent: "center", alignItems: "center", bgcolor: "transparent", m: 2 }}>
               <PieChart2 />
            </Grid>
            {/* ============  👆 PieChart card👆============= */}
         </Grid>
         {/* ============  👆container for RSVP  summary and pie chart👆============= */}
         {/* ============ 👇 Guests list table👇  ============= */}
         <Stack mt={2}>
            <DataGrid
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
               getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
               sx={{
                  bgcolor:"none",
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
