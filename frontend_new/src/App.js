import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import "@fontsource/montserrat";
import "@fontsource/poppins"; 
import Header from "./components/Header";
import BrowseTemplate from "./screens/BrowseTemplate/BrowseTemplate";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import CustomizationPage from "./screens/CustomizationPage/CustomizationPage";
import Preview from "./screens/CustomizationPage/Preview";
import AccountSettings from "./screens/AccountSettings/AccountSettings";
import MailingReponses from "./screens/CustomizationPage/AddressBook";
import Pricing from "./screens/pricing/Pricing";
import MyEvents from "./screens/MyEvents/MyEvents";
import EventStats from "./screens/EventStats/EventStats";
import Subscriptions from "./screens/Subscription/Subscription";
import PaymentGateway from "./screens/pricing/PaymentGateway";
import Test from "./screens/CustomizationPage/test";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userAuth } from "./redux/action/userActions";
import Send from "./screens/CustomizationPage/Send";

// import FooterSection from "./screens/HomeScreen/FooterSection";
// import EmailsendOtp from "./screens/EmailotpScreen";
// import { Stack } from "@mui/material";
// import LogInModal from "./screens/LoginModal/LogInModal";
// import React, { useState, useEffect } from "react";
// import RegisterModal from "./screens/RegisterModal/RegisterModal";

const App = () => {
  const dispatch = useDispatch();
  // =====get login status ========
  const getUserLoginStatus = async () => {
    try {
      const res = await axios.get("/api/v1/user/auth");
      if (res.status === 200) {
        console.log("ressponse=>", res);
        dispatch(userAuth(res?.data?.user));
      }
    } catch (error) {
      console.log("error=>", error);
    }
  };
  // ======end of login status ====
  // ====== useEffect =============
  useEffect(() => {
    getUserLoginStatus();
  }, []);

  // =======end of useEffect ======
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<HomeScreen />} />
          <Route path="/browse_template" element={<BrowseTemplate />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/paymentGateway" element={<PaymentGateway />} />
          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/dashboard" element={<UserDashboard />}>
          <Route path="/dashboard/my-events" element={<MyEvents />} />

          <Route path="/dashboard/view-event" element={<EventStats />} />
          <Route path="/dashboard/edit/:id" element={<CustomizationPage />} />
          <Route path="/dashboard/preview/:id" element={<Preview />} />
          <Route path="/dashboard/:id/send" element={<Send />} />

          <Route path="/dashboard/address-book" element={<MailingReponses />} />

          <Route
            path="/dashboard/account-setting"
            element={<AccountSettings />}
          />
          <Route path="/dashboard/subscriptions" element={<Subscriptions />} />
          <Route
            path="/dashboard/mailing-responses"
            element={<MailingReponses />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

//{/* <Route path="/browse_template" element={<BrowseTemplate />} /> */}

// import "@fontsource/montserrat";
// import { Flex } from "@chakra-ui/react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React from 'react'
// import HomeScreen from './screens/HomeScreen';
// import LoginScreen from "./screens/LoginScreen";
// import RegisterScreen from "./screens/RegisterScreen";
// import EmailsendOtp from "./screens/EmailotpScreen";
// import Changepassword from "./screens/Changepassword";
// import Header from "./components/Header";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Header />
//       <Flex
//         as='main'
//         mt='65px'
//         direction='column'
//         minH='xl'
//         py='3'
//         px='6'
//       // bgColor='gray.200'
//       >
//         <Routes>
//           <Route path="/" element={<HomeScreen />} />
//           <Route path="/login" element={<LoginScreen />} />
//           <Route path="/register" element={<RegisterScreen />} />
//           <Route path='/send-otp' element={<EmailsendOtp />} />
//           <Route path='/change-password' element={<Changepassword />} />
//         </Routes>
//       </Flex>
//     </BrowserRouter>
//   )
// }

// export default App;
