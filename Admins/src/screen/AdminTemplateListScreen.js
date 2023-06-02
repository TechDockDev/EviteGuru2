import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, Modal, Paper, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AdminTemplateEditScreen from "./AdminTemplateEditScreen";
import { useNavigate } from "react-router-dom";

const AdminTemplateListScreen = () => {
   const [templates, setTemplates] = useState([]);
   const [openEditTemplate, setOpenEditTemplate] = useState(false);
   const [selectedTemplateId, setSelectedTemplateId] = useState();
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const [rowSelected, setRowSelected] = useState({});
   const [deleteModal, setDeleteModal] = useState(false);
   //    =========
   const toggleDeleteModal = (rowData) => {
      if (!deleteModal) {
         setRowSelected(rowData);
         setDeleteModal(!deleteModal);
      } else {
         setRowSelected("");
         setDeleteModal(!deleteModal);
      }
   };

   const getTemplateData = async () => {
      try {
         setLoading(true);
         const res = await axios.get(`/template/all`);
         setTemplates(res.data.template);
         setLoading(false);
      } catch (error) {
         console.log(error);
      }
   };

   const toggleEditTemplate = (templateId) => {
      if (!openEditTemplate) {
         setSelectedTemplateId(templateId);

         setOpenEditTemplate(!openEditTemplate);
      } else {
         setSelectedTemplateId("");
         setOpenEditTemplate(!openEditTemplate);
      }
   };

   /// Delete handler for template delete
   const deleteHandler = async (templateId) => {
      console.log(templateId);
      try {
         const res = await axios.delete(`/template/${templateId}`);
         getTemplateData();
      } catch (error) {
         console.log(error);
      }
   };

   const columns = [
      {
         field: "name",
         headerName: "Name",
         width: 250,
      },
      {
         field: "description",
         headerName: "Description",
         width: 250,
      },
      {
         field: "preview",
         headerName: "Preview",
         renderCell: (params) => {
            return (
               <Box
                  component="img"
                  src={`/images/getImage?path=${params?.row?.previewImage}`}
                  onClick={(e) => {
                     e.stopPropagation();
                     window.open(`http://localhost:8085/images/getImage?path=${params?.row?.previewImage}`, "_blank");
                  }}
                  alt="Prevew Image"
                  sx={{ width: "50px", maxHeight: "50px", cursor: "pointer" }}
               />
            );
         },
      },
      {
         field: "edit",
         headerName: "Edit",
         width: 100,
         renderCell: (params) => {
            return (
               <>
                  <IconButton
                     onClick={(e) => {
                        e.stopPropagation();
                        toggleEditTemplate(params?.row?._id);
                     }}
                     sx={{
                        color: "#FFFFFF",
                        backgroundColor: "#795DA8",
                        borderRadius: "50%",
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
                        e.stopPropagation();
                        toggleDeleteModal(params?.row);
                     }}
                     sx={{
                        color: "#FFFFFF",
                        backgroundColor: "#795DA8",
                        borderRadius: "50%",
                     }}>
                     <DeleteForeverIcon />
                  </IconButton>
               </>
            );
         },
      },
   ];

   useEffect(() => {
      getTemplateData();
   }, []);

   return (
      <Box padding={"0px 10px 30px 10px"}>
         <Box sx={{ width: "100%" }}>
            {/* title */}
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
               Template List
            </Typography>
            <DataGrid
               columns={columns}
               rows={templates}
               autoHeight={true}
               pageSizeOptions={[6]}
               getRowId={(row) => row?._id}
               loading={loading}
               disableRowSelectionOnClick={true}
               onRowClick={(row) => navigate(`/admin/template-edit/${row.id}`)}
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
         <Modal open={openEditTemplate} onClose={toggleEditTemplate} closeAfterTransition>
            <>
               <AdminTemplateEditScreen templateId={selectedTemplateId} closeModal={toggleEditTemplate} />
            </>
         </Modal>

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
                  Delete Template
               </Typography>
               <Typography
                  sx={{
                     mt: 2,
                     textAlign: "center",
                     color: "white",
                  }}>
                  Are sure you want to delete {rowSelected?.name} ?
               </Typography>
               <Button
                  onClick={() => {
                     deleteHandler(rowSelected?._id);
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
      </Box>
   );
};

export default AdminTemplateListScreen;
