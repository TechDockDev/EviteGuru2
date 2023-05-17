import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, Modal } from "@mui/material";
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
    console.log(templateId);
    setSelectedTemplateId(templateId);
    setOpenEditTemplate(!openEditTemplate);
  };

  /// Delete handler for template delete
  const deleteHandler = async (templateId) => {
    try {
      if (window.confirm("Are you sure you want to delete this template?")) {
        const res = await axios.delete(`/admin/template/${templateId}`);
        console.log("deleted");
      }
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
              window.open(
                `http://localhost:8085/images/getImage?path=${params?.row?.previewImage}`,
                "_blank"
              );
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
              }}
            >
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },

    {
      headerName: "Delete",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                deleteHandler(params?.row?._id);
              }}
              sx={{
                color: "#FFFFFF",
                backgroundColor: "#795DA8",
                borderRadius: "50%",
              }}
            >
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
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        {/* title */}
        <Typography
          variant="h4"
          align="center"
          fontWeight="800"
          mb={2}
          sx={{
            color: "#795da8",
            width: "100%",
          }}
        >
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
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
          }}
        />
      </Box>
      <Modal
        open={openEditTemplate}
        onClose={toggleEditTemplate}
        closeAfterTransition
      >
        <AdminTemplateEditScreen
          templateId={selectedTemplateId}
          closeModal={toggleEditTemplate}
        />
      </Modal>
    </>
  );
};

export default AdminTemplateListScreen;
