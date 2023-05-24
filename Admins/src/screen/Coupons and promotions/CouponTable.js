import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

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
    width: 300,
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
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/coupon/all");
      setCoupons(data.coupons);
    })();
  }, []);

  function toolbar() {
    return (
      <Stack direction={"row"} justifyContent={"space-between"} m={2}>
        <Button
          variant="contained"
          sx={{ color: "white" }}
          onClick={() => navigate("/admin/promotional-mail")}
        >
          Send Mails
        </Button>
        <Button
          variant="contained"
          sx={{ color: "white" }}
          onClick={() => navigate("/admin/add-coupon")}
        >
          Add Coupon
        </Button>
      </Stack>
    );
  }

  return (
    <Box sx={{  width: "100%", boxSizing:"border-box", padding:"0px 20px" }}>
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
        Coupons
      </Typography>
      <DataGrid
      autoHeight={true}
        rows={coupons}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={1}
        disableRowSelectionOnClick={true}
        onRowClick={(row) => console.log(row.id)}
        slots={{ toolbar }}
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
