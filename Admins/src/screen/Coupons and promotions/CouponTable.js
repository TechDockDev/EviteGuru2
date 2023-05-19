import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  { field: "amount", headerName: "Amount", width: 130 },
  {
    field: "amountType",
    headerName: "Amount Type",
    type: "string",
    width: 130,
  },
  {
    field: "plans",
    headerName: "Plans",
    // type: "string",
    width: 1800,
    renderCell: (params) => {
      return <Typography>{params.value.map(async()=>{
        try {
          // const res = await axios.
        } catch (error) {
          console.log(error);
        }
      })}</Typography>;
    },
  },
  {
    field: "edit",
    headerName: "Edit",
    width: 80,
    renderCell: (params) => {
      return (
        <>
          <IconButton
            sx={{
              color: "#FFFFFF",
              backgroundColor: "#795DA8",
              borderRadius: "70%",
            }}
          >
            <EditIcon />
          </IconButton>
        </>
      );
    },
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 80,
    renderCell: (params) => {
      return (
        <>
          <IconButton
            onClick={(e) => {
              // editTemplate(e, params.row._id);
            }}
            sx={{
              color: "#FFFFFF",
              backgroundColor: "#795DA8",
              borderRadius: "70%",
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      );
    },
  },
];

export default function CouponTable() {
  const [coupons, setCoupons] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/coupon/all");
      setCoupons(data.coupons);
    })();
  }, []);

  console.log(coupons);
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={coupons}
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
    </Box>
  );
}
