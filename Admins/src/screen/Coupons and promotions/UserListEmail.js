import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../AppContext";

const UserListEmail = () => {
   const [loading, setLoading] = useState(false);
   const [users, setUsers] = useState();
   const [selectedUsers, setSelectedUsers] = useState([]);
   const { snackbar } = useContext(DataContext);
   const navigate = useNavigate();
   const getUsers = async () => {
      try {
         const res = await axios.get("/user/all-users");
         if (sessionStorage.getItem("message")) {
            return setUsers(res.data.users.filter((user) => user.phone));
         }
         setUsers(res.data.users);
         // console.log(res);
      } catch (error) {
         snackbar("error", error.message);
      }
   };

   const sendMail = async () => {
      try {
         const res = await axios.post("/promotion/sendMail", {
            subject: JSON.parse(sessionStorage.getItem("email"))?.subject,
            body: JSON.parse(sessionStorage.getItem("email"))?.body,
            emails: selectedUsers,
         });
         snackbar(res.data.satus, res.data.message);
      } catch (error) {
         snackbar("error", error.message);
      }
   };

   const sendMessage = async () => {
      try {
         const numbers = selectedUsers.map((v) => "+" + v);
         const res = await axios.post("/promotion/sendSms", {
            message: JSON.parse(sessionStorage.getItem("message"))?.message,
            numbers,
         });
         console.log(res);
      } catch (error) {
         console.log(error);
      }
   };
   function toolbar() {
      return (
         <Stack direction={"row"} justifyContent={"space-between"} m={2}>
            <GridToolbarQuickFilter />
            {sessionStorage.getItem("email") ? (
               <Button variant="contained" sx={{ color: "white" }} disabled={selectedUsers.length === 0} onClick={sendMail}>
                  Send E-Mail
               </Button>
            ) : (
               <Button variant="contained" sx={{ color: "white" }} disabled={selectedUsers.length === 0} onClick={sendMessage}>
                  Send Message
               </Button>
            )}
         </Stack>
      );
   }

   useEffect(() => {
      getUsers();
   }, []);

   const columns = [
      {
         field: "name",
         headerName: "Name",
         width: 150,
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
         valueGetter: (params) => params?.value?.name,
      },
   ];
   return (
      <Stack paddingX={"20px"}>
          <Typography
            variant="h1"
            align="center"
            fontWeight="800"
            fontSize={"28px"}
            mb={1}
            sx={{
               color: "#795da8",
               width: "100%",
            }}>
            Select Users
         </Typography>
         {users && (
            <DataGrid
               width={"98%"}
               rows={users}
               getRowId={(row) => (sessionStorage.getItem("email") ? row.email : row.phone)}
               columns={columns}
               slots={{ toolbar }}
               disableRowSelectionOnClick={true}
               autoHeight={true}
               checkboxSelection
               onRowSelectionModelChange={(selected) => setSelectedUsers(selected)}
               initialState={{
                  pagination: {
                     paginationModel: {
                        pageSize: 5,
                     },
                  },
               }}
               loading={loading}
               // onRowClick={(row) => navigate(`/admin/user/${row.id}`)}
               pageSizeOptions={[5]}
               sx={{
                  border: "2px solid #795DA8",
                  "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                     outline: "none !important",
                  },
               }}
            />
         )}
          <Button
         onClick={()=>navigate(-1)}
         disableElevation variant="outlined" sx={{mt:2 , width:"fit-content"}} >
              Back       
         </Button>
      </Stack>
   );
};

export default UserListEmail;
