import { Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import "./App.css";
const ProductDisplay = (props) => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
        <h3>{props?.planDetails?.plan?.name}</h3>
        <h5>${props?.planDetails?.amount}</h5>
      </div>
    </div>
    <form action="/api/v1/user/plan/purchase" method="POST">
      <button type="submit">Checkout</button>
    </form>
  </section>
);
const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);
export default function PaymentGateway() {
  const { state } = useLocation();
  console.log("state=>", state);
  const [message, setMessage] = useState("");
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);
  return message ? (
    <Message message={message} />
  ) : (
    <Stack alignItems={"center"} mt={2}>
      <ProductDisplay planDetails={state} />
    </Stack>
  );
}
