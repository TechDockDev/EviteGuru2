import AdminDashboard from "./component/UserDashboard/AdminDashboard";
import { React, Suspense, lazy, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  redirect,
} from "react-router-dom";
import "@fontsource/montserrat";
import "@fontsource/sacramento";
import "@fontsource/parisienne";
import "@fontsource/pinyon-script";
//local files
import AdminEmailotp from "./screen/AdminEmailotpScreen";
import { DataContext } from "./AppContext";
import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
const UserListScreen = lazy(() => import("./screen/AdminUserListScreen"));
const AdminTemplateCreate = lazy(() =>
  import("./screen/AdminTemplateCreateScreen")
);
const AdminTemplateEditScreen = lazy(() =>
  import("./screen/AdminTemplateEditScreen")
);
const SubAdminListScreen = lazy(() =>
  import("./screen/Subadmin/SubAdminListScreen")
);
const LogInModal = lazy(() => import("./screen/LoginModal/LogInModal"));
const AdminTemplateListScreen = lazy(() =>
  import("./screen/AdminTemplateListScreen")
);
// const AdminDashboard = lazy(() =>
//   import("./component/UserDashboard/AdminDashboard")
// );
const PricingContent = lazy(() =>
  import("./screen/subscription/PricingContent")
);
const AddSubAdmins = lazy(() => import("./screen/Subadmin/AddSubAdmins"));
const EditSubAdmin = lazy(() => import("./screen/Subadmin/EditSubAdmin"));
const AddPriceContent = lazy(() =>
  import("./screen/subscription/AddPriceContent")
);
const EditPricingContent = lazy(() =>
  import("./screen/subscription/EditPricingContent")
);
const AccountSettings = lazy(() =>
  import("./screen/adminProfile/AccountSettings")
);
const Events = lazy(() => import("./screen/Events"));
const UserDetails = lazy(() => import("./screen/Users/UserDetails.js"));
const TemplateEdit = lazy(() =>
  import("./screen/TemplatePreview/TemplateEdit")
);
const UserListEmail = lazy(() =>
  import("./screen/Coupons and promotions/UserListEmail")
);
const AddCoupon = lazy(() =>
  import("./screen/Coupons and promotions/AddCoupon")
);
const CouponTable = lazy(() =>
  import("./screen/Coupons and promotions/CouponTable")
);
const PromotionalMail = lazy(() =>
  import("./screen/Coupons and promotions/PromotionalMail")
);
const EventStats = lazy(() => import("./screen/EventStats/EventStats"));
const PaymentDetails = lazy(() =>
  import("./screen/PaymentDetails/PaymentDetails")
);
const ManageStickers = lazy(() =>
  import("./screen/ManageStickers/ManageStickers")
);
const FAQ = lazy(() => import("./screen/FAQ/FAQ"));
const Enterprise = lazy(() => import("./screen/Enterprise/Enterprise"));
const Protected = lazy(() => import("./Protected"));
const AccessRestricted = lazy(() => import("./screen/AccessRestricted"));
const EditCoupon = lazy(() =>
  import("./screen/Coupons and promotions/EditCoupon")
);

const App = () => {
  const {
    severity,
    message,
    snackbar,
    openSnackbar,
    setOpenSnackbar,
    adminAuthData,
    setAdminAuthData,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(DataContext);

  axios.defaults.baseURL = "/api/v1/admin";
  // ==============
  const adminAuth = async () => {
    try {
      const { data } = await axios.get("/auth");
      setAdminAuthData(data.admin);
      setIsLoggedIn(true);
    } catch (error) {
      snackbar("error", "Please login first");
    }
  };

  // console.log("adminAuthData----->", adminAuthData);
  // console.log("check----->", adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Template"));

  useEffect(() => {
    adminAuth();
  }, []);

  return (
    <>
      <Suspense
        fallback={
          <Backdrop
            sx={{
              bgcolor: "rgba(0,0,0,0.2)",
              color: "#880808",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={true}
          >
            <CircularProgress color="primary" />
          </Backdrop>
        }
      >
        <Routes>
          <Route path="/" element={<LogInModal />} />
          {isLoggedIn && (
            <Route element={<AdminDashboard />}>
              <Route
                path="/admin/user-list"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Users")
                    }
                    path={"/admin/access-denied"}
                  >
                    <UserListScreen />
                  </Protected>
                }
              />
              <Route
                path="/admin/user/:id"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Users")
                    }
                    path={"/admin/access-denied"}
                  >
                    <UserDetails />
                  </Protected>
                }
              />
              <Route
                path="/admin/events/:id"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Users")
                    }
                    path={"/admin/access-denied"}
                  >
                    <Events />
                  </Protected>
                }
              />
              <Route
                path="/admin/event/:id"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Users")
                    }
                    path={"/admin/access-denied"}
                  >
                    <EventStats />
                  </Protected>
                }
              />
              <Route
                path="/admin/template-create"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Template")
                    }
                    path={"/admin/access-denied"}
                  >
                    <AdminTemplateCreate />
                  </Protected>
                }
              />
              <Route
                path="/admin/template-edit"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Template")
                    }
                    path={"/admin/access-denied"}
                  >
                    <AdminTemplateEditScreen />
                  </Protected>
                }
              />
              <Route
                path="/admin/template-edit/:templateId"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Template")
                    }
                    path={"/admin/access-denied"}
                  >
                    <TemplateEdit />
                  </Protected>
                }
              />
              <Route
                path="/admin/template-list"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Template")
                    }
                    path={"/admin/access-denied"}
                  >
                    <AdminTemplateListScreen />
                  </Protected>
                }
              />
              <Route
                path="/admin/admin_list"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Sub Admin")
                    }
                    path={"/admin/access-denied"}
                  >
                    <SubAdminListScreen />
                  </Protected>
                }
              />
              <Route
                path="/admin/pricing"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Subscription")
                    }
                    path={"/admin/access-denied"}
                  >
                    <PricingContent />
                  </Protected>
                }
              />
              <Route
                path="/admin/create-subadmin"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Sub Admin")
                    }
                    path={"/admin/access-denied"}
                  >
                    <AddSubAdmins />
                  </Protected>
                }
              />
              <Route
                path="/admin/:id"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Sub Admin")
                    }
                    path={"/admin/access-denied"}
                  >
                    <EditSubAdmin />
                  </Protected>
                }
              />
              <Route path="/admin/profile" element={<AccountSettings />} />
              <Route
                path="/admin/plans/:id"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Subscription")
                    }
                    path={"/admin/access-denied"}
                  >
                    <EditPricingContent />
                  </Protected>
                }
              />
              <Route
                path="/admins/create-plan"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Subscription")
                    }
                    path={"/admin/access-denied"}
                  >
                    <AddPriceContent />
                  </Protected>
                }
              />
              <Route
                path="/admin/promotions"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Coupons")
                    }
                    path={"/admin/access-denied"}
                  >
                    <CouponTable />
                  </Protected>
                }
              />
              <Route
                path="/admin/add-coupon"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Coupons")
                    }
                    path={"/admin/access-denied"}
                  >
                    <AddCoupon />
                  </Protected>
                }
              />
              <Route
                path="/admin/edit-coupon/:id"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Coupons")
                    }
                    path={"/admin/access-denied"}
                  >
                    <EditCoupon />
                  </Protected>
                }
              />
              <Route
                path="/admin/promotional-mail"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Coupons")
                    }
                    path={"/admin/access-denied"}
                  >
                    <PromotionalMail />
                  </Protected>
                }
              />
              <Route
                path="/admin/accounts"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Accounts")
                    }
                    path={"/admin/access-denied"}
                  >
                    <PaymentDetails />
                  </Protected>
                }
              />
              <Route
                path="/admin/send-promotion-message"
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Coupons")
                    }
                    path={"/admin/access-denied"}
                  >
                    <UserListEmail />
                  </Protected>
                }
              />
              <Route
                path="/admin/manage-stickers"
                element={<ManageStickers />}
              />
              <Route
                path="/admin/faq"
                element={
                  <Protected check={isLoggedIn}>
                    <FAQ />
                  </Protected>
                }
              />
              <Route
                path={"/admin/enterprise"}
                element={
                  <Protected
                    check={
                      adminAuthData?.superAdmin ||
                      adminAuthData?.permission?.includes("Enterprise")
                    }
                    path={"/admin/access-denied"}
                  >
                    <Enterprise />
                  </Protected>
                }
              />
              <Route
                path="/admin/access-denied"
                element={<AccessRestricted />}
              />
            </Route>
          )}
        </Routes>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            variant="filled"
            severity={severity}
            sx={{ width: "100%" }}
            onClose={() => setOpenSnackbar(false)}
          >
            {message}
          </Alert>
        </Snackbar>
      </Suspense>
    </>
  );
};

export default App;
