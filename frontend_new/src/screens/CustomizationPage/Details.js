import { Stack, Button } from "@mui/material";
import React, { useState } from "react";
import SingleInput from "./SingleInput";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  openSnackbar,
  setEventDetailsPreviewData,
  setEventTemplate,
} from "../../redux/action/userActions";
import { useEffect } from "react";
import { setPageTitle } from "../../redux/action/defaultActions";

const Details = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("id=>", id);

  const [eventDetailsData, setEventDetailsData] = useState({
    name: "",
    hostName: "",
    venue: "",
    address: "",
    date: "",
    additionalInfo: "",
    time: "",
  });

  const { userEventTemplate } = useSelector((state) => state);

  console.log("userEventTemplate =>", userEventTemplate);

  // submit event details and create template variation along with event creation
  const submitHandler = async (e) => {
    e.preventDefault();
    if (userEventTemplate && userEventTemplate.jsonData) {
      const dt = new Date(eventDetailsData?.date);
console.log("userEventTamplate=>",userEventTemplate)
      dt.setHours(
        eventDetailsData.time.split(":")[0],
        eventDetailsData.time.split(":")[1]
      );
      
      dispatch(
        setEventTemplate({
          ...userEventTemplate,
          eventDetails: { ...eventDetailsData, dateFormat: dt },
        })
      );
      dispatch(setPageTitle(eventDetailsData?.name));
      props.tabChange({}, 2);
    } else {
      console.log("please save design first");
      // alert("please save design first");
      dispatch(
        openSnackbar("your template is not saved, first save it", "error")
      );
    }
    console.log("data=>", eventDetailsData, "=>user", userEventTemplate);
  };

  useEffect(() => {
    if (userEventTemplate?.eventDetails) {
      setEventDetailsData(userEventTemplate?.eventDetails);
    }
  }, []);

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
          inputValue={eventDetailsData?.name || ""}
          onChangeHandler={(e) =>
            setEventDetailsData({
              ...eventDetailsData,
              ["name"]: e.target.value,
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
          inputValue={eventDetailsData?.hostName || ""}
          onChangeHandler={(e) =>
            setEventDetailsData({
              ...eventDetailsData,
              ["hostName"]: e.target.value,
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
          inputValue={eventDetailsData?.venue || ""}
          onChangeHandler={(e) =>
            setEventDetailsData({
              ...eventDetailsData,
              ["venue"]: e.target.value,
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
          inputValue={eventDetailsData?.address || ""}
          onChangeHandler={(e) =>
            setEventDetailsData({
              ...eventDetailsData,
              ["address"]: e.target.value,
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
          inputName={"date"}
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
          inputName={"time"}
          inputValue={eventDetailsData?.time || ""}
          onChangeHandler={(e) =>
            setEventDetailsData({
              ...eventDetailsData,
              ["time"]: e.target.value,
            })
          }
          labelInputId={"time"}
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
          inputValue={eventDetailsData?.additionalInfo || ""}
          onChangeHandler={(e) =>
            setEventDetailsData({
              ...eventDetailsData,
              ["additionalInfo"]: e.target.value,
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
          sx={{ color: "#fff", mt: 1 }}
        >
          Save
        </Button>
      </Stack>
      {/* <Button onClick={() => navigate(`/dashboard/preview/${singleEvent._id}`)} disableElevation variant="contained" sx={{ color: "#fff" }}>
         //       Next
          </Button> */}
      {/* <>
         <Preview hostName={jack}/>
         </> */}
      {/* == 👆 form container 👆   ==*/}
    </Stack>
  );
};

export default Details;

// onClick={navigate(`/dashboard/ok/${event?._id}`)}
