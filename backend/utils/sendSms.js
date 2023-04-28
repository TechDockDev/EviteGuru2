import twilio from "twilio";
//old test account
const accountSid = "AC1e0a08985c3b7c02fd3f9349368ee358";
const authToken = "bea47ca632e5ee377ce3db9d7ad07259";
const twilioNumber = "+15074971144";

//client account
// const accountSid = "ACd279953268ee9dd09310f3da32bfb1ca";
// const authToken = "8e6bbd484d21fc88da00efcfc33a4ce9";
// const twilioNumber = "+14344258712";
const response = new twilio(accountSid, authToken);

const sendText = async (phone, last_name) => {
  let tophoneNumbers = phone;

  //It is only required to verify numbers that you want to send SMS to when your account is in trial mode. If you upgrade your account you will be able to send SMS messages to any number.
  let singleNumber;
  for (var i = 0; i < tophoneNumbers.length; i++) {
    singleNumber = tophoneNumbers[i];
    let single_last_name = last_name[i];
    const textContent = {
      body: `Hello ${single_last_name} You have a new  invitation from evite_guru click in this link http://192.168.29.59:3000/ to view the Host Name and Event details :)`,
      to: singleNumber,
      from: twilioNumber,
    };

    response.messages
      .create(textContent)
      .then((message) =>
        console.log("Texted to :", single_last_name, message.to)
      );
  }
  console.log("Total SMS Send", tophoneNumbers.length);
};

export default sendText;
