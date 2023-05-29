import { React, useContext, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => {
   const [alertMessage, setAlertMessage] = useState(null);
   const {  severity,
      message,
      snackbar,
      openSnackbar,
      setOpenSnackbar,}  = useContext(DataContext)

   const showAlertBar = (message, type) => {
      setAlertMessage({
         message: message,
         type: type,
      });
      setTimeout(() => {
         setAlertMessage(null);
      }, 1000);
   };
   axios.defaults.baseURL = "/api/v1/admin";
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<LogInModal />} />
            <Route element={<AdminDashboard />}>
               <Route element={<AlertMessage alertMessage={alertMessage} />} />
               <Route path="/admin/user-list" element={<UserListScreen />} />
               <Route path="/admin/user/:id" element={<UserDetails />} />
               <Route path="/admin/events/:id" element={<Events />} />
               <Route path="/admin/event/:id" element={<EventStats />} />
               <Route path="/admin/template-create" element={<AdminTemplateCreate showAlertBar={showAlertBar} />} />
               <Route path="/admin/template-edit" element={<AdminTemplateEditScreen showAlertBar={showAlertBar} />} />
               <Route path="/admin/template-edit/:templateId" element={<TemplateEdit />} />
               <Route path="/admin/template-list" element={<AdminTemplateListScreen />} />
               <Route path="/admin/admin_list" element={<SubAdminListScreen />} />
               <Route path="/admin/pricing" element={<PricingContent />} />
               <Route path="/admin/create-subadmin" element={<AddSubAdmins />} />
               <Route path="/admin/:id" element={<EditSubAdmin />} />
               <Route path="/admin/profile" element={<AccountSettings />} />
               <Route path="/admin/plans/:id" element={<EditPricingContent />} />
               <Route path="/admins/create-plan" element={<AddPriceContent />} />
               <Route path="/admin/promotions" element={<CouponTable />} />
               <Route path="/admin/add-coupon" element={<AddCoupon />} />
               <Route path="/admin/promotional-mail" element={<PromotionalMail />} />
               <Route path="/admin/accounts" element={<PaymentDetails />} />
               <Route path="/admin/send-promotion-message" element={<UserListEmail />} />
               <Route path="/admin/manage-stickers" element={<ManageStickers />} />
               <Route path="/admin/faq" element={<FAQ />} />
            </Route>
         </Routes>
         <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)} 
          anchorOrigin={{ vertical:"top", horizontal:"center" }}
         >
            <Alert  variant="filled" severity={severity} sx={{ width: "100%" }} onClose={() => setOpenSnackbar(false)} >
               {message}
            </Alert>
         </Snackbar>
      </BrowserRouter>
   );
};

export default App;
