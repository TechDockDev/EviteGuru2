import { Stack, Button } from "@mui/material";
import React, { useState } from "react";
import SingleInput from "./SingleInput";
import { useSelector, useDispatch } from "react-redux";
import { EventDetailsTemplate } from "../../oldredux/action/userAction";
import axios from "axios";

const Details = () => {
  const dispatch = useDispatch();

  const [eventDetailsData, setEventDetailsData] = useState({
    event_name: "",
    host_name: "",
    venue_name: "",
    venue_address: "",
    date: "",
    add_info: "",
  });

  const { eventDetails,userEventTemplate } = useSelector((state) => state);
  // const { events , loading , error } = EventDetails;
  // console.log("🚀 ~ file: Details.js:24 ~ Details ~ eve̥nts:", events)

  // const { userDetail } = useSelector((state) => state);
  // const { userInfo } = userLogin;

  // const id = userDetail?._id;
  console.log("userEventTemplate =>",userEventTemplate)

  const submitHandler = async(e) => {
    e.preventDefault();
    console.log("data=>", eventDetailsData);
    try {
      const response = await axios.post("api/v1/user/variation/create",)
    } catch (error) {
      console.log("eventId=>",error)
    }
    //  dispatch(
    //    EventDetailsTemplate(
    //      id,
    //      event_name,
    //      host_name,
    //      venue_name,
    //      venue_address,
    //      date,
    //      time,
    //      add_info
    //    )
    //  );
  };

  return (
    <Stack>
      {/* == 👇 form container 👇  ==*/}
      <Stack component={"form"} onSubmit={submitHandler}>
        {/* == 👇 event Name 👇  ==*/}
        <SingleInput
          labelText={"Event Name"}
          inputType={"text"}
          inputName={"eventName"}
          labelInputId={"eventName"}
          inputValue={eventDetailsData?.event_name || ""}
          onChangeHandler={(e) =>
            setEventDetailsData({
              ...eventDetailsData,
              ["event_name"]: e.target.value,
            })
          }
          requiredTrue={true}
          placeholderText={"e.g. Wedding"}
        />
        {/* == 👆 event Name 👆   ==*/}
        {/* == 👇 event Name 👇  ==*/}
        <SingleInput
          labelText={"Sender Name"}
          inputType={"text"}
          inputName={"senderName"}
          labelInputId={"senderName"}
          inputValue={eventDetailsData?.host_name || ""}
          onChangeHandler={(e) =>
            setEventDetailsData({
              ...eventDetailsData,
              ["host_name"]: e.target.value,
            })
          }
          requiredTrue={true}
          placeholderText={"Your name"}
        />
        {/* == 👆 event Name 👆   ==*/}
        {/* == 👇 fieldset to group inputs together for location👇  ==*/}

        {/* <Stack component={"fieldset"} border="none" mt={2}>
               <Typography component="legend" variant="h4" textAlign="center">
                  Location
               </Typography> */}

        {/* == 👇 venue Name 👇  ==*/}
        <SingleInput
          labelText={"Venue Name"}
          inputType={"text"}
          inputName={"venueName"}
          labelInputId={"venueName"}
          inputValue={eventDetailsData?.venue_name || ""}
          onChangeHandler={(e) =>
            setEventDetailsData({
              ...eventDetailsData,
              ["venue_name"]: e.target.value,
            })
          }
          requiredTrue={true}
          placeholderText={"e.g. The Oberoi"}
        />
        {/* == 👆 venue Name 👆   ==*/}
        {/* == 👇 venue Address 👇  ==*/}
        <SingleInput
          labelText={"Venue Address"}
          inputType={"text"}
          inputName={"venueAddress"}
          inputValue={eventDetailsData?.venue_address || ""}
          onChangeHandler={(e) =>
            setEventDetailsData({
              ...eventDetailsData,
              ["venue_address"]: e.target.value,
            })
          }
          labelInputId={"venueAddress"}
          requiredTrue={true}
          placeholderText={"Full address here"}
        />
        {/* == 👆 venue Address 👆   ==*/}
        {/* == 👇Event date 👇  ==*/}
        <SingleInput
          labelText={"Event Date"}
          inputType={"date"}
          inputName={"eventDate"}
          inputValue={eventDetailsData?.date || ""}
          onChangeHandler={(e) =>
            setEventDetailsData({
              ...eventDetailsData,
              ["date"]: e.target.value,
            })
          }
          labelInputId={"eventDate"}
          requiredTrue={true}
          placeholderText={""}
        />
        {/* == 👆Event date👆   ==*/}
        {/* == 👇Event time 👇  ==*/}
        <SingleInput
          labelText={"Event time"}
          inputType={"time"}
          inputName={"eventTime"}
          inputValue={eventDetailsData?.time || ""}
          onChangeHandler={(e) =>
            setEventDetailsData({
              ...eventDetailsData,
              ["time"]: e.target.value,
            })
          }
          labelInputId={"eventTime"}
          requiredTrue={true}
          placeholderText={""}
          helperText={"Timezone : (GMT+05:30) Kolkata"}
        />
        {/* == 👆Event time👆   ==*/}
        {/* == 👇Additional Information for Location 👇  ==*/}
        <SingleInput
          labelText={"Additional Information for Location"}
          inputType={"textarea"}
          inputName={"additionalInfo"}
          inputValue={eventDetailsData?.add_info || ""}
          onChangeHandler={(e) =>
            setEventDetailsData({
              ...eventDetailsData,
              ["add_info"]: e.target.value,
            })
          }
          labelInputId={"additionalInfo"}
          requiredTrue={true}
          placeholderText={"e.g Opposite sapna clark inn"}
          rows={"3"}
        />
        {/* == 👆Additional Information for Location👆   ==*/}
        {/* </Stack> */}
        {/* == 👆 fieldset to group inputs together for location 👆   ==*/}
        <Button
          type="submit"
          disableElevation
          variant="contained"
          sx={{ color: "#fff" }}
        >
          Save
        </Button>
      </Stack>
      {/* <Button onClick={() => navigate(`/dashboard/preview/${singleEvent._id}`)} disableElevation variant="contained" sx={{ color: "#fff" }}>
         //       Next
          </Button> */}
      {/* <>
         <Preview host_name={jack}/>
         </> */}
      {/* == 👆 form container 👆   ==*/}
    </Stack>
  );
};

export default Details;

// onClick={navigate(`/dashboard/ok/${event?._id}`)}
