import { Box, Button, Stack, Modal, Menu, MenuItem, Grid } from "@mui/material";
import React, { useState } from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import AddGuests from "./AddGuests";
import BulkUpload from "./BulkUpload";
import { useSelector } from "react-redux";

const Send = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openBulkModal, setOpenBulkModal] = useState(false);

  const toggleBulkModal = () => {
    setOpenBulkModal(!openBulkModal);
  };

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
  const handleSend = () =>{
    try {
      
    } catch (error) {
      
    }
  }
  // =====================================
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
            <Button variant="contained" onClick={()=>handleSend()} >Send</Button>
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
      status: "pending",
    },
    {
      id: 2,
      email: "qwerty@gmail.com",
      firstName: "Cersei",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "attending",
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
      status: "not attending",
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
      status: "attending",
    },
    {
      id: 8,
      email: "xyz@gmail.com",
      firstName: "Rossini",
      phoneNumber: 9963258741,
      date: "03-05-2023",
      status: "pending",
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

  return (
    <>
      <Stack>
        <Box m={1} textAlign="left" marginLeft="auto">
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
          autoHeight={true}
          pageSizeOptions={[5]}
          checkboxSelection
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

// import { Box, Button, Stack, Modal, Menu, MenuItem } from "@mui/material";
// import React, { useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import AddGuests from "./AddGuests";
// import BulkUpload from "./BulkUpload";

// const Send = () => {
//    const [anchorEl, setAnchorEl] = useState(null);

//    const [openAddUserModal, setOpenAddUserModal] = useState(false);
//    const [openBulkModal, setOpenBulkModal] = useState(false);

//    const toggleBulkModal = () => {
//       setOpenBulkModal(!openBulkModal);
//    };

//    const open = Boolean(anchorEl);
//    const handleClick = (event) => {
//       setAnchorEl(event.currentTarget);
//    };
//    const handleClose = () => {
//       setAnchorEl(null);
//    };

//    const toggleAddUserModal = () => {
//       setOpenAddUserModal(!openAddUserModal);
//    };
//    const columns = [
//       { field: "id", headerName: "ID", width: 90 },
//       {
//          field: "firstName",
//          headerName: "First name",
//          width: 150,
//          editable: true,
//       },
//       {
//          field: "lastName",
//          headerName: "Last name",
//          width: 150,
//          editable: true,
//       },
//       {
//          field: "age",
//          headerName: "Age",
//          type: "number",
//          width: 110,
//          editable: true,
//       },
//       {
//          field: "fullName",
//          headerName: "Full name",
//          description: "This column has a value getter and is not sortable.",
//          sortable: false,
//          width: 160,
//          valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//       },
//    ];

//    const rows = [
//       { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//       { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//       { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//       { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//       { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//       { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//       { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//       { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//       { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
//    ];

//    return (
//       <>
//          <Stack>
//             <Box m={1} textAlign="left" marginLeft="auto">
//                <Button variant="contained" disableElevation={true} sx={{ color: "white" }} id="add-contact-button" aria-controls={open ? "add-contact-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
//                   + Add Contact
//                </Button>
//                <Menu
//                   id="add-contact-menu"
//                   anchorEl={anchorEl}
//                   open={open}
//                   onClose={handleClose}
//                   MenuListProps={{
//                      "aria-labelledby": "add-contact-menu",
//                   }}
//                   sx={{ "& .MuiMenu-paper": { bgcolor: "white" } }}>
//                   <MenuItem
//                      onClick={() => {
//                         handleClose();
//                         toggleAddUserModal();
//                      }}>
//                      New contact
//                   </MenuItem>
//                   <MenuItem
//                      onClick={() => {
//                         handleClose();
//                         toggleBulkModal();
//                      }}>
//                      Bulk Upload
//                   </MenuItem>
//                </Menu>
//             </Box>
//             <DataGrid
//                rows={rows}
//                columns={columns}
//                initialState={{
//                   pagination: {
//                      paginationModel: {
//                         pageSize: 8,
//                      },
//                   },
//                }}
//                autoHeight={true}
//                pageSizeOptions={[5]}
//                checkboxSelection
//                disableRowSelectionOnClick
//                getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
//                sx={{
//                   border: "none",
//                   "& .odd": { bgcolor: "#F7F7F7" },
//                   "& .MuiCheckbox-root": {
//                      color: "black",
//                   },
//                   "& .MuiDataGrid-columnHeaderTitle": {
//                      fontWeight: "bold",
//                   },
//                }}
//             />
//             <Modal
//                open={openAddUserModal}
//                // open={true}
//                // onClose={toggleAddUserModal}

//                closeAfterTransition
//                sx={{ bgcolor: "transparent", backdropFilter: "blur(2px)" }}>
//                   <>
//                <AddGuests toggleAddUserModal={toggleAddUserModal} />
//                   </>
//             </Modal>
//             <Modal
//                open={openBulkModal}
//                // open={true}
//                onClose={toggleBulkModal}
//                closeAfterTransition
//                sx={{ bgcolor: "transparent", backdropFilter: "blur(2px)" }}>
//                <>
//                   <BulkUpload toggleBulkModal={toggleBulkModal} />
//                </>
//             </Modal>
//          </Stack>
//       </>
//    );
// };

// export default Send;
