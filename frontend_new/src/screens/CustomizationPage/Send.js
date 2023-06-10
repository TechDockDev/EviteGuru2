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
  CircularProgress,
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
  openSnackbar,
  resetCreatedEventDetail,
  setCreatedEventDetail,
  setCreatedListId,
} from "../../redux/action/userActions";
import { useParams } from "react-router-dom";
import {
  resetEventDetails,
  setPageTitle,
} from "../../redux/action/defaultActions";
import { LoadingButton } from "@mui/lab";
import ImportContacts from "./ImportContacts";
import { Constants } from "../../redux/constants/action-types";
import { GrDocumentText } from "react-icons/gr";

const Send = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openBulkModal, setOpenBulkModal] = useState(false);
  const [guestList, setguestList] = useState([]);
  const [listStatus, setListStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [importModal, setImportModal] = useState(false);
  const [left, setLeft] = useState({ events: 0, invitees: 0 });
  const [insideButton, setinsideButton] = useState({
    loading: false,
    id: "",
    sendMany: false,
  });
  // ===togle import Modal ========
  const toggleImportModal = () => {
    setImportModal(!importModal);
  };
  // ==endof import modal =========
  // created eventdetails =========
  const { createdEventDetails, userDetail } = useSelector((state) => state);
  console.log("userDetail", userDetail);
  const toggleBulkModal = () => {
    setOpenBulkModal(!openBulkModal);
  };
  // =======================================
  const { id } = useParams();

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
  const handleSend = async (guestId) => {
    if (userDetail?.subscription) {
      setinsideButton({ ...insideButton, loading: true, id: guestId });
      try {
        const res = await axios.post(`${Constants.URL}/guest/send-invite`, {
          guestIds: [guestId],
          eventId: id,
        });
        if (res.status === 200) {
          dispatch(openSnackbar(res.data.message, "success"));
          setinsideButton({ ...insideButton, loading: false, id: "" });
          getGuestListDetails(createdEventDetails?.guestListId);
        }
      } catch (error) {
        // console.log("error=>",error)
        dispatch(openSnackbar("something went wrong", "error"));
        setinsideButton({ ...insideButton, loading: false, id: "" });
      }
    } else {
      dispatch(
        openSnackbar(
          "This required subscription , you don't have any active plan! please subscribe to get this feature.",
          "warning"
        )
      );
    }
  };

  // =====handle send all =====
  const handleSendAll = async () => {
    if (userDetail?.subscription) {
      setinsideButton({
        ...insideButton,
        sendMany: true,
      });
      try {
        const res = await axios.post(`${Constants.URL}/guest/send-invite`, {
          guestIds: [...rowSelectionModel],
          eventId: id,
        });
        if (res.status === 200) {
          setRowSelectionModel([]);
          dispatch(openSnackbar(res.data.message, "success"));
          setinsideButton({
            ...insideButton,
            sendMany: false,
          });
          getGuestListDetails(createdEventDetails?.guestListId);
        }
      } catch (error) {
        dispatch(openSnackbar("something went wrong", "success"));
        setinsideButton({
          ...insideButton,
          sendMany: false,
        });
      }
    } else {
      dispatch(
        openSnackbar(
          "This required subscription , you don't have any active plan! please subscribe to get this feature.",
          "warning"
        )
      );
    }
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
          <Stack
            width={"100%"}
            direction={"row"}
            justifyContent={"space-between"}
          >
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
            <Button
              variant="text"
              size="small"
              startIcon={
                <Typography
                  sx={{
                    fontSize: { xs: "5px", sm: "11px", md: "12px", lg: "13px" },
                    display: {
                      xs: "none",
                      sm: "block",
                      md: "block",
                      lg: "block",
                    },
                  }}
                >
                  <GrDocumentText />
                </Typography>
              }
              endIcon={
                <Typography
                  // component={"span"}
                  variant="caption"
                  sx={
                    {
                      // fontSize: { sm: "14px", xs: "10px", md: "14px" },
                    }
                  }
                >
                  {left?.invitees}
                </Typography>
              }
              sx={{
                color: "rgba(119, 119, 119, 1)",
                "& .css-jcxoq4-MuiButton-endIcon": {
                  color: "rgba(121, 93, 168, 1)",
                  // fontSize: "15px",
                  fontWeight: "800",
                },
                fontSize: { sm: "12px", xs: "10px", md: "13px", lg: "14px" },
                cursor: "text",
              }}
            >
              Invitees Left
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  }
  // ==========end of customized toolbar ======
  const columns = [
    {
      field: "_id",
      headerName: "Sr. No.",
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
          <>
            {params?.row?.status !== "Not Invited" ? (
              <Button
                variant="outlined"
                color="success"
                sx={{ borderRadius: "15px", px: 1 }}
              >
                Invitation Sent
              </Button>
            ) : (
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                {insideButton.loading && insideButton.id === params.row._id ? (
                  <LoadingButton
                    loading
                    variant="outlined"
                    // color="primary"
                    sx={{
                      "& .MuiLoadingButton-loadingIndicator": {
                        color: "rgba(121, 93, 168, 1)",
                        borderColor: "rgba(121, 93, 168, 1)",
                      },
                    }}
                  >
                    Send
                  </LoadingButton>
                ) : (
                  <Button
                    variant="contained"
                    disabled={insideButton?.sendMany ? true : false}
                    onClick={() => handleSend(params.row._id)}
                    sx={{ color: "white" }}
                  >
                    Send
                  </Button>
                )}

                {/* <Button variant="contained" disabled>
                  Edit
                </Button> */}
              </Stack>
            )}
          </>
        );
      },
    },
  ];
  // ==get single event details =======
  const getSingleEventDetails = async () => {
    try {
      const res = await axios.get(`/api/v1/user/event/${id}`);
      if (res.status === 200) {
        dispatch(setCreatedEventDetail(res?.data?.event));
        dispatch(setPageTitle(`${res?.data?.event?.name}`));

        await createGuestList();
      }
    } catch (error) {
      // console.log("error=>", error);
      dispatch(openSnackbar("something went wrong", "error"));
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
        setListStatus(true);
        // dispatch(openSnackbar(res.data.message, "success"));
        await getGuestListDetails(res.data.guestList?._id);
        dispatch(setCreatedListId(res.data.guestList?._id));
      }
    } catch (error) {
      // console.log("error=>", error);
      setListStatus(false);
      dispatch(openSnackbar("something went wrong", "error"));
    }
  };
  // ===end of gues list cretaion====
  // =function to fetch geustList==
  const getGuestListDetails = async (guestListId) => {
    try {
      const res = await axios.get(`/api/v1/user/guest/single/${guestListId}`);
      if (res.status === 200) {
        setguestList(res?.data?.guestList?.guests);
        setLoading(false);
      }
    } catch (error) {
      // console.log("error=>", error);
      dispatch(openSnackbar("something went wrong", "error"));
    }
  };
  // ===end of function ===========
  // =====get number of invitess =====
  const noOfInvitees = async () => {
    try {
      const res = await axios.get(`${Constants.URL}/guest/left-invitee`);
      if (res.status === 200) {
        console.log("invitees=>", res);
        setLeft({ ...left, invitees: res?.data?.remainingInvitees });
      }
    } catch (error) {
      setLoading(false);
    }
  };
  // ====endof func ================
  // ====useEffect =============
  useEffect(() => {
    if (id) {
      getSingleEventDetails();
      createGuestList();
      noOfInvitees();
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
            Invitees
          </Typography>
        </Stack>
        <Box m={1} textAlign="left" marginLeft="auto">
          {listStatus ? (
            ""
          ) : (
            <Button
              variant="contained"
              color="primary"
              sx={{ color: "white" }}
              onClick={() => createGuestList()}
            >
              Create List
            </Button>
          )}
          &nbsp; &nbsp;
          {insideButton?.sendMany ? (
            <LoadingButton
              loading
              variant="outlined"
              // color="primary"
              sx={{
                "& .MuiLoadingButton-loadingIndicator": {
                  color: "rgba(121, 93, 168, 1)",
                  borderColor: "rgba(121, 93, 168, 1)",
                },
              }}
            >
              Send All
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              sx={{ color: "white" }}
              disabled={rowSelectionModel.length >= 1 ? false : true}
              onClick={() => handleSendAll()}
            >
              Send Many
            </Button>
          )}
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
              onClick={() => {
                handleClose();
                toggleImportModal();
              }}
            >
              Address Book
            </MenuItem>
          </Menu>
        </Box>
        {loading ? (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <CircularProgress
              color="primary"
              sx={{
                bgcolor: "transparent !important",
                "& svg": {
                  bgcolor: "transparent !important",
                },
              }}
            />{" "}
          </Grid>
        ) : (
          ""
        )}
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
          isRowSelectable={(params) => params.row.status === "Not Invited"}
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
        {/* <Stack spacing={2} alignItems={"center"}>
          <Pagination
            count={10}
            siblingCount={1}
            variant="outlined"
            defaultPage={1}
            // type={"first"}
            shape="rounded"
            boundaryCount={0}
          />
        </Stack> */}
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
            <BulkUpload
              toggleBulkModal={toggleBulkModal}
              getGuestListDetails={getGuestListDetails}
              setLoading={setLoading}
            />
          </>
        </Modal>
        <Modal
          open={importModal}
          // onClose={toggleImportModal}
          closeAfterTransition
          sx={{ bgcolor: "transparent", backdropFilter: "blur(2px)" }}
        >
          <ImportContacts
            toggleImportModal={toggleImportModal}
            getGuestListDetails={getGuestListDetails}
          />
        </Modal>
      </Stack>
    </>
  );
};

export default Send;
