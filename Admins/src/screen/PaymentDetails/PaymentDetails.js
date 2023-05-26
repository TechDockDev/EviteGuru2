import { Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";

const PaymentDetails = () => {
   const [loading, setLoading] = useState(false);

   const columns = [
      {
         field: "name",
         headerName: "User Name",
         width: 200,
      },
      {
         field: "email",
         headerName: "E-mail",
         width: 200,
      },
      {
         field: "transactionId",
         headerName: "Transaction ID",
         width: 200,

      },
      {
         field: "amount",
         headerName: "Amount",
         width: 100,
      },

      {
         field: "date",
         headerName: "Date",
         width: 100,
      },
   ];
   return (
      <Stack padding={"0px 10px"}>
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
            Payment details
         </Typography>
         <DataGrid
            columns={columns}
            rows={[]}
            autoHeight={true}
            pageSizeOptions={[6]}
            getRowId={(row) => row?._id}
            loading={loading}
            disableRowSelectionOnClick={true}
            onRowClick={(row) => console.log(row)}
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
      </Stack>
   );
};

export default PaymentDetails;
