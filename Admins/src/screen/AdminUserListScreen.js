import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Typography } from "@mui/material";
import axios from "axios";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../AppContext";

const UserListScreen = () => {
   const [loading, setLoading] = useState(false);
   const [users, setUsers] = useState();
   const navigate = useNavigate();
   const { snackbar } = useContext(DataContext);

   const getUsers = async () => {
      try {
         const res = await axios.get("/user/all-users");
         setUsers(res.data.users);
         // console.log(res);
      } catch (error) {
         // console.log(error);
      }
   };
   //  ===
   const suspendUser = async (id) => {
      try {
         const res = await axios.patch("/user/suspend", {
            userId: id,
         });
         getUsers();
         snackbar(res.data.status, res.data.message);
      } catch (error) {
         snackbar("error", error.message);
      }
   };
   // ===
   useEffect(() => {
      getUsers();
   }, []);
   // ===
   const columns = [
      {
         field: "name",
         headerName: "Name",
         width: 150,
         renderCell: (params) => {
            return (
               <Typography
                  fontSize={"14px"}
                  sx={{
                     "&:hover": {
                        textDecoration: "underline",
                        cursor: "pointer",
                     },
                  }}>
                  {params?.row?.name}
               </Typography>
            );
         },
      },

      {
         field: "email",
         headerName: "Email",
         width: 210,
      },

      {
         field: "phone",
         headerName: "Phone",
         width: 150,
      },
      {
         field: "templateNum",
         headerName: "Template",
      },
      {
         field: "guestNum",
         headerName: "Guests",
         width: 100,
      },
      {
         field: "subscription",
         headerName: "Subscription",
         width: 150,
         renderCell: (params) => {
            return <div>{params?.row?.subscription?.name}</div>;
         },
      },
      {
         field: "status",
         headerName: "Status",
         width: 150,
         renderCell: (params) => {
            console.log("suspended", params?.row?.suspended);

            return (
               <Button
               size="small"
                sx={{
                  color:params?.row?.suspended ? "#AE9CCA" :"white"
                }}
                  disableElevation
                  variant={params?.row?.suspended ? "outlined" : "contained"}
                  onClick={(e) => {
                     e.stopPropagation();
                     suspendUser(params?.row?._id);
                  }}>
                  {params?.row?.suspended && "un"}suspend User
               </Button>
            );
         },
      },
   ];

   return (
      <>
         <Box paddingX={"10px"} boxSizing={"border-box"}>
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
               List of users
            </Typography>
            {users && (
               <DataGrid
                  width={"98%"}
                  rows={users}
                  getRowId={(row) => row._id}
                  columns={columns}
                  disableRowSelectionOnClick={true}
                  autoHeight={true}
                  initialState={{
                     pagination: {
                        paginationModel: {
                           pageSize: 10,
                        },
                     },
                  }}
                  loading={loading}
                  onRowClick={(row, e) => {
                     e.stopPropagation();
                     navigate(`/admin/user/${row.id}`);
                  }}
                  pageSizeOptions={[5]}
                  sx={{
                     border: "2px solid #795DA8",
                     "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                        outline: "none !important",
                     },
                     "& .MuiDataGrid-columnHeaderTitle": {
                        fontWeight: "600",
                     },
                     "& .MuiDataGrid-row": {
                        cursor: "pointer",
                     },
                  }}
               />
            )}
         </Box>
      </>
   );
};

export default UserListScreen;
