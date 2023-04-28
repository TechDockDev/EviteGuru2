import nodemailer from "nodemailer";
import { guest_feedBack } from "../controllers/guestController.js";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

// const filePath = path.join(__dirname, "relative/path/to/html/file");

const sendCard = async (guestsemail, last_name, final_card) => {
  let singleEmail = "";
  var imageString = `data:image/*;base64,${final_card}`;

  // console.log(imageString);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    replyTo: true,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  for (var i = 0; i < guestsemail.length; i++) {
    singleEmail = guestsemail[i];
    let single_last_name = last_name[i];

    // const emailHtml = render(Email({ url: "" }));
    let info = transporter.sendMail({
      from: process.env.EMAIL, // sender address

      to: singleEmail, // list of receivers
      subject: `Invitation for ${single_last_name}`, // Subject line
      html: `<html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
         
      </head>
      <body>
          <div  class="main-conatiner"
          style=" width:35%;
          border:1px solid black;
          margin: auto;
          border-radius: 10px;
          background-color: #CEC5DC;">
              <!-- {/* inner container portion  */} -->
              <div class="body-container" >
              <div class="logo-section"
              style="width: 40%;
              display:flex;
              justify-content:center;
              margin:10px auto;">
                 <img  src="./images/evitguru-logo.svg"/>
                </div>
                <div class="marriage-section"
                style="border: 2px solid grey;
                margin:auto;
                display: grid;
                justify-content: center;
                width: 80%;
                padding: 30px 0px 30px 0px;
                border-radius: 10px;
                background-color: #FFFFFF;">
                  <p style="margin:auto"> Hello ${last_name} you're invited to:</p>
                  <h2 style="margin:20% 8% " >Marriage</h2>
                  <button
                  style="border-radius: 10px; margin: 10px 0px 10px 0px;
                  height: 40px;
                  background-color: #795DA8;
                  color: #FFFFFF;"
                  >View And Reply</button>
                </div>
                </div>
                <!-- {/* Not sure you can make it text section    */} -->
                <div >
                  <img src="" />
                  <img src="" />
                </div>
                <!-- {/* footer section */} -->
                <div  >
                  <p style="margin:10px;font-size: 80%;">
                    For the best evitguru.com, please add
                    <a href="#" >
                      Evitguru.com
                    </a>
                    to your address book; this will guarantee that you receive all
                    invitations and cards in your email inbox. Block an email to address
                    to stop receiving evitguru mail from a specific sender or
                    unsubscribe to stop receiving emails from Evitguru entirely,
                    including all invitations and cards. Learn more about our privacy
                    policy.
                  </p>
                </div>
              </div>
            </div>
      </body>
      </html>`,
      //       html: `
      //       <img src="cid:uniqueID@create.cc">
      //       <div>

      //        <label> Hello ${single_last_name} Send your feedback for this event by filling the for below </label>

      // <p>Click <a href="http://192.168.29.59:3000/">here</a>View Card</p>  </div>
      //  `,
      // attachments: [
      //   {
      //     filename: "evitguru-logo.jpg",
      //     path: "D:/Sunder/git wedding card/eviteguru/backend/utils/evitguru-logo.jpg",
      //     cid: "cid:uniqueID@create.cc",
      //   },
      // ],
    });
    transporter.use("compile", hbs(info));
    // console.log(info);
    // console.log("Card sended successfully", info.messageId);
  }
  console.log("total successfully email send are", guestsemail.length);
};

export default sendCard;
