import { Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../AppContext";
import axios from "axios";

const PaymentDetails = () => {
   const [loading, setLoading] = useState(false);
   const { snackbar } = useContext(DataContext);
   const [paymentsData, setPaymentsData] = useState([])
   // ===
   const getPaymentsData = async () => {
      try {
         const { data } = await axios.get("/transactions/get");
         console.log('-->',data.payments);
         
         setPaymentsData(data.payments)
      } catch (error) {
         snackbar("error", error.message);
      }
   };
   // ===
   useEffect(() => {
      getPaymentsData();
   }, []);

   // ===
   const columns = [
      {
         field: "user",
         headerName: "User Name",
         width: 200,
         valueGetter:(params)=>{
             return params.row.user.name
         }
      },
      {
         field: "email",
         headerName: "E-mail",
         width: 200,
         valueGetter:(params)=>{
            return params.row.user.email
        }
      },
      {
         field: "amount",
         headerName: "Amount",
         width: 90,
      },

      {
         field: "startDate",
         headerName: "Start Date",
         width: 100,
         valueGetter:(params)=>{
            const date = new Date(params.row.createdAt).toLocaleDateString('en-GB')
            return date
        }
      },
      {
         field: "plan",
         headerName: "Plan",
         width: 120,
         valueGetter:(params)=>{
            return params.row.plan.name
        }
      },
      {
         field: "planType",
         headerName: "Plan Type",
         width: 90,
         valueGetter:(params)=>{
            return params.row.planType
        }
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
            rows={paymentsData}
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
               "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "600",
               },
            }}
         />
      </Stack>
   );
};

export default PaymentDetails;
