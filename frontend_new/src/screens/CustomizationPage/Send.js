import {
  Box,
  Button,
  Stack,
  Modal,
  Menu,
  MenuItem,
  Grid,
  Pagination,
} from "@mui/material";
import React, { useState } from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import AddGuests from "./AddGuests";
import BulkUpload from "./BulkUpload";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import {
  setCreatedListId,
  setCretedListDetails,
} from "../../redux/action/userActions";

const Send = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openBulkModal, setOpenBulkModal] = useState(false);
  // created eventdetails =========
  const { createdEventDetails } = useSelector((state) => state);
  const toggleBulkModal = () => {
    setOpenBulkModal(!openBulkModal);
  };
  // =======================================
  const dispatch = useDispatch();
  // =======================================
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleAddUserModal = () => {
    setOpenAddUserModal(!openAddUserModal);
  };

  // ==========handle send ===============
  const handleSend = () => {
    try {
    } catch (error) {}
  };

  // =====handle send all =====
  const handleSendAll = () => {
    console.log("all data");
    console.log("all data =>", rowSelectionModel);
  };

  // ========== customized toolbar ============
  function CustomeToolBar() {
    return (
      <Grid container>
        <Grid
          item
          md={5}
          sm={12}
          xs={12}
          sx={{ alignItems: "center", display: "flex" }}
        >
          <GridToolbar />
        </Grid>
        <Grid
          item
          md={7}
          sm={12}
          xs={12}
          sx={{ alignItems: "center", display: "flex" }}
        >
          <Stack width={"100%"}>
            <GridToolbarQuickFilter
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "rgba(158, 158, 158, 1)",
                  borderRadius: "10px",
                  borderColor: "rgba(158, 158, 158, 1)",
                },
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    );
  }
  // ==========end of customized toolbar ======
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "email",
      headerName: "Email id",
      width: 200,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      type: "number",
      width: 150,
    },
    {
      field: "date",
      headerName: "Date",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Button variant="contained" onClick={() => handleSend()}>
              Send
            </Button>
            <Button variant="contained" disabled>
              Edit
            </Button>
          </Stack>
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      email: "xyz@gmail.com",
      firstName: "Jon",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "sent",
    },
    {
      id: 2,
      email: "qwerty@gmail.com",
      firstName: "Cersei",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "sent",
    },
    {
      id: 3,
      email: "pokl@gmail.com",
      firstName: "Jaime",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "pending",
    },
    {
      id: 4,
      email: "lmp@gmail.com",
      firstName: "Arya",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "pending",
    },
    {
      id: 5,
      email: "xyz@gmail.com",
      firstName: "Daenerys",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "sent",
    },
    {
      id: 6,
      email: "xyz@gmail.com",
      firstName: "Name Kuch Bhi",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "pending",
    },
    {
      id: 7,
      email: "xyz@gmail.com",
      firstName: "Ferrara",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "pending",
    },
    {
      id: 8,
      email: "xyz@gmail.com",
      firstName: "Rossini",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "sent",
    },
    {
      id: 9,
      email: "xyz@gmail.com",
      firstName: "Harvey",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "pending",
    },
  ];
  // =====create guest list =========
  const createGuestList = async () => {
    try {
      const res = await axios.post("/api/v1/user/guest/create", {
        eventId: createdEventDetails?._id,
      });
      if (res.status === 200) {
        console.log("response=>", res);
        dispatch(setCreatedListId(res.data.guestList?._id));
      }
    } catch (error) {
      console.log("error=>", error);
    }
  };
  // ===end of gues list cretaion====
  // ====useEffect =============
  useEffect(() => {
    createGuestList();
  }, []);

  // =====end of useEffect =====
  return (
    <>
      <Stack>
        <Box m={1} textAlign="left" marginLeft="auto">
          <Button
            variant="contained"
            color="primary"
            onClick={() => createGuestList()}
          >
            Create List
          </Button>
          <Button
            variant="contained"
            sx={{ color: "white" }}
            disabled={rowSelectionModel.length >= 1 ? false : true}
            onClick={() => handleSendAll()}
          >
            Send All
          </Button>
          &nbsp;
          <Button
            variant="contained"
            disableElevation={true}
            sx={{ color: "white" }}
            id="add-contact-button"
            aria-controls={open ? "add-contact-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            + Add Contact
          </Button>
          <Menu
            id="add-contact-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "add-contact-menu",
            }}
            sx={{ "& .MuiMenu-paper": { bgcolor: "white" } }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                toggleAddUserModal();
              }}
            >
              New contact
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                toggleBulkModal();
              }}
            >
              Bulk Upload
            </MenuItem>
            <MenuItem
            // onClick={() => {
            //   handleClose();
            //   toggleBulkModal();
            // }}
            >
              Address Book
            </MenuItem>
          </Menu>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: CustomeToolBar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          rowSelection={true}
          autoHeight={true}
          pageSizeOptions={[5]}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          disableRowSelectionOnClick
          getRowClassName={(params) =>
            params?.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          sx={{
            border: "none",
            "& .odd": { bgcolor: "#F7F7F7" },
            "& .MuiCheckbox-root": {
              color: "black",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
          }}
        />
        <Stack spacing={2} alignItems={"center"}>
          <Pagination
            count={10}
            siblingCount={1}
            variant="outlined"
            defaultPage={1}
            // type={"first"}
            shape="rounded"
            boundaryCount={0}

            // hideNextButton={true}
            // hidePrevButton={true}
            // page={1}
          />
        </Stack>
        <Modal
          open={openAddUserModal}
          // open={true}
          // onClose={toggleAddUserModal}
          // aria-labelledby="login-modal"
          // aria-describedby="login_modal"
          closeAfterTransition
          sx={{ bgcolor: "transparent", backdropFilter: "blur(2px)" }}
        >
          <>
            <AddGuests toggleAddUserModal={toggleAddUserModal} />
          </>
        </Modal>
        <Modal
          open={openBulkModal}
          // open={true}
          onClose={toggleBulkModal}
          // aria-labelledby="modal-bulkUpload"
          // aria-describedby="modal-modal-description"
          closeAfterTransition
          sx={{ bgcolor: "transparent", backdropFilter: "blur(2px)" }}
        >
          <>
            <BulkUpload toggleBulkModal={toggleBulkModal} />
          </>
        </Modal>
      </Stack>
    </>
  );
};

export default Send;
