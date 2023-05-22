// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = "AC8960731b75cd77829b5afdf889067f0d";
const authToken = "dd12f83db4f86bd7b577db2e057c6914";
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
import client from "twilio";
// const client = require("twilio")(accountSid, authToken);
const sendSms = async (body, numbers) => {
  //   client(accountSid, authToken);
  await client(accountSid, authToken).messages.create({
    from: "+12545705907",
    body,
    to: numbers,
  });
};

export { sendSms };
