import {
  Box,
  Button,
  Stack,
  Modal,
  Menu,
  MenuItem,
  Grid,
  Pagination,
  Typography,
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
  resetCreatedEventDetail,
  setCreatedEventDetail,
  setCreatedListId,
} from "../../redux/action/userActions";
import { useParams } from "react-router-dom";
import {
  resetEventDetails,
  setPageTitle,
} from "../../redux/action/defaultActions";

const Send = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openBulkModal, setOpenBulkModal] = useState(false);
  const [guestList, setguestList] = useState([]);
  const [listStatus, setListStatus] = useState(false);
  // created eventdetails =========
  const { createdEventDetails } = useSelector((state) => state);
  const toggleBulkModal = () => {
    setOpenBulkModal(!openBulkModal);
  };
  // =======================================
  const { id } = useParams();
  console.log("id=>", id);
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
      field: "_id",
      headerName: "ID",
      width: 90,
      renderCell: (index) =>
        index?.api?.getRowIndexRelativeToVisibleRows(index?.row?._id) + 1,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email id",
      width: 200,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      // type: "number",
      width: 150,
    },
    {
      field: "membersAllowed",
      headerName: "Allowed Members",
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
  // ==get single event details =======
  const getSingleEventDetails = async () => {
    try {
      const res = await axios.get(`/api/v1/user/event/${id}`);
      if (res.status === 200) {
        console.log("response=>", res);
        dispatch(setCreatedEventDetail(res?.data?.event));
        dispatch(setPageTitle(`${res?.data?.event?.name}`));
        await createGuestList();
      }
    } catch (error) {
      console.log("error=>", error);
    }
  };
  // ==end of single event details ====
  // =====create guest list =========
  const createGuestList = async () => {
    try {
      const res = await axios.post("/api/v1/user/guest/create", {
        eventId: id,
      });
      if (res.status === 200) {
        console.log("response=>", res);
        setListStatus(true);
        await getGuestListDetails(res.data.guestList?._id);
        dispatch(setCreatedListId(res.data.guestList?._id));
      }
    } catch (error) {
      console.log("error=>", error);
    }
  };
  // ===end of gues list cretaion====
  // =function to fetch geustList==
  const getGuestListDetails = async (guestListId) => {
    try {
      const res = await axios.get(`/api/v1/user/guest/single/${guestListId}`);
      if (res.status === 200) {
        console.log("response=>", res);
        setguestList(res?.data?.guestList?.guests);
      }
    } catch (error) {
      console.log("error=>", error);
    }
  };
  // ===end of function ===========
  // ====useEffect =============
  useEffect(() => {
    if (id) {
      getSingleEventDetails();
    }
    if (createdEventDetails?.guestListId) {
      getGuestListDetails(createdEventDetails?.guestListId);
    }
    return () => {
      dispatch(resetCreatedEventDetail({}));
    };
  }, []);

  // =====end of useEffect =====
  return (
    <>
      <Stack width={"100%"} p={1}>
        <Stack>
          <Typography variant="h5" fontWeight={"800"} textAlign={"center"}>
            Add Invitees , Send Inivitation
          </Typography>
        </Stack>
        <Box m={1} textAlign="left" marginLeft="auto">
          {listStatus ? (
            ""
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => createGuestList()}
            >
              Create List
            </Button>
          )}
          &nbsp; &nbsp;
          <Button
            variant="contained"
            sx={{ color: "white" }}
            disabled={rowSelectionModel.length >= 1 ? false : true}
            onClick={() => handleSendAll()}
          >
            Send All
          </Button>
          &nbsp; &nbsp;
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
          rows={guestList}
          columns={columns}
          components={{ Toolbar: CustomeToolBar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          getRowId={(row) => row._id}
          rowSelection={true}
          autoHeight={true}
          pageSizeOptions={[5]}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          // rowSelectionModel={rowSelectionModel}
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
          />
        </Stack>
        <Modal
          open={openAddUserModal}
          closeAfterTransition
          sx={{ bgcolor: "transparent", backdropFilter: "blur(2px)" }}
        >
          <>
            <AddGuests
              toggleAddUserModal={toggleAddUserModal}
              getGuestListDetails={getGuestListDetails}
            />
          </>
        </Modal>
        <Modal
          open={openBulkModal}
          // open={true}
          onClose={toggleBulkModal}
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
