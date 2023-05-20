import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserListEmail = () => {
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
      headerName: "Guests",
      width: 100,
    },
    {
      field: "subscription",
      headerName: "Subscription",
      width: 150,
      renderCell: (params) => {
        return <div>{params?.value?.name}</div>;
      },
      valueGetter: (params) => params.value.name,
    },
    {
      field: "mail",
      headerName: "",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Button
              sx={{
                color: "#FFFFFF",
                backgroundColor: "#795DA8",
              }}
            >
              Send Email
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: "98%" }}>
        {users && (
          <DataGrid
            width={"98%"}
            rows={users}
            getRowId={(row) => row._id}
            columns={columns}
            slots={{ toolbar: GridToolbarQuickFilter }}
            disableRowSelectionOnClick={true}
            autoHeight={true}
            checkboxSelection
            onRowSelectionModelChange={(selected) => console.log(selected)}
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
              "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
              },
            }}
          />
        )}
      </Box>
    </>
  );
};

export default UserListEmail;
