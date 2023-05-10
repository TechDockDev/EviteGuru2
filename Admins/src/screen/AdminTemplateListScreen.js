import * as React from "react";
import TemplatePreview from "./TemplatePreview/TemplatePreview";
// import TemplateEdit from "./TemplatePreview/TemplateEdit";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Stack,
  Modal,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  Link as RouterLink,
  redirect,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ATemplateList,
  ATemplateDelete,
  ATemplateEdits,
} from "../redux/action/adminAction";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AdminTemplateEditScreen from "./AdminTemplateEditScreen";
import { url } from "../url";

// ======================

const AdminTemplateListScreen = () => {
  const dispatch = useDispatch();
  const adminTemplateList = useSelector((state) => state.adminTemplateList);
  const [total, setTotal] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 6,
    page: 0,
  });
  const [template, setTemplate] = useState([]);
  const [rowCountState, setRowCountState] = useState();
  const [ATemplateDeletes, setATemplateDeletes] = useState("");
  const [openTemplatePreviewModal, setOpenTemplatePreviewModal] =
    useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [openAddUserModal, setOpenAddUserModal] = useState(false);

  const [singleTemplateId, setSingleTemplateId] = useState("");
  const [loading, setLoading] = useState(false);

  const getTemplateData = async (page, res) => {
    try {
      setLoading(true);
      const res = await axios.get(`/template`);
      console.log(res.data);
      setTemplate([...res.data.template]);
      setTotal(res.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // =================
  const toggleTemplatePreviewModal = (e, templateId) => {
    if (!openTemplatePreviewModal) {
      setSingleTemplateId(templateId);
      setOpenTemplatePreviewModal(!openTemplatePreviewModal);
    } else {
      setSingleTemplateId("");
      setOpenTemplatePreviewModal(!openTemplatePreviewModal);
    }
  };
  // =================
  // console.log(template);
  console.log("paginationModel->", paginationModel.page);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let resEdit = template.find((item) => {
    return item._id == singleTemplateId;
  });

  const toggleAddUserModal = (rowTemplateId) => {
    if (openAddUserModal) {
      setSingleTemplateId("");
      setOpenAddUserModal(!openAddUserModal);
    } else {
      setSingleTemplateId(rowTemplateId);
      setOpenAddUserModal(!openAddUserModal);
    }
  };
  const editTemplate = (e, singleTemplateId) => {
    toggleAddUserModal(singleTemplateId);
  };

  /// Delete handler for template delete
  const deleteHandler = (e, templateId) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      dispatch(ATemplateDelete(templateId));
      getTemplateData(paginationModel.page + 1);
      window.alert("template Deleted");
    }
  };

  //=======

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 250,
    },
    {
      field: "description",
      headerName: "description",
      headerName: "Description",
      width: 250,
    },
    {
      field: "sampleimage",
      headerName: "Image",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Box
              component="img"
              src={`${url}/images/getImage?path=${params?.row?.previewImage}`}
              alt=""
              sx={{ width: "50px", maxHeight: "50px" }}
            />
          </>
        );
      },
    },

    {
      field: "view",
      headerName: "View",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              onClick={(e) => {
                toggleTemplatePreviewModal(e, params?.row?._id);
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
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              onClick={(e) => {
                editTemplate(e, params?.row?._id);
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
                deleteHandler(e, params?.row?._id);
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
    getTemplateData(paginationModel.page + 1);
    setRowCountState((prevRowCountState) =>
      total !== undefined ? total : prevRowCountState
    );
  }, [total]);

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
          rows={template}
          //  rowCount={rowCountState}
          rowCount={total}
          autoHeight={true}
          pageSizeOptions={[6]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          getRowId={(row) => row?._id}
          loading={loading}
          //  GridToolbar={GridToolbar}
        />
      </Box>
      <TemplatePreview
        toggleTemplatePreviewModal={toggleTemplatePreviewModal}
        singleTemplateId={singleTemplateId}
        openTemplatePreviewModal={openTemplatePreviewModal}
      />

      <Modal
        open={openAddUserModal}
        // open={true}
        onClose={toggleAddUserModal}
        closeAfterTransition
        // sx={{ bgcolor: "transparent", overflow: "scroll" }}
      >
        <>
          <AdminTemplateEditScreen template={resEdit} />
        </>
      </Modal>
    </>
  );
};

export default AdminTemplateListScreen;
