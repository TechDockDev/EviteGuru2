import { React, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fontsource/montserrat";

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
import UserDetails from "./screen/Users/UserDetails";
import TemplateEdit from "./screen/TemplatePreview/TemplateEdit";
const App = () => {
  const [alertMessage, setAlertMessage] = useState(null);

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
          <Route path="/admin/events" element={<Events />} />
          <Route
            path="/admin/template-create"
            element={<AdminTemplateCreate showAlertBar={showAlertBar} />}
          />
          <Route
            path="/template-edit"
            element={<AdminTemplateEditScreen showAlertBar={showAlertBar} />}
          />
          <Route
            path="/admin/template-edit/:templateId"
            element={<TemplateEdit />}
          />

          <Route
            path="/template-list"
            element={<AdminTemplateListScreen />}
          />

          <Route path="/admin/admin_list" element={<SubAdminListScreen />} />
          <Route path="/admin/pricing" element={<PricingContent />} />
          <Route path="/admin/create-subadmin" element={<AddSubAdmins />} />
          <Route path="/admin/:id" element={<EditSubAdmin />} />
          <Route path="/admin/profile" element={<AccountSettings />} />
          <Route path="/admin/plans/:id" element={<EditPricingContent />} />
          <Route path="/admins/create-plan" element={<AddPriceContent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
