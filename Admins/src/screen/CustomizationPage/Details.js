import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import SingleInput from "./SingleInput";

const Details = () => {
   const [formData, setFormData] = useState({});

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      console.log(formData);
      
   };
   return (
      <Stack>
         {/* == 👇 form container 👇  ==*/}
         <Stack component={"form"}>
            {/* == 👇 event Name 👇  ==*/}
            <SingleInput labelText={"Event Name"} inputType={"text"} inputName={"eventName"} inputValue={formData.eventName} onChangeHandler={handleChange} labelInputId={"eventName"} requiredTrue={true} placeholderText={"e.g. Wedding"} />
            {/* == 👆 event Name 👆   ==*/}
            {/* == 👇 event Name 👇  ==*/}
            <SingleInput labelText={"Sender Name"} inputType={"text"} inputName={"senderName"} inputValue={formData.senderName} onChangeHandler={handleChange} labelInputId={"senderName"} requiredTrue={true} placeholderText={"Your name"} />
            {/* == 👆 event Name 👆   ==*/}
            {/* == 👇 fieldset to group inputs together for location👇  ==*/}

            {/* <Stack component={"fieldset"} border="none" mt={2}>
               <Typography component="legend" variant="h4" textAlign="center">
                  Location
               </Typography> */}

               {/* == 👇 venue Name 👇  ==*/}
               <SingleInput labelText={"Venue Name"} inputType={"text"} inputName={"venueName"} inputValue={formData.venueName} onChangeHandler={handleChange} labelInputId={"venueName"} requiredTrue={true} placeholderText={"e.g. The Oberoi"} />
               {/* == 👆 venue Name 👆   ==*/}
               {/* == 👇 venue Address 👇  ==*/}
               <SingleInput labelText={"Venue Address"} inputType={"text"} inputName={"venueAddress"} inputValue={formData.venueAddress} onChangeHandler={handleChange} labelInputId={"venueAddress"} requiredTrue={true} placeholderText={"Full address here"} />
               {/* == 👆 venue Address 👆   ==*/}
               {/* == 👇Event date 👇  ==*/}
               <SingleInput labelText={"Event Date"} inputType={"date"} inputName={"eventDate"} inputValue={formData.eventDate} onChangeHandler={handleChange} labelInputId={"eventDate"} requiredTrue={true} placeholderText={""} />
               {/* == 👆Event date👆   ==*/}
               {/* == 👇Event time 👇  ==*/}
               <SingleInput labelText={"Event time"} inputType={"time"} inputName={"eventTime"} inputValue={formData.eventTime} onChangeHandler={handleChange} labelInputId={"eventTime"} requiredTrue={true} placeholderText={""} helperText={"Timezone : (GMT+05:30) Kolkata"} />
               {/* == 👆Event time👆   ==*/}
               {/* == 👇Additional Information for Location 👇  ==*/}
               <SingleInput labelText={"Additional Information for Location"} inputType={"textarea"} inputName={"additionalInfo"} inputValue={formData.additionalInfo} onChangeHandler={handleChange} labelInputId={"additionalInfo"} requiredTrue={true} placeholderText={"e.g Opposite sapna clark inn"} rows={"3"} />
               {/* == 👆Additional Information for Location👆   ==*/}
            {/* </Stack> */}
            {/* == 👆 fieldset to group inputs together for location 👆   ==*/}
         </Stack>
         {/* == 👆 form container 👆   ==*/}
      </Stack>
   );
};

export default Details;
