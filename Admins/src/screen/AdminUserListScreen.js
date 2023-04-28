import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import MuiPagination from "@mui/material/Pagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuserList, Adeleteuser } from "../redux/action/adminAction"; // deleteuser
import {
  Box,
  InputLabel,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [openTemplatePreviewModal, seTopenTemplatePreviewModal] =
    useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const adminList = useSelector((state) => state.adminList);
  const { error, users } = adminList;
  const [filteredArray, setFilteredArray] = useState(null);

  // const adminDelete = useSelector((state) => state.adminDelete);
  // const { success: successDelete } = adminDelete ;

  // console.log(userDelete)

  useEffect(() => {
    setLoading(true);
    dispatch(AuserList());
    setLoading(false);
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
      field: "template_num",
      headerName: "Template",
    },
    {
      field: "guest_num",
      headerName: "guests",
      width: 100,
    },
    {
      field: "subscriptionName",
      headerName: "subscription",
      width: 150,
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
                // editTemplate(e, params.row._id);
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

    // {
    //   headerName: "Delete",
    //   width: 100,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <IconButton
    //           onClick={(e) => {
    //             // deleteHandler(e, params.row._id);
    //           }}
    //         >
    //           <DeleteForeverIcon
    //             sx={{
    //               color: "#FFFFFF",
    //               backgroundColor: "#795DA8",
    //               borderRadius: "50%",
    //             }}
    //           />
    //         </IconButton>
    //       </>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: "98%" }}>
        <DataGrid
          width={"98%"}
          rows={users}
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
        />
      </Box>
    </>
  );
};

export default UserListScreen;
