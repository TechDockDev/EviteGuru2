import React, { useContext, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import { Box, Button, IconButton, Modal, Paper, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../AppContext";

export default function CouponTable() {
   const [coupons, setCoupons] = useState([]);
   const navigate = useNavigate();
   const [deleteModal, setDeleteModal] = useState(false);
   const [singleCoupon, setSingleCoupon] = useState("");
   const { snackbar } = useContext(DataContext);
   // ===
   const toggleDeleteModal = (coupon) => {
      if (deleteModal) {
         setSingleCoupon("");
         setDeleteModal(!deleteModal);
      } else {
         setSingleCoupon(coupon);
         setDeleteModal(!deleteModal);
      }
   };
   // ===
   const getAllCoupon = async () => {
      try {
         const { data } = await axios.get("/coupon/all");
         setCoupons(data.coupons);
      } catch (error) {
         snackbar("error", error.message);
      }
   };
   // ===
   const deleteCoupon = async (id) => {
      try {
         const { data } = await axios.delete(`/coupon/${id}`);
         snackbar(data.status, data.message);
         getAllCoupon();
      } catch (error) {
         snackbar("error", error.message);
      }
   };

   // ===

   useEffect(() => {
      getAllCoupon();
   }, []);

   // ===

   const columns = [
      {
         field: "name",
         headerName: "Name",
         width: 200,
      },
      { field: "amount", headerName: "Amount", width: 130 },
      {
         field: "amountType",
         headerName: "Amount Type",
         type: "string",
         width: 130,
      },
      {
         field: "plans",
         headerName: "Plans",
         // type: "string",
         width: 300,
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
                    e.stopPropagation();
                   navigate(`/admin/edit-coupon/${params.row._id}`)
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
         width: 80,
         renderCell: (params) => {
            return (
               <>
                  <IconButton
                     onClick={(e) => {
                        e.stopPropagation();
                        toggleDeleteModal(params.row);
                     }}
                     sx={{
                        color: "#FFFFFF",
                        backgroundColor: "#795DA8",
                        borderRadius: "70%",
                     }}>
                     <DeleteIcon />
                  </IconButton>
               </>
            );
         },
      },
   ];
   // ===
   // ===

   function toolbar() {
      return (
         <Stack direction={"row"} justifyContent={"space-between"} m={2}>
            <Button disableElevation variant="contained" sx={{ color: "white" }} onClick={() => navigate("/admin/promotional-mail")}>
               Send Mails
            </Button>
            <Button disableElevation variant="contained" sx={{ color: "white" }} onClick={() => navigate("/admin/add-coupon")}>
               Add Coupon
            </Button>
         </Stack>
      );
   }

   return (
      <Box sx={{ width: "100%", boxSizing: "border-box", padding: "0px 20px" }}>
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
            Available Coupons
         </Typography>
         <DataGrid
            autoHeight={true}
            rows={coupons}
            getRowId={(row) => row._id}
            columns={columns}
            pageSize={1}
            disableRowSelectionOnClick={true}
            slots={{ toolbar }}
            // rowsPerPageOptions={[20]}
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
                  Are sure you want to delete {singleCoupon.name} ?
               </Typography>
               <Button
                  onClick={() => {
                     deleteCoupon(singleCoupon._id);
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
}
