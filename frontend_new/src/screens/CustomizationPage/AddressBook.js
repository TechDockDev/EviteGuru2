import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../redux/action/defaultActions";
import axios from "axios";
import { useState } from "react";
import { Constants } from "../../redux/constants/action-types";
import { openSnackbar } from "../../redux/action/userActions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateContact from "./CreateContact";
import DeleteModal from "../../components/deleteModal";
import { LoadingButton } from "@mui/lab";

const AddressBook = () => {
  const { pageTitle } = useSelector((state) => state);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [insideButtonLoading, setInsideButtonLoading] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [addressBookId, setAddressBookId] = useState(null);
  const [singleContactDetails, setSingleContactDetails] = useState(null);
  const [openEditContact, setOpenEditContact] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [guestId, setGuestId] = useState(null);
  const [loading, setloading] = useState(true);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const dispatch = useDispatch();
  const toggleAddUserModal = () => {
    setOpenAddUserModal(!openAddUserModal);
  };
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  const handleOpenEditContactModal = (contactDetails) => {
    setSingleContactDetails(contactDetails);
    toggleEditContactModal();
  };

  const toggleEditContactModal = () => setOpenEditContact(!openEditContact);
  function CustomeToolBar() {
    return (
      <Grid container>
        <Grid xs={12} item  >
          <Stack direction={"row"} spacing={1} alignItems={"end"} justifyContent={"end"}>
            {insideButtonLoading ? (
              <LoadingButton
                loading
                variant="outlined"
                // color="primary"
                size="small"
                sx={{
                  "& .MuiLoadingButton-loadingIndicator": {
                    color: "rgba(121, 93, 168, 1)",
                    borderColor: "rgba(121, 93, 168, 1)",
                  },
                }}
              >
                Delete Many
              </LoadingButton>
            ) : (
              <Button
                variant="contained"
                size="small"
                sx={{ color: "white" }}
                disabled={rowSelectionModel.length >= 1 ? false : true}
                onClick={() => deleteMany()}
              >
                Delete Many
              </Button>
            )}
            <Button
              size="small"
              sx={{ color: "white" }}
              variant="contained"
              onClick={toggleAddUserModal}
            >
              Add
            </Button>
          </Stack>
        </Grid>
        <Grid
          item
          md={5}
          sm={12}
          xs={12}
          sx={{ alignItems: "center", display: "flex" }}
        >
          <GridToolbar
            csvOptions={{
              fileName: "Contact-List",
              // delimiter: ";",
              // utf8WithBom: true,
            }}
            printOptions={{
              hideFooter: true,
              hideToolbar: true,
            }}
          />
        </Grid>
        
        <Grid
          item
          md={7}
          sm={12}
          xs={12}
          sx={{ alignItems: "center", display: "flex" }}
        >
          {/* <Stack
            width={"100%"}
            direction={"row"}
            justifyContent={"space-between"}
            alignContent={"center"}
            alignItems={"center"}
          > */}
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

          {/* </Stack> */}
        </Grid>
      </Grid>
    );
  }
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
      field: "phone",
      headerName: "Phone Number",
      // type: "number",
      width: 150,
    },
    {
      field: "email",
      headerName: "email",
      width: 250,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      align: "center",
      renderCell: (params) => {
        return (
          <Stack direction={"row"}>
            <Button
              color="inherit"
              variant="outlined"
              disabled={rowSelectionModel.length > 0 ? true : false}
              size="small"
              sx={{ mr: 1 }}
              onClick={() => handleOpenEditContactModal(params?.row)}
            >
              {/* <DeleteForeverIcon /> */}
              edit
            </Button>
            <Button
              variant="outlined"
              disabled={rowSelectionModel.length > 0 ? true : false}
              color="inherit"
              size="small"
              sx={{ ml: 1 }}
              onClick={() => handleRemove(params?.row?._id)}
            >
              {/* <DeleteForeverIcon /> */}
              delete
            </Button>
          </Stack>
        );
      },
    },
  ];

  // =====handleRemove contacts ==========
  const handleRemove = (id) => {
    console.log("removed=>", id);
    setGuestId(id);
    toggleDeleteModal();
  };
  const handleConfirmDelete = async () => {
    setloading(true);
    try {
      const res = await axios.patch(
        `${Constants.URL}/guest/remove-guests-from-addressBook`,
        { guestIds: [guestId] }
      );
      if (res.status === 200) {
        console.log("guestDeleted=>", res);
        getContactList();
        setloading(true);
      }
    } catch (error) {
      console.log("error=>", error);
      setloading(true);
    }
  };

  const deleteMany = async () => {
    setInsideButtonLoading(true);
    try {
      const res = await axios.patch(
        `${Constants.URL}/guest/remove-guests-from-addressBook`,
        { guestIds: [...rowSelectionModel] }
      );
      if (res.status === 200) {
        console.log("guestDeleted=>", res);
        setInsideButtonLoading(false);
        getContactList();
      }
    } catch (error) {
      console.log("error=>", error);
      setInsideButtonLoading(false);
    }
  };
  // ===extract all contact list to a single list ===
  const extractAllcontacts = (guestLists) => {
    guestLists.forEach((list) => {
      setAllContacts([...allContacts, ...list]);
    });
  };
  // console.log("contact list=>", allContacts);
  // =====end of function ===========================
  // ==== get contact list ====
  const getContactList = async () => {
    try {
      const res = await axios.get(`${Constants.URL}/guest/user/`);
      if (res.status === 200) {
        // console.log("response=>", res?.data?.guestList);
        // extractAllcontacts(res?.data?.guestList);
        setAllContacts(res?.data?.guestList);
        setloading(false);
      }
    } catch (error) {
      console.log("error=>", error);
      dispatch(openSnackbar("error , something went wrong", "error"));
    }
  };
  // ====end of contact list===
  const getAddressBook = async () => {
    setloading(true);
    try {
      const res = await axios.get(`${Constants.URL}/guest/getAddressBook`);
      if (res.status === 200) {
        console.log("getAddressBook=>", res.data.guestList._id);
        setAddressBookId(res?.data?.guestList?._id);
        // setAllContacts(res?.data?.guestList?.guests);
        getContactList();
        setloading(false);
      }
    } catch (error) {
      if (error.response.status === 404) {
        createAddressBook();
      } else {
        setloading(false);
        console.log("error=>", error);
      }
    }
  };
  // console.log("addressBookId=>", addressBookId);
  const createAddressBook = async () => {
    setloading(true);
    try {
      const res = await axios.post(`${Constants.URL}/guest/createaddressbook`);
      if (res.status === 200) {
        console.log("createBook=>", res);
        setloading(false);
      }
    } catch (error) {
      console.log("error=>", error);
      setloading(false);
    }
  };
  // useEffect
  useEffect(() => {
    // getContactList();
    getAddressBook();
    dispatch(setPageTitle("Address Book"));
    return () => {
      dispatch(setPageTitle(""));
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          // border: "2px solid red",
          height: "100%",
          width: {
            xl: "calc(100vw - 250px)",
            lg: "calc(100vw - 270px)",
            md: "calc(100vw - 270px)",
            sm: "100vw",
            xs: "100vw",
          },
          maxWidth: "1150px",
          padding: "0 20px 20px 20px",
          boxSizing: "border-box",
        }}
      >
        {/* title */}
        <Box
          sx={{
            m: 1,
            mt: 4,
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: "25px", fontWeight: "800" }}
            textAlign={"center"}
          >
            All Contacts
          </Typography>
        </Box>
        {/* title */}
        {loading ? (
          <Stack alignItems={"center"} justifyContent={"center"} mt={2}>
            <CircularProgress
              color="primary"
              sx={{
                bgcolor: "transparent !important",
                "& svg": {
                  bgcolor: "transparent !important",
                },
              }}
            />
          </Stack>
        ) : (
          <>
            <Stack mt={2}>
              <DataGrid
                // components={{ Toolbar: CustomeToolBar }}
                slots={{ toolbar: CustomeToolBar }}
                //   slots={{ toolbar: QuickSearchToolbar }}
                rows={allContacts}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 8,
                    },
                  },
                }}
                rowSelection={insideButtonLoading ? false : true}
                getRowId={(row) => row._id}
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
                  bgcolor: "none",
                  border: "none",
                  px: 2,
                  "& .odd": { bgcolor: "#F7F7F7 !important" },
                  "& .MuiCheckbox-root": {
                    color: "black",
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    fontWeight: "800",
                  },
                }}
              />
            </Stack>
          </>
        )}
        <Modal
          open={openAddUserModal}
          closeAfterTransition
          sx={{ bgcolor: "transparent", backdropFilter: "blur(2px)" }}
        >
          <>
            <CreateContact
              toggleAddUserModal={toggleAddUserModal}
              // getGuestListDetails={getGuestListDetails}
              guestId={addressBookId}
              getAddressBook={getAddressBook}
              getContactList={getContactList}
            />
          </>
        </Modal>
        {/* modal to edit contact  */}
        <Modal
          open={openEditContact}
          closeAfterTransition
          sx={{ bgcolor: "transparent", backdropFilter: "blur(2px)" }}
        >
          <>
            <CreateContact
              toggleAddUserModal={toggleEditContactModal}
              modalType={"edit"}
              contactDetails={singleContactDetails}
              guestId={addressBookId}
              getAddressBook={getAddressBook}
              getContactList={getContactList}
              // getGuestListDetails={getGuestListDetails}
            />
          </>
        </Modal>
        <DeleteModal
          open={openDeleteModal}
          toggleModal={toggleDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
        />
        {/* ============  👆 Guests list table👆============= */}
      </Box>
    </>
  );
};

export default AddressBook;
