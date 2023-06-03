import { React, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, useNavigate, redirect } from "react-router-dom";
import "@fontsource/montserrat";
import "@fontsource/sacramento";
import "@fontsource/parisienne";
import "@fontsource/pinyon-script";
//local files
import AdminEmailotp from "./screen/AdminEmailotpScreen";

import UserListScreen from "./screen/AdminUserListScreen";
import AdminTemplateCreate from "./screen/AdminTemplateCreateScreen";
import AdminTemplateEditScreen from "./screen/AdminTemplateEditScreen";
import SubAdminListScreen from "./screen/Subadmin/SubAdminListScreen";
import LogInModal from "./screen/LoginModal/LogInModal";
import AdminTemplateListScreen from "./screen/AdminTemplateListScreen";
import AdminDashboard from "./component/UserDashboard/AdminDashboard";
import AdminTemplateCreateScreen from "./screen/AdminTemplateCreateScreen";
import PricingContent from "./screen/subscription/PricingContent";
import AddSubAdmins from "./screen/Subadmin/AddSubAdmins";
import EditSubAdmin from "./screen/Subadmin/EditSubAdmin";
import AddPriceContent from "./screen/subscription/AddPriceContent";
import EditPricingContent from "./screen/subscription/EditPricingContent";
import AccountSettings from "./screen/adminProfile/AccountSettings";
import AlertMessage from "./component/AlertMessage";
import Events from "./screen/Events";
import UserDetails from "./screen/Users/UserDetails.js";
import TemplateEdit from "./screen/TemplatePreview/TemplateEdit";
import Promotion from "./screen/Coupons and promotions/Promotion";
import UserListEmail from "./screen/Coupons and promotions/UserListEmail";
import AddCoupon from "./screen/Coupons and promotions/AddCoupon";
import CouponTable from "./screen/Coupons and promotions/CouponTable";
import PromotionalMail from "./screen/Coupons and promotions/PromotionalMail";
import EventStats from "./screen/EventStats/EventStats";
import PaymentDetails from "./screen/PaymentDetails/PaymentDetails";
import { DataContext } from "./AppContext";
import { Alert, Snackbar } from "@mui/material";
import ManageStickers from "./screen/ManageStickers/ManageStickers";
import FAQ from "./screen/FAQ/FAQ";
import Enterprise from "./screen/Enterprise/Enterprise";
import Protected from "./Protected";
import AccessRestricted from "./screen/AccessRestricted";
import EditCoupon from "./screen/Coupons and promotions/EditCoupon";

const App = () => {
   const { severity, message, snackbar, openSnackbar, setOpenSnackbar, adminAuthData, setAdminAuthData, isLoggedIn, setIsLoggedIn } = useContext(DataContext);

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
         <Routes>
            <Route path="/" element={<LogInModal />} />
            {isLoggedIn && (
               <Route element={<AdminDashboard />}>
                  <Route
                     path="/admin/user-list"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Users")} path={"/admin/access-denied"}>
                           <UserListScreen />
                        </Protected>
                     }
                  />
                  <Route
                     path="/admin/user/:id"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Users")} path={"/admin/access-denied"}>
                           <UserDetails />
                        </Protected>
                     }
                  />
                  <Route
                     path="/admin/events/:id"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Users")} path={"/admin/access-denied"}>
                           <Events />
                        </Protected>
                     }
                  />
                  <Route
                     path="/admin/event/:id"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Users")} path={"/admin/access-denied"}>
                           <EventStats />
                        </Protected>
                     }
                  />
                  <Route
                     path="/admin/template-create"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Template")} path={"/admin/access-denied"}>
                           <AdminTemplateCreate />
                        </Protected>
                     }
                  />
                  <Route
                     path="/admin/template-edit"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Template")} path={"/admin/access-denied"}>
                           <AdminTemplateEditScreen />
                        </Protected>
                     }
                  />
                  <Route
                     path="/admin/template-edit/:templateId"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Template")} path={"/admin/access-denied"}>
                           <TemplateEdit />
                        </Protected>
                     }
                  />
                  <Route
                     path="/admin/template-list"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Template")} path={"/admin/access-denied"}>
                           <AdminTemplateListScreen />
                        </Protected>
                     }
                  />
                  <Route
                     path="/admin/admin_list"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Sub Admin")} path={"/admin/access-denied"}>
                           <SubAdminListScreen />
                        </Protected>
                     }
                  />
                  <Route
                     path="/admin/pricing"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Subscription")} path={"/admin/access-denied"}>
                           <PricingContent />
                        </Protected>
                     }
                  />
                  <Route
                     path="/admin/create-subadmin"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Sub Admin")} path={"/admin/access-denied"}>
                           <AddSubAdmins />
                        </Protected>
                     }
                  />
                  <Route
                     path="/admin/:id"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Sub Admin")} path={"/admin/access-denied"}>
                           <EditSubAdmin />
                        </Protected>
                     }
                  />
                  <Route path="/admin/profile" element={<AccountSettings />} />
                  <Route
                     path="/admin/plans/:id"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Subscription")} path={"/admin/access-denied"}>
                           <EditPricingContent />
                        </Protected>
                     }
                  />
                  <Route
                     path="/admins/create-plan"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Subscription")} path={"/admin/access-denied"}>
                           <AddPriceContent />
                        </Protected>
                     }
                  />
                  <Route
                     path="/admin/promotions"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Coupons")} path={"/admin/access-denied"}>
                           <CouponTable />
                        </Protected>
                     }
                  />
                  <Route
                     path="/admin/add-coupon"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Coupons")} path={"/admin/access-denied"}>
                           <AddCoupon />
                        </Protected>
                     }
                  />
                  <Route
                     path="/admin/edit-coupon/:id"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Coupons")} path={"/admin/access-denied"}>
                           <EditCoupon />
                        </Protected>
                     }
                  />
                  <Route
                     path="/admin/promotional-mail"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Coupons")} path={"/admin/access-denied"}>
                           <PromotionalMail />
                        </Protected>
                     }
                  />
                  <Route
                     path="/admin/accounts"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Accounts")} path={"/admin/access-denied"}>
                           <PaymentDetails />
                        </Protected>
                     }
                  />
                  <Route
                     path="/admin/send-promotion-message"
                     element={
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Coupons")} path={"/admin/access-denied"}>
                           <UserListEmail />
                        </Protected>
                     }
                  />
                  <Route path="/admin/manage-stickers" element={<ManageStickers />} />
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
                        <Protected check={adminAuthData?.superAdmin || adminAuthData?.permission?.includes("Enterprise")} path={"/admin/access-denied"}>
                           <Enterprise />
                        </Protected>
                     }
                  />
                  <Route path="/admin/access-denied" element={<AccessRestricted />} />
               </Route>
            )}
         </Routes>
         <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert variant="filled" severity={severity} sx={{ width: "100%" }} onClose={() => setOpenSnackbar(false)}>
               {message}
            </Alert>
         </Snackbar>
      </>
   );
};

export default App;
