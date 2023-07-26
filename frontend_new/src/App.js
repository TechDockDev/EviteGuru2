import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSnackbar,
  isLoading,
  openSnackbar,
  userAuth,
} from "./redux/action/userActions";
import Send from "./screens/CustomizationPage/Send";
import InviteesResponseScreen from "./screens/InviteesResponseScreen/InviteesResponseScreen";
import Enterprise from "./screens/Enterprise/Enterprise";
import { Constants } from "./redux/constants/action-types";
import PaymentSuccessScreen from "./screens/PaymentSuccessScreen/PaymentSuccessScreen";
import { Alert, Snackbar } from "@mui/material";
import AddressBook from "./screens/CustomizationPage/AddressBook";

import DiscountCheckOut from "./screens/pricing/DiscountCheckOut";

import PreviewInviteesResponseScreen from "./screens/InviteesResponseScreen/previewInvitationResponseScreen";
import EditCustomizationPage from "./screens/EditCustomizationPage/EditCustomizationPage";
import Loader from "./reusableComponents/isLoading/Loader";
import PreventNavigation from "./reusableComponents/preventNavigation";
import TermsAndCondition from "./components/terms-condition-privacy-policy/TermsAndCondition";
import PrivacyPolicy from "./components/terms-condition-privacy-policy/PrivacyPolicy";

const App = () => {
  const { snackbar, userDetail, loading } = useSelector((state) => state);
  const navigate = useNavigate();
  console.log("loading=>", loading.open);
  const dispatch = useDispatch();
  // =====get login status ========
  const getUserLoginStatus = async () => {
    dispatch(isLoading(true));
    try {
      console.log("loadingStatus=>", loading.open);
      const res = await axios.get(`${Constants.URL}/auth`);
      if (res.status === 200) {
        // console.log("ressponse=>", res);
        // dispatch(openSnackbar(res?.data?.message, "success"));
        dispatch(userAuth(res?.data?.user));
        dispatch(isLoading(false));
      }
    } catch (error) {
      console.log("error=>", error);
      dispatch(isLoading(false));
      // dispatch(openSnackbar("You are not logged in please login", "error"));
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
  const setIsLoading = () => {
    dispatch(isLoading(!loading.open));
  };
  return (
    <>
      <PreventNavigation />
      <Loader />
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
          path="/guest-event-view-screen/:eventId/:guestId"
          element={<InviteesResponseScreen />}
        />
        <Route path="/termsAndConditions" element={<TermsAndCondition />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/" element={<Header />}>
          <Route index element={<HomeScreen />} />
          <Route path="/browse_template" element={<BrowseTemplate />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/paymentGateway" element={<PaymentGateway />} />
          <Route path="/discount" element={<DiscountCheckOut />} />
        </Route>
        {/* <Route path="*" element={<h4>Error 404 Page Not Found</h4>} /> */}
        <Route
          path="/payment/success/status"
          element={<PaymentSuccessScreen />}
        />
      </Routes>
      <Routes></Routes>
      {userDetail?.isUser ? (
        <Routes>
          <Route path="/dashboard" element={<UserDashboard />}>
            <Route path="/dashboard/my-events" element={<MyEvents />} />
            <Route path="/dashboard/view-event" element={<EventStats />} />
            <Route path="/dashboard/edit/:id" element={<CustomizationPage />} />
            <Route
              path="/dashboard/edit/event/:id"
              element={<EditCustomizationPage />}
            />
            <Route path="/dashboard/preview/:id" element={<Preview />} />
            <Route path="/dashboard/:id/send" element={<Send />} />

            <Route path="/dashboard/address-book" element={<AddressBook />} />

            <Route
              path="/dashboard/account-setting"
              element={<AccountSettings />}
            />
            <Route
              path="/dashboard/subscriptions"
              element={<Subscriptions />}
            />
            <Route
              path="/dashboard/guest-event-preview/:eventId/:guestId"
              element={<PreviewInviteesResponseScreen />}
            />
          </Route>
        </Routes>
      ) : (
        ""
      )}
    </>
  );
};

export default App;
