import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import dayjs from "dayjs";

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
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/events/all");
      setEvents(data);
    })();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={events}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={1}
        disableRowSelectionOnClick={true}
        onRowClick={(row) => console.log(row.id)}
        // rowsPerPageOptions={[20]}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
      />
    </div>
  );
}
