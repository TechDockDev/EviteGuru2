import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import MuiPagination from "@mui/material/Pagination";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { showLoading, hideLoading } from "../../redux/feature/alertSlice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link as RouterLink, useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditSubAdmin from "./EditSubAdmin";

import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Toolbar,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AuserList, SubAdminList } from "../../redux/action/adminAction";
const SubAdminListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const subAdminList = useSelector((state) => state.subAdminList);
  const { error, adminId, admins } = subAdminList;

  const editSubAdmin = (e, subAdminId) => {
    // toggleAddUserModal(subAdminId);
    // EditSubAdmin(subAdminId);
    console.log(subAdminId);
    navigate(`/admin/${subAdminId}`);
    // console.log("Inside the  button", subAdminId);
  };

  const deleteHandler = (e, subAdminId) => {
    if (window.confirm("Are you sure you want to delete this Admin ?")) {
      deleteSubadmin(subAdminId);
      window.location.reload(false);
    }
  };

  let deleteSubadmin = async (subAdminId, res) => {
    try {
      const { res } = await axios.delete(`/admin/${subAdminId}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(SubAdminList());
  }, [dispatch]);

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
      field: "adminLastLogin",
      headerName: "Last Online",
      width: 150,
    },
    {
      field: "superAdmin",
      headerName: "Sub Admin",
      width: 100,
      renderCell: (params) => {
        return (
          <p>
            {params?.row?.superAdmin ? (
              <AdminPanelSettingsIcon />
            ) : (
              <CheckCircleIcon
                sx={{
                  color: "green",
                  borderRadius: "100%",
                }}
              />
            )}
          </p>
        );
      },
    },

    {
      field: "view",
      headerName: "View",
      width: 80,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              onClick={(e) => {
                // toggleTemplatePreviewModal(e, params.row._id);
              }}
              sx={{
                color: "#FFFFFF",
                backgroundColor: "#795DA8",
                borderRadius: "70%",
              }}
            >
              <VisibilityIcon />
            </IconButton>
          </>
        );
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
              onClick={(e) => {
                editSubAdmin(e, params.row._id);
              }}
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
      field:"delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              onClick={(e) => {
                deleteHandler(e, params.row._id);
              }}
              sx={{
                color: "#FFFFFF",
                backgroundColor: "#795DA8",
                borderRadius: "70%",
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Box
        sx={{
          alignContent: "right",
          justifyItems: "right",
        }}
      >
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
            Sub-Admins List
         </Typography>
        <Button
          component={NavLink}
          to="/admin/create-subadmin"
          variant="outlined"
          sx={{ my: 1, mx: 1.5 }}
        >
          Add Sub-Admin
        </Button>
      </Box>
      <Box sx={{ height: 400, width: "98%" }}>
        <DataGrid
          width={"98%"}
          rows={admins}
          columns={columns}
          autoHeight={true}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          getRowId={(row) => row._id}
          loading={loading}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
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
    </>
  );
};

export default SubAdminListScreen;
