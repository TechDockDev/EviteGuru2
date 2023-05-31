import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useContext, useEffect, useState } from "react";
import MuiPagination from "@mui/material/Pagination";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { showLoading, hideLoading } from "../../redux/feature/alertSlice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link as RouterLink, useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditSubAdmin from "./EditSubAdmin";

import { Box, Button, TextField, Typography, IconButton, Toolbar, Modal, Paper } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AuserList, SubAdminList } from "../../redux/action/adminAction";
import { DataContext } from "../../AppContext";

const SubAdminListScreen = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const { snackbar } = useContext(DataContext);
   const [adminsData, setAdminsData] = useState([]);
   const [deleteModal, setDeleteModal] = useState(false);
   const [singleAdmin, setSingleAdmin] = useState("")
   // ===
   const toggleDeleteModal = (admin) => {
      if (deleteModal) {
         setSingleAdmin("")
         setDeleteModal(!deleteModal);
      } else {
         setSingleAdmin(admin)
         setDeleteModal(!deleteModal);
      }
   };
   // ===
   const editSubAdmin = (e, subAdminId) => {
      // toggleAddUserModal(subAdminId);
      // EditSubAdmin(subAdminId);
      console.log(subAdminId);
      navigate(`/admin/${subAdminId}`);
   };
   // ===

   let deleteSubadmin = async (subAdminId) => {
      try {
         const { data } = await axios.delete(`/${subAdminId}`);
         snackbar(data.status,data.message)
         getSubAdmins()
      } catch (error) {
         snackbar("error", error.message);
      }
   };
   // ===
   const getSubAdmins = async () => {
      try {
         setLoading(true);
         const { data } = await axios.get("/admin-list");
         setAdminsData(data.admins);
         setLoading(false);
      } catch (error) {
         snackbar("error", error.message);
      }
   };
   // ===
   useEffect(() => {
      getSubAdmins();
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
                     }}>
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
                     }}>
                     <EditIcon />
                  </IconButton>
               </>
            );
         },
      },

      {
         field: "delete",
         headerName: "Delete",
         width: 100,
         renderCell: (params) => {
            return (
               <>
                  <IconButton
                     onClick={(e) => {
                        toggleDeleteModal( params.row);
                     }}
                     sx={{
                        color: "#FFFFFF",
                        backgroundColor: "#795DA8",
                        borderRadius: "70%",
                     }}>
                     <DeleteForeverIcon />
                  </IconButton>
               </>
            );
         },
      },
   ];

   return (
      <>
         <Box padding={"10px"} boxSizing={"border-box"}>
            <Box
               sx={{
                  alignContent: "right",
                  justifyItems: "right",
               }}>
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
               <Button component={NavLink} to="/admin/create-subadmin" variant="outlined" sx={{ my: 1 }}>
                  Add Sub-Admin
               </Button>
            </Box>
            <Box sx={{ width: "100%" }}>
               <DataGrid
                  width={"100%"}
                  rows={adminsData}
                  columns={columns}
                  autoHeight={true}
                  initialState={{
                     pagination: {
                        paginationModel: {
                           pageSize: 10,
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
                     "& .MuiDataGrid-columnHeaderTitle": {
                        fontWeight: "600",
                     },
                  }}
               />
            </Box>
         </Box>
         {/* ***********  confirm delete modal ************** */}
         <Modal
            open={deleteModal}
            // open={true}
            onClose={toggleDeleteModal}
            closeAfterTransition
            sx={{ bgcolor: "transparent", backdropFilter: "blur(2px)" }}>
            <Paper
               sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: { xl: 400, lg: 400, md: 400, sm: 400, xs: "70%" },
                  bgcolor: " rgba(133, 103, 157, 0.47)",
                  border: "1px solid white",
                  borderRadius: "20px",
                  p: 5,
               }}>
               <Typography
                  variant="h1"
                  sx={{
                     fontSize: "25px",
                     fontWeight: "600",
                     textAlign: "center",
                     color: "white",
                  }}>
                  Delete Admin
               </Typography>
               <Typography
                  sx={{
                     mt: 2,
                     textAlign: "center",
                     color: "white",
                  }}>
                  Are sure you want to delete {} ?
               </Typography>
               <Button
                  onClick={() => {
                     deleteSubadmin(singleAdmin._id);
                     toggleDeleteModal();
                  }}
                  variant="contained"
                  sx={{
                     color: "white",
                     bgcolor: "#3B285B",
                     width: "100%",
                     mt: 2,
                     "&:hover": {
                        scale: "1.02",

                        bgcolor: "#3B285B",
                     },
                  }}
                  disableElevation>
                  Yes
               </Button>
               <Button
                  onClick={toggleDeleteModal}
                  variant="outlined"
                  sx={{
                     color: "white",
                     borderColor: "#3B285B",
                     width: "100%",
                     mt: 2,
                     "&:hover": {
                        scale: "1.02",
                        borderColor: "#3B285B",
                     },
                  }}
                  disableElevation>
                  No
               </Button>
            </Paper>
         </Modal>
      </>
   );
};

export default SubAdminListScreen;
