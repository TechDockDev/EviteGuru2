import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import "@fontsource/montserrat";
import "@fontsource/poppins";
import "@fontsource/sacramento";
import "@fontsource/parisienne";
import "@fontsource/pinyon-script";
import Header from "./components/Header";
import BrowseTemplate from "./screens/BrowseTemplate/BrowseTemplate";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import CustomizationPage from "./screens/CustomizationPage/CustomizationPage";
import Preview from "./screens/CustomizationPage/Preview";
import AccountSettings from "./screens/AccountSettings/AccountSettings";

import Pricing from "./screens/pricing/Pricing";
import MyEvents from "./screens/MyEvents/MyEvents";
import EventStats from "./screens/EventStats/EventStats";
import Subscriptions from "./screens/Subscription/Subscription";
import PaymentGateway from "./screens/pricing/PaymentGateway";
import Test from "./screens/CustomizationPage/test";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSnackbar,
  openSnackbar,
  userAuth,
} from "./redux/action/userActions";
import Send from "./screens/CustomizationPage/Send";
import InviteesResponseScreen from "./screens/InviteesResponseScreen/InvitessResponseScreen";
import Enterprise from "./screens/Enterprise/Enterprise";
import { Constants } from "./redux/constants/action-types";
import PaymentSuccessScreen from "./screens/PaymentSuccessScreen/PaymentSuccessScreen";
import { Alert, Snackbar } from "@mui/material";
import AddressBook from "./screens/CustomizationPage/AddressBook";

const App = () => {
  const { snackbar } = useSelector((state) => state);
  console.log("snackbar=>", snackbar);
  const dispatch = useDispatch();
  // =====get login status ========
  const getUserLoginStatus = async () => {
    try {
      const res = await axios.get(`${Constants.URL}/auth`);
      if (res.status === 200) {
        console.log("ressponse=>", res);
        // dispatch(openSnackbar(res?.data?.message, "success"));
        dispatch(userAuth(res?.data?.user));
      }
    } catch (error) {
      console.log("error=>", error);
      dispatch(openSnackbar("error", "error"));
    }
  };
  // ======end of login status ====
  // ====== useEffect =============
  useEffect(() => {
    getUserLoginStatus();
  }, []);

  // =======end of useEffect ======
  const handleClose = () => {
    dispatch(closeSnackbar());
  };
  return (
    <>
      <Snackbar
        open={snackbar?.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity={snackbar?.severity}
          sx={{ width: "100%" }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
      <Routes>
        <Route
          path="/guest-event-view-screen/:eventId"
          element={<InviteesResponseScreen />}
        />
        <Route path="/" element={<Header />}>
          <Route index element={<HomeScreen />} />
          <Route path="/browse_template" element={<BrowseTemplate />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/paymentGateway" element={<PaymentGateway />} />
          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
      <Routes>
        <Route
          path="/payment/success/status"
          element={<PaymentSuccessScreen />}
        />
        <Route path="/dashboard" element={<UserDashboard />}>
          <Route path="/dashboard/my-events" element={<MyEvents />} />
          <Route path="/dashboard/view-event" element={<EventStats />} />
          <Route path="/dashboard/edit/:id" element={<CustomizationPage />} />
          <Route path="/dashboard/preview/:id" element={<Preview />} />
          <Route path="/dashboard/:id/send" element={<Send />} />

          <Route path="/dashboard/address-book" element={<AddressBook />} />

          <Route
            path="/dashboard/account-setting"
            element={<AccountSettings />}
          />
          <Route path="/dashboard/subscriptions" element={<Subscriptions />} />
          {/* <Route
            path="/dashboard/mailing-responses"
            element={<MailingReponses />}
          /> */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
