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
import { Stack } from "@mui/material";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function extractValue(arr, prop) {
  // extract value from of object property in array
  let extractedValue = arr.map((item) => item[prop]);

  return extractedValue;
}

function PricingContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [planList, setPlanList] = useState([]);
  const [_id, set_Id] = useState(null);
  const [singlePlan, setsinglePlan] = useState({});

  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [plans, setplans] = useState([])
  // const adminList = useSelector((state) => state.adminList);
  // const { loading, error, subscription } = adminList;

  //data fetching from backend all template
  const getplanlist = async (res) => {
    try {
      setLoading(true);
      const res = await axios.get("/admin/plans/subscriptions");
      setPlanList(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // Delete template by id

  const deleteHandler = (_id) => {
    if (window.confirm("Are you sure you want to delete this Plan ?")) {
      deletesingleplanlist(_id);
      getplanlist();

      // window.location.reload(false);
    }
  };

  let deletesingleplanlist = async (singlePlan, res) => {
    try {
      setLoading(true);
      const res = await axios.delete(`/admin/plans/${singlePlan}`);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getplanlist();
  }, [planList.length]);

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      {/* <CssBaseline /> */}

      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography color="inherit" sx={{ flexGrow: 1 }}></Typography>

        <Button
          component={NavLink}
          to="/admins/create-plan"
          variant="outlined"
          sx={{ my: 1, mx: 1.5 }}
        >
          Add Plans
        </Button>
      </Toolbar>

      <Container disableGutters maxWidth="sm" component="main">
        <Typography
          component="h5"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Subscription
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {planList.length !== 0 ? (
            planList?.map((plan, index) => {
              // Enterprise card is full width at sm breakpoint
              return (
                <Grid
                  item
                  key={index}
                  xs={12}
                  sm={plan.title === "Premium Plan" ? 12 : 6}
                  md={4}
                >
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
                        backgroundColor: (theme) =>
                          theme.palette.mode === "light"
                            ? theme.palette.grey[200]
                            : theme.palette.grey[700],
                      }}
                    />
                    <CardContent>
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "baseline",
                            mb: 2,
                          }}
                        >
                          <Typography
                            component="h2"
                            variant="h4"
                            color="text.primary"
                          >
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
                          }}
                        >
                          <Typography
                            component="h2"
                            variant="h4"
                            color="text.primary"
                          >
                            ${plan?.price?.yearly}
                          </Typography>
                          <Typography variant="h6" color="text.secondary">
                            /year
                          </Typography>
                        </Box>
                      </Box>
                      <ul>
                        {plan?.description?.map((line) => (
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                            key={line}
                          >
                            {line}
                          </Typography>
                        ))}
                      </ul>
                    </CardContent>
                    {/* ===== update button==== */}
                    <CardActions>
                      <Button
                        fullWidth
                        variant={"contained"}
                        sx={{ color: "white" }}
                        component={NavLink}
                        to={`/admin/plans/${plan?._id}`}
                      >
                        Edit
                      </Button>
                    </CardActions>
                    {/* ===== Delete button==== */}
                    <CardActions>
                      <Button
                        fullWidth
                        variant={"contained"}
                        sx={{ color: "white" }}
                        id={plan?._id}
                        onClick={() => deleteHandler(plan?._id)}
                      >
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
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Container>
      {/* Footer */}
      <>
        {/* <EditPricingContent singlePlan={singlePlan} onClick={() => true} /> */}
      </>
      {/* End footer */}
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}
