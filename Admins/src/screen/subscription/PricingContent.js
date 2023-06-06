import * as React from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditPricingContent from "./EditPricingContent";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal, Paper, Stack } from "@mui/material";
import { DataContext } from "../../AppContext";

function PricingContent() {
   const [deleteModal, setDeleteModal] = useState(false);
   const [planList, setPlanList] = useState([]);

   const [singlePlan, setSinglePlan] = useState({});

   const [loading, setLoading] = useState(false);
   const { snackbar } = React.useContext(DataContext);
   // ===
   const toggleDeleteModal = (plan) => {
      if (deleteModal) {
         setSinglePlan("");
         setDeleteModal(!deleteModal);
      } else {
         setSinglePlan(plan);
         setDeleteModal(!deleteModal);
      }
   };

   // ===
   const getplanlist = async (res) => {
      try {
         setLoading(true);
         const res = await axios.get("/plan/all");
         setPlanList(res?.data?.plans);
         setLoading(false);
      } catch (error) {
         snackbar("error", error.message);
      }
   };

   // ===

   let deletePlan = async (planId) => {
      try {
         setLoading(true);
         const res = await axios.delete(`/plan/${planId}`);
         snackbar(res.data.status, res.data.message);
         setLoading(false);
         getplanlist();
      } catch (error) {
         snackbar("error", error.message);
      }
   };

   useEffect(() => {
      getplanlist();
   }, []);

   return (
      <React.Fragment>
         <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }} />
         {/* <CssBaseline /> */}
         <Box padding={"0px 0px 20px 0px"}>
            <Toolbar sx={{ flexWrap: "wrap" }}>
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
                  Subscription
               </Typography>
               <Box width={"100%"} textAlign={"right"}>
                  <Button component={NavLink} to="/admins/create-plan" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                     Add Plans
                  </Button>
               </Box>
            </Toolbar>

            <Container disableGutters maxWidth="sm" component="main"></Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
               <Grid container spacing={5} alignItems="flex-end">
                  {planList.length !== 0 ? (
                     planList?.map((plan, index) => {
                        // Enterprise card is full width at sm breakpoint
                        return (
                           <Grid item key={index} xs={12} sm={plan.title === "Premium Plan" ? 12 : 6} md={4}>
                              <Card>
                                 <CardHeader
                                    title={plan.name}
                                    // subheader={plan.subheader}
                                    titleTypographyProps={{ align: "center" }}
                                    action={plan.title === "Pro" ? <StarIcon /> : null}
                                    subheaderTypographyProps={{
                                       align: "center",
                                    }}
                                    sx={{
                                       "& .MuiTypography-root": {
                                          fontWeight: "600",
                                       },
                                       backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[700]),
                                    }}
                                 />
                                 <CardContent>
                                    {plan.name !== "Enterprise" && <Box>
                                       <Box
                                          sx={{
                                             display: "flex",
                                             justifyContent: "center",
                                             alignItems: "baseline",
                                             mb: 2,
                                          }}>
                                          <Typography component="h2" variant="h4" color="text.primary">
                                             ${plan?.price?.monthly}
                                          </Typography>
                                          <Typography variant="h6" color="text.secondary">
                                             /month
                                          </Typography>
                                       </Box>
                                       <Box
                                          sx={{
                                             display: "flex",
                                             justifyContent: "center",
                                             alignItems: "baseline",
                                             mb: 2,
                                          }}>
                                          <Typography component="h2" variant="h4" color="text.primary">
                                             ${plan?.price?.yearly}
                                          </Typography>
                                          <Typography variant="h6" color="text.secondary">
                                             /year
                                          </Typography>
                                       </Box>
                                    </Box>}
                                    <ul>
                                       {plan?.description?.map((line, index) => (
                                          <Typography component="li" variant="subtitle1" align="center" key={index}>
                                             {line}
                                          </Typography>
                                       ))}
                                    </ul>
                                 </CardContent>
                                 {/* ===== update button==== */}
                                 <CardActions>
                                    <Button fullWidth variant={"contained"} sx={{ color: "white" }} component={NavLink} to={`/admin/plans/${plan?._id}`}>
                                       Edit
                                    </Button>
                                 </CardActions>
                                 {/* ===== Delete button==== */}
                                 <CardActions>
                                    <Button fullWidth variant={"contained"} sx={{ color: "white" }} id={plan?._id} onClick={() => toggleDeleteModal(plan)}>
                                       Delete
                                    </Button>
                                 </CardActions>
                              </Card>
                           </Grid>
                        );
                     })
                  ) : (
                     <Box
                        sx={{
                           height: "40vh",
                           width: "100%",
                           display: "flex",
                           justifyContent: "center",
                           alignItems: "center",
                        }}>
                        <Typography variant="h6" color={"black"}>
                           No Plans to display
                        </Typography>
                     </Box>
                  )}
               </Grid>
            </Container>
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
                  Delete Plan
               </Typography>
               <Typography
                  sx={{
                     mt: 2,
                     textAlign: "center",
                     color: "white",
                  }}>
                  Are sure you want to delete {singlePlan.name} ?
               </Typography>
               <Button
                  onClick={() => {
                     deletePlan(singlePlan._id);
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
      </React.Fragment>
   );
}

export default function Pricing() {
   return <PricingContent />;
}
