import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography } from "@mui/material";
import axios from "axios";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const UserListScreen = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState();
  const navigate = useNavigate();
  const getUsers = async () => {
    try {
      const res = await axios.get("/user/all-users");
      setUsers(res.data.users);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

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
      headerName: "guests",
      width: 100,
    },
    {
      field: "subscription",
      headerName: "subscription",
      width: 150,
      renderCell: (params) => {
        return <div>{params?.value?.name}</div>;
      },
    },
    {
      field: "suspended",
      headerName: "Suspend",
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
              {params.value === false ? <PersonOffIcon /> : <PersonIcon />}
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

  return (
    <>
      <Box sx={{ height: 400, width: "98%" }}>

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
            // autoHeight={true}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            loading={loading}
            onRowClick={(row) => navigate(`/admin/user/${row.id}`)}
            pageSizeOptions={[5]}
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
        )}
      </Box>
    </>
  );
};

export default UserListScreen;
