import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const columns = [
   //   { field: "_id", headerName: "ID", width: 70 },
   { field: "name", headerName: "Event Name", width: 130 },
   { field: "hostName", headerName: "Host name", width: 130 },
   {
      field: "date",
      headerName: "Date",
      type: "string",
      width: 190,
      valueGetter: (params) => dayjs(params.value).format("YYYY-MM-DD"),
   },
   {
      field: "time",
      headerName: "Time",
      type: "string",
      width: 190,
      valueGetter: (params) => dayjs(params?.row.date).format("HH:mm"),
   },
   {
      field: "address",
      headerName: "Address",
      width: 200,
   },
   {
      field: "additionalInfo",
      headerName: "Additional Info",
      width: 150,
   },
];

export default function DataTable() {
   const [events, setEvents] = useState([]);
   const { id } = useParams();
   const navigate = useNavigate()
   useEffect(() => {
      (async () => {
         const { data } = await axios.get(`/events/user/${id}`);
         setEvents(data?.events);
      })();
   }, []);

   return (
      <Box sx={{ width: "100%", padding: "0px 10px 30px 10px", boxSizing: "border-box"}}>
         <Typography
            variant="h1"
            align="center"
            fontWeight="800"
            fontSize={"28px"}
            mb={2}
            sx={{
               color: "#795da8",
               width: "100%",
            }}>
            List of events
         </Typography>
         <DataGrid
            rows={events}
            autoHeight={true}
            getRowId={(row) => row._id}
            columns={columns}
            pageSize={1}
            disableRowSelectionOnClick={true}
            onRowClick={(row) => navigate(`/admin/event/${row.row._id}`)}
            // rowsPerPageOptions={[20]}
            sx={{
               border: "2px solid #795DA8",
               "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                  outline: "none !important",
               },
               "& .MuiDataGrid-columnHeaderTitle":{
               fontWeight:"600",                                       
               }
            }}
         />
      </Box>
   );
}
